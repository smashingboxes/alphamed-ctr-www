import styled from 'styled-components';
import ReactQuill from 'react-quill';

export const ErrorSpan = styled.span`
  display: block;
  font-size: 12px;
  color: #ff5858;
  text-align: right;
  margin-top: 5px;
`;

export const GenericContainer = styled.div`
  display: inline-block;
  width: 500px;
`;

export const FormEditorContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const GroupContainer = styled.div`
  display: block;
  margin-bottom: 45px;
`;

export const EditorLabelContainer = styled.div`
  display: inline-block;
  position: absolute;

  color: #58285f;
  font-size: 16px;
  font-weight: normal;
  margin-left: -200px;
  padding-right: 10px;
`;

export const FormSpan = styled.span`
  color: #ff5858;
  font-size: 12px;
`;
