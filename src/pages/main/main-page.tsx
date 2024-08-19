import CardList from '../../components/card-list/card-list';
import { Helmet } from 'react-helmet-async';
import Map from '../../components/map/map';
import { CITIES_MOCKS} from '../../mock/city';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeActiveCity } from '../../store/actions';
import { useAppSelector } from '../../hooks';
import { CardProps } from '../../components/card/card';
import { getActiveOffersLength } from '../../utils';

function MainPage():JSX.Element {
  const [selectedPoint, setSelectedPoint] = useState<string|undefined>(undefined);
  const activeCity = useAppSelector((state)=> state.currentCity);
  const offerData = useAppSelector((state) => state.offersData);
  const [filteredOffers, setFilteredOffers] = useState<CardProps[]|undefined>();
  useEffect(()=> {
    if(activeCity && offerData) {
      setFilteredOffers(
        offerData.filter((offer) => offer.city.name === activeCity.title)
      );
    }
  }, [activeCity, offerData]);
  const handleMouseOver = (id:string) => {
    setSelectedPoint(id);
  };
  const handleMouseLeave = () => {
    setSelectedPoint(undefined);
  };
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
                  dispatch(changeActiveCity({currentCity:item}));
                }}
                >
                  <a className={`locations__item-link tabs__item ${item.title === activeCity.title ? 'tabs__item--active' : ''}`}>
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
              <b className="places__found">{filteredOffers?.length === 0 ? 'No places to stay available' : `${filteredOffers?.length} ${getActiveOffersLength(filteredOffers?.length)} to stay in ${activeCity.title}`}</b>
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
              {filteredOffers && filteredOffers.length > 0 && (<CardList dataOffers={filteredOffers} onHover={handleMouseOver} onHandlerMouseLeave={handleMouseLeave} />)}
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                {filteredOffers && filteredOffers.length !== 0 && (<Map city={activeCity} points={filteredOffers} selectedPoint={selectedPoint} />) }
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default MainPage;


