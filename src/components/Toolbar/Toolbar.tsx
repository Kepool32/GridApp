import React, { useState } from "react";
import styles from "./Toolbar.module.scss";

interface ToolbarProps {
  onColorChange: (cell: string, color: string) => void;
  selectedCell: string;
  selectedCells: string[];
}

export const Toolbar: React.FC<ToolbarProps> = ({ onColorChange, selectedCell, selectedCells }) => {
  const [selectedColor, setSelectedColor] = useState<string>("#ff0000");

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setSelectedColor(color);

    if (selectedCells.length > 0) {
      selectedCells.forEach((cell) => {
        onColorChange(cell, color);
      });
    } else {
      onColorChange(selectedCell, color);
    }
  };

  return (
    <div className={styles.toolbar}>
      <input type="color" value={selectedColor} onChange={handleColorChange} />
      <span>
        Выберите цвет для{" "}
        {selectedCells.length > 1 ? `${selectedCells.length} ячеек` : `ячейки ${selectedCell}`}
      </span>
    </div>
  );
};
