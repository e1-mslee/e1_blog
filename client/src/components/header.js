import { Link } from "react-router-dom";

const MyHeader = () => {
    return (
        <div>
            <header id='header'>
                <div id='logo'>
                    <img src='/e1.PNG'></img>
                </div>
                <div className='buttonGroup'>
                    <Link to="/edit" style={{borderBottom: 'none'}}><button className='button small'>글쓰기</button></Link>
                </div>
            </header>
        </div>
    );
  }
  
  export default MyHeader;