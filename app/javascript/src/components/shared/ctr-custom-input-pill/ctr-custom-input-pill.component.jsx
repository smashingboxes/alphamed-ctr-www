import React from 'react';

import {} from './ctr-custom-input-pill.styles';

import './style.css';

const CTRCustomInputPill = ({ width = null, type, label, ...props }) => {
  return (
    <div
      style={width != null ? { width: width } : {}}
      className='custom-input-pill-container'
    >
      <div className='custom-input-pill-label'>{label}</div>
      <div className='custom-input-pill-input-container'>
        <input className='custom-input-pill-input' type={type} {...props} />
      </div>
    </div>
  );
};

export default CTRCustomInputPill;
