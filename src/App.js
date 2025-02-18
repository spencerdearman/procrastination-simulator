import React, { useState } from "react";
import "./styles/global.css";
import "./App.css";
import Calendar from "./components/Calendar";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  const [currentDate, setCurrentDate] = useState("Tuesday");

  return (
    <div id="container">
      <div id="main">
        <Header currentDate={currentDate} />
        <Calendar />
      </div>
      <Sidebar />
    </div>
  );
}

export default App;
