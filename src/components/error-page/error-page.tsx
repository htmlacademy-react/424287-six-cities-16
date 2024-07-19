import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function ErrorPage() {
  return (
    <>
      <Helmet>
        <title>6 cities: error</title>
      </Helmet>
      <h2 className='places__found'>404 Not Found</h2>
      <Link className='login__submit form__submit button' to='/'>Вернуться на Главную</Link>
    </>
  );
}

export default ErrorPage;
