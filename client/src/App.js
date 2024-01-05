import React from "react";
import { Link, Route, Router, Routes} from "react-router-dom";
import Home from './pages/Home';
import Edit from './pages/Editor';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/edit" element={<Edit />} />
    </Routes>
  );
}

export default App;
