import { Fragment, useState } from 'react';

const STAR_ARRAYS = [5,4,3,2,1];

function Form():JSX.Element {
  const [,setRating] = useState(0);
  const handleRatingChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(e.target.value));
  };
  const [comment,setComment] = useState('');
  const handleCommentChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {STAR_ARRAYS.map((item) => (
          <Fragment key={item}>
            <input className="form__rating-input visually-hidden" name="rating" value={item} id={`${item}-stars`} type="radio" onChange={handleRatingChange}/>
            <label htmlFor={`${item}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>))}
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" value={comment}
        onChange={handleCommentChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
      </div>
    </form>
  );
}
export default Form;
