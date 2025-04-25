import { TrainDto } from "@/models/train";
import React from "react";

interface DeleteTrainModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (trainId: number) => void;
  trainData: TrainDto;
}

const DeleteTrainModal: React.FC<DeleteTrainModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  trainData,
}) => {
  return (
    <>
      {isOpen && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black opacity-50"></div>
          {/* Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center z-20">
            <div className="bg-white p-6 rounded-md shadow-md w-96 z-10">
              <h2 className="text-xl font-bold mb-4">Delete Train</h2>
              <p className="mb-6 text-gray-700">
                Are you sure you want to delete the train{" "}
                <span className="font-semibold">{trainData.name}</span>? This
                action cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={() => onDelete(trainData.id)}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DeleteTrainModal;
