import React from 'react';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PostView from './toastViewer';
import label from '../../assets/images/label.png';

export default function ContentsViewer(props) {
    
    const [postData, setPostData] = useState();

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch(`/api/post?category=${props.sendCategory}&postid=${props.sendPostId}`, {
                  method: 'GET',
                  headers: {
                  'Content-Type': 'application/json',
                  }
              }); 
              const data = await response.text();
              if(data.length===0){
                const temp={content:'해당 카테고리의 게시물이 존재하지 않습니다.'};
                    setPostData(temp);
              } else {
                    setPostData(JSON.parse(data));
                }
            } catch (error) {
              console.error('데이터를 가져오는 도중 에러가 발생했습니다.', error);
              setPostData(null);
            }
          };

        fetchData();
      }, [props.sendCategory,props.sendPostId]); // 마운트 시에만 실행


    if (!postData || props.sendCategory==null) {
        return (
            <div>
                <p>해당 카테고리의 게시물이 존재하지 않습니다.</p>
            </div>
        );
    }
      
    return (
        <div>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div style={{width: '10%', height: '100%', position: 'relative'}}>
              <img style={{objectFit: 'contain', width: '100%', height: '30%'}} src={label} alt="" />
              <h5 style={{position: 'absolute', bottom: 0, left: 0, width: '100%', margin: 0, padding: '20px 0'}}>{postData?.ca_nm}</h5>
            </div>
            <div style={{width: '10%', height: '100%', position: 'relative'}}>
              <img style={{objectFit: 'contain', width: '100%', height: '30%'}} src={label} alt="" />
              <h5 style={{textAlign: 'center', position: 'absolute', bottom: 0, width: '100%', margin: 0, padding: '30px 0'}}>{postData.create_date}</h5>
            </div>
          </div>
            <h2 style={{textAlign: 'center'}}>{postData?.subject}</h2>
            {/* <div dangerouslySetInnerHTML={{__html:postData?.content}}> */}
            <PostView content={postData?.content}></PostView>
            {/* </div> */}
        </div>
    ); 
}


