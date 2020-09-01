import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    marginLeft: 34,
    marginTop: 10
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  tableContainer: {
    backgroundColor: '#58285f'
  },
  tableTitle: {
    color: 'white',

    '&:active, &:hover, &:selected': {
      color: 'white'
    }
  },
  tableBody: {
    backgroundColor: '#917495'
  },
  tableRow: {
    '&:hover': {
      backgroundColor: '#58285f !important'
    }
  },
  tableData: {
    color: 'white'
  },
  actions: {
    width: 150,
    height: 35,
    backgroundColor: 'white'
  },
  labelActions: {
    marginTop: -8,
    fontSize: 13,
    color: 'black'
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  },
  menuButton: {
    borderRadius: 5,
    border: '1px solid white',
    backgroundColor: 'white',
    textTransform: 'capitalize'
  }
}));
