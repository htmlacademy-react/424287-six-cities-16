import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getOfferCardsByCity } from '../../utils';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';

function Favourites(): JSX.Element {
  const offerData = useAppSelector((state) => state.offersData);
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
                      <article className="favorites__card place-card" key={item.id}>
                        {item.isPremium ?
                          <div className="place-card__mark">
                            <span>Premium</span>
                          </div> : null}

                        <div className="favorites__image-wrapper place-card__image-wrapper">
                          <Link to={AppRoute.Root}>
                            <img className="place-card__image" src={item.previewImage} width="150" height="110" alt="Place image"/>
                          </Link>
                        </div>
                        <div className="favorites__card-info place-card__info">
                          <div className="place-card__price-wrapper">
                            <div className="place-card__price">
                              <b className="place-card__price-value">&euro;{item.price}</b>
                              <span className="place-card__price-text">&#47;&nbsp;night</span>
                            </div>
                            <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
                              <svg className="place-card__bookmark-icon" width="18" height="19">
                                <use xlinkHref="#icon-bookmark"></use>
                              </svg>
                              <span className="visually-hidden">In bookmarks</span>
                            </button>
                          </div>
                          <div className="place-card__rating rating">
                            <div className="place-card__stars rating__stars">
                              <span style={{width: `${item.rating / 5 * 100}%`}}></span>
                              <span className="visually-hidden">Rating</span>
                            </div>
                          </div>
                          <h2 className="place-card__name">
                            <Link to={AppRoute.Root}>{item.title}</Link>
                          </h2>
                          <p className="place-card__type">{item.type}</p>
                        </div>
                      </article>))}
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
