import React, { useState } from 'react';
import validator from 'validator';

import {
  CTRCommentsContainer,
  CommentInputContainer,
  TextAreaContainer,
  SaveButtonContainer,
  SaveButton
} from './ctr-comments.styles';
import { GenericFormHeaderContainer } from '../styles/shared-styles';

import { swalMessage } from '../swal-message/swal-message';

import PrimaryButton from '../primary-button/primary-button.component';
import CTRCommentsTable from '../ctr-comments-table/ctr-comments-table.container';

const CTRComments = ({
  name,
  resultId,
  authToken,
  createCTRCommentStart,
  step
}) => {
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState('');

  const addComment = () => {
    if (validator.isEmpty(comment)) {
      return swalMessage(
        'Your comment box is empty, please type your comment before submitting.',
        'error'
      );
    }

    setComment('');
    setShowComment(false);

    return createCTRCommentStart({
      authToken,
      comment,
      resultId,
      step
    });
  };

  return (
    <>
      <CTRCommentsContainer>
        <GenericFormHeaderContainer>{name}</GenericFormHeaderContainer>
        <div>
          <PrimaryButton
            type='button'
            onClick={() => setShowComment(!showComment)}
          >
            Add Comment
          </PrimaryButton>
        </div>
      </CTRCommentsContainer>
      {showComment ? (
        <CommentInputContainer>
          <TextAreaContainer
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
          <SaveButtonContainer>
            <SaveButton type='button' onClick={addComment}>
              Save
            </SaveButton>
          </SaveButtonContainer>
        </CommentInputContainer>
      ) : null}
      <CTRCommentsTable />
    </>
  );
};

export default CTRComments;
