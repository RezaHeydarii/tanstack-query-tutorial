export const TODO_QKS = {
  GET_LIST: "/api/todo",
  GET_PAGINATED_LIST: "/api/todo/paginated",
  GET_ITEM: (todoItem: string) => `/api/todo/${todoItem}`,
};
