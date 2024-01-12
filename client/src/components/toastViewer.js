import {Viewer} from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { useEffect,useState} from 'react';

const PostView=({content})=>{
    const [initialValue, setInitialValue] = useState(content || '');
    console.log(content+"ccccc"); // 콘솔에 content 출력

    useEffect(() => {
        // content가 변경되면 initialValue를 업데이트
        setInitialValue(content || '');
        console.log("sdfds");
      }, [content]);

	return <Viewer key={content} initialValue={initialValue} />;
}

export default PostView;