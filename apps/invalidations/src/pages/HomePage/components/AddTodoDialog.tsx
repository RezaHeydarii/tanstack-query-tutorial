import { FormEventHandler, useState } from "react";
import { Dialog } from "../../../components";
import { useCreateTodo } from "../../../hooks";

interface AddTodoDialogProps {
  open: boolean;
  onClose?: () => void;
  onCreateSuccess?: () => void;
}

export const AddTodoDialog = (props: AddTodoDialogProps) => {
  const { open, onClose, onCreateSuccess } = props;
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const { mutate, isPending } = useCreateTodo();

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (!title || !body) return;

    mutate(
      { title, body },
      {
        onSuccess: () => {
          onCreateSuccess?.();
          setTitle("");
          setBody("");
          onClose?.();
        },
      }
    );
    //send todo to backend
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <form
        onSubmit={onSubmit}
        className="min-w-96 pt-2.5 flex flex-col space-y-2.5 w-full"
      >
        <h4>Enter your todo:</h4>
        <input
          className="border border-gray-100 block w-full px-2.5"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="border border-gray-100 block w-full px-2.5"
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button
          type="submit"
          className="h-9 px-5 bg-blue-500 text-white rounded-md disabled:opacity-15"
          disabled={isPending}
        >
          Add
        </button>
      </form>
    </Dialog>
  );
};
