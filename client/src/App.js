import React from "react";
import { Link, Route, Router, Routes} from "react-router-dom";
import Home from './pages/Home';
import Edit from './pages/Editor';
import Viewer from './components/viewer';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/edit" element={<Edit />} />
      <Route path="/viewer" element={<Viewer></Viewer>} />
    </Routes>
  );
}

export default App;
