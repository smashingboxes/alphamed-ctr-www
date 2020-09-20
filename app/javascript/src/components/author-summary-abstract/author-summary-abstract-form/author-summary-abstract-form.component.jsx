import React from 'react';
import validator from 'validator';
import { Grid, Paper } from '@material-ui/core';

import {
  AuthorSummaryAbstractContainer,
  AuthorSummaryAbstractFormContainer,
  FormContainer,
  ButtonContainer
} from './author-summary-abstract-form.styles';

import CTRComments from '../../shared/ctr-comments/ctr-comments.component';
import FormEditor from '../../shared/form-editor/form-editor.component';
import SecondaryButton from '../../shared/secondary-button/secondary-button.component';
import ErrorButton from '../../shared/error-button /error-button.component';

class AuthorSummaryAbstractForm extends React.Component {
  state = {
    id: '',
    background: '',
    methods: '',
    results: '',
    conclusions: '',
    discussion: '',
    lessonsLearned: '',
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
        abstract_lessons_learned === null ? '' : abstract_lessons_learned
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
      id
    } = this.state;

    const { createCTRAuthorSummaryStart, user } = this.props;

    if (background.split(' ').length > 200) {
      this.setState({
        backgroundError: 'Must be 200 words at most.'
      });
      return;
    }

    if (methods.split(' ').length > 200) {
      this.setState({
        methodsError: 'Must be 200 words at most.'
      });
      return;
    }

    if (results.split(' ').length > 200) {
      this.setState({
        resultsError: 'Must be 200 words at most.'
      });
      return;
    }

    if (conclusions.split(' ').length > 200) {
      this.setState({
        conclusionsError: 'Must be 200 words at most.'
      });
      return;
    }

    if (validator.isEmpty(lessonsLearned)) {
      this.setState({
        keywordsError: 'This field is mandatory.'
      });
      return;
    } else {
      if (lessonsLearned.split(' ').length > 75) {
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
              <FormEditor
                require={false}
                label='Background'
                data={background}
                setData={(value) =>
                  this.setState({ background: value, backgroundError: '' })
                }
                error={backgroundError}
              />
            </FormContainer>
            <FormContainer>
              <FormEditor
                require={false}
                label='Methods'
                data={methods}
                setData={(value) =>
                  this.setState({ methods: value, methodsError: '' })
                }
                error={methodsError}
              />
            </FormContainer>
            <FormContainer>
              <FormEditor
                require={false}
                label='Results'
                data={results}
                setData={(value) =>
                  this.setState({ results: value, resultsError: '' })
                }
                error={resultsError}
              />
            </FormContainer>
            <FormContainer>
              <FormEditor
                require={false}
                label='Conclusions'
                data={conclusions}
                setData={(value) =>
                  this.setState({ conclusions: value, conclusionsError: '' })
                }
                error={conclusionsError}
              />
            </FormContainer>
            <FormContainer>
              <FormEditor
                require={false}
                label='Discussion'
                data={discussion}
                setData={(value) =>
                  this.setState({ discussion: value, discussionError: '' })
                }
                error={discussionError}
              />
            </FormContainer>
            <FormContainer>
              <FormEditor
                require={true}
                label='Lessons Learned'
                data={lessonsLearned}
                setData={(value) =>
                  this.setState({
                    lessonsLearned: value,
                    lessonsLearnedError: ''
                  })
                }
                error={lessonsLearnedError}
              />
            </FormContainer>
          </AuthorSummaryAbstractFormContainer>
          <CTRComments />
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