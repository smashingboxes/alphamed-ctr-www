import React, { useState, useEffect } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';

import {} from './ctr-custom-tab.styles';
import './style.css';

const CTRCustomTab = ({
  label,
  initialValue = null,
  isAppendable = false,
  isEditable = false,
  tabLimit = 0,
  appendLabel,
  tabItems,
  onTabAdd,
  onTabSelectChange,
  onTabUpdateItem
}) => {
  const [tabs, setTabs] = useState([]);
  const [editTabMode, setEditTabMode] = useState(false);

  useEffect(() => {
    if (tabItems) {
      setTabs(tabItems);
    }
  }, [tabItems]);

  const handleUpdateTabValue = (key, value) => {
    const updatedTabs = tabs.map((tab, index) => {
      if (key === index) tab.value = value;
      return tab;
    });
    onTabUpdateItem(updatedTabs);
  };

  const handleTabRemove = (key) => {
    const updatedTabs = tabs.filter((tab, index) => key !== index);
    onTabUpdateItem(updatedTabs);
  };

  return (
    <div className='custom-tab-container'>
      <div>{label}</div>
      {initialValue ? <div className='white-item'>{initialValue}</div> : null}
      {tabs &&
        tabs.map((item, key) => {
          return editTabMode && item.isSelected ? (
            <input
              style={{ color: 'black' }}
              key={key}
              value={item.value}
              onBlur={() => setEditTabMode(false)}
              onChange={(e) => handleUpdateTabValue(key, e.target.value)}
            />
          ) : (
            <>
              <div
                key={key}
                onDoubleClick={() => setEditTabMode(isEditable ? true : false)}
                onClick={() => onTabSelectChange(key)}
                className={
                  item.isSelected ? 'white-item removable' : 'removable'
                }
              >
                <div>{item.value}</div>
                <div onClick={() => handleTabRemove(key)}>X</div>
              </div>
            </>
          );
        })}
      {isAppendable ? (
        <div className='append' onClick={() => onTabAdd()}>
          + Add {appendLabel}
        </div>
      ) : null}
    </div>
  );
};

export default CTRCustomTab;
