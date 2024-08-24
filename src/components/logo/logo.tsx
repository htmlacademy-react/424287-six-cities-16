import {Link} from 'react-router-dom';
import { APIRoute, AppRoute } from '../../const';
import { redirectToRoute } from '../../store/actions';
import { useAppDispatch } from '../../hooks';
import { api } from '../../store';
import { CardProps } from '../../types/types';

function Logo(): JSX.Element {
  const dispatch = useAppDispatch();
  const getFavoriteOffers = async () => {
    await api.get<CardProps[]>(`${APIRoute.Favorite}`);
  };
  return (
    <Link className="header__logo-link" onClick={() => {
      getFavoriteOffers();
      dispatch(redirectToRoute(AppRoute.Root));
    }}
    to='/'
    >
      <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
    </Link>
  );
}

export default Logo;
