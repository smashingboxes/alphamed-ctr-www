import React from 'react';
import { Grid } from '@material-ui/core';

import { ButtonContainer, PaperContainer } from './second-sidebar.styles';

const SecondSidebar = ({
  user,
  history,
  isDashboardActive,
  isSubmissionActive,
  isFormsActive,
  isEmailTemplatesActive
}) => {
  const goToDashboardPage = () => {
    history.push('/submission/admin/results');
  };

  const goToSubmissionPage = () => {
    history.push('/submission/author/results');
  };

  const goToMyFormsPage = () => {
    history.push('/my-forms');
  };

  const goToEmailTemplatesPage = () => {
    history.push('/email-templates');
  };

  return (
    <Grid container>
      <Grid item xs={1} />
      <Grid item container direction='column' justify='center' xs={4}>
        <PaperContainer elevation={0}>
          {user && user.user_type === 1 ? (
            <ButtonContainer
              active={isDashboardActive}
              width='200px'
              onClick={goToDashboardPage}
            >
              Dashboard
            </ButtonContainer>
          ) : null}
          {user && user.user_type === 3 ? (
            <ButtonContainer
              active={isSubmissionActive}
              width='200px'
              onClick={goToSubmissionPage}
            >
              My Submissions
            </ButtonContainer>
          ) : null}
          {user && user.user_type === 3 ? (
            <ButtonContainer
              active={isFormsActive}
              width='200px'
              onClick={goToMyFormsPage}
            >
              My Forms
            </ButtonContainer>
          ) : null}
          <ButtonContainer
            active={isEmailTemplatesActive}
            width='200px'
            onClick={goToEmailTemplatesPage}
          >
            Email Templates
          </ButtonContainer>
        </PaperContainer>
      </Grid>
    </Grid>
  );
};

export default SecondSidebar;
