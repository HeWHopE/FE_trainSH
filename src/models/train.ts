export interface CreateTrainDto {
  name: string;
  departure: Date;
  arrival: Date;
  origin: string;
  destination: string;
  userId: number;
}

export interface TrainDto {
  id: number;
  name: string;
  departure: Date;
  arrival: Date;
  origin: string;
  destination: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateTrainDto {
  name?: string | null;
  origin?: string | null;
  destination?: string | null;
  departure?: Date | null;
  arrival?: Date | null;
}
