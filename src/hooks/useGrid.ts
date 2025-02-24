import { useMemo } from "react";

export const useGrid = (rows = 10, cols = 15) => {
  return useMemo(() => {
    const grid: string[][] = [];
    for (let i = 0; i < rows; i++) {
      const row: string[] = [];
      for (let j = 0; j < cols; j++) {
        row.push(`${String.fromCharCode(65 + j)}${i + 1}`); // A1, B1, ..., A2, B2...
      }
      grid.push(row);
    }
    return grid;
  }, [rows, cols]);
};
