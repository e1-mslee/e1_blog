import React, { useEffect, useState } from 'react';
import MyMain from '../pages/Home';
import { event } from 'jquery';

//자식 li 요소 클릭 시 html 렌더링 이벤트
const changePage = (item) => {
    console.log(item);
}

//자식 li 요소 렌더링 함수
const OpenerComponent = ({ label, subitems }) => {
    const [isActive, setIsActive] = useState(false);
  
    const toggleOpener = () => {
      setIsActive(!isActive);
    };
    
    return (
      <li>
        <span className={`opener ${isActive ? 'active' : ''}`} onClick={toggleOpener}>{label}</span>
        <ul style={{ display: isActive ? 'block' : 'none' }}>
          {subitems.map((item, index) => (
            <li key={index}><a href="#" id='' onClick={() => changePage(item)}>{item}</a></li>
          ))}
        </ul>
      </li>
    );
  };
   
const SidebarComponent = () => {
    const [post, setPost] = useState('');
    const [categories, setCategories] = useState([]); // 새로운 상태 추가

    // 사이드바 리스트 로딩 함수
    const categoryList = async () => {
        try {
        const response = await fetch('/api/categoryList', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ post }),
        });
        const body = await response.json(); // JSON 형식으로 파싱

        // 응답을 categories 상태로 업데이트
        setCategories(body);
        } catch (error) {
        console.error("Error fetching category list:", error);
        }
    };
    //카테고리 리스트 로딩 함수 실행
    useEffect(() =>{
        categoryList();
    },[]);

    let result = new Map(categories.map((category) => [category.ca_id, { ...category, subitems: []}]));

    for(const category of categories){
        if(category.supi_id !== null){
            const parentCa = result.get(category.supi_id);
            if(parentCa){
                parentCa.subitems.push(category.ca_nm);
            }
        }
    }

    const resultArray = [...result.values()].filter((item) => item.subitems.length !== 0 && item.supi_id !== null);
  
    return (
      <div id="sidebar">
        <div className='inner'>
          <nav id='menu'>
            <header className='major'>
              <h2>Category</h2>
            </header>
            <ul>
              <li><a href={MyMain}>Main Page</a></li>
              {resultArray.map((data) => {
              return (
                <OpenerComponent key={data.ca_id} label={data.ca_nm} subitems={data.subitems} />
              );
            })}
            </ul>
          </nav>
          <footer id="footer">
            <p className="copyright">&copy; enterprise1 BS Team</p>
          </footer>
        </div>
      </div>
    );
  };
  
  export default SidebarComponent;
  
