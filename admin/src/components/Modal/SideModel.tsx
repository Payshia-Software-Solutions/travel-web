import React, { ReactNode } from "react";
import { FaXmark } from "react-icons/fa6";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const SideModel: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-end">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="z-10 h-full w-full transform overflow-auto rounded-l-lg bg-white p-4 shadow-xl transition-all md:w-3/5 lg:w-3/5">
        <button
          className="absolute right-4 top-4 mb-2 rounded-2xl p-1 hover:bg-black hover:text-white"
          onClick={onClose}
        >
          <FaXmark />
        </button>
        {children}
      </div>
    </div>
  );
};

export default SideModel;
