import { Link } from "react-router-dom";
import { useTodoList, useToggleTodoDone } from "../../hooks";
import { useState } from "react";
import { AddTodoDialog } from "./components/AddTodoDialog";
import { TodoItem } from "../../types";

const buttonStyles = {
  activeButtonCls: "border-gray-400 bg-green-500",
  disableButtonCls: "border-gray-300 bg-transparent",
};

const HomePage = () => {
  const { data, isLoading, refetch } = useTodoList();
  const [showAdder, toggleAdder] = useState<boolean>(false);
  const { isPending, mutateAsync } = useToggleTodoDone();

  const onToggleDone = async (item: TodoItem) => {
    mutateAsync({ todoId: item.id, isDone: !item.isDone }).then(() =>
      refetch()
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading data</p>
      </div>
    );
  }

  return (
    <div>
      <header className="flex justify-between items-center w-full px-5 pt-2.5 pb-2 border-b border-gray-400/40 mb-5">
        <h1 className="text-2xl font-bold">My todo list</h1>
        <button
          type="button"
          onClick={() => toggleAdder(true)}
          className="h-9 px-5 bg-blue-500 text-white rounded-md"
        >
          Add
        </button>
      </header>
      <section className="px-5 pt-2.5 grid grid-cols-2 lg:grid-cols-4 gap-2">
        {data &&
          data?.map((item) => {
            return (
              <div
                key={item.id}
                className="flex items-start justify-between border mb-1.5 border-gray-300 rounded-lg px-2.5 pt-1 pb-1.5"
              >
                <div className="flex-1">
                  <Link to={`/todo/${item.id}`}>
                    <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                  </Link>
                  <p>{item.body}</p>
                </div>
                <button
                  className={[
                    "w-6 h-6 border  rounded-md",
                    buttonStyles[
                      item.isDone ? "activeButtonCls" : "disableButtonCls"
                    ],
                  ].join(" ")}
                  onClick={() => onToggleDone(item)}
                  disabled={isPending}
                />
              </div>
            );
          })}
      </section>
      <AddTodoDialog
        open={showAdder}
        onClose={() => toggleAdder(false)}
        onCreateSuccess={refetch}
      />
    </div>
  );
};

export default HomePage;
