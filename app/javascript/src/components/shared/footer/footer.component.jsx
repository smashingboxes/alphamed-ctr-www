import React from 'react';
import { Grid } from '@material-ui/core';

import {
  FooterContainer,
  FooterText,
  FooterLinks,
  STOImageContainer,
  TOImageContainer
} from './footer.styles';

import STOLogo from '../../../assets/footer-sto-logo.png';
import TOLogo from '../../../assets/footer-to-logo.png';

const Footer = () => {
  return (
    <FooterContainer>
      <Grid container>
        <Grid item xs={2} />
        <Grid item container xs={5}>
          <Grid item xs={12}>
            <Grid item container xs={12}>
              <FooterText>
                COPYRIGHT © 2020{' '}
                <FooterLinks
                  href='https://journals.alphamedpress.com/'
                  target='_blank'
                >
                  ALPHAMED PRESS
                </FooterLinks>{' '}
                |{' '}
                <FooterLinks
                  href='https://theoncologist.onlinelibrary.wiley.com/hub/journal/1549490x/terms-of-use'
                  target='_blank'
                >
                  TERMS OF USE
                </FooterLinks>{' '}
                |{' '}
                <FooterLinks href='mailto:editorialoffice@ctr.theoncologist.com?subject=Please send us your overall feedback'>
                  PLEASE SEND US YOUR OVERALL FEEDBACK
                </FooterLinks>
              </FooterText>
            </Grid>
            <Grid item container xs={12} justify='flex-end'>
              <STOImageContainer
                id='sto-image-container'
                src={STOLogo}
                alt='STO Logo'
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <TOImageContainer
            id='to-image-container'
            src={TOLogo}
            alt='TO Logo'
          />
        </Grid>
        <Grid item xs={2} />
      </Grid>
    </FooterContainer>
  );
};

export default Footer;
