import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  root: {
    width: '250px',
    border: '1px solid black'
  },
  header: {
    color: 'white',
    backgroundColor: '#58285f',
    textAlign: 'center',
    padding: 10,
    fontSize: "1.2em"
  },
  itemsInactive: {
    color: '#917495',
    backgroundColor: 'none',
    padding: 10,
    margin: 10
  },
  itemsActive: {
    color: 'white',
    backgroundColor: '#58285f',
    borderRadius: 15,
    padding: 10,
    margin: 10
  }
}));
