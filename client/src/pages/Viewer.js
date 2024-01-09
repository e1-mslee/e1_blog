import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useState} from 'react';
import { Link } from "react-router-dom";
import ViewerComponent from '../components/viewer';
import '../main.css';

const Viewer = () => {

    return (
        <div>
            <h3 style={{margin: '1em'}}>카테고리 &gt; 제목</h3>
            <div style={{margin: '1em'}}>
                <ViewerComponent />
            </div>
        </div>
    ); 
}

export default Viewer;