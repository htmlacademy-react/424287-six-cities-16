import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import { fetchOfferAction,checkAuthAction, fetchFavoriteOfferAction} from './store/api-actions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setOffersDataLoadingStatus } from './store/actions';

store.dispatch(setOffersDataLoadingStatus(true));

store.dispatch(fetchOfferAction());

store.dispatch(checkAuthAction());

store.dispatch(fetchFavoriteOfferAction());
store.dispatch(setOffersDataLoadingStatus(false));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App/>
    </Provider>
  </React.StrictMode>
);


