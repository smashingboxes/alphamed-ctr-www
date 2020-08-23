import React, { useState } from 'react';
import { Grid, FormControlLabel, Checkbox, Button } from '@material-ui/core';

import {
  DisclosureFormContainer,
  HeaderContainer,
  SubHeaderContainer,
  DetailsContainer,
  AuthorContainer,
  AuthorItem,
  NoticeContainer,
  CheckboxContainer,
  TextFieldContainer
} from './disclosure-form.styles';

import { disclosureFormSentences } from './disclosure-form.data';

const DisclosureForm = ({ open }) => {
  const [check, setCheck] = useState({
    checkedA: false,
    checkedB: false
  });

  const work = 'Sample Work';
  const authors = ['Author 1', 'Author 2'];
  const name = 'Ian Hero L. Lavapiez';
  const nowDate = new Date();

  const {
    notice,
    subNotice,
    assignmentConsideration,
    licenseBack,
    warranties,
    miscellaneous,
    inWitness,
    print
  } = disclosureFormSentences;

  const handleChange = (event) => {
    setCheck({ ...check, [event.target.name]: event.target.checked });
  };

  return (
    <Grid container>
      <Grid item xs={1} />
      <Grid item xs={10}>
        <Grid item container justify='center' alignItems='center'>
          <DisclosureFormContainer>
            <HeaderContainer>Copyright Assignment</HeaderContainer>
            <SubHeaderContainer>Title of Work</SubHeaderContainer>
            <DetailsContainer>{work ? work : ''}</DetailsContainer>
            <SubHeaderContainer>Lead Author(s)</SubHeaderContainer>
            <AuthorContainer>
              {authors
                ? authors.map((name) => <AuthorItem>{name}</AuthorItem>)
                : ''}
            </AuthorContainer>
            <NoticeContainer>{notice}</NoticeContainer>
            <DetailsContainer>{subNotice}</DetailsContainer>
            <SubHeaderContainer>Authorship</SubHeaderContainer>
            <CheckboxContainer>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={check.checkedA}
                    onChange={handleChange}
                    name='checkedA'
                    color='secondary'
                  />
                }
                label='I am in complete agreement with the content of the Work.'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={check.checkedB}
                    onChange={handleChange}
                    name='checkedB'
                    color='secondary'
                  />
                }
                label='I am prepared to abide by the policies of The Oncologist. '
              />
            </CheckboxContainer>
            <SubHeaderContainer>Assignment Consideration</SubHeaderContainer>
            <DetailsContainer>{assignmentConsideration}</DetailsContainer>
            <SubHeaderContainer>License Back</SubHeaderContainer>
            <DetailsContainer>{licenseBack}</DetailsContainer>
            <SubHeaderContainer>
              Assignor's Representations and Warranties
            </SubHeaderContainer>
            <DetailsContainer>{warranties}</DetailsContainer>
            <SubHeaderContainer>Miscellaneous</SubHeaderContainer>
            <DetailsContainer>{miscellaneous}</DetailsContainer>
            <DetailsContainer>{inWitness}</DetailsContainer>
            <DetailsContainer>{name}</DetailsContainer>
            <DetailsContainer>
              <TextFieldContainer id='outlined-basic' variant='outlined' />
            </DetailsContainer>
            <DetailsContainer>
              Signature Date:{' '}
              {nowDate.getMonth() +
                '/' +
                nowDate.getDate() +
                '/' +
                nowDate.getFullYear()}
            </DetailsContainer>
            <DetailsContainer>
              <Button color='primary' variant='contained'>
                I Agree
              </Button>
            </DetailsContainer>
            <NoticeContainer>{print}</NoticeContainer>
          </DisclosureFormContainer>
        </Grid>
      </Grid>
      <Grid item xs={1} />
    </Grid>
  );
};

export default DisclosureForm;
