import React, { Fragment, useEffect } from "react";
import Home from './pages/Home';
import Edit from './pages/Editor';
import Viewer from './components/viewer';
import SidebarComponent from "./components/sidebar";
import menu from "./js/toggle";
//import sidebar from "./js/sidebar";
import { initializeSidebarLock } from "./js/scroll";


function App() {
  useEffect(() => {
    const opener = document.querySelector('.opener');

    const handleClick = (event) => {
      event.preventDefault();
    };

    opener.addEventListener('click',handleClick);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      opener.removeEventListener('click', handleClick);
    };
  },[]);

  return (
    <Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/viewer" element={<Viewer></Viewer>} />
        </Routes>
        <div>
          <SidebarComponent/>
        </div>
    </Fragment>
  );
}

export default App;
