import React, {useRef} from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useState} from 'react';
import { Link } from "react-router-dom";

const EditorComponent = () => {
  const editorRef = useRef();
  return (
    <>
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
    <Row>
      <Col style={{textAlign: "center", marginTop: '1em'}}>
          <Link to="/viewer"><a href="#" className="button primary">등록</a></Link>
      </Col>
    </Row>
    </>
  );
}


export default EditorComponent;