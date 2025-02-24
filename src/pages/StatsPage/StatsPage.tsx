import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@store/store";
import styles from "./StatsPage.module.scss";

const StatsPage: React.FC = () => {
  const navigate = useNavigate();
  const selectedCells = useSelector((state: RootState) => state.color.selected);

  const handleBackButtonClick = () => {
    navigate("/");
  };

  return (
    <div className={styles.statsPage}>
      <div className={styles.statsInfo}>
        <h1>Статистика</h1>
        <button className={styles.backButton} onClick={handleBackButtonClick}>
          Назад
        </button>
      </div>
      <div className={styles.stats}>
        {selectedCells.map((item, index) => (
          <div key={index} className={styles.statsItem}>
            <h2>Ячейка {item.cell}</h2>
            <p>
              Цвет: <span style={{ backgroundColor: item.color }}>{item.color}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsPage;
