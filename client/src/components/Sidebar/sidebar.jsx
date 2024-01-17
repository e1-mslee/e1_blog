import React, { useEffect, useState } from 'react';
import { Link,useNavigate} from "react-router-dom";
import cogWheel from "../../assets/images/cogWheel.png";

//자식 li 요소 클릭 시 html 렌더링 이벤트
const changePage = (item) => {
    console.log(item);
}

//자식 li 요소 렌더링 함수
const OpenerComponent = ({ label, subitems, updateC}) => {
    const [isActive, setIsActive] = useState(false);
    const [caPostId, setCaPostId] = useState('');
    const navi = useNavigate();
    const [loc,setLoc]=useState('/');
    const toggleOpener = () => {
      setIsActive(!isActive);
    };

    const categoryPostId = async (item) => {
      
      try {
      const response = await fetch(`/api/categoryListPostId?category=${item}`, {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          }
      });
      const body = await response.json(); // JSON 형식으로 파싱
      setLoc(`/viewer/${item}/`);
      setCaPostId(body);
      updateC(item);

      } catch (error) {
      console.error("Error fetching category list:", error);
      }
    };  

    useEffect(()=>{
      navi(loc+`${caPostId.post_id || ''}`);
    },[caPostId])

    return (
      <li>
        <span className={`opener ${isActive ? 'active' : ''}`} onClick={toggleOpener}>{label}</span>
        <ul style={{ display: isActive ? 'block' : 'none' }}>
          {subitems.map((item, index) => (
            <li key={index} onClick={()=>categoryPostId(item)}><a>{item}</a></li>
          ))}
        </ul>
      </li>
    );
  };
   
const SidebarComponent = ({updateCategory}) => {
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
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h2 style={{marginBottom: 0}}>Category</h2>
                    <Link to='/admin' style={{borderBottom: 'none', textAlign: 'right', display: 'inline-block'}}>
                        <img style={{width: '10%', cursor: 'pointer', marginTop: '10px'}} src={cogWheel} alt="" />
                    </Link>
                </div>
            </header>
            <ul>
              <li><Link to='/'>Main Page</Link></li>
              {resultArray.map((data) => {
              return (
                <OpenerComponent key={data.ca_id} label={data.ca_nm} subitems={data.subitems} updateC={(value)=>updateCategory(value)}/>
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
  
