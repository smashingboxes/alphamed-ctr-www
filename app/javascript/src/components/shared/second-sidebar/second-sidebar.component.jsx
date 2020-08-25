import React from 'react';
import { Grid } from '@material-ui/core';

import { ButtonContainer, PaperContainer } from './second-sidebar.styles';

const SecondSidebar = ({ user, history }) => {
  const goToDashboardPage = () => {
    history.push('/submission/admin/results');
  };

  const goToSubmissionPage = () => {
    history.push('/submission/se/results');
  };

  const goToMyFormsPage = () => {
    history.push('/my-forms');
  };

  return (
    <Grid container>
      <Grid item xs={1} />
      <Grid item container direction='column' justify='center' xs={4}>
        <PaperContainer elevation={0}>
          {user && user.user_type === 'admin' ? (
            <ButtonContainer width='200px' onClick={goToDashboardPage}>
              Dashboard
            </ButtonContainer>
          ) : null}
          {user && user.user_type === 'se' ? (
            <ButtonContainer width='200px' onClick={goToSubmissionPage}>
              My Submissions
            </ButtonContainer>
          ) : null}
          {user && user.user_type === 'author' ? (
            <ButtonContainer width='200px' onClick={goToMyFormsPage}>
              My Forms
            </ButtonContainer>
          ) : null}
          <ButtonContainer width='200px'>Email Templates</ButtonContainer>
        </PaperContainer>
      </Grid>
    </Grid>
  );
};

export default SecondSidebar;
