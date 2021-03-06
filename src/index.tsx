import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import CssBaseline from '@mui/material/CssBaseline';
import { ConnectedRouter } from 'connected-react-router';
import { unstable_HistoryRouter as HistoryRouter, BrowserRouter } from 'react-router-dom';
import { history } from 'utils';
import ToastContainer from 'components/Common/ToastContainer';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer>
        <HistoryRouter history={history}>
          <CssBaseline />
          <App />
        </HistoryRouter>
      </ToastContainer>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
