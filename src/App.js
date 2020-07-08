import React from 'react';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import CookieConsent from 'react-cookie-consent';

import store, { persistor } from './store';
import history from './services/history';
import GlobalStyle from './styles/GlobalStyles';
import Header from './components/Header';

import Routes from './routes';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Header />
          <CookieConsent buttonText="Eu concordo">
            OnlineStore guarda informação na LocalStorage para poder funcionar
            correctamente. <a href="/infocookies/">+info</a>
          </CookieConsent>
          <Routes />
          <GlobalStyle />
          <ToastContainer autoClose={3000} className="toast-container" />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
