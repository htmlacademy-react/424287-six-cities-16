import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import Form from './components/form/form';
// import { capitalizeFirstLetter } from '../../utils';
import { CardProps } from '../../components/card/card';
import ErrorPage from '../../components/error-page/error-page';
import { useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../const';

export type OfferCards = Omit<CardProps, 'previewImage'> & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  };
  images: string[];
  maxAdults: number;
 }

function Offer():JSX.Element {
  const {id:offerId} = useParams();
  const dataOffer = useAppSelector((state) => state.offersFullData);
  const currentOffer = dataOffer?.find((item)=> item.id === offerId);
  const otherOffer = dataOffer?.filter((item) => item.id !== currentOffer?.id);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  if(currentOffer === undefined) {
    return (<ErrorPage/>);
  } else {
    return (
      <main className="page__main page__main--offer">
        <Helmet>
          <title>6 cities: offer</title>
        </Helmet>
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOffer.images.map((image)=>(
                <div className="offer__image-wrapper" key={image}>
                  <img className="offer__image" src={image} alt="Photo studio"/>
                </div>))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer.isPremium ?
                <div className="offer__mark">
                  <span>Premium</span>
                </div> : null}

              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {currentOffer.title}
                </h1>
                <button className="offer__bookmark-button button" type="button" onClick={() => console.log('To favorite')}>
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${currentOffer.rating / 5 * 100}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {currentOffer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {currentOffer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {currentOffer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {currentOffer.goods.map((goodItem) =>
                    <li className="offer__inside-item" key={goodItem}>{goodItem}</li>
                  )}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper user__avatar-wrapper ${currentOffer.host.isPro ? 'offer__avatar-wrapper--pro' : ''} `}>
                    <img className="offer__avatar user__avatar" src={currentOffer.host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="offer__user-name">
                    {currentOffer.host.name}
                  </span>
                  {currentOffer.host.isPro ?
                    <span className="offer__user-status">
                    Pro
                    </span> : null}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {currentOffer.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">1</span></h2>
                <ul className="reviews__list">
                  <li className="reviews__item">
                    <div className="reviews__user user">
                      <div className="reviews__avatar-wrapper user__avatar-wrapper">
                        <img className="reviews__avatar user__avatar" src="img/avatar-max.jpg" width="54" height="54" alt="Reviews avatar"/>
                      </div>
                      <span className="reviews__user-name">
                        Max
                      </span>
                    </div>
                    <div className="reviews__info">
                      <div className="reviews__rating rating">
                        <div className="reviews__stars rating__stars">
                          <span style={{width: '80%'}}></span>
                          <span className="visually-hidden">Rating</span>
                        </div>
                      </div>
                      <p className="reviews__text">
                        A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
                      </p>
                      <time className="reviews__time" dateTime="2019-04-24">April 2019</time>
                    </div>
                  </li>
                </ul>
                {// eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
                  authorizationStatus !== AuthorizationStatus.Auth && <Form/>
                }
              </section>
            </div>
          </div>
          <section className="offer__map map"></section>
        </section>
        {otherOffer && (
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">
                {otherOffer.map((item) => (
                  <article className="near-places__card place-card" key={item.id}>
                    <div className="near-places__image-wrapper place-card__image-wrapper">
                      <Link to="#">
                        <img className="place-card__image" src={item.images[0]} width="260" height="200" alt="Place image"/>
                      </Link>
                    </div>
                    <div className="place-card__info">
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
                        <Link to="#">{item.description}</Link>
                      </h2>
                      <p className="place-card__type">{item.type}</p>
                    </div>
                  </article>
                ))}


              </div>
            </section>
          </div>)}
      </main>
    );
  }
}
export default Offer;
