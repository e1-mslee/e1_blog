import React, { Fragment, useEffect ,useState } from "react";
import { Link, Route, Router, Routes, useLocation} from "react-router-dom";
import Edit from '../Editor/editor';
import Viewer from '../Viewer/viewer';
import categoryAdmin from '../Admin/cateAdmin';
import SidebarComponent from "../Sidebar/sidebar";
import MyHeader from '../Header/header';
import Home from '../../pages/Home';
import '../App/App.css';
import '../Editor/editor.css';
import PostController from "../PostController/postController";
import CateAdmin from "../Admin/cateAdmin";

function App() {
  const [controller, setController] = useState(true);
  const location = useLocation();
  const [categoryName, setCategoryName] = useState(true);
  const [postId, setpostID] = useState(false);

  const flag = () => {
    const currentPath = location.pathname;
    return controller &&  currentPath !== '/edit' && currentPath !== '/admin' && currentPath !== '/';
  }

  return (
    <div id="wrapper">
      <div id="main">
        <div className='inner'>
          <MyHeader />
          <section id="banner" style={{backgroundColor: '#f5f6f7'}}>
            <div style={{width: '100%'}}>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/edit" element={<Edit />} />
                  <Route path="/admin" element={<CateAdmin />} />
                  <Route path="/viewer" element={<Viewer sendCategory={categoryName} sendPostId={postId}  />} />
              </Routes>
            </div>
          </section>
          {flag() && <PostController sendCategory={categoryName} updatePostId={(value) =>setpostID(value)} />}
          </div>
      </div>
      <SidebarComponent updateCategory={(value) =>setCategoryName(value)} resetPostID={(value)=>setpostID(value)}/>
    </div>    
  );
};

export default App;
