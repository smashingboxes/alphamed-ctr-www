import React, { Fragment } from 'react';
import { Grid, Typography } from '@material-ui/core';

const CodesAvailable = ({ emailType, ctrDetails, resetPasswordDetails }) => {
  const {
    title,
    number,
    link,
    coAuthorFullName,
    coAuthorLastName,
    authorFullName,
    authorLastName,
    decision
  } = ctrDetails;
  const {
    forgotPasswordLink,
    userLastName,
    userFullName
  } = resetPasswordDetails;

  const renderCoAuthorFormRequest = () => (
    <Fragment>
      <Typography gutterBottom>{title} -- CTR Title</Typography>
      <Typography gutterBottom>{number} -- CTR Number</Typography>
      <Typography gutterBottom>
        {link} -- Link to Copyright Form Page
      </Typography>
      <Typography gutterBottom>
        {coAuthorFullName} -- Co-Author's Full Name
      </Typography>
      <Typography gutterBottom>
        {coAuthorLastName} -- Co-Author/Recipient's Last Name
      </Typography>
    </Fragment>
  );

  const renderAuthorFormRequest = () => (
    <Fragment>
      <Typography gutterBottom>{title} -- CTR Title</Typography>
      <Typography gutterBottom>{number} -- CTR Number</Typography>
      <Typography gutterBottom>
        {link} -- Link to Copyright Form Page
      </Typography>
      <Typography gutterBottom>
        {authorFullName} -- Corresponding Author's Full Name
      </Typography>
      <Typography gutterBottom>
        {authorLastName} -- Corresponding Author/Recipient's Last Name
      </Typography>
    </Fragment>
  );

  const renderResetPassword = () => (
    <Fragment>
      <Typography gutterBottom>
        {forgotPasswordLink} -- Link to Forgot Password Page
      </Typography>
      <Typography gutterBottom>
        {userLastName} -- Author/Recipient's Last Name
      </Typography>
      <Typography gutterBottom>
        {userFullName} -- Author/Recipient's Full Name
      </Typography>
    </Fragment>
  );

  const renderNotifyAdminForDecision = () => (
    <Fragment>
      <Typography gutterBottom>{forgotPasswordLink} -- CTR Title</Typography>
      <Typography gutterBottom>{userLastName} -- CTR Number</Typography>
      <Typography gutterBottom>{userFullName} -- CTR Edit Page Link</Typography>
      <Typography gutterBottom>{decision} -- CTR Edit Page Link</Typography>
    </Fragment>
  );

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography></Typography>
      </Grid>
    </Grid>
  );
};

export default CodesAvailable;
