import React, { useState, useEffect } from 'react';
import { Grid, Divider } from '@material-ui/core';

import {
  CommentTableContainer,
  HeaderContainer,
  CommentContainer
} from './ctr-comments-table.styles';

const CTRCommentsTable = ({ comments }) => {
  const [commentData, setCommentData] = useState([]);

  useEffect(() => {
    if (comments.length > 0) {
      setCommentData(comments.reverse());
    }
  }, [comments, commentData]);

  return (
    <Grid container>
      {commentData &&
        commentData.map((data) => (
          <CommentTableContainer key={data.id}>
            <HeaderContainer item xs={12} container>
              <Grid item xs={6}>
                {data.user.name}
              </Grid>
              <Grid item xs={6}>
                {data.created_at_string}
              </Grid>
            </HeaderContainer>
            <CommentContainer item xs={12}>
              {data.content}
            </CommentContainer>
            <Divider />
          </CommentTableContainer>
        ))}
    </Grid>
  );
};

export default CTRCommentsTable;
