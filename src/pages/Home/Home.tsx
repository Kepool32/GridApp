import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@store/store";
import styles from "./Home.module.scss";
import { Toolbar } from "@components/Toolbar/Toolbar.tsx";
import { Grid } from "@components/Grid/Grid.tsx";
import { clearAllColors, setColor } from "@store/slices/colorSlice.ts";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedCellColorArray = useSelector((state: RootState) => state.color.selected);
  const selectedCellColor = selectedCellColorArray.reduce(
    (acc, { cell, color }) => {
      acc[cell] = color;
      return acc;
    },
    {} as { [key: string]: string }
  );
  const [selectedCell, setSelectedCell] = useState<string>("");
  const [isSelecting, setIsSelecting] = useState<boolean>(false);
  const [selectionStart, setSelectionStart] = useState<string | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<string | null | undefined>(null);
  const [selectedCells, setSelectedCells] = useState<string[]>([]);

  const handleCellClick = (cell: string) => {
    setSelectedCell(cell);
    setSelectionStart(cell);
    setSelectionEnd(cell);
    if (!selectedCells.includes(cell)) {
      setSelectedCells([...selectedCells, cell]);
    }
  };
  const handleColorChange = (cell: string, color: string) => {
    dispatch(setColor({ cell, color }));
  };

  const handleStatsPageNavigation = () => {
    navigate("/stats");
  };

  const handleMouseDown = (cell: string) => {
    setIsSelecting(true);
    setSelectionStart(cell);
    setSelectionEnd(cell);
    setSelectedCells([cell]);
  };

  const handleMouseOver = (cell: string | undefined) => {
    if (isSelecting) {
      setSelectionEnd(cell);
      setSelectedCells(getSelectedCellsInRange(selectionStart, cell));
    }
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
  };

  const handleTouchStart = (cell: string) => {
    handleMouseDown(cell);
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    const touch = event.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);

    if (element && (element as HTMLElement).dataset.cellid) {
      handleMouseOver((element as HTMLElement).dataset.cellid);
    }
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  const getSelectedCellsInRange = (start: string | null, end: string | null | undefined) => {
    if (!start || !end) return [];

    const startCoord = getCoordinates(start);
    const endCoord = getCoordinates(end);
    const cellsInRange: string[] = [];

    for (let row = startCoord.row; row <= endCoord.row; row++) {
      for (let col = startCoord.col; col <= endCoord.col; col++) {
        cellsInRange.push(`${String.fromCharCode(64 + col)}${row}`);
      }
    }
    return cellsInRange;
  };

  const getCoordinates = (cellId: string) => {
    const letter = cellId.charAt(0);
    const row = parseInt(cellId.substring(1));
    const col = letter.charCodeAt(0) - "A".charCodeAt(0) + 1;
    return { row, col };
  };

  const handleClearCells = () => {
    setSelectedCells([]);
    dispatch(clearAllColors());
  };

  return (
    <div className={styles.home}>
      <div className={styles.toolbarContainer}>
        <Toolbar
          onColorChange={handleColorChange}
          selectedCell={selectedCell}
          selectedCells={selectedCells}
        />
        <button className={styles.clearButton} onClick={handleClearCells}>
          Очистить ячейки
        </button>
      </div>
      <Grid
        onCellClick={handleCellClick}
        cellColors={selectedCellColor}
        selectedCell={selectedCell}
        selectionStart={selectionStart}
        selectedCells={selectedCells}
        selectionEnd={selectionEnd}
        onMouseDown={handleMouseDown}
        onMouseOver={handleMouseOver}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
      <button className={styles.statsButton} onClick={handleStatsPageNavigation}>
        Перейти к статистике
      </button>
    </div>
  );
};

export default Home;
