import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodoList,
  toggleDone,
} from "../../api";
import { TODO_QKS } from "../../constants";

export const useTodoList = () => {
  const { data, isLoading, status, isError, error, isFetching, refetch } =
    useQuery({
      queryFn: getTodoList,
      queryKey: [TODO_QKS.GET_LIST],
    });

  return { data, isLoading, status, isError, error, isFetching, refetch };
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
  const { mutate, isPending } = useMutation({
    mutationFn: createTodo,
  });

  return { mutate, isPending };
};

export const useToggleTodoDone = () => {
  const { mutate, isPending, mutateAsync } = useMutation({
    mutationFn: toggleDone,
  });

  return { mutate, isPending, mutateAsync };
};

export const useDeleteTodo = () => {
  const { mutate, isPending, mutateAsync } = useMutation({
    mutationFn: deleteTodo,
  });

  return { mutate, isPending, mutateAsync };
};
