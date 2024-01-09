import React, { useRef, useState } from 'react';
import { Link } from "react-router-dom";
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const EditorComponent = () => {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");

  const editorRef = useRef(null);

  const handleSave = async(e) => {
    e.preventDefault();
    let content = editorRef.current.getInstance().getMarkdown();

    let sendData = {
      category_id : category
    , subject : title
    , content: content
    }

    console.log(sendData);

    await fetch("/api/post/insert", {
      method: "POST",
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(sendData),
    })
  }

  const categoryChange = (e) => {
    let value = e.target.value;
    setCategory(value);
  }

  const titleChange = (e) => {
    let value = e.target.value;
    setTitle(value);
  }

  return (
    <div className='row'>
    <Row>
        <Col md={2}>
            <Form.Select className="m-2" value={category} onChange={categoryChange}>
                <option value="">- 전체 -</option>
                <option value="1">Manufacturing</option>
                <option value="2">Shipping</option>
                <option value="3">Administration</option>
                <option value="4">Human Resources</option>
            </Form.Select>
        </Col>
        <Col md={9}>
            <Form.Control type="text" className='m-2' id="subject" placeholder="제목을 입력하세요." value={title} onChange={titleChange}/>
        </Col>
    </Row>
    <Row>
        <Editor
            initialValue=" "
            previewStyle="none"
            height="550px"
            initialEditType="wysiwyg"
            hideModeSwitch="true"
            language="ko-KR"
            useCommandShortcut={false}
            ref={editorRef}
            plugins={[colorSyntax]}
            />
    </Row>
    <Row>
    <Col style={{textAlign: "center", marginTop: '1em'}}>
        <Link to="/viewer"><a href="#" className="button primary" onClick={handleSave}>등록</a></Link>
    </Col>
</Row>
</div>
  );
}


export default EditorComponent;