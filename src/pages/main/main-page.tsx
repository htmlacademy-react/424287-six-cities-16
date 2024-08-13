import CardList from '../../components/card-list/card-list';
import { CardProps } from '../../components/card/card';
import { Helmet } from 'react-helmet-async';
import Map from '../../components/map/map';
import { CITIES_MOCKS} from '../../mock/city';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeActiveCity, changeOfferData } from '../../store/actions';
import { useAppSelector } from '../../hooks';

export type MainScreenProps = {
  dataOffers: CardProps[];
}

function MainPage({dataOffers}:MainScreenProps):JSX.Element {
  const [selectedPoint, setSelectedPoint] = useState<string|undefined>(undefined);
  const handleMouseOver = (id:string) => {
    setSelectedPoint(id);
  };
  const handleMouseLeave = () => {
    setSelectedPoint(undefined);
  };
  const [activeCity, setActiveCity] = useState(CITIES_MOCKS[0]);
  const city = useAppSelector((state)=> state.currentCity);
  const offerData = useAppSelector((state) => state.DATA);
  console.log(offerData);
  // console.log(city);
  // const [cityOffers,setCityOffers] = useState(dataOffers.filter((offer) => offer.city.name === city));
  const dispatch = useDispatch();
  return (
    <>
      <Helmet>
        <title>6 cities</title>
      </Helmet>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {CITIES_MOCKS.map((item, id) =>(
                //eslint-disable-next-line react/no-array-index-key
                <li className="locations__item" key={id} onClick={() => {
                  dispatch(changeActiveCity({currentCity:item.title, DATA:dataOffers}));
                  dispatch(changeOfferData({currentCity:item.title, DATA:dataOffers}));
                }}
                >
                  <a className={`locations__item-link tabs__item ${item.title === city ? 'tabs__item--active' : ''}`}>
                    <span>{item.title}</span>
                  </a>
                </li>))}

            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offerData.length === 0 ? 'No places to stay available' : `${offerData.length} places to stay in ${city}`}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <CardList dataOffers={offerData} onHover={handleMouseOver} onHandlerMouseLeave={handleMouseLeave} />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                {offerData.length !== 0 ? <Map city={activeCity} points={offerData} selectedPoint={selectedPoint} /> : ''}
                {/* <Map city={activeCity} points={dataOffers} selectedPoint={selectedPoint} /> */}
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default MainPage;


