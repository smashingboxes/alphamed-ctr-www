import React, { useState, useEffect } from 'react';
import { Paper, Grid } from '@material-ui/core';

import { } from './ctr-custom-field-form.styles';

import "./style.css";
import CTRCustomTable from '../ctr-custom-table/ctr-custom-table.component';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CloseIcon from '@material-ui/icons/Close';

import SecondaryButton from '../secondary-button/secondary-button.component';

const CTRCustomFieldForm = ({ heading, children, headers = [] }) => {

  const [fields, setFields] = useState([]);

  useEffect(() => {
    addNewField();
    addNewField();
  }, []);

  const addNewField = () => {
    let inputs = [];
    headers.map((header) => {
      inputs.push({ [header]: "" })
    })
    let newField = {
      inputs: inputs
    }
    setFields([...fields, newField]);
  }

  return (
    <div style = {{marginBottom: 30}}>
      <CTRCustomTable
        heading = {heading}>
        <div style = {{ padding: 20 }}>
          <Grid container>
            <Grid container spacing={0}>
              {headers.map((value) => (
                <Grid className = "table-header-items" key={value} item xs = {5}>
                  <div>{value}</div>
                </Grid>
              ))}
              <Grid className = "table-header-items" item xs>
                  <div></div>
                </Grid>
            </Grid>
          </Grid>
          <hr className = "field-spacer" />
          <Grid container>

            {
              fields && fields.map((field, fieldKey) => {
                return (
                  <Grid key = {fieldKey} container spacing={0} >

                    {
                      field.inputs.map((input, inputKey) => {
                        return (
                          <Grid key={inputKey} item xs = {5}>
                            <div>
                              <input className = "field-item" />
                            </div>
                          </Grid>
                        )
                      })
                    }

                    <Grid key = {fieldKey} item xs>
                      <div style = {{ padding: "5px" }}>
                        <CloseIcon style = {{ color: "#FF5858", cursor: "pointer" }}/>
                      </div>
                    </Grid>
                  </Grid>
                )
              })
            }

          </Grid>

          <hr className = "field-spacer margin-top" />

          <Grid style = {{ width: "35%" }} container alignItems ="flex-start" justify = "flex-start">
            <Grid item xs = {1.5}>
                <AddCircleIcon style = {{ color: "#6EDD47" }} />
            </Grid>
            <Grid item xs>
                <span>Add another row</span>
            </Grid>
          </Grid>

          <div class = "field-save-container">
            <SecondaryButton type='submit'>Save</SecondaryButton>
          </div>
        </div>
      </CTRCustomTable>
    </div>
  );
};

export default CTRCustomFieldForm;
