import React from 'react';
import validator from 'validator';
import { Grid, Paper } from '@material-ui/core';

import {
  AuthorSummaryAbstractContainer,
  AuthorSummaryAbstractFormContainer,
  FormContainer,
  ButtonContainer,
  FormEditorLabel,
  GridContainer,
  RequiredSpan
} from './author-summary-abstract-form.styles';

import CTRComments from '../../shared/ctr-comments/ctr-comments.container';
import FormEditor from '../../shared/form-editor/form-editor.component';
import SecondaryButton from '../../shared/secondary-button/secondary-button.component';
import ErrorButton from '../../shared/error-button/error-button.component';

class AuthorSummaryAbstractForm extends React.Component {
  state = {
    id: '',
    background: '',
    methods: '',
    results: '',
    conclusions: '',
    discussion: '',
    lessonsLearned: '',
    resultCount: 0,
    backgroundError: '',
    methodsError: '',
    resultsError: '',
    conclusionsError: '',
    discussionError: '',
    lessonsLearnedError: ''
  };

  componentDidMount() {
    const { ctrResult } = this.props;

    if (ctrResult === null) return;
    if (ctrResult.length === 0) return;

    const {
      abstract_background,
      abstract_methods,
      abstract_results,
      abstract_conclusions,
      abstract_discussion,
      abstract_lessons_learned,
      result_count,
      _id
    } = ctrResult[0];

    return this.setState({
      id: _id.$oid,
      background: abstract_background === null ? '' : abstract_background,
      methods: abstract_methods === null ? '' : abstract_methods,
      results: abstract_results === null ? '' : abstract_results,
      conclusions: abstract_conclusions === null ? '' : abstract_conclusions,
      discussion: abstract_discussion === null ? '' : abstract_discussion,
      lessonsLearned:
        abstract_lessons_learned === null ? '' : abstract_lessons_learned,
      resultCount: result_count === null || result_count <= 3 ? 4 : result_count
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      background,
      methods,
      results,
      conclusions,
      discussion,
      lessonsLearned,
      resultCount,
      id
    } = this.state;

    const { createCTRAuthorSummaryStart, user } = this.props;

    if (!validator.isEmpty(background)) {
      if (background.match(/(\w+)/g).length > 200) {
        this.setState({
          backgroundError: 'Must be 200 words at most.'
        });
        return;
      }
    }

    if (!validator.isEmpty(methods)) {
      if (methods.match(/(\w+)/g).length > 200) {
        this.setState({
          methodsError: 'Must be 200 words at most.'
        });
        return;
      }
    }

    if (!validator.isEmpty(results)) {
      if (results.match(/(\w+)/g).length > 200) {
        this.setState({
          resultsError: 'Must be 200 words at most.'
        });
        return;
      }
    }

    if (!validator.isEmpty(conclusions)) {
      if (conclusions.match(/(\w+)/g).length > 200) {
        this.setState({
          conclusionsError: 'Must be 200 words at most.'
        });
        return;
      }
    }

    if (validator.isEmpty(lessonsLearned)) {
      this.setState({
        lessonsLearnedError: 'X This field is mandatory.'
      });
      return;
    } else {
      if (lessonsLearned.match(/(\w+)/g).length > 75) {
        this.setState({
          lessonsLearnedError: 'Must be 75 words at most.'
        });
        return;
      }
    }

    return createCTRAuthorSummaryStart({
      authToken: user.authentication_token,
      background,
      methods,
      results,
      conclusions,
      discussion,
      lessonsLearned,
      resultCount,
      id
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      backgroundError: '',
      methodsError: '',
      resultsError: '',
      conclusionsError: '',
      discussionError: '',
      lessonsLearnedError: ''
    });

    this.setState({ [name]: value });
  };

  handlePrevious = () =>
    (window.location.href = `/submission/results/co-author-information/${this.state.id}`);

  render() {
    const {
      id,
      background,
      methods,
      results,
      conclusions,
      discussion,
      lessonsLearned,
      backgroundError,
      methodsError,
      resultsError,
      conclusionsError,
      discussionError,
      lessonsLearnedError
    } = this.state;

    return (
      <Paper elevation={0}>
        <AuthorSummaryAbstractContainer>
          Author Summary: Abstract and Brief Discussion
        </AuthorSummaryAbstractContainer>
        <form onSubmit={this.handleSubmit}>
          <AuthorSummaryAbstractFormContainer>
            <FormContainer>
              <GridContainer container alignItems='start' spacing={1}>
                <Grid item xs={3}>
                  <FormEditorLabel>Background</FormEditorLabel>
                </Grid>
                <Grid container item xs={9}>
                  <FormEditor
                    require={false}
                    data={background}
                    setData={(value) =>
                      this.setState({ background: value, backgroundError: '' })
                    }
                    error={backgroundError}
                  />
                </Grid>
              </GridContainer>
            </FormContainer>

            <FormContainer>
              <GridContainer container alignItems='start' spacing={1}>
                <Grid item xs={3}>
                  <FormEditorLabel>Methods</FormEditorLabel>
                </Grid>
                <Grid container item xs={9}>
                  <FormEditor
                    require={false}
                    data={methods}
                    setData={(value) =>
                      this.setState({ methods: value, methodsError: '' })
                    }
                    error={methodsError}
                  />
                </Grid>
              </GridContainer>
            </FormContainer>

            <FormContainer>
              <GridContainer container alignItems='start' spacing={1}>
                <Grid item xs={3}>
                  <FormEditorLabel>Results</FormEditorLabel>
                </Grid>
                <Grid container item xs={9}>
                  <FormEditor
                    require={false}
                    data={results}
                    setData={(value) =>
                      this.setState({ results: value, resultsError: '' })
                    }
                    error={resultsError}
                  />
                </Grid>
              </GridContainer>
            </FormContainer>

            <FormContainer>
              <GridContainer container alignItems='start' spacing={1}>
                <Grid item xs={3}>
                  <FormEditorLabel>Conclusions</FormEditorLabel>
                </Grid>
                <Grid container item xs={9}>
                  <FormEditor
                    require={false}
                    data={conclusions}
                    setData={(value) =>
                      this.setState({
                        conclusions: value,
                        conclusionsError: ''
                      })
                    }
                    error={conclusionsError}
                  />
                </Grid>
              </GridContainer>
            </FormContainer>

            <FormContainer>
              <GridContainer container alignItems='start' spacing={1}>
                <Grid item xs={3}>
                  <FormEditorLabel>Discussion</FormEditorLabel>
                </Grid>
                <Grid container item xs={9}>
                  <FormEditor
                    require={false}
                    data={discussion}
                    setData={(value) =>
                      this.setState({ discussion: value, discussionError: '' })
                    }
                    error={discussionError}
                  />
                </Grid>
              </GridContainer>
            </FormContainer>

            <FormContainer>
              <GridContainer container alignItems='start' spacing={1}>
                <Grid item xs={3}>
                  <FormEditorLabel>
                    Lessons Learned <RequiredSpan>*</RequiredSpan>
                  </FormEditorLabel>
                </Grid>
                <Grid container item xs={9} direction='column'>
                  <FormEditor
                    require={true}
                    data={lessonsLearned}
                    setData={(value) =>
                      this.setState({
                        lessonsLearned: value,
                        lessonsLearnedError: ''
                      })
                    }
                  />
                  <RequiredSpan>
                    {lessonsLearnedError && lessonsLearnedError}
                  </RequiredSpan>
                </Grid>
              </GridContainer>
            </FormContainer>
          </AuthorSummaryAbstractFormContainer>
          <CTRComments
            name='Abstract Comments'
            resultId={id}
            step='author_summary'
          />
          <Grid container justify='center' alignItems='center'>
            <ButtonContainer>
              <ErrorButton type='button' onClick={this.handlePrevious}>
                Previous
              </ErrorButton>
            </ButtonContainer>
            <ButtonContainer>
              <SecondaryButton type='submit'>Save</SecondaryButton>
            </ButtonContainer>
          </Grid>
        </form>
      </Paper>
    );
  }
}

export default AuthorSummaryAbstractForm;
