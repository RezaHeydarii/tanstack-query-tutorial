import { Link } from "react-router-dom";
import { usePaginatedTodoList, useToggleTodoDone } from "../../hooks";
import { useCallback, useEffect, useState } from "react";
import { AddTodoDialog } from "./components/AddTodoDialog";
import { TodoItem } from "../../types";

const buttonStyles = {
  activeButtonCls: "border-gray-400 bg-green-500",
  disableButtonCls: "border-gray-300 bg-transparent",
};

const HomePage = () => {
  const [page, setPage] = useState<number>(1);
  const { list, meta, isLoading, isPlaceholderData } =
    usePaginatedTodoList(page);

  const [showAdder, toggleAdder] = useState<boolean>(false);
  const { isPending, mutate } = useToggleTodoDone();

  const onToggleDone = async (item: TodoItem) => {
    mutate({ todoId: item.id, isDone: !item.isDone });
  };

  const onScroll = useCallback(() => {
    if (
      window.innerHeight + Math.round(window.scrollY) >=
      document.body.offsetHeight
    ) {
      console.log("reached at bottom");
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

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
        {list.map((item) => {
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
      <div className="flex justify-center mb-10">
        {[...new Array(meta?.totalPage || 1)].map((_, num) => {
          return (
            <button
              className={
                page === num + 1
                  ? "bg-green-200 w-10 h-10 disabled:opacity-25"
                  : "bg-transparent w-10 h-10 disabled:opacity-25"
              }
              onClick={() => setPage(num + 1)}
              disabled={isPlaceholderData}
            >
              {num + 1}
            </button>
          );
        })}
      </div>
      <AddTodoDialog open={showAdder} onClose={() => toggleAdder(false)} />
    </div>
  );
};

export default HomePage;
