import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    backgroundColor: '#fff',
    height: '60px',
    boxShadow: 'none'
  },
  buttonInactive: {
    backgroundColor: 'transparent',
    color: '#917495',
    border: '1px solid gray',
    borderRadius: 0,
    margin: '0 5px'
  },
  buttonActive: {
    backgroundColor: '#58285f',
    color: 'white',
    border: '1px solid #58285f',
    borderRadius: 0,
    margin: '0 5px',

    '&:hover': {
      backgroundColor: '#58285f',
      color: 'white',
      border: '1px solid gray',
      borderRadius: 0
    }
  }
}));
