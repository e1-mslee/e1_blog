import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const EditorComponent = (props) => {
  const [category, setCategory] = useState('');
  const [postId, setPostId] = useState('');
  const [secCategory, setSecCategory] = useState('');
  const [title, setTitle] = useState("");
  const [modPost,setmodPost]=useState();
  let [cateOptions, setOptions] = useState([]);
  let [secCateOptions, setSecOptions] = useState([]);
  const [editorInitialized, setEditorInitialized] = useState(false);
  const editorRef = useRef(null);
  const navi = useNavigate();


  
  const findCategoryIdByName = (name, options) => {
    const foundOption = options.find(option => option.ca_nm === name);
    return foundOption ? foundOption.ca_id : null;
  };

  const getComboData = async(supiId) => {
      if(supiId === "" || supiId === null){
        setSecOptions([]);
        return;
      }
      let param = {
        supi_id : supiId
      }
      const response = await fetch("/api/category/get", {
        method: 'POST',
        headers:{
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(param),
      })

      const data = await response.json();
      console.log(data)
      cateOptions = data;
      if(supiId === 1) setOptions(cateOptions);
      else setSecOptions(cateOptions);

  }

  const getModData = async(ca_nm,p_id) => {

    const modResponse = await fetch(`/api/getModPost/${ca_nm}/${p_id}`, {
      method: 'POST',
      headers:{
        'Content-Type' : 'application/json',
      }
    })
    const modData = await modResponse.json();
    setmodPost(modData);
    
}

  useEffect(()=>{
    if (modPost && modPost.supi_id) {
    getComboData(findCategoryIdByName(modPost.supi_id, cateOptions));
    }
  },[modPost]);

  useEffect(()=>{
    if(modPost!==undefined){
      setTitle(modPost.subject)
    }

    if (modPost && modPost.supi_id) {
      // modPost의 supi_id에 해당하는 id 값을 찾아서 setCategory에 전달
      setCategory(findCategoryIdByName(modPost.supi_id, cateOptions));
    }

    if (modPost && modPost.ca_nm) {
      // modPost의 ca_nm에 해당하는 id 값을 찾아서 setSecCategory에 전달
      setSecCategory(findCategoryIdByName(modPost.ca_nm, secCateOptions));
    }
  

  },[modPost, cateOptions, secCateOptions])

  useEffect(() => {
    if (editorRef.current && !editorInitialized) {
      // Editor가 처음으로 초기화되면서 modPost.content를 설정합니다.
      const editorInstance = editorRef.current.getInstance();
      editorInstance.setMarkdown(modPost?.content || '');

      // editorInitialized를 true로 설정하여 더 이상 실행되지 않도록 합니다.
      setEditorInitialized(true);
    }
  }, [editorRef, modPost, editorInitialized]);
  

  useEffect(() => {
    if(props.sendFlag[1]==='viewer'){
      getModData(props.sendFlag[2],props.sendFlag[3]);
    }
    getComboData(1);
  }, []);

  const handleSave = async(e) => {
    let content = editorRef.current.getInstance().getMarkdown();

    if(category === null || category === ''){
      alert('대분류를 선택하세요.');
      return;
    }
    if(secCategory === null || secCategory === ''){
      alert('소분류를 선택하세요.');
      return;
    }
    if(title === null || title === ''){
      alert('제목을 입력하세요.');
      return;
    }
    if(content === null || content === ''){
      alert('내용을 입력하세요.');
      return;
    }

    let sendData = {
      category_id : secCategory
    , subject : title
    , content: content
    }

    if(props.sendFlag[1]===''){
    await fetch("/api/post/insert", {
      method: "POST",
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(sendData),
    })
    }else if(props.sendFlag[1]==='viewer'){
      await fetch(`/api/post/mod?postid=${props.sendFlag[3]}`, {
        method: "POST",
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(sendData),
      })
    }
    navi(`/viewer/${props.sendFlag[2]}/${props.sendFlag[3]}`);
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

  const onUploadImage = (blob, cb) => {
    try{
      const imageData = new FormData();
      const file = new File([blob], encodeURI(blob.name),{
        type: blob.type,
      })

      const clientId = "38f2792ef59359a";

      imageData.append("image", file);

      fetch("https://api.imgur.com/3/image", {
        method: "POST",
        headers: {
          Authorization: `Client-ID ${clientId}`,
          Accept: "application/json",
        },
        body: imageData,
      }).then((res) => {
        return res.json();
      }).then((json) => {
        console.log(json);
        let url = json.data.link;
        cb(url);
      })
    } catch(err){
        console.error(err);
    }
  }

  return (
    <div className='row'>
    <Row>
        <Col md={2}>
            <Form.Select  value={category} onChange={categoryChange}>
              <option value="">선택</option>
              {cateOptions.map((option,i) => (
                <option value={option.ca_id}>{option.ca_nm}</option>
              ))}
            </Form.Select>
        </Col>
        <Col md={2}>
            <Form.Select value={secCategory} onChange={secCategoryChange}>
              <option value="">선택</option>
              {secCateOptions.map((option,i) => (
                <option value={option.ca_id}>{option.ca_nm}</option>
              ))}
            </Form.Select>
        </Col>
        <Col md={6}>
            <Form.Control type="text" className='mb-2' id="subject" placeholder="제목을 입력하세요." value={title} onChange={titleChange}/>
        </Col>
    </Row>
    <Row>
        <Editor
            initialValue={modPost?.content || " "}
            previewStyle="none"
            height="550px"
            initialEditType="wysiwyg"
            hideModeSwitch="true"
            language="ko-KR"
            useCommandShortcut={false}
            ref={editorRef}
            plugins={[colorSyntax]}
            hooks={{
                addImageBlobHook: onUploadImage
            }}
            key={modPost}/>
    </Row>
    <Row>
      <Col style={{textAlign: "center", marginTop: '1em'}}>
          <Link to="#" onClick={handleSave}><span className="button primary">{props.sendFlag[1]==='viewer'?'수정':'등록'}</span></Link>
      </Col>
    </Row>
</div>
  );
}


export default EditorComponent;