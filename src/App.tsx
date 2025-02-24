import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import StatsPage from "./pages/StatsPage/StatsPage";
import styles from "./App.module.scss";

const App: React.FC = () => {
  return (
    <Router>
      <div className={styles.app}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
