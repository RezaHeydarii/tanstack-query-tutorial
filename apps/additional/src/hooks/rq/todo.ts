import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createTodo,
  deleteTodo,
  getPaginatedTodoList,
  getTodo,
  getTodoList,
  toggleDone,
} from "../../api";
import { TODO_QKS } from "../../constants";
import { GetPaginateData, TodoItem } from "../../types";

export const useTodoList = () => {
  const { data, isLoading, status, isError, error, isFetching, refetch } =
    useQuery({
      queryFn: getTodoList,
      queryKey: [TODO_QKS.GET_LIST],
    });

  return { data, isLoading, status, isError, error, isFetching, refetch };
};

export const usePaginatedTodoList = (page: number) => {
  const { data, isLoading, refetch, isPlaceholderData } = useQuery({
    queryKey: [TODO_QKS.GET_PAGINATED_LIST, page],
    queryFn: () => getPaginatedTodoList(page),
    placeholderData: keepPreviousData,
  });
  const list = data ? data.data : [];

  return { list, meta: data?.meta, isLoading, refetch, isPlaceholderData };
};

export const useTodoItem = (id?: string) => {
  const { data, isLoading, refetch } = useQuery({
    queryFn: () => getTodo(id!),
    queryKey: [TODO_QKS.GET_ITEM(id!)],
    enabled: !!id,
  });

  return { data, isLoading, refetch };
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createTodo,
    onSuccess: (response) => {
      queryClient.setQueriesData<GetPaginateData<TodoItem>>(
        { queryKey: [TODO_QKS.GET_PAGINATED_LIST], exact: false },
        (currentQuery) => {
          if (!currentQuery) return currentQuery;
          return { ...currentQuery, data: [response, ...currentQuery.data] };
        }
      );
    },
  });

  return { mutate, isPending };
};

export const useToggleTodoDone = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, mutateAsync } = useMutation({
    mutationFn: toggleDone,
    onMutate: (variable) => {
      //update list:
      queryClient.setQueriesData<GetPaginateData<TodoItem>>(
        { queryKey: [TODO_QKS.GET_PAGINATED_LIST], exact: false },
        (currentList) => {
          if (!currentList) return currentList;
          return {
            ...currentList,
            data: currentList.data.map((item) => {
              if (item.id === variable.todoId) {
                return { ...item, isDone: variable.isDone };
              }
              return item;
            }),
          };
        }
      );

      //update item
      queryClient.setQueryData<TodoItem>(
        [TODO_QKS.GET_ITEM(variable.todoId)],
        (item) => {
          if (!item) return item;
          return { ...item, isDone: variable.isDone };
        }
      );
    },
    onError: (err, variable) => {
      console.log("hello", err);
      //update list:
      queryClient.setQueriesData<GetPaginateData<TodoItem>>(
        { queryKey: [TODO_QKS.GET_PAGINATED_LIST], exact: false },
        (currentList) => {
          if (!currentList) return currentList;
          return {
            ...currentList,
            data: currentList.data.map((item) => {
              if (item.id === variable.todoId) {
                return { ...item, isDone: !variable.isDone };
              }
              return item;
            }),
          };
        }
      );

      //update item
      queryClient.setQueriesData<TodoItem>(
        { queryKey: [TODO_QKS.GET_ITEM(variable.todoId)], exact: false },
        (item) => {
          if (!item) return item;
          return { ...item, isDone: !variable.isDone };
        }
      );
    },
  });

  return { mutate, isPending, mutateAsync };
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, mutateAsync } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: (_, todoId) => {
      queryClient.setQueriesData<GetPaginateData<TodoItem>>(
        { queryKey: [TODO_QKS.GET_PAGINATED_LIST], exact: false },
        (currentList) => {
          if (!currentList) return currentList;
          return {
            ...currentList,
            data: currentList.data.filter((t) => t.id !== todoId),
          };
        }
      );
    },
  });

  return { mutate, isPending, mutateAsync };
};
