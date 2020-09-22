import React, { useState, useEffect } from 'react';
import { Paper, Grid } from '@material-ui/core';

import { } from './ctr-custom-tab.styles';

import "./style.css";

const CTRCustomTab = ({
    label,
    initialValue = null,
    isAppendable = false,
    appendLabel,
    onTabAdd = (item) => {},
    onTabSelectChange = (item, index) => {},
    onTabItemRemoved = (item) => {} }) => {

  const [tabItems, setTabitems] = useState([]);

  useEffect(() => {
    if(isAppendable) appendInitialItem();
  }, []);

  const handleOnItemAdd = () => {
    let tabItem = { value: appendLabel, isSelected: true };
    setTabitems([...deselectOtherItems(), tabItem]);
    onTabAdd(tabItem);
  }

  const handleOnItemSelect = (item, index) => {
    setTabitems([...deselectOtherItems(item)]);
    onTabSelectChange(item, index);
  }

  const handleOnItemRemove = (item, index) => {
    let removeAt = tabItems.indexOf(item);
    console.log(removeAt);
    setTabitems([...tabItems.filter((item, index) => index == removeAt)]);
    onTabItemRemoved(item, index);
  }

  const deselectOtherItems = (except = null) => {
    return [...tabItems].map((item, index) => {
      if(except != null && index == tabItems.indexOf(except)) return {...item, isSelected: true};
      return {...item, isSelected: false}
    });
  }

  const appendInitialItem = () => {
    setTabitems([...tabItems, { value: initialValue != null ? initialValue : appendLabel, isSelected: true }]);
  }

  return (
    <div className = "custom-tab-container">
      <div>
          {label}
      </div>
      {
        !isAppendable ?
        (
          <div className = "white-item">
            {initialValue}
          </div>
        ) : null
      }
      {
        tabItems && tabItems.map((item, key) => {
           return (
            <div
              key = {key}
              onClick = {() => handleOnItemSelect(item, key)}
              className = { item.isSelected ? "white-item removable" : "removable"}>
                <div> { key == 0 ? "" : "New" } {item.value}</div>
                <div onClick = {() => handleOnItemRemove(item, key)}>X</div>
            </div>
          )
        })
      }
      {
        isAppendable ?
        (
        <div
        className = "append"
        onClick = {() => handleOnItemAdd()}
        >
        + Add {appendLabel}
        </div>
        ) : null
      }

    </div>
  );
};

export default CTRCustomTab;
