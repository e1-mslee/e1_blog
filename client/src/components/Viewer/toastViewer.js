import {Viewer} from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { useEffect,useState} from 'react';

const PostView=({content})=>{
    const [initialValue, setInitialValue] = useState(content || '');

    useEffect(() => {
        // content가 변경되면 initialValue를 업데이트
        setInitialValue(content || '');
      }, [content]);

	return <Viewer key={initialValue} initialValue={initialValue} />;
}

export default PostView;