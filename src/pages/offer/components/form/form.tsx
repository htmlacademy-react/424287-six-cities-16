import { Fragment, useState } from 'react';

export type FormDataProps = {
  rating: number | null;
  comment: '';
}

const STAR_ARRAYS = [5,4,3,2,1];
const MAX_TEXTAREA_VALUES = 300;
const MIN_TEXTAREA_VALUES = 50;
const DEFAULT_FORM_DATA: FormDataProps = {
  rating: null,
  comment: '',
};

function Form({onHandleSubmitForm, isDisableForm}:{onHandleSubmitForm:(data:FormDataProps)=>Promise<void>; isDisableForm: boolean}):JSX.Element {

  const [isDisabledButton, setIsDisabledButton] = useState(true);
  const [formData, setFormData] = useState<FormDataProps>(DEFAULT_FORM_DATA);

  const handleFieldChange = ({name, value}: { name: keyof FormDataProps; value: string }): void => {
    const newValue = name === 'rating' ? parseInt(value, 10) : value;
    const newData = {...formData, [name]: newValue};
    setFormData(newData);

    if (newData.rating !== undefined &&
      newData.comment.length < MAX_TEXTAREA_VALUES &&
      newData.comment.length >= MIN_TEXTAREA_VALUES) {
      setIsDisabledButton(false);
    }
  };
  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {STAR_ARRAYS.map((item) => (
          <Fragment key={item}>
            <input className="form__rating-input visually-hidden" name="rating" value={item} id={`${item}-stars`} type="radio" checked={formData.rating ? item === formData.rating : false} onChange={(evt) => handleFieldChange({name: 'rating', value: evt.target.value})} disabled = {isDisableForm}/>
            <label htmlFor={`${item}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>))}
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" value={formData.comment}
        onChange={(evt) => handleFieldChange({name: 'comment', value: evt.target.value})} disabled = {isDisableForm}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isDisabledButton} onClick={(evt) => {
          evt.preventDefault();
          onHandleSubmitForm(formData);
          setFormData(DEFAULT_FORM_DATA);

          setIsDisabledButton(true);

        }}
        >Submit
        </button>
      </div>
    </form>
  );
}
export default Form;
