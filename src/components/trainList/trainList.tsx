import { createTrain, searchTrains, updateTrain } from "@/api/train-api";
import { formatDate } from "@/helpers/dateFormat";
import { CreateTrainDto, TrainDto, UpdateTrainDto } from "@/models/train";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";
import CreateTrainModal from "../modals/CreateTrainModal";
import UpdateTrainModal from "../modals/UpdateTrainModal";
import Sort from "../trainSort/trainSort";
import { SortColumn, SortDirection } from "../types/sortTypes";

interface TrainListProps {
  trains: TrainDto[];
  setTrains: Dispatch<SetStateAction<TrainDto[]>>;
}

const TrainList: React.FC<TrainListProps> = ({ trains, setTrains }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [trainToEdit, setTrainToEdit] = useState<TrainDto | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTrains, setFilteredTrains] = useState<TrainDto[]>(trains);
  const [searchError, setSearchError] = useState<string | null>(null);

  const [sortColumn, setSortColumn] = useState<SortColumn | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleSort = (params: { label?: string; order?: string }) => {
    if (params.label) {
      const columnMap: Record<string, SortColumn> = {
        Name: "name",
        Departure: "departure",
        Arrival: "arrival",
        Origin: "origin",
        Destination: "destination",
      };
      const newSortColumn = columnMap[params.label];
      if (newSortColumn) {
        setSortColumn(newSortColumn);
      }
    }
    if (params.order) {
      setSortDirection(params.order as SortDirection);
    }
  };

  useEffect(() => {
    if (!sortColumn) return;

    setFilteredTrains((prev) => {
      const sorted = [...prev].sort((a, b) => {
        const valueA = a[sortColumn];
        const valueB = b[sortColumn];

        if (sortColumn === "departure" || sortColumn === "arrival") {
          const timeA = new Date(valueA).getTime();
          const timeB = new Date(valueB).getTime();

          if (isNaN(timeA) && isNaN(timeB)) return 0;
          if (isNaN(timeA)) return sortDirection === "asc" ? 1 : -1;
          if (isNaN(timeB)) return sortDirection === "asc" ? -1 : 1;

          return sortDirection === "asc" ? timeA - timeB : timeB - timeA;
        }

        const strA = String(valueA).toLowerCase();
        const strB = String(valueB).toLowerCase();

        return sortDirection === "asc"
          ? strA.localeCompare(strB)
          : strB.localeCompare(strA);
      });

      return sorted;
    });
  }, [sortColumn, sortDirection]);
  useEffect(() => {
    if (!searchQuery || searchQuery === "") {
      setFilteredTrains(trains);
    }
  }, [trains, searchQuery]);

  const toggleCreateModal = () => {
    setIsCreateModalOpen((prev) => !prev);
  };

  const toggleUpdateModal = () => {
    setIsUpdateModalOpen((prev) => !prev);
  };

  const onCreateTrain = async (train: CreateTrainDto) => {
    const response = await createTrain(train);

    if (response) {
      toast.success("Train created successfully");
      setIsCreateModalOpen(false);

      setTrains((prevTrains) => [...prevTrains, response]);

      if (
        searchQuery &&
        (response.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          response.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
          response.destination
            .toLowerCase()
            .includes(searchQuery.toLowerCase()))
      ) {
        setFilteredTrains((prev) => [...prev, response]);
      }
    }
  };

  const onUpdateTrain = async (train: UpdateTrainDto) => {
    if (trainToEdit?.id) {
      const response = await updateTrain(trainToEdit.id, train);

      if (response) {
        toast.success("Train updated successfully");
        setIsUpdateModalOpen(false);

        setTrains((prevTrains) =>
          prevTrains.map((t) =>
            t.id === trainToEdit.id ? { ...t, ...response } : t
          )
        );

        if (
          searchQuery &&
          (response.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            response.number.toLowerCase().includes(searchQuery.toLowerCase()))
        ) {
          setFilteredTrains((prev) =>
            prev.map((t) =>
              t.id === trainToEdit.id ? { ...t, ...response } : t
            )
          );
        } else if (searchQuery) {
          setFilteredTrains((prev) =>
            prev.filter((t) => t.id !== trainToEdit.id)
          );
        }
      }
    }
  };

  const handleEditClick = (train: TrainDto) => {
    setTrainToEdit(train);
    setIsUpdateModalOpen(true);
  };

  const debouncedSearch = (query: string) => {
    setTimeout(async () => {
      if (!query) {
        setFilteredTrains(trains);
        setSearchError(null);
        return;
      }

      try {
        const results = await searchTrains(query);
        setFilteredTrains(results);
        setSearchError(null);
      } catch (error) {
        console.log(error);
        setSearchError("Failed to search trains");
        setFilteredTrains([]);
      }
    }, 300);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredTrains(trains);
    setSearchError(null);
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-md shadow-md">
      <div className="flex flex-col justify-between items-center mb-4 sm:flex-row gap-3">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          Your Trains
        </h2>
        <div className="flex items-center mt-2 sm:mt-0 w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by name..."
              className="w-full sm:w-64 px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            )}
          </div>
        </div>
        <Sort
          list={["Name", "Departure", "Arrival", "Origin", "Destination"]}
          callback={handleSort}
          initialValue={
            sortColumn
              ? {
                  label:
                    {
                      name: "Name",
                      departure: "Departure",
                      arrival: "Arrival",
                      origin: "Origin",
                      destination: "Destination",
                    }[sortColumn] || "Name",
                  order: sortDirection,
                }
              : { label: "Name", order: "asc" }
          }
          hideArrows={false}
        />
        <button
          onClick={toggleCreateModal}
          className="ml-0 sm:ml-4 mt-2 sm:mt-0 px-3 py-2 sm:px-4 sm:py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm sm:text-base"
        >
          Add Train
        </button>
      </div>

      {searchError && (
        <p className="text-red-500 text-sm mb-4">{searchError}</p>
      )}
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm sm:text-base">
                Train Name
              </th>
              <th className="px-4 py-2 text-left text-sm sm:text-base">
                Departure
              </th>
              <th className="px-4 py-2 text-left text-sm sm:text-base">
                Arrival
              </th>
              <th className="px-4 py-2 text-left text-sm sm:text-base">
                Origin
              </th>
              <th className="px-4 py-2 text-left text-sm sm:text-base">
                Destination
              </th>
              <th className="px-4 py-2 text-left text-sm sm:text-base">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTrains.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-2 text-center text-gray-500 text-sm sm:text-base"
                >
                  {searchQuery ? "No trains found." : "No trains available."}
                </td>
              </tr>
            ) : (
              filteredTrains.map((train) => (
                <tr key={train.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm sm:text-base">
                    {train.name}
                  </td>
                  <td className="px-4 py-2 text-sm sm:text-base">
                    {formatDate(train.departure)}
                  </td>
                  <td className="px-4 py-2 text-sm sm:text-base">
                    {formatDate(train.arrival)}
                  </td>
                  <td className="px-4 py-2 text-sm sm:text-base">
                    {train.origin}
                  </td>
                  <td className="px-4 py-2 text-sm sm:text-base">
                    {train.destination}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleEditClick(train)}
                      className="text-indigo-600 hover:text-indigo-800 text-sm sm:text-base"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <CreateTrainModal
        isOpen={isCreateModalOpen}
        onClose={toggleCreateModal}
        onSave={onCreateTrain}
      />

      {trainToEdit && (
        <UpdateTrainModal
          isOpen={isUpdateModalOpen}
          onClose={toggleUpdateModal}
          onSave={onUpdateTrain}
          trainData={trainToEdit}
        />
      )}
    </div>
  );
};

export default TrainList;
