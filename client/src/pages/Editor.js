import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EditorComponent from '../components/editor';
import "../editor.css"

const Edit = () => {
    return (
        <div className='row'>
            <Row>
                <Col md={2}>
                    <Form.Select className="m-2">
                        <option value="">- 전체 -</option>
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
        </div>
    ); 
}

export default Edit;