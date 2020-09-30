import React, { useState, useEffect } from 'react';
import { Paper, Grid } from '@material-ui/core';

import {} from './ctr-custom-field-form.styles';

import './style.css';
import CTRCustomTable from '../ctr-custom-table/ctr-custom-table.component';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CloseIcon from '@material-ui/icons/Close';

import SecondaryButton from '../secondary-button/secondary-button.component';

const CTRCustomFieldForm = ({
  heading,
  formFields = [],
  headers = [],
  addNewField,
  onFieldChanges,
  canSave = true
}) => {
  const [fields, setFields] = useState([]);

  useEffect(() => {
    // if (formFields) {
    //   setFields(formFields);
    // }
  }, [formFields]);

  const handleOnRemoveField = (fieldToRemove) => {
    const updatedFields = fields.filter(
      (field, i) => fieldToRemove.id !== field.id
    );
    onFieldChanges(updatedFields);
  };

  const handleOnFieldChanges = (input, key, value) => {
    const updatedFields = fields.map((field, i) => {
      if (field.id === input.id) {
        field.inputs[key][headers[key]] = value;
      }
      return field;
    });
    onFieldChanges(updatedFields);
  };

  return (
    <div style={{ marginBottom: 30 }}>
      <CTRCustomTable heading={heading}>
        <div style={{ padding: 20 }}>
          <Grid container>
            <Grid container spacing={0}>
              {headers.map((value) => (
                <Grid className='table-header-items' key={value} item xs>
                  <div>{value}</div>
                </Grid>
              ))}
              <Grid className='table-header-items' item xs>
                <div></div>
              </Grid>
            </Grid>
          </Grid>
          <hr className='field-spacer' />
          <Grid container>
            {fields &&
              fields.map((field, fieldKey) => {
                return (
                  <Grid
                    key={field.id}
                    container
                    spacing={0}
                    style={{ marginBottom: 10 }}
                  >
                    {field.inputs.map((input, inputKey) => {
                      return (
                        <Grid key={`${field.id}${inputKey}`} item xs={5}>
                          <div>
                            {
                              input.type === 1 ?
                                  (<input
                                    value={input[headers[inputKey]]}
                                    onChange={(e) =>
                                      handleOnFieldChanges(
                                        field,
                                        inputKey,
                                        e.target.value
                                      )
                                    }
                                    className='field-item'
                                  />)
                                : 
                              (<select 
                                value={input[headers[inputKey]]}
                                onChange={(e) =>
                                handleOnFieldChanges(
                                  field,
                                  inputKey,
                                  e.target.value
                                )}
                                className='field-item'
                              >
                                {input.options.map((title, key) => (
                                  <option key={key}>{title}</option>
                                ))}
                              </select>)
                            }
                            
                          </div>
                        </Grid>
                      );
                    })}

                    <Grid key={field.id} item xs>
                      <div
                        style={{ padding: '5px' }}
                        onClick={() => handleOnRemoveField(field)}
                      >
                        <CloseIcon
                          style={{ color: '#FF5858', cursor: 'pointer' }}
                        />
                      </div>
                    </Grid>
                  </Grid>
                );
              })}
          </Grid>

          <hr className='field-spacer margin-top' />

          <Grid
            style={{ width: '35%' }}
            container
            alignItems='flex-start'
            justify='flex-start'
          >
            <Grid item xs={1}>
              <AddCircleIcon style={{ color: '#6EDD47' }} />
            </Grid>
            <Grid item xs onClick={() => addNewField()}>
              <span>Add another row</span>
            </Grid>
          </Grid>

          <div class='field-save-container'>
            { canSave ? <SecondaryButton type='submit'>Save</SecondaryButton> : null }
          </div>
        </div>
      </CTRCustomTable>
    </div>
  );
};

export default CTRCustomFieldForm;
