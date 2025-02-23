export interface TodoItem {
  id: string;
  title: string;
  body: string;
  isDone: boolean;
  //TODO we'll fix this later
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createdBy: any;
}

export interface PostTodoRequest {
  title: string;
  body: string;
}

export interface ToggleTodoDone {
  isDone: boolean;
  todoId: string;
}

export interface GetPaginateData<T> {
  data: T[];
  meta: {
    page: number;
    totalPage: number;
  };
}
