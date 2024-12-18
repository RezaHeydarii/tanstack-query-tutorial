import { TODO_QKS } from "../constants";
import httpService from "../services/http";
import { PostTodoRequest, TodoItem, ToggleTodoDone } from "../types";

export const getTodoList = () => {
  return httpService
    .get<TodoItem[]>(TODO_QKS.GET_LIST + "?page=1")
    .then((res) => res.data);
};

export const getTodo = (todoId: string) => {
  return httpService
    .get<TodoItem>(TODO_QKS.GET_ITEM(todoId))
    .then((res) => res.data);
};

export const createTodo = (payload: PostTodoRequest) => {
  return httpService
    .post<TodoItem>(TODO_QKS.GET_LIST, payload)
    .then((res) => res.data);
};

export const toggleDone = (payload: ToggleTodoDone) => {
  const { todoId, isDone } = payload;
  return httpService.put<TodoItem>(`${TODO_QKS.GET_ITEM(todoId)}/toggle`, {
    isDone,
  });
};

export const deleteTodo = (todoId: string) => {
  return httpService.delete(`${TODO_QKS.GET_ITEM(todoId)}`);
};
