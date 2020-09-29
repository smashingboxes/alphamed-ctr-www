import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import uuid from 'uuid';

import './style.css';
import CTRCustomTable from '../ctr-custom-table/ctr-custom-table.component';

const CTRCustomDoseTable = ({
  heading,
  children,
  headers = [],
  inputRows,
  onAddRow = (tabRows) => {},
  onRemoveRow = (tabRows) => {},
  onRowUpdate = (tabRows) => {},
  showSpacerRow = true,
  showDeleteRow = true,
  showAddColumn = true,
  showCopyDrugRows = true,
  showCopyDrugColumns = true,
  showInsertSpecialChars = true
}) => {
  console.log(inputRows);
  const spacerRow = (id) => {
    return {
      id: id,
      type: 2,
      input: { value: '' }
    };
  };

  const normalRow = (id) => {
    const inputFields = [];
    headers.forEach((e) => {
      inputFields.push({ value: '' });
    });
    return {
      id: id,
      type: 1,
      inputs: inputFields
    };
  };

  const [tableRows, setTableRows] = useState([]);
  const [currentSelectedRow, setCurrentSelectedRow] = useState(0);

  useEffect(() => {
    if (inputRows) {
      setTableRows(inputRows);
    }
  }, [inputRows]);

  const handleInputOnchange = async (value, type, rowIndex, inputIndex) => {
    if (type === 1) {
      const updatedTableRows = tableRows.map((tableRow, index) => {
        if (rowIndex === index) {
          tableRow.inputs[inputIndex].value = value;
        }
        return tableRow;
      });

      await setTableRows([...updatedTableRows]);

      // check if a new row can be added
      if (rowIndex + 1 === tableRows.length) {
        await addNormalRow(updatedTableRows, false);
      }
    } else if (type === 2) {
      const updatedTableRows = tableRows.map((tableRow, index) => {
        if (rowIndex === index) {
          tableRow.input.value = value;
        }
        return tableRow;
      });
      await setTableRows([...updatedTableRows]);

      // check if a new row can be added
      if (rowIndex + 1 === tableRows.length) {
        await addNormalRow(updatedTableRows, false);
      }
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

  const addSpacerRow = (afterIndex) => {
    if (afterIndex && tableRows.length > 0) {
      const firstHalf = [...tableRows].splice(0, currentSelectedRow);
      const secondHalf = [...tableRows].splice(
        currentSelectedRow,
        tableRows.length
      );
      console.log('First half', firstHalf);
      console.log('Second half', secondHalf);
      setTableRows([...tableRows, spacerRow(uuid())]);
    } else {
      setTableRows([...tableRows, spacerRow(uuid())]);
    }

    onAddRow(tableRows);
  };

  const addNormalRow = (rows, afterIndex) => {
    setTableRows([...rows, normalRow(uuid())]);
    onAddRow(tableRows);
  };

  return (
    <div style={{ marginTop: 30 }}>
      <CTRCustomTable heading={heading}>
        <div className='dose-table-controller'>
          {showSpacerRow ? (
            <button type='button' onClick={() => addSpacerRow(true)}>
              Add Spacer Row
            </button>
          ) : null}
          {showDeleteRow ? (
            <button type='button' onClick={() => removeRow()}>
              Delete Row
            </button>
          ) : null}
          {showAddColumn ? <button type='button'>Add Columns</button> : null}
          {showCopyDrugRows ? (
            <button type='button'>Copy Drug Rows</button>
          ) : null}
          {showCopyDrugColumns ? (
            <button type='button'>Copy Drug Columns</button>
          ) : null}
        </div>
        <Grid container xs={12}>
          <Grid container spacing={0}>
            {headers.map((value) => (
              <Grid
                className='dose-table-header-item-container'
                key={value}
                item
                style={{ flex: 1 }}
              >
                <div className='dose-table-header-item'>{value}</div>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid container xs={12}>
          <Grid
            container
            xs={12}
            spacing={0}
            className='dose-table-item-container'
          >
            {tableRows &&
              tableRows.map((row, rowIndex) => {
                if (row.type === 1) {
                  return (
                    <Grid item container key={rowIndex} xs={12}>
                      {row.inputs.map((rowInput, inputIndex) => {
                        return (
                          <Grid key={inputIndex} item style={{ flex: 1 }}>
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
                      })}
                    </Grid>
                  );
                } else {
                  return (
                    <Grid key={row.id} item xs={12}>
                      <div>
                        <input
                          style={{ textAlign: 'center' }}
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
      </CTRCustomTable>
    </div>
  );
};

export default CTRCustomDoseTable;
