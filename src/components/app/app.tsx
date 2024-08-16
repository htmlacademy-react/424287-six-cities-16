import { BrowserRouter, Routes,Route } from 'react-router-dom';
import { AuthorizationStatus} from '../../const';
import { AppRoute } from '../../const';
import { HelmetProvider } from 'react-helmet-async';
import MainPage from '../../pages/main/main-page';
import ErrorPage from '../error-page/error-page';
import Favourites from '../../pages/favourites/favourites';
import Login from '../../pages/login/login';
import Offer from '../../pages/offer/offer';
import PrivateRoute from '../private-route/private-route';
import Layout from '../layout/layout';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Root} element={<Layout/>}>
            <Route
              index element={ <MainPage/>}
            />
            <Route
              path={AppRoute.Favorites}
              element={ <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}><Favourites /></PrivateRoute>}
            />
            <Route
              path={AppRoute.Login}
              element={ <Login/>}
            />
            <Route
              path={AppRoute.Offer}
              element={ <Offer />}
            />
            <Route
              path="*"
              element={<ErrorPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
