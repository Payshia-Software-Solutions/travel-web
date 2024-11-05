import React, { ReactNode } from "react";
import { FaXmark } from "react-icons/fa6";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="z-10 max-h-screen w-full max-w-4xl transform overflow-auto rounded-lg bg-white p-2 shadow-xl transition-all">
        <button
          className="absolute right-4 top-4 mb-2  rounded-2xl p-1 hover:bg-black hover:text-white"
          onClick={onClose}
        >
          <FaXmark />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
