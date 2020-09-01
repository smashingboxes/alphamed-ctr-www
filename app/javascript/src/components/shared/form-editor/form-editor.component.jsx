import React from 'react';
import 'react-quill/dist/quill.snow.css';

import {
  FormEditorContainer,
  EditorLabelContainer,
  GroupContainer,
  ErrorSpan,
  FormSpan,
  ReactQuillContainer
} from './form-editor.styles';

const FormEditor = ({ label, error, ...props }) => {
  return (
    <FormEditorContainer>
      <GroupContainer>
        {label ? (
          <EditorLabelContainer>
            {label} {require ? <FormSpan>*</FormSpan> : null}
          </EditorLabelContainer>
        ) : null}
        <ReactQuillContainer theme='snow' {...props} />
        {error ? (
          <ErrorSpan className='error'>&#10005; {error}</ErrorSpan>
        ) : null}
      </GroupContainer>
    </FormEditorContainer>
  );
};

export default FormEditor;
