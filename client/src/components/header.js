const MyHeader = () => {
    return (
        <div>
            <header id='header'>
                <div id='logo'>
                    <img src={''} alt='logo'></img>
                </div>
                <div className='buttonGroup'>
                    <button className='button small'>글쓰기</button>
                </div>
            </header>
        </div>
    );
  }
  
  export default MyHeader;