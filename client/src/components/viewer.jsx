import React from 'react';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ContentsViewer() {
    
    const [postData, setPostData] = useState();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('/api/post');
            const data = await response.json();
            setPostData(data);
          } catch (error) {
            console.error('데이터를 가져오는 도중 에러가 발생했습니다.', error);
          }
        };
    
        fetchData();
      }, []); // 마운트 시에만 실행

    return (
        <div>
            <h2>{postData?.subject}</h2>
            <h3> {postData?.category_id}</h3>
            <div>   
                <Viewer initialValue={postData?.content}></Viewer>
            </div>
        </div>
    ); 
}

