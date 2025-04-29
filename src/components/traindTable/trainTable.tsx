import { formatDate } from "@/helpers/dateFormat";
import { TrainDto } from "@/models/train";
import { Edit, Trash2 } from "lucide-react";
import React from "react";

interface TrainTableProps {
  filteredTrains: TrainDto[];
  searchQuery: string;
  handleEditClick: (train: TrainDto) => void;
  handleDeleteClick: (train: TrainDto) => void;
}

const TrainTable: React.FC<TrainTableProps> = ({
  filteredTrains,
  searchQuery,
  handleEditClick,
  handleDeleteClick,
}) => (
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
          <th className="px-4 py-2 text-left text-sm sm:text-base">Arrival</th>
          <th className="px-4 py-2 text-left text-sm sm:text-base">Origin</th>
          <th className="px-4 py-2 text-left text-sm sm:text-base">
            Destination
          </th>
          <th className="px-4 py-2 text-left text-sm sm:text-base">Actions</th>
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
              <td className="px-4 py-2 text-sm sm:text-base">{train.name}</td>
              <td className="px-4 py-2 text-sm sm:text-base">
                {formatDate(train.departure)}
              </td>
              <td className="px-4 py-2 text-sm sm:text-base">
                {formatDate(train.arrival)}
              </td>
              <td className="px-4 py-2 text-sm sm:text-base">{train.origin}</td>
              <td className="px-4 py-2 text-sm sm:text-base">
                {train.destination}
              </td>
              <td className="px-4 py-2 flex gap-2">
                <button
                  onClick={() => handleEditClick(train)}
                  className="text-indigo-600 hover:text-indigo-800 cursor-pointer"
                  aria-label="Edit Train"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => handleDeleteClick(train)}
                  className="text-red-600 hover:text-red-800 cursor-pointer"
                  aria-label="Delete Train"
                >
                  <Trash2 size={20} />
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default TrainTable;
