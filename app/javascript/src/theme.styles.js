import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#58285f',
      light: 'rgba(88, 40, 95, 0.6)',
      contrastText: '#fff'
    },
    secondary: {
      main: '#49BE20',
      light: '#6EDD47',
      contrastText: '#fff'
    },
    error: {
      main: '#ff5858',
      light: 'e46a39',
      contrastText: '#fff'
    }
  },
  typography: {
    fontFamily: '"Franklin Gothic Medium", "Arial"'
  }
});
