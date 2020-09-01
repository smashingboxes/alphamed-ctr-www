import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Grid } from '@material-ui/core';

import { useStyles } from './sub-navbar.styles';

const SubNavbar = ({ user, history }) => {
  const [selected, isSelected] = useState({
    author: false,
    admin: false,
    editor: false
  });

  useEffect(() => {
    if (user) {
      if (user.user_type === 3) {
        isSelected({ author: true, admin: false, editor: false });
      } else if (user.user_type === 1) {
        isSelected({ author: false, admin: true, editor: false });
      } else if (user.user_type === 2) {
        isSelected({ author: false, admin: false, editor: true });
      }
    }
  }, [user]);

  const classes = useStyles();

  const authorClick = () => {
    isSelected({
      author: true,
      admin: false,
      editor: false
    });

    history.push('/submission/author/results');
  };

  const adminClick = () => {
    isSelected({
      author: false,
      admin: true,
      editor: false
    });

    history.push('/submission/admin/results');
  };

  const editorClick = () => {
    isSelected({
      author: false,
      admin: false,
      editor: true
    });

    history.push('/submission/se/results');
  };

  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.appBar}>
        <Grid container>
          <Grid item xs={1} />
          <Grid item xs={11}>
            {user === null ? null : (
              <Toolbar>
                {user && user.user_type === 2 ? null : (
                  <Button
                    onClick={authorClick}
                    className={
                      selected.author
                        ? classes.buttonActive
                        : classes.buttonInactive
                    }
                  >
                    Author Dashboard
                  </Button>
                )}
                {user && user.user_type === 1 ? (
                  <Button
                    onClick={adminClick}
                    className={
                      selected.admin
                        ? classes.buttonActive
                        : classes.buttonInactive
                    }
                  >
                    Admin Dashboard
                  </Button>
                ) : null}
                {user && user.user_type === 3 ? null : (
                  <Button
                    onClick={editorClick}
                    className={
                      selected.editor
                        ? classes.buttonActive
                        : classes.buttonInactive
                    }
                  >
                    Section Editor Dashboard
                  </Button>
                )}
              </Toolbar>
            )}
          </Grid>
        </Grid>
      </AppBar>
    </div>
  );
};

export default SubNavbar;
