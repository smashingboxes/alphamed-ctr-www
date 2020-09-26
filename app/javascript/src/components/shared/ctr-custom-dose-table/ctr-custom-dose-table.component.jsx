import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

import {} from './ctr-custom-dose-table.styles';

import './style.css';
import CTRCustomTable from '../ctr-custom-table/ctr-custom-table.component';

const spacerRow = {
  type: 2,
  input: { value: '' }
};

const normalRow = {
  type: 1,
  inputs: [{ value: '' }, { value: '' }, { value: '' }, { value: '' }]
};

const CTRCustomDoseTable = ({
  heading,
  children,
  headers = [],
  onAddRow = (tabRows) => {},
  onRemoveRow = (tabRows) => {},
  onRowUpdate = (tabRows) => {}
}) => {
  const [tableRows, setTableRows] = useState([normalRow]);
  const [currentSelectedRow, setCurrentSelectedRow] = useState(null);

  const handleInputOnchange = (value, type, rowIndex, inputIndex) => {
    if (type === 1) {
      console.log(tableRows[rowIndex]);
      tableRows[rowIndex].inputs[inputIndex].value = value;
      setTableRows([...tableRows]);

      // check if a new row can be added
      if (rowIndex + 1 === tableRows.length) {
        addNormalRow();
      }
    } else {
      tableRows[rowIndex].input.value = value;
      setTableRows([...tableRows]);
    }
    onRowUpdate(tableRows);
  };

  const handleInputOnTap = (rowIndex) => {
    setCurrentSelectedRow(rowIndex);
  };

  const removeRow = () => {
    tableRows.splice(currentSelectedRow, 1);
    setTableRows([...tableRows]);
    onRemoveRow(tableRows);
  };

  const addSpacerRow = () => {
    setTableRows([...tableRows, spacerRow]);
    onAddRow(tableRows);
  };

  const addNormalRow = () => {
    setTableRows([...tableRows, normalRow]);
    onAddRow(tableRows);
  };

  return (
    <div style={{ marginBottom: 30 }}>
      <CTRCustomTable heading={heading}>
        <div className='dose-table-controller'>
          <button onClick={() => addSpacerRow()}>Add Spacer Row</button>
          <button onClick={() => removeRow()}>Delete Row</button>
          <button>Add Columns</button>
          <button>Copy Drug Rows</button>
          <button>Copy Drug Columns</button>
        </div>
        <Grid container>
          <Grid container spacing={0}>
            {headers.map((value) => (
              <Grid
                className='dose-table-header-item-container'
                key={value}
                item
                xs
              >
                <div className='dose-table-header-item'>{value}</div>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid container>
          <Grid container spacing={0} className='dose-table-item-container'>
            {tableRows &&
              tableRows.map((row, rowIndex) => {
                if (row.type === 1) {
                  return row.inputs.map((rowInput, inputIndex) => {
                    return (
                      <Grid key={inputIndex} item xs={3}>
                        <div>
                          <input
                            onClick={(e) => handleInputOnTap(rowIndex)}
                            onChange={(e) => {
                              handleInputOnchange(
                                e.target.value,
                                row.type,
                                rowIndex,
                                inputIndex
                              );
                            }}
                            value={rowInput.value}
                            className='dose-table-item'
                          />
                        </div>
                      </Grid>
                    );
                  });
                } else {
                  return (
                    <Grid key={rowIndex} item xs={12}>
                      <div>
                        <input
                          onClick={(e) => handleInputOnTap(rowIndex)}
                          onChange={(e) => {
                            handleInputOnchange(
                              e.target.value,
                              row.type,
                              rowIndex,
                              null
                            );
                          }}
                          className='dose-table-item'
                        />
                      </div>
                    </Grid>
                  );
                }
              })}
          </Grid>
        </Grid>

        {children}

        <div>
          <button className='dose-table-save-button'>Save</button>
        </div>
      </CTRCustomTable>
    </div>
  );
};

export default CTRCustomDoseTable;
