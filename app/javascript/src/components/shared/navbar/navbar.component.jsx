import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  MenuItem,
  Menu,
  InputBase
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';

import { useStyles } from './navbar.styles';

import SearchFilters from '../search-filters/search-filters.component';

const Navbar = ({ history, user, signOutStart }) => {
  const [search, setSearch] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleSearch = () => {
    setSearch(!search);
  };

  const goToHome = () => {
    if (user && user.user_type === 'admin')
      history.push('/submission/admin/results');
    if (user && user.user_type === 'se') history.push('/submission/se/results');
    if (user && user.user_type === 'author')
      history.push('/submission/author/results');
  };

  const logout = () => {
    setAnchorEl(null);
    signOutStart();
    history.push('/');
  };

  const goToEditProfile = () => {
    setAnchorEl(null);
    history.push('/edit-profile');
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title} onClick={goToHome}>
            Clinical Trial Results
          </Typography>
          {user === null ? (
            <>
              <Link to='/sign-in' className={classes.link}>
                <Button color='inherit' className={classes.buttonText}>
                  Sign In
                </Button>
              </Link>
              <Link to='/sign-up' className={classes.link}>
                <Button color='inherit' className={classes.buttonText}>
                  Register
                </Button>
              </Link>
            </>
          ) : (
            <>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder='Search…'
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                  onFocus={toggleSearch}
                />
              </div>
              <Button
                color='inherit'
                className={classes.logoutButtonText}
                onClick={handleClick}
              >
                {user && user.email ? user.email : 'User'}
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={goToEditProfile}>Edit Profile</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
      {search ? <SearchFilters toggleSearch={toggleSearch} /> : null}
    </div>
  );
};

export default Navbar;
