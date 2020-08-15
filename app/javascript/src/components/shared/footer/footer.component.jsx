import React from 'react';
import { Grid } from '@material-ui/core';

import {
  FooterContainer,
  FooterText,
  STOImageContainer,
  TOImageContainer
} from './footer.styles';

import STOLogo from '../../../assets/footer-sto-logo.png';
import TOLogo from '../../../assets/footer-to-logo.png';

const Footer = () => {
  return (
    <FooterContainer container>
      <Grid item xs={2} />
      <Grid item container xs={5}>
        <Grid item xs={12}>
          <FooterText>
            COPYRIGHT © 2020 ALPHAMED PRESS | TERMS OF USE | PLEASE SEND US YOUR
            OVERALL FEEDBACK
          </FooterText>
          <STOImageContainer src={STOLogo} alt='STO Logo' />
        </Grid>
      </Grid>
      <Grid item xs={3}>
        <TOImageContainer src={TOLogo} alt='TO Logo' />
      </Grid>
      <Grid item xs={2} />
    </FooterContainer>
  );
};

export default Footer;
