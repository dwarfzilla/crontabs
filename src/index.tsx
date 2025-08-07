import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/roboto';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { loadState } from './store/storageThunks';
import { serializeState } from './store/stateSerializer';
import { saveTabs } from './store/localStorage';

const theme = createTheme();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Load the state from storage when the app starts.
store.dispatch(loadState());

// Save the state to storage on every change.
store.subscribe(() => {
    const state = store.getState();
    const serializedState = serializeState(state);
    saveTabs(serializedState);
});

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
