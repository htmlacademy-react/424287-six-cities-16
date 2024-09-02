import { Routes,Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { HelmetProvider } from 'react-helmet-async';
import MainPage from '../../pages/main-page/main-page';
import ErrorPage from '../error-page/error-page';
import Favourites from '../../pages/favourites/favourites';
import Login from '../../pages/login/login';
import Offer from '../../pages/offer/offer';
import PrivateRoute from '../private-route/private-route';
import Layout from '../layout/layout';
import LoadingScreen from '../loading-screen/loading-screen';
import { useAppSelector } from '../../hooks';
import browserHistory from '../../browser-history';
import HistoryRouter from '../history-route/history-route';

function App(): JSX.Element {
  const isOffersDataLoading = useAppSelector((state) => state.IsOffersDataLoading);
  const authorizationStatus = useAppSelector((state) => state.AuthorizationStatus);

  if (isOffersDataLoading || authorizationStatus === AuthorizationStatus.Unknown) {
    return (
      < LoadingScreen />
    );
  }
  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path={AppRoute.Root} element={<Layout/>}>
            <Route
              index element={ <MainPage/>}
            />
            <Route
              path={AppRoute.Favorites}
              element={ <PrivateRoute authorizationStatus={authorizationStatus}><Favourites/></PrivateRoute>}
            />
            <Route
              path={AppRoute.Login}
              element={ <Login/> }
            />
            <Route
              path={AppRoute.OfferDetail}
              element={ <Offer />}
            />
            <Route
              path="*"
              element={<ErrorPage />}
            />
          </Route>
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
