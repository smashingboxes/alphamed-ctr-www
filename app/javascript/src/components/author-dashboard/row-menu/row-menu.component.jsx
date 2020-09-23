import React from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

import { useStyles } from './row-menu.styles';

export function RowMenu({ row, goToEdit }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Menu
        id={`actions-${row._id.$oid}`}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={(e) => goToEdit(row._id.$oid, e)}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
      <Button
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={handleMenuClick}
        className={classes.menuButton}
        endIcon={anchorEl ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      >
        Actions
      </Button>
    </>
  );
}
