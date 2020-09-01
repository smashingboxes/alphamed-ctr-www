import React from 'react';
import { Grid } from '@material-ui/core';

import { aboutCTR, ctrFormat } from './clinical-trail-results.data';

import { PaperContainer } from './clinical-trail-results.styles';

import AboutBlock from '../../components/clinical-trail-results/about-block/about-block.component';
import CTRSidebar from '../../components/shared/ctr-sidebar/ctr-sidebar.container';

const ClinicalTrialResultsPage = () => {
  return (
    <Grid container>
      <Grid item xs={1} />
      <Grid item xs={5}>
        <PaperContainer elevation={0}>
          <AboutBlock
            header={aboutCTR.header}
            firstDetail={aboutCTR.firstDetail}
            secondDetail={aboutCTR.secondDetail}
            thirdDetail={aboutCTR.thirdDetail}
          />
        </PaperContainer>
        <PaperContainer elevation={0}>
          <AboutBlock
            header={ctrFormat.header}
            firstDetail={ctrFormat.firstDetail}
            secondDetail={ctrFormat.secondDetail}
            thirdDetail={ctrFormat.thirdDetail}
            fourthDetail={ctrFormat.fourthDetail}
            fifthDetail={ctrFormat.fifthDetail}
          />
        </PaperContainer>
      </Grid>
      <Grid item xs={5}>
        <CTRSidebar />
      </Grid>
      <Grid item xs={1} />
    </Grid>
  );
};

export default ClinicalTrialResultsPage;
