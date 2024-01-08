import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useState} from 'react';
import { Link, Route, Router, Routes} from "react-router-dom";
import EditorComponent from '../components/editor';

const Edit = () => {

    return (
        <div>
            <Row>
                <Col md={2}>
                    <Form.Select className="m-2">
                        <option value="">- Category -</option>
                        <option value="1">Manufacturing</option>
                        <option value="1">Shipping</option>
                        <option value="1">Administration</option>
                        <option value="1">Human Resources</option>
                    </Form.Select>
                </Col>
                <Col md={9}>
                    <Form.Control type="text" className='m-2' id="subject" placeholder="제목을 입력하세요." />
                </Col>
            </Row>
            <Row>
                <EditorComponent>
                </EditorComponent>
            </Row>
            <Link to="/viewer"><input type="submit" value="Send Message" class="primary" /></Link>
        </div>
    ); 
}

export default Edit;