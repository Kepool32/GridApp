import React from "react";
import styles from "./Grid.module.scss";
import { useGrid } from "@hooks/useGrid.ts";
import { Cell } from "../Cell/Cell.tsx";

interface GridProps {
  onCellClick: (cell: string) => void;
  cellColors: { [key: string]: string };
  selectedCell: string;
  selectedCells: string[];
  selectionStart: string | null;
  selectionEnd: string | null | undefined;
  onMouseDown: (cell: string) => void;
  onMouseOver: (cell: string) => void;
  onMouseUp: () => void;
  onTouchStart: (cell: string) => void;
  onTouchMove: (event: React.TouchEvent) => void;
  onTouchEnd: () => void;
}

export const Grid: React.FC<GridProps> = ({
  onCellClick,
  cellColors,
  selectedCell,
  selectedCells,
  onMouseDown,
  onMouseOver,
  onMouseUp,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}) => {
  const grid = useGrid();

  return (
    <div
      className={styles.grid}
      onMouseUp={onMouseUp}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
    >
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.gridRow}>
          {row.map((cellId) => (
            <Cell
              key={cellId}
              id={cellId}
              color={cellColors[cellId] || ""}
              onClick={onCellClick}
              isSelected={cellId === selectedCell || selectedCells.includes(cellId)}
              onMouseDown={() => onMouseDown(cellId)}
              onMouseOver={() => onMouseOver(cellId)}
              onTouchStart={() => onTouchStart(cellId)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
