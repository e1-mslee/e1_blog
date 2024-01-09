import React from 'react';
import { useRef } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@toast-ui/editor/dist/i18n/ko-kr';

const EditorComponent = () => {
  const editorRef = useRef();
  const onUploadImage = async(blob, callback) => {
    try {
      // const imageData = new FormData();
      // const file = new File([blob], encodeURI(blob.name), {
      //   type: blob.type,
      // });
      // imageData.append("image", file);
      // const imageUrl = await fetch({
      //   method: "POST",+
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      //   url: `${process.env.REACT_APP_SERVER_URL}/api/v1/image/upload`,
      //   data: imageData,
      //   withCredentials: true,
      // });

      // callback(
      //   `${
      //     process.env.REACT_APP_SERVER_URL
      //   }/api/v1/image/${encodeURIComponent(imageURI.data.fileName)}`,
      //   "image"
      // );
    } catch (error) {
      console.log(error);
    }
  }

  return (
      <>
      <Editor
        initialValue=" "
        previewStyle="none"
        height="600px"
        initialEditType="markdown"
        language="ko-KR"
        useCommandShortcut={false}
        ref={editorRef}
        plugins={[colorSyntax]}
        hooks = {{ addImageBlobHook: onUploadImage }}
      />
      </>
  );
}


export default EditorComponent;