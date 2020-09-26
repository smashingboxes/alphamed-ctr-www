import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  container: {
    cursor: 'pointer'
  },
  root: {
    width: '250px',
    border: '1px solid black'
  },
  header: {
    color: 'white',
    backgroundColor: '#58285f',
    textAlign: 'center',
    padding: 10,
    fontSize: '1.2em'
  },
  itemsInactive: {
    display: 'flex',
    color: '#917495',
    backgroundColor: 'none',
    padding: 10,
    margin: 10
  },
  itemsActive: {
    display: 'flex',
    color: 'white',
    backgroundColor: '#58285f',
    borderRadius: 15,
    padding: 10,
    margin: 10
  },
  checkbox: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center'
  }
}));
