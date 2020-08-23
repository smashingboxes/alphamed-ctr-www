import React, { useState } from 'react';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';

import {
  FormEditorContainer,
  EditorLabelContainer
} from './form-editor.styles';

const FormEditor = ({ label }) => {
  const [value, setValue] = useState('');

  return (
    <FormEditorContainer>
      {label ? <EditorLabelContainer>{label}</EditorLabelContainer> : null}
      <ReactQuill theme='snow' value={value} onChange={setValue} />
    </FormEditorContainer>
  );
};

export default FormEditor;
