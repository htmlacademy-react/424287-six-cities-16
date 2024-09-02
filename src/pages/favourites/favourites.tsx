import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getOfferCardsByCity } from '../../utils';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import Card from '../../components/card/card';

function Favourites(): JSX.Element {
  const offerData = useAppSelector((state) => state.OffersData);
  const offerCardsByCity = offerData ? getOfferCardsByCity(offerData) : null;

  return (
    <main className="page__main page__main--favorites">
      <Helmet>
        <title>6 cities: favorites</title>
      </Helmet>
      <div className="page__favorites-container container">
        {offerCardsByCity && Object.keys(offerCardsByCity).length !== 0 ? (
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.entries(offerCardsByCity).map(([cityName,cards]) => (
                <li className="favorites__locations-items" key={cityName}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <Link className="locations__item-link" to={AppRoute.Root}>
                        <span>{cityName}</span>
                      </Link>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {cards.map((item) => (
                      <Card key={item.id} className='favorites' data={item} width={150} height={110}/>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>) : (
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">Favorites (empty)</h1>
            <div className="favorites__status-wrapper">
              <b className="favorites__status">Nothing yet saved.</b>
              <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
            </div>
          </section>)}

      </div>
    </main>
  );
}

export default Favourites;
