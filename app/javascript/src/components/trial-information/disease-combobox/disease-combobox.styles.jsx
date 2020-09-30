import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  paper: {
    marginRight: theme.spacing(2),
    height: '20vh',
    overflowY: 'scroll'
  },
  select: {
    width: '500px',
    height: '100%'
  },
  selectLabel: {
    color: '#58285f',
    fontSize: '1em',
    fontWeight: 'normal'
  },
  errorSpan: {
    color: '#FF5858',
    fontSize: '12px'
  },
  centerized: {
    marginTop: '5px',
    marginBottom: '15px',
    width: '500px',
    textAlign: 'center'
  },
  UIbutton: {
    color: 'white',
    padding: '5px 100px',
    backgroundColor: 'rgba(88, 40, 95)'
  }
}));
