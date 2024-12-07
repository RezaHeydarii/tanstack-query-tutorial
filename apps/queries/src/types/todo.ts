export interface TodoItem {
  id: string;
  title: string;
  body: string;
  isDone: boolean;
  //TODO we'll fix this later
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createdBy: any;
}
