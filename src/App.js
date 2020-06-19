import React from 'react';
// import { Router } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import './config/ReactotronConfig';

import GlobalStyle from './styles/global';
import Header from './components/Header';
import Routes from './routes';

import history from './services/history';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      {/* <Router history={history}> */}
      <BrowserRouter history={history}>
        <Header />
        <Routes />
        <GlobalStyle />
        {/* autoClose - seconds before close */}
        <ToastContainer autoClose={3000} />
        {/* </Router> */}
      </BrowserRouter>
    </Provider>
  );
}

export default App;
