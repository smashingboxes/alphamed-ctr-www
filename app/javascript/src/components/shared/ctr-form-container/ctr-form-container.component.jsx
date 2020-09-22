import React from 'react';
import 'react-quill/dist/quill.snow.css';

import {
  FormEditorContainer,
  EditorLabelContainer,
  GroupContainer,
  ErrorSpan,
  FormSpan,
  GenericContainer
} from './ctr-form-container.styles';

const CTRFormContainer = ({ label, require = false, children, error}) => {
  return (
    <FormEditorContainer>
      <GroupContainer>
        {label ? (
          <EditorLabelContainer>
            {label} {require ? <FormSpan>*</FormSpan> : null}
          </EditorLabelContainer>
        ) : null}
        <GenericContainer>
          {children}
        </GenericContainer>
        {error ? (
          <ErrorSpan className='error'>&#10005; {error}</ErrorSpan>
        ) : null}
      </GroupContainer>
    </FormEditorContainer>
  );
};

export default CTRFormContainer;
