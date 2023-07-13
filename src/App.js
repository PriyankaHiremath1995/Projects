import React from "react";
import { Route, Routes } from "react-router-dom";

import StartPage from "./components/StartPage";
import Quiz from "./components/Quiz";

const App = () => {
  return (
    <>
      <Routes>
      <Route exact path="/" element={<StartPage />} />
        <Route exact path="/startpage" element={<StartPage />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </>
  );
};

export default App;
