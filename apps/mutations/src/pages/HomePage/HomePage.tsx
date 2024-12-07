import { Link } from "react-router-dom";
import { useTodoList } from "../../hooks";

const buttonStyles = {
  activeButtonCls: "border-gray-400 bg-green-500",
  disableButtonCls: "border-gray-300 bg-transparent",
};

const HomePage = () => {
  const { data, isLoading, isFetching } = useTodoList();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading data</p>
      </div>
    );
  }

  return (
    <div>
      {isFetching && <div className="text-center">fetching data</div>}
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
                />
              </div>
            );
          })}
      </section>
    </div>
  );
};

export default HomePage;
