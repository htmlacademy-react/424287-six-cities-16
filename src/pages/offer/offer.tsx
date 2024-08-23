import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Form from './components/form/form';
// import { capitalizeFirstLetter } from '../../utils';
import { CardProps, UserData } from '../../types/types';
import ErrorPage from '../../components/error-page/error-page';
import { useAppSelector } from '../../hooks';
import { APIRoute, AppRoute, AuthorizationStatus } from '../../const';
import { useEffect, useState } from 'react';
import { api } from '../../store';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import Map from '../../components/map/map';
import { getCount } from '../../utils';


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

export interface Comment {
  id: string;
date: string;
user: Omit<UserData, 'email'|'token '>;
comment: string;
rating: number;
 }
function Offer():JSX.Element {
  const {id:offerId} = useParams();
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const navigate = useNavigate();

  const [currentOffer, setCurrentOffer] = useState<OfferCards | undefined >();
  const [otherOffer, setOtherOffer] = useState<CardProps[] | undefined >();
  const [comments, setComments] = useState<Comment[] | undefined >();

  const activeCity = useAppSelector((state)=> state.currentCity);

  // const onHandleFavoriteAdd = () => {

  // }
  useEffect(() => {
    if(offerId) {
      (async () => {
        try {
          const {data:currentOfferData} = await api.get<OfferCards>(`${APIRoute.CurrentOffer}/${offerId}`);
          const {data:otherOfferData} = await api.get<CardProps[]>(`${APIRoute.CurrentOffer}/${offerId}/nearby`);
          const {data:commentsData} = await api.get<Comment[]>(`${APIRoute.Comments}/${offerId}`);
          setCurrentOffer(currentOfferData);
          setOtherOffer(otherOfferData);
          setComments(commentsData);
        } catch {
          navigate('/error');
        }

      })();
    }
  }, [navigate, offerId]);

  if(!currentOffer) {
    return (<LoadingScreen />);
  }
  if(currentOffer === undefined) {
    return (<ErrorPage/>);
  }
  return (
    <main className="page__main page__main--offer">
      <Helmet>
        <title>6 cities: offer</title>
      </Helmet>
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {currentOffer.images.slice(0,6).map((image)=>(
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
              {// eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
                authorizationStatus === AuthorizationStatus.Auth && (
                  <button className="offer__bookmark-button button" type="button" onClick={() => console.log('To favorite')}>
                    <svg className="offer__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>)
              }

            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{width: `${currentOffer.rating / 5 * 100}%`}}/>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">
                {currentOffer.type}
              </li>
              <li className="offer__feature offer__feature--bedrooms">
                {currentOffer.bedrooms} Bedroom{getCount(currentOffer.bedrooms)}
              </li>
              <li className="offer__feature offer__feature--adults">
                  Max {currentOffer.maxAdults} adult{getCount(currentOffer.maxAdults)}
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
            {comments && comments?.length > 0 && (
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments?.length}</span></h2>
                <ul className="reviews__list">
                  {comments.slice(0,10).map((item) => (
                    <li className="reviews__item" key={item.id}>
                      <div className="reviews__user user">
                        <div className="reviews__avatar-wrapper user__avatar-wrapper">
                          <img className="reviews__avatar user__avatar" src={item.user.avatarUrl} width="54" height="54" alt="Reviews avatar"/>
                        </div>
                        <span className="reviews__user-name">
                          {item.user.name}
                        </span>
                      </div>
                      <div className="reviews__info">
                        <div className="reviews__rating rating">
                          <div className="reviews__stars rating__stars">
                            <span style={{width: `${item.rating / 5 * 100}%`}}/>
                            <span className="visually-hidden">Rating</span>
                          </div>
                        </div>
                        <p className="reviews__text">
                          {item.comment}
                        </p>
                        <time className="reviews__time" dateTime="2019-04-24">{new Date(item.date).getMonth() } {new Date(item.date).getFullYear() }  </time>
                      </div>
                    </li>))}

                </ul>
                {// eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
                  authorizationStatus === AuthorizationStatus.Auth && <Form/>
                }
              </section>)}
          </div>
        </div>
        <section className="offer__map map">
          <Map city={activeCity} points={otherOffer?.slice(0,3)} selectedPoint={currentOffer.id} />
        </section>
      </section>
      {otherOffer && (
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {otherOffer.slice(0,3).map((item) => (
                <article className="near-places__card place-card" key={item.id}>
                  <div className="near-places__image-wrapper place-card__image-wrapper">
                    <Link to={AppRoute.OfferDetail}>
                      <img className="place-card__image" src={item.previewImage} width="260" height="200" alt="Place image"/>
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
                        <span style={{width: `${item.rating / 5 * 100}%`}}/>
                        <span className="visually-hidden">Rating</span>
                      </div>
                    </div>
                    <h2 className="place-card__name">
                      <Link to="#">{item.title}</Link>
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
export default Offer;
