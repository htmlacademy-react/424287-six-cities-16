import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MainScreenProps } from '../main/main-page';
import { getOfferCardsByCity } from '../../utils';

function Favourites({dataOffers}:MainScreenProps): JSX.Element {
  const offerCardsByCity = getOfferCardsByCity(dataOffers);

  return (
    <main className="page__main page__main--favorites">
      <Helmet>
        <title>6 cities: favorites</title>
      </Helmet>
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {Object.entries(offerCardsByCity).map(([cityName,cards]) => (
              <li className="favorites__locations-items" key={cityName}>
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <Link className="locations__item-link" to='/'>
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
                        <Link to='/'>
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
                          <Link to='/'>{item.title}</Link>
                        </h2>
                        <p className="place-card__type">{item.type}</p>
                      </div>
                    </article>))}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

export default Favourites;
