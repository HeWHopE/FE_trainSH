import { TrainDto, UpdateTrainDto } from "@/models/train";
import { UpdateTrainValidationSchema } from "@/validationSchemas/updateTrainValidationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

interface UpdateTrainModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: UpdateTrainDto) => void;
  trainData: TrainDto;
}

const UpdateTrainModal: React.FC<UpdateTrainModalProps> = ({
  isOpen,
  onClose,
  onSave,
  trainData,
}) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UpdateTrainValidationSchema),
    defaultValues: {
      name: trainData.name,
      origin: trainData.origin,
      destination: trainData.destination,
      departure: trainData.departure,
      arrival: trainData.arrival,
    },
  });

  const formatDateForInput = (date: string | Date) => {
    if (typeof date === "string") {
      date = new Date(date);
    }

    if (date instanceof Date && !isNaN(date.getTime())) {
      return date.toISOString().slice(0, 16);
    }

    return "";
  };

  useEffect(() => {
    if (trainData) {
      setValue("name", trainData.name);
      setValue("origin", trainData.origin);
      setValue("destination", trainData.destination);
      setValue("departure", trainData.departure);
      setValue("arrival", trainData.arrival);
    }
  }, [trainData, setValue]);

  const onSubmit = (data: UpdateTrainDto) => {
    onSave(data);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 "></div>
          <div className="fixed inset-0 flex items-center justify-center z-20">
            <div className="bg-white p-6 rounded-md shadow-md w-96 z-10">
              <h2 className="text-xl font-bold mb-4">Update Train</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Train Name
                  </label>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="text"
                        {...field}
                        value={field.value ?? ""}
                        className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
                      />
                    )}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Origin
                  </label>
                  <Controller
                    name="origin"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="text"
                        {...field}
                        value={field.value ?? ""}
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

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Destination
                  </label>
                  <Controller
                    name="destination"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="text"
                        {...field}
                        value={field.value ?? ""}
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

                <div>
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
                        value={
                          field.value ? formatDateForInput(field.value) : ""
                        }
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

                <div>
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
                        value={
                          field.value ? formatDateForInput(field.value) : ""
                        }
                        className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
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
                    className="px-4 py-2 bg-gray-300 text-white rounded-md mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateTrainModal;
