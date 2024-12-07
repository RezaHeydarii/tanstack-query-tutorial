import { TODO_QKS } from "../constants";
import httpService from "../services/http";
import { TodoItem } from "../types";

export const getTodoList = () => {
  return httpService.get<TodoItem[]>(TODO_QKS.GET_LIST).then((res) => res.data);
};

export const getTodo = (todoId: string) => {
  return httpService
    .get<TodoItem>(TODO_QKS.GET_ITEM(todoId))
    .then((res) => res.data);
};
