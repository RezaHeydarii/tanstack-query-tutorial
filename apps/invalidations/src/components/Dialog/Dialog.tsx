import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface DialogProps {
  open: boolean;
  onClose?: () => void;
  children?: ReactNode;
}

export const Dialog = (props: DialogProps) => {
  const { open, onClose, children } = props;

  if (!open) return null;

  return createPortal(
    <div className="absolute inset-0 bg-black/30 flex justify-center items-center">
      <div className="bg-white rounded-md px-2.5  py-2.5 relative">
        <button
          type="button"
          aria-label="close"
          onClick={onClose}
          className="absolute right-2 top-2"
        >
          X
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};
