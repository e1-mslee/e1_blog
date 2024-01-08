import React from 'react';
import '../App.css';
import {useState} from 'react';
import { Link } from "react-router-dom";

const Home = () => {
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
        </div>
    );
}

export default Home;