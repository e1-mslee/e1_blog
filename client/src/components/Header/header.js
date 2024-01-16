import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import e1 from "../../assets/images/e1.PNG";

const MyHeader = () => {
  const navi = useNavigate();

  const deletePost = async () => {
    const userConfirmed = window.confirm('삭제하시겠습니까?');
    if (userConfirmed) {
      let path = location.pathname.split('/');
      let categoryNm = path[2];
      let postId = path[3];
      let num = null;
      for(let i=path.length -1; i>=0; i--){
        if(!isNaN(path[i])){
          num = path[i];
          break;
        }
      }
      //초기 글일 경우
      if(num == 0){
        let data = { categoryNm: categoryNm };
        await fetch('/api/post/deleteC1',{
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json',
          },
          body: JSON.stringify(data)
        });
        navi("/");
      }
      //초기 글이 아닐 경우
      else {
        let data = {
          categoryNm: categoryNm,
          postId: postId
        };
        await fetch('/api/post/deleteC2',{
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json',
          },
          body: JSON.stringify(data)
        });
        navi("/");
      }
    } else {}
  };

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      const deleteBtn = document.getElementById('deleteBtn');
      deleteBtn.style.display = 'none';
    } else {
      const deleteBtn = document.getElementById('deleteBtn');
      deleteBtn.style.display = '';
    }
  }, [location.pathname]);

  return (
    <div>
      <header id='header'>
        <div id='logo'>
          <img src={e1} alt="로고" />
        </div>
        <div className='buttonGroup'>
          <Link to="/edit" style={{ borderBottom: 'none' }}><button className='button small'>글쓰기</button></Link>
          <button id="deleteBtn" className="button small" onClick={() => {deletePost()}}>삭제</button>
        </div>
      </header>
    </div>
  );
}

export default MyHeader;
