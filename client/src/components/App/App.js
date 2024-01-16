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
  const [categoryName, setCategoryName] = useState(0);
  const [postId, setpostID] = useState(0);
  const [flagName,setFlag] =useState([]); 

  const flag = () => {
    const currentPath = location.pathname;
    return controller &&  currentPath !== '/edit' && currentPath !== '/admin' && currentPath !== '/';
  }

  return (
    <div id="wrapper">
      <div id="main">
        <div className='inner'>
          <MyHeader setF={(value)=>setFlag(value)} />
          <section id="banner" style={{backgroundColor: '#f5f6f7'}}>
            <div style={{width: '100%'}}>
              <Routes>
                  <Route path="/" element={<Home />}  />
                  <Route path="/edit" element={<Edit sendFlag={flagName} />} />
                  <Route path="/admin" element={<CateAdmin />} />
                  <Route path="/viewer/:category/:postid" element={<Viewer />} />
              </Routes>
            </div>
          </section>
          {flag() && <PostController sendCategory={categoryName} updatePostId={(value) =>setpostID(value)} />}
          </div>
      </div>
      <SidebarComponent updateCategory={(value) =>setCategoryName(value)}/>
    </div>    
  );
};

export default App;
