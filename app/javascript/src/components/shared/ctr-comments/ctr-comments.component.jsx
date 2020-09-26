import React from 'react';
import { Paper, Grid } from '@material-ui/core';

import { CTRCommentsContainer, CTRCommentLabelContainer } from './ctr-comments.styles';
import PrimaryButton from '../primary-button/primary-button.component';

const YourInformationComments = () => {
  return (
    <CTRCommentsContainer>
      <CTRCommentLabelContainer>
        Author Information Comments
      </CTRCommentLabelContainer>
      <div>
        <PrimaryButton>Add Comment</PrimaryButton>
      </div>
    </CTRCommentsContainer>
  )
};

export default YourInformationComments;
