// src/utils/dateUtils.ts

export const formatDate = (date: Date): string => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0"); // Adds leading zero if needed
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Adds leading zero if needed
  const year = d.getFullYear();

  return `${day}.${month}.${year}`; // Returns date in dd.MM.yyyy format
};
