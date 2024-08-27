import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import Form from './components/form/form';
import { CardProps, OfferCard, UserData } from '../../types/types';
import { useAppSelector } from '../../hooks';
import { APIRoute, AuthorizationStatus } from '../../const';
import { useCallback, useEffect, useState } from 'react';
import { api, store } from '../../store';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import Map from '../../components/map/map';
import { getCount } from '../../utils';
import { humanizeDueDate,machineDueFormat, sortEventsBy } from '../../utils';
import { FormDataProps } from './components/form/form';
import { fetchOfferAction } from '../../store/api-actions';
import Card from '../../components/card/card';

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

  const [currentOffer, setCurrentOffer] = useState<OfferCard | undefined >();
  const [otherOffer, setOtherOffer] = useState<CardProps[] | undefined >();
  const [comments, setComments] = useState<Comment[] | undefined >();
  const [isDisableForm, setIsDisabledForm] = useState(false);

  const activeCity = useAppSelector((state)=> state.currentCity);

  const getComments = useCallback(async () => {
    const {data:commentsData} = await api.get<Comment[]>(`${APIRoute.Comments}/${offerId}`);
    setComments(commentsData);

  },[offerId]);

  const onHandleSubmitForm = async (data: FormDataProps) => {
    try {
      setIsDisabledForm(true);
      await api.post<FormDataProps>(`${APIRoute.Comments}/${offerId}`, data);
      getComments();
      setIsDisabledForm(false);

    } catch {
      // eslint-disable-next-line no-alert
      alert('К сожалению, возникла ошибка. Попробуйте еще раз');
      setIsDisabledForm(false);

    }

  };

  const addToFavorite = async () => {
    const offerStatus = !currentOffer?.isFavorite;
    const status = Number(offerStatus);
    await api.post<CardProps[]>(`${APIRoute.Favorite}/${offerId}/${status}`);
    setCurrentOffer((prevState) => {
      if(prevState) {
        return {...prevState, isFavorite: offerStatus};
      }
    });
    store.dispatch(fetchOfferAction());

  };


  const onHandleFavoriteAdd = () => {
    addToFavorite();
  };


  useEffect(() => {
    if(offerId) {
      (async () => {
        try {
          const {data:currentOfferData} = await api.get<OfferCard>(`${APIRoute.CurrentOffer}/${offerId}`);
          const {data:otherOfferData} = await api.get<CardProps[]>(`${APIRoute.CurrentOffer}/${offerId}/${APIRoute.NearByOffers}`);
          setCurrentOffer(currentOfferData);
          setOtherOffer(otherOfferData);
          getComments();
        } catch {
          navigate('/error');

        }

      })();
    }
  }, [getComments, navigate, offerId]);

  if(!currentOffer) {
    return (<LoadingScreen />);
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
                  <button className={`offer__bookmark-button button ${currentOffer.isFavorite ? 'offer__bookmark-button--active' : ''}`} type="button" onClick={onHandleFavoriteAdd}>
                    <svg className="offer__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>)
              }

            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{width: `${Math.round(currentOffer.rating) / 5 * 100}%`}}/>
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
            {comments && comments.length > 0 && (
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
                <ul className="reviews__list">
                  {sortEventsBy(comments).slice(0,10).map((item) => (
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
                        <time className="reviews__time" dateTime={machineDueFormat(item.date)}>{humanizeDueDate(item.date)}
                        </time>
                      </div>
                    </li>))}

                </ul>
                {// eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
                  authorizationStatus === AuthorizationStatus.Auth && <Form onHandleSubmitForm={onHandleSubmitForm} isDisableForm={isDisableForm}/>
                }
              </section>)}
          </div>
        </div>
        <section className="offer__map map">
          {otherOffer && (<Map city={activeCity} points={[...otherOffer.slice(0,3),currentOffer]} selectedPoint={currentOffer.id} />)}
        </section>
      </section>
      {otherOffer && (
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {otherOffer.slice(0,3).map((item) => (
                <Card key={item.id} data={item} className='near-places'/>
              ))}


            </div>
          </section>
        </div>)}
    </main>
  );
}
export default Offer;
