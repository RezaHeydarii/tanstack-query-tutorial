import { useQuery } from "@tanstack/react-query";
import { getTodo, getTodoList } from "../../api";
import { TODO_QKS } from "../../constants";

export const useTodoList = () => {
  const { data, isLoading, status, isError, error, isFetching } = useQuery({
    queryFn: getTodoList,
    queryKey: [TODO_QKS.GET_LIST],
  });

  return { data, isLoading, status, isError, error, isFetching };
};

export const useTodoItem = (id?: string) => {
  const { data, isLoading } = useQuery({
    queryFn: () => getTodo(id!),
    queryKey: [TODO_QKS.GET_ITEM(id!)],
    enabled: !!id,
  });

  return { data, isLoading };
};
