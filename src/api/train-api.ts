import { CreateTrainDto, TrainDto, UpdateTrainDto } from "@/models/train";
import { API_URL, LOCAL_STORAGE_TOKEN } from "../../api";

export const createTrain = async (
  createTrainDto: CreateTrainDto
): Promise<TrainDto> => {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem(LOCAL_STORAGE_TOKEN)
      : null;

  if (!token) {
    throw new Error("User not authenticated");
  }

  const response = await fetch(`${API_URL}/train`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(createTrainDto),
  });

  if (!response.ok) {
    throw new Error("Failed to create train");
  }

  return await response.json();
};

export const deleteTrain = async (id: number) => {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem(LOCAL_STORAGE_TOKEN)
      : null;

  if (!token) {
    throw new Error("User not authenticated");
  }

  const response = await fetch(`${API_URL}/train/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete train with ID ${id}`);
  }

  return await response.json();
};

export const updateTrain = async (
  id: number,
  updateTrainDto: UpdateTrainDto
) => {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem(LOCAL_STORAGE_TOKEN)
      : null;

  if (!token) {
    throw new Error("User not authenticated");
  }

  const response = await fetch(`${API_URL}/train/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateTrainDto),
  });

  if (!response.ok) {
    throw new Error(`Failed to update train with ID ${id}`);
  }

  return await response.json();
};

export const getTrainsByUserId = async (
  userId: number
): Promise<TrainDto[]> => {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem(LOCAL_STORAGE_TOKEN)
      : null;

  if (!token) {
    throw new Error("User not authenticated");
  }

  const response = await fetch(`${API_URL}/train/user/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch trains for user with ID ${userId}`);
  }

  return await response.json();
};

export const searchTrains = async (query: string): Promise<TrainDto[]> => {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem(LOCAL_STORAGE_TOKEN)
      : null;

  if (!token) {
    throw new Error("User not authenticated");
  }

  const response = await fetch(
    `${API_URL}/train/search/search?query=${encodeURIComponent(query)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to search trains for query: ${query}`);
  }

  return await response.json();
};
