import React, { Fragment, useEffect ,useState } from "react";
import { Link, Route, Router, Routes} from "react-router-dom";
import Edit from './components/editor';
import Viewer from './components/viewer';
import SidebarComponent from "./components/sidebar";
import MyHeader from './components/header';
//import sidebar from "./js/sidebar";
import Home from './pages/Home';
import './main.css';
import './editor.css';
import PostController from "./components/postController";

function App() {

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
                <Route path="/viewer" element={<Viewer />} />
            </Routes>
          </Fragment>
          </section>
          <PostController></PostController>
        </div>
      </div>
      <SidebarComponent/>
    </div>    
  );
};

export default App;
