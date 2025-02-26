import React from "react";
import Gameplay from "pages/gameplay/Gameplay";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="" element={<h1>Introduction</h1>} />
      <Route path="/game/tutorial" element={<h1>Tutorial</h1>} />
      <Route path="/game/calendar" element={<Gameplay />} />
      <Route path="/game/end-of-day" element={<h1>End of day</h1>} />
      <Route path="/game/end-of-week" element={<h1>End of week</h1>} />
      <Route
        path="*"
        element={<h1>Make sure this redirects to introduction</h1>}
      />
    </Routes>
  );
}

export default App;
