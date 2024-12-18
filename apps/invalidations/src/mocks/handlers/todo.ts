/* eslint-disable @typescript-eslint/no-explicit-any */

import { delay, http, HttpResponse } from "msw";
import { localStorageData } from "./localStorageData";
import defaultFakeData from "./500_todos.json";

const key = "RezaHeydari:TanstackQuery@TODOs";
const defaultVal = defaultFakeData;

const { getData, setData, generateUUID } = localStorageData(key, defaultVal);

export const todoHandlers = [
  http.get("/api/todo/paginated", async ({ request }) => {
    await delay(2000);
    const allData = getData();
    const PER_PAGE = 20;
    const searchPage = request.url.split("?page=")[1];
    const page = searchPage ? parseInt(searchPage) : 0;
    const meta = {
      page,
      totalPage: Math.floor(allData.length / PER_PAGE),
    };
    return HttpResponse.json({
      data: getData().slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE),
      meta,
    });
  }),
  http.get("/api/todo", async () => {
    await delay(2000);
    return HttpResponse.json(getData());
  }),
  http.get("/api/todo/:id", async ({ params }) => {
    await delay(2000);
    const todo = getData().find((u) => u.id == params.id);
    if (!todo) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(todo);
  }),
  http.put("/api/todo/:id/toggle", async ({ params }) => {
    await delay(2000);
    const todo = getData().find((u) => u.id == params.id);
    if (!todo) return new HttpResponse(null, { status: 404 });
    const newTodo = { ...todo, isDone: !todo.isDone };
    const list = getData();
    const newList = list.map((l) => (l.id == newTodo.id ? newTodo : l));
    setData(newList);
    return HttpResponse.json(todo);
  }),
  http.put("/api/todo/:id", async ({ params, request }) => {
    await delay(2000);
    const todo = getData().find((u) => u.id == params.id);
    if (!todo) return new HttpResponse(null, { status: 404 });
    const editedFields: any = await request.json();
    const newTodo = { ...todo, ...editedFields };
    const list = getData();
    const newList = list.map((l) => (l.id == newTodo.id ? newTodo : l));
    setData(newList);
    return HttpResponse.json(todo);
  }),
  http.post("/api/todo", async ({ request }) => {
    await delay(1500);
    console.log(request);
    const newTodo: any = await request.json();
    const list = getData();
    const id = generateUUID();
    const newList = [{ ...newTodo, id }, ...list];
    setData(newList);
    return HttpResponse.json({ ...newTodo, id });
  }),
  http.delete("/api/todo/:id", async ({ params }) => {
    await delay(2000);
    const todo = getData().find((u) => u.id == params.id);
    if (!todo) return new HttpResponse(null, { status: 404 });
    const list = getData().filter((item) => item.id != params.id);
    setData(list);
    return HttpResponse.json(todo);
  }),
];
