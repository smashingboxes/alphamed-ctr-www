import React from 'react';
import validator from 'validator';
import { Grid, Paper } from '@material-ui/core';

import {
  EmailContainer,
  EmailFormContainer,
  FormContainer,
  ButtonContainer
} from './email-form.styles';

import { emailTypeData } from './email-form.data';

import FormEditor from '../../shared/form-editor/form-editor.component';
import CTRInput from '../../shared/ctr-input/ctr-input.component';
import CTRSelect from '../../shared/ctr-select/ctr-select.component';
import PrimaryButton from '../../shared/primary-button/primary-button.component';

class EmailForm extends React.Component {
  state = {
    emailType: 'Co-Author Form Request',
    subject: '',
    content: '',
    emailTypeError: '',
    subjectError: '',
    contentError: ''
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { emailType, subject, content } = this.state;

    if (validator.isEmpty(emailType)) {
      this.setState({
        emailTypeError: 'This field is mandatory.'
      });
      return;
    }

    if (validator.isEmpty(subject)) {
      this.setState({
        subjectError: 'This field is mandatory.'
      });
      return;
    }

    if (validator.isEmpty(content)) {
      this.setState({
        contentError: 'This field is mandatory.'
      });
      return;
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      emailTypeError: '',
      subjectError: '',
      contentError: ''
    });

    this.setState({ [name]: value });
  };

  render() {
    const {
      emailType,
      subject,
      content,
      subjectError,
      contentError
    } = this.state;

    return (
      <Paper elevation={0}>
        <EmailContainer>New Email Template</EmailContainer>
        <form onSubmit={this.handleSubmit}>
          <EmailFormContainer>
            <FormContainer>
              <CTRSelect
                label='Type'
                require={true}
                onChange={(event) =>
                  this.setState({ emailType: event.target.value })
                }
                value={emailType}
              >
                {emailTypeData.map((type) => {
                  if (
                    type === 'Invitation' ||
                    type === 'Notification' ||
                    type === 'Decision'
                  ) {
                    return (
                      <option key={type} value={type} disabled>
                        -- {type} --
                      </option>
                    );
                  }

                  return (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  );
                })}
              </CTRSelect>
            </FormContainer>
            <FormContainer>
              <CTRInput
                type='text'
                name='subject'
                require={true}
                value={subject}
                onChange={this.handleChange}
                label='Subject'
                error={subjectError}
              />
            </FormContainer>
            <FormContainer>
              <FormEditor
                label='Content'
                error={contentError}
                value={content}
                onChange={(value) =>
                  this.setState({ content: value, contentError: '' })
                }
              />
            </FormContainer>
          </EmailFormContainer>
          <Grid container justify='flex-end' alignItems='flex-end'>
            <ButtonContainer>
              <PrimaryButton type='submit'>Save</PrimaryButton>
            </ButtonContainer>
          </Grid>
        </form>
      </Paper>
    );
  }
}

export default EmailForm;
