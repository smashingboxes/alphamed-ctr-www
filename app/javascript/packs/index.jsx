import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';

import { theme } from '../src/theme.styles';
import 'react-quill/dist/quill.snow.css';

import { store } from '../src/redux/store';

import App from '../src/App';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Router>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Provider>
    </Router>,
    document.body.appendChild(document.createElement('div'))
  );
});
