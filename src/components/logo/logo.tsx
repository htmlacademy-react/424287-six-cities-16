import { Link } from 'react-router-dom';

function Logo(): JSX.Element {
  // const dispatch = useAppDispatch();
  // const getFavoriteOffers = async () => {
  //   await api.get<CardProps[]>(`${APIRoute.Favorite}`);
  // };
  return (
    <Link className="header__logo-link"
      to='/'
    >
      <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
    </Link>
  );
}

export default Logo;
