import { CreateTrainDto, TrainDto } from "@/models/train";
import { useAppSelector } from "@/store/hooks";
import { trainValidationSchema } from "@/validationSchemas/trainValidationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";

interface CreateTrainModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (train: CreateTrainDto) => void;
}

const CreateTrainModal: React.FC<CreateTrainModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(trainValidationSchema),
  });
  const router = useRouter();
  const userId = useAppSelector((state) => state.user.data?.id);
  const formatDateForInput = (date: string | Date) => {
    if (typeof date === "string") {
      date = new Date(date);
    }

    if (date instanceof Date && !isNaN(date.getTime())) {
      return date.toISOString().slice(0, 16);
    }

    return "";
  };

  const onSubmit = (
    data: Omit<TrainDto, "id" | "userId" | "createdAt" | "updatedAt">
  ) => {
    if (userId) {
      const newTrain: CreateTrainDto = {
        ...data,
        userId: userId,
      };
      onSave(newTrain);
      onClose();
    } else {
      onClose();

      router.push("/auth");
    }
  };
  return (
    isOpen && (
      <>
        {/* Background Overlay */}
        <div className="fixed inset-0 bg-black opacity-50 z-10"></div>

        {/* Modal Content */}
        <div className="fixed inset-0 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold">Create Train</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Train Name
                </label>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      type="text"
                      {...field}
                      className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
                    />
                  )}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name.message}</p>
                )}
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Origin
                </label>
                <Controller
                  name="origin"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      type="text"
                      {...field}
                      className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
                    />
                  )}
                />
                {errors.origin && (
                  <p className="text-red-500 text-xs">
                    {errors.origin.message}
                  </p>
                )}
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Destination
                </label>
                <Controller
                  name="destination"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      type="text"
                      {...field}
                      className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
                    />
                  )}
                />
                {errors.destination && (
                  <p className="text-red-500 text-xs">
                    {errors.destination.message}
                  </p>
                )}
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Departure
                </label>
                <Controller
                  name="departure"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="datetime-local"
                      {...field}
                      value={field.value ? formatDateForInput(field.value) : ""}
                      className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
                    />
                  )}
                />
                {errors.departure && (
                  <p className="text-red-500 text-xs">
                    {errors.departure.message}
                  </p>
                )}
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Arrival
                </label>
                <Controller
                  name="arrival"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="datetime-local"
                      {...field}
                      value={field.value ? formatDateForInput(field.value) : ""}
                      className="mt-1 block w-full border border-gray-300 p-2 rounded-md cursor-pointer"
                    />
                  )}
                />
                {errors.arrival && (
                  <p className="text-red-500 text-xs">
                    {errors.arrival.message}
                  </p>
                )}
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 mr-2 border border-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  );
};

export default CreateTrainModal;
