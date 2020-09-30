import React from 'react';

import {} from './ctr-custom-table.styles';

import './style.css';

const CTRCustomTable = ({ heading, children }) => {
  return (
    <div style={{ marginBottom: 30 }}>
      <div className='custom-table-header'>{heading}</div>
      <div className='custom-table-container'>{children}</div>
    </div>
  );
};

export default CTRCustomTable;
