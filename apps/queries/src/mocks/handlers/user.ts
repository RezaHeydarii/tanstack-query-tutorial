/* eslint-disable @typescript-eslint/no-explicit-any */

import { delay, http, HttpResponse } from "msw";
import { localStorageData } from "./localStorageData";

const key = "RezaHeydari:TanstackQuery@Users";
const defaultVal = [
  {
    id: "1",
    name: "Reza",
    email: "r.heydarii98@gmail.com",
    password: "12345678",
  },
];

const { getData: storageGetData, setData } = localStorageData(key, defaultVal);
const getData = () =>
  storageGetData().map((i) => ({ ...i, password: undefined }));

export const userHandlers = [
  http.get("/api/users", async () => {
    await delay(2000);
    return HttpResponse.json(getData());
  }),
  http.get("/api/users/:id", async ({ params }) => {
    await delay(2000);
    const user = getData().find((u) => u.id === params.id);
    if (!user) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(user);
  }),
  http.post("/api/users", async ({ request }) => {
    await delay(1500);
    const newUser: any = await request.json();
    const list = getData();
    const newList = [...list, { ...newUser, id: list.length + 1 }];
    setData(newList);
    return HttpResponse.json(newUser);
  }),
];
