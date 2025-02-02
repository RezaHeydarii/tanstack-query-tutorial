/* eslint-disable @typescript-eslint/no-explicit-any */

import { delay, http, HttpResponse } from "msw";
import { localStorageData } from "./localStorageData";

const key = "RezaHeydari:TanstackQuery@TODOs";
const defaultVal = [
  {
    id: "1",
    title: "Fix login bug",
    body: "Investigate and fix the issue where users are unable to log in after resetting their passwords. Ensure to include unit tests and document any changes in the authentication flow.",
    isDone: false,
    createdBy: {
      id: "1",
      name: "Reza",
      email: "r.heydarii98@gmail.com",
    },
  },
  {
    id: "2",
    title: "Write unit tests",
    body: "Develop a comprehensive suite of unit tests for the new authentication module. Focus on edge cases, especially those related to token expiration and refresh flows.",
    isDone: true,
    createdBy: {
      id: "1",
      name: "Reza",
      email: "r.heydarii98@gmail.com",
    },
  },
  {
    id: "3",
    title: "Design dashboard UI",
    body: "Create detailed wireframes and a high-fidelity mockup for the new dashboard interface. The design should include dynamic widgets and user personalization options.",
    isDone: false,
    createdBy: {
      id: "1",
      name: "Reza",
      email: "r.heydarii98@gmail.com",
    },
  },
  {
    id: "4",
    title: "Optimize API performance",
    body: "Analyze the analytics API for bottlenecks and optimize database queries. Document the changes and test for improvements in response time under heavy load conditions.",
    isDone: false,
    createdBy: {
      id: "1",
      name: "Reza",
      email: "r.heydarii98@gmail.com",
    },
  },
  {
    id: "5",
    title: "Update documentation",
    body: "Revise the project documentation to include new features added in the recent release. Ensure the setup guides are updated and add troubleshooting tips for common issues.",
    isDone: true,
    createdBy: {
      id: "1",
      name: "Reza",
      email: "r.heydarii98@gmail.com",
    },
  },
  {
    id: "6",
    title: "Prepare release notes",
    body: "Draft detailed release notes for version 2.3. Include a summary of key features, bug fixes, and any breaking changes. Share it with the marketing team for distribution.",
    isDone: false,
    createdBy: {
      id: "1",
      name: "Reza",
      email: "r.heydarii98@gmail.com",
    },
  },
  {
    id: "7",
    title: "Set up CI/CD pipeline",
    body: "Implement a continuous integration and deployment pipeline for the backend services. Use GitHub Actions and document the process for the team.",
    isDone: false,
    createdBy: {
      id: "1",
      name: "Reza",
      email: "r.heydarii98@gmail.com",
    },
  },
  {
    id: "8",
    title: "Conduct usability testing",
    body: "Plan and execute usability testing sessions for the new mobile app. Prepare user scenarios, record sessions, and compile feedback for the development team.",
    isDone: false,
    createdBy: {
      id: "1",
      name: "Reza",
      email: "r.heydarii98@gmail.com",
    },
  },
  {
    id: "9",
    title: "Integrate payment gateway",
    body: "Research and integrate a payment gateway for the e-commerce module. Test it thoroughly to handle failed payments and ensure compliance with PCI standards.",
    isDone: false,
    createdBy: {
      id: "1",
      name: "Reza",
      email: "r.heydarii98@gmail.com",
    },
  },
  {
    id: "10",
    title: "Fix UI inconsistencies",
    body: "Review the entire application for UI inconsistencies. Update components to follow the design system and fix alignment issues across different screen sizes.",
    isDone: true,
    createdBy: {
      id: "1",
      name: "Reza",
      email: "r.heydarii98@gmail.com",
    },
  },
];

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
