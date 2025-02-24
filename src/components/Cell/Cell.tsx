import React from "react";
import styles from "./Cell.module.scss";

interface CellProps {
  id: string;
  color: string;
  onClick: (cell: string) => void;
  isSelected: boolean;
  onMouseDown: () => void;
  onMouseOver: () => void;
  onTouchStart: () => void;
}

export const Cell: React.FC<CellProps> = ({
  id,
  color,
  onClick,
  isSelected,
  onMouseDown,
  onMouseOver,
  onTouchStart,
}) => {
  return (
    <div
      className={`${styles.cell} ${isSelected ? styles.selected : ""}`}
      onClick={() => onClick(id)}
      onMouseDown={onMouseDown}
      onMouseOver={onMouseOver}
      onTouchStart={onTouchStart}
      data-cellid={id}
      style={{ backgroundColor: color }}
    >
      {id}
    </div>
  );
};
