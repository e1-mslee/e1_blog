import React from 'react';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ContentsViewer(props) {
    
    const [postData, setPostData] = useState({});
    const [contentPost, setcontentPost] = useState();

    const fetchData = async () => {
        try {
          const response = await fetch(`/api/post?category=${props.sendCategory}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            }
        });
          const data = await response.text();
          if(data.length==0){
            setPostData(null);
          }
          setPostData(JSON.parse(data));
        } catch (error) {
          console.error('데이터를 가져오는 도중 에러가 발생했습니다.', error);
          setPostData(null);
        }
      };

    useEffect(() => {
        fetchData();
      }, [props.sendCategory]); // 마운트 시에만 실행

    useEffect(()=>{
        if(postData){
            setcontentPost(<Viewer initialValue={postData.content}></Viewer>);
        }
    },[postData]);

    if (!postData || props.sendCategory==null) {
        return (
            <div>
                <p>해당 카테고리의 게시물이 존재하지 않습니다.</p>
            </div>
        );
    }
      
    return (
        <div>
            <h2>{postData?.subject}</h2>
            <h5> {postData?.ca_nm}</h5>
            <div>
                {contentPost}
            </div>
        </div>
    ); 
}

