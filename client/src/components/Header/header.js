import { Link } from "react-router-dom";
import e1 from "../../assets/images/e1.PNG";

const MyHeader = () => {
    return (
        <div>
            <header id='header'>
                <div id='logo'>
                    <img src={e1}></img>
                </div>
                <div className='buttonGroup'>
                    <Link to="/edit" style={{borderBottom: 'none'}}><button className='button small'>글쓰기</button></Link>
                </div>
            </header>
        </div>
    );
  }
  
  export default MyHeader;