import { useParams } from "react-router-dom";
import { useTodoItem } from "../../hooks";

const buttonStyles = {
  activeButtonCls: "border-gray-400 bg-green-500",
  disableButtonCls: "border-gray-300 bg-transparent",
};

const TodoPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useTodoItem(id);

  if (isLoading || !data)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading data
      </div>
    );

  return (
    <div className="max-w-80 mx-auto pt-2.5">
      <div className="flex justify-between border-b border-b-gray-300 mb-2.5 pb-1 items-center">
        <button className="bg-red-600 text-white px-2.5 h-10 rounded-md">
          Delete
        </button>
        <button
          className={[
            "w-6 h-6 border  rounded-md",
            buttonStyles[data.isDone ? "activeButtonCls" : "disableButtonCls"],
          ].join(" ")}
        />
      </div>
      <h4 className="text-base font-bold mb-1.5">{data.title}</h4>
      <p className="text-sm">{data.body}</p>
    </div>
  );
};

export default TodoPage;
