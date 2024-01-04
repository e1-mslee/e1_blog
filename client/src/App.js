import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function App() {

  const [responseToPost, setResponseToPost] = useState('');
  const [post, setPost] = useState('');

  const onClickButton =async(e) =>{
    e.preventDefault();
    const response = await fetch('/api/db',{
      method: 'GET',
    })
    const body = await response.text();
    setResponseToPost(body);
  }

  const onClickDeleteButton = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/delete', {
      method: 'GET',
    });
    const body = await response.text();

    setResponseToPost(body);
  };

  const onClickInsertButton = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/insert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post }),
    });

    const body = await response.text();

    setResponseToPost(body);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          MERN TEST 
        </p>
        <form onSubmit={onClickInsertButton}>
          <input type="text" value={post} onChange={(e) => setPost(e.target.value)} />
          <button type="submit">삽입</button>          
        </form>
        <button onClick={onClickButton}>데이터 보기</button>
        <button onClick={onClickDeleteButton}>모든 데이터 삭제</button>
        <p>{responseToPost}</p>
      </header>
    </div>
  );
}

export default App;
