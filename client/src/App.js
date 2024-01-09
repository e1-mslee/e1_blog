import React, { Fragment, useEffect ,useState } from "react";
import { Link, Route, Router, Routes} from "react-router-dom";
import Edit from './pages/Editor';
import Viewer from './components/viewer';
import SidebarComponent from "./components/sidebar";
import menu from "./js/toggle";
import MyHeader from './components/header';
//import sidebar from "./js/sidebar";
import { initializeSidebarLock } from "./js/scroll";
import Home from './pages/Home';
import './main.css';

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

  const [sectionContent, setSectionContent] = useState("기본 섹션 내용");

  // 컴포넌트 값이 변경될 때 호출되는 함수
  const handleComponentChange = () => {
    // 여기서 컴포넌트를를 업데이트하거나, API 호출 등의 작업을 수행
    const newContent ="바뀐 섹션 내용";
    setSectionContent(newContent);
  }

  return (
    <div id="wrapper">
      <div id="main">
        <div className='inner'>
          <MyHeader />
          <section id="banner">
            <Fragment>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/edit" element={<Edit />} />
                <Route path="/viewer" element={<Viewer></Viewer>} />
            </Routes>
          </Fragment>
          </section>
        </div>
      </div>
      <SidebarComponent />
    </div>
  );
}

export default App;
