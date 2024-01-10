import React, { useRef, useState, useEffect } from 'react';
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
  const [category, setCategory] = useState('');
  const [secCategory, setSecCategory] = useState('');
  const [title, setTitle] = useState("");
  let [cateOptions, setOptions] = useState([]);
  let [secCateOptions, setSecOptions] = useState([]);

  const editorRef = useRef(null);

  const getComboData = async(supiId) => {
      if(supiId == ""){
        setSecOptions([]);
        return;
      }
      let param = {
        supi_id : supiId
      }
      const respons = await fetch("/api/category/get", {
        method: 'POST',
        headers:{
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(param),
      })

      const data = await respons.json();
      cateOptions = data;
      if(supiId == 1) setOptions(cateOptions);
      else setSecOptions(cateOptions);
  }

  useEffect(() => {
    getComboData(1);
  });

  const handleSave = async(e) => {
    e.preventDefault();
    let content = editorRef.current.getInstance().getMarkdown();

    let sendData = {
      category_id : category
    , subject : title
    , content: content
    }

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

    getComboData(value);
  }
  
  const secCategoryChange = (e) => {
    let value = e.target.value;
    setSecCategory(value);
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
              <option value="">선택</option>
              {cateOptions.map((option,i) => (
                <option value={option.ca_id}>{option.ca_nm}</option>
              ))}
            </Form.Select>
        </Col>
        <Col md={2}>
            <Form.Select className="m-2" value={secCategory} onChange={secCategoryChange}>
              <option value="">선택</option>
              {secCateOptions.map((option,i) => (
                <option value={option.ca_id}>{option.ca_nm}</option>
              ))}
            </Form.Select>
        </Col>
        <Col md={6}>
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