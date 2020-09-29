import React from 'react';
import { Button, Divider, Menu, MenuItem } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

import { useStyles } from './row-menu.styles';

export function RowMenu({ row, goToEdit, deleteCTR }) {
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
        <MenuItem onClick={handleClose}>Manage Forms</MenuItem>
        <MenuItem onClick={handleClose}>View Activity Log</MenuItem>
        <MenuItem onClick={handleClose}>View Note</MenuItem>
        <Divider />
        <MenuItem onClick={(e) => deleteCTR(row._id.$oid, e)}>Delete</MenuItem>
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
