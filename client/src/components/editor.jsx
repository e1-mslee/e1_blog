import React from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditorComponent = () => {
  return (
      <>
      <Editor
        initialValue=""
        previewStyle="none"
        height="600px"
        initialEditType="markdown"
        useCommandShortcut={false}
        plugins={[colorSyntax]}
      />
      </>
  );
}


export default EditorComponent;