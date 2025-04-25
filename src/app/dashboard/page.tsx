"use client";

import { getTrainsByUserId } from "@/api/train-api";
import PrivateRoute from "@/components/PrivateRoute";
import TrainList from "@/components/trainList/trainList";
import { TrainDto } from "@/models/train";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function DashboardContent() {
  const router = useRouter();
  const user = useAppSelector((state) => state.user.data);
  const [trains, setTrains] = useState<TrainDto[]>([]);

  console.log(trains);
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    router.push("/auth");
  };

  useEffect(() => {
    const FetchTrains = async () => {
      if (user?.id) {
        const trains = await getTrainsByUserId(user?.id);

        if (trains.length) {
          setTrains(trains);
        }
      }
    };

    FetchTrains();
  }, [user?.id]);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">
                Train Scheduler
              </h1>
            </div>
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">{user?.name}</h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <TrainList trains={trains} setTrains={setTrains} />
        </div>
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <PrivateRoute>
      <DashboardContent />
    </PrivateRoute>
  );
}
