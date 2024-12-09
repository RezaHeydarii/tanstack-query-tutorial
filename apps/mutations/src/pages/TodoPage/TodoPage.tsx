import { useNavigate, useParams } from "react-router-dom";
import { useDeleteTodo, useTodoItem, useToggleTodoDone } from "../../hooks";

const buttonStyles = {
  activeButtonCls: "border-gray-400 bg-green-500",
  disableButtonCls: "border-gray-300 bg-transparent",
};

const TodoPage = () => {
  const { id } = useParams();
  const { data, isLoading, refetch } = useTodoItem(id);
  const { mutate: deleteTodo, isPending: deletingTodo } = useDeleteTodo();
  const { mutate: toggleTodoDone, isPending: togglingTodo } =
    useToggleTodoDone();
  const navigate = useNavigate();

  const onDeleteClicked = () => {
    if (!data) return;
    deleteTodo(data.id, { onSuccess: () => navigate("/") });
  };

  const onTodoDoneClicked = () => {
    if (!data) return;
    toggleTodoDone(
      { todoId: data.id, isDone: !data.isDone },
      { onSuccess: () => refetch() }
    );
  };

  if (isLoading || !data)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading data
      </div>
    );

  return (
    <div className="max-w-80 mx-auto pt-2.5">
      <div className="flex justify-between border-b border-b-gray-300 mb-2.5 pb-1 items-center">
        <button
          onClick={onDeleteClicked}
          disabled={deletingTodo}
          className="bg-red-600 text-white px-2.5 h-10 rounded-md disabled:opacity-30"
        >
          Delete
        </button>
        <button
          className={[
            "w-6 h-6 border  rounded-md",
            buttonStyles[data.isDone ? "activeButtonCls" : "disableButtonCls"],
          ].join(" ")}
          onClick={onTodoDoneClicked}
          disabled={togglingTodo}
        />
      </div>
      <h4 className="text-base font-bold mb-1.5">{data.title}</h4>
      <p className="text-sm">{data.body}</p>
    </div>
  );
};

export default TodoPage;
