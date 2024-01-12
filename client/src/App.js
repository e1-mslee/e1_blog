import React, { Fragment, useEffect ,useState } from "react";
import { Link, Route, Router, Routes, useLocation} from "react-router-dom";
import Edit from './components/editor';
import Viewer from './components/viewer';
import categoryAdmin from './components/cateAdmin';
import SidebarComponent from "./components/sidebar";
import MyHeader from './components/header';
//import sidebar from "./js/sidebar";
import Home from './pages/Home';
import './main.css';
import './editor.css';
import PostController from "./components/postController";
import CateAdmin from "./components/cateAdmin";

function App() {
  const [controller, setController] = useState(true);
  const location = useLocation();
  const [categoryName, setCategoryName] = useState(true);

  const flag = () => {
    const currentPath = location.pathname;
    return controller &&  currentPath !== '/edit' && currentPath !== '/admin';
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
                <Route path="/admin" element={<CateAdmin />} />
                <Route path="/viewer" element={<Viewer sendCategory={categoryName} />} />
            </Routes>
          </Fragment>
          </section>
          {flag() && <PostController sendCategory={categoryName}/>}
          </div>
      </div>
      <SidebarComponent updateCategory={(value) =>setCategoryName(value)}/>
    </div>    
  );
};

export default App;
