import { Link, useNavigate } from 'react-router-dom';
import { APIRoute, AppRoute } from '../../const';
import { CardProps } from '../../types/types';
import { api, store } from '../../store';
import { fetchOfferAction } from '../../store/api-actions';
import { capitalizeFirstLetter } from '../../utils';

function Card({data,onMouseOver,onMouseLeave, className,width,height} :{data: CardProps; onMouseOver?:() => void;onMouseLeave?:() => void; className?:string; width?:number; height?:number}):JSX.Element {

  const navigate = useNavigate();

  const addToFavorite = async () => {
    try {
      const offerStatus = !data.isFavorite;
      const status = Number(offerStatus);
      await api.post<CardProps[]>(`${APIRoute.Favorite}/${data.id}/${status}`);
      store.dispatch(fetchOfferAction());
    } catch {
      navigate(`/${AppRoute.Login}`);

    }

  };

  const handleFavoriteButtonClick = () => {
    addToFavorite();
  };

  return (
    <article className={`${className}__card place-card`} onMouseEnter={onMouseOver} onMouseLeave={onMouseLeave}>
      {data.isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div> : null}
      <div className={`${className}__image-wrapper place-card__image-wrapper`}>
        <Link to={AppRoute.Root}>
          <img className="place-card__image" src={data.previewImage} width={width} height={height} alt="Place image"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{data.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button ${data.isFavorite ? 'place-card__bookmark-button--active' : ''}`} type="button" onClick={handleFavoriteButtonClick}>
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${Math.round(data.rating) / 5 * 100}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/${AppRoute.Offer}/${data.id}`}>{data.title}</Link>
        </h2>
        <p className="place-card__type">{capitalizeFirstLetter(data.type)}</p>
      </div>
    </article>
  );
}
export default Card;
