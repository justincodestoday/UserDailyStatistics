import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import HomePage from "./component/home/HomePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
