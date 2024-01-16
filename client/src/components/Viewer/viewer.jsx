import React from 'react';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PostView from './toastViewer';
import label from '../../assets/images/label.png';
import { useParams } from 'react-router-dom';

export default function ContentsViewer(props) {
    
    const [postData, setPostData] = useState();
    const { category, postid } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/post/${category}/${postid}`, {
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
      }, [category,postid]);


    if (!postData) {
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
              <h5 style={{position: 'absolute', top: '50%', left: 0, width: '100%', margin: 0, padding: '20px 0', transform: 'translateY(-50%)'}}>{postData?.ca_nm}</h5>
            </div>
            <div style={{width: '10%', height: '100%', position: 'relative'}}>
              <img style={{objectFit: 'contain', width: '100%', height: '30%'}} src={label} alt="" />
              <h5 id='postCreDate' style={{position: 'absolute', textAlign: 'center', top: '50%', left: 0, width: '100%', margin: 0, padding: '20px 0', bottom: 0, transform: 'translateY(-80%)'}}>{postData.create_date}</h5>
            </div>
          </div>
            <h2 id='postSubject' style={{textAlign: 'center'}}>{postData?.subject}</h2>
            {/* <div dangerouslySetInnerHTML={{__html:postData?.content}}> */}
            <PostView content={postData?.content}></PostView>
            {/* </div> */}
        </div>
    ); 
}


