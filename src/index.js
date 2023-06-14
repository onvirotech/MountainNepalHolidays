import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { Provider } from 'react-redux'
import { store } from './reduxStore/store';
import { CookiesProvider } from 'react-cookie';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <I18nextProvider i18n={i18n} defaultNS={'translation'}>
      <CookiesProvider>
      <App />
    </CookiesProvider>
      </I18nextProvider>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

