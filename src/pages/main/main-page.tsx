import CardList from '../../components/card-list/card-list';
import { Helmet } from 'react-helmet-async';
import Map from '../../components/map/map';
import { CITIES_MOCKS} from '../../mock/city';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeActiveCity } from '../../store/actions';
import { useAppSelector } from '../../hooks';
import { CardProps, Sorting } from '../../types/types';
import { getActiveOffersLength, getSortedOffers } from '../../utils';
import { SORTING } from '../../const';

function MainPage():JSX.Element {

  const [selectedPoint, setSelectedPoint] = useState<string|undefined>(undefined);
  const activeCity = useAppSelector((state)=> state.currentCity);
  const offerData = useAppSelector((state) => state.offersData);
  const [filteredOffers, setFilteredOffers] = useState<CardProps[]|undefined>();
  const [isOpenSorting, setIsOpenSorting] = useState<boolean>(false);
  const [selectedSorting, setSelectedSorting] = useState<Sorting>(SORTING[0]);
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
  const handleVisibleSorting = () => setIsOpenSorting((open) => !open);

  const handleSorting = (sort: Sorting) => {
    const sortedOffers = getSortedOffers({filteredOffers, sort});
    setFilteredOffers(sortedOffers);
  };

  const handleSelectedSorting = (sort: Sorting) => {
    setSelectedSorting(sort);
    setIsOpenSorting(false);
    handleSorting(sort);
  };
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
          {filteredOffers && filteredOffers.length !== 0 ? (
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{`${filteredOffers?.length} ${getActiveOffersLength(filteredOffers.length)} to stay in ${activeCity.title}`}</b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>
                  <span className="places__sorting-type" tabIndex={0} onClick={handleVisibleSorting}>
                    {selectedSorting}
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select"></use>
                    </svg>
                  </span>
                  <ul
                    className={`places__options places__options--custom ${isOpenSorting ? 'places__options--opened' : ''}`}
                  >
                    {SORTING.map((sort: Sorting) => (
                      <li className={`places__option ${selectedSorting === sort ? 'places__option--active' : ''}`}
                        tabIndex={0}
                        key={sort}
                        onClick={() => handleSelectedSorting(sort)}
                      >
                        {sort}
                      </li>
                    )
                    )}
                  </ul>
                </form>
                {filteredOffers && filteredOffers.length > 0 && (<CardList dataOffers={filteredOffers} onHover={handleMouseOver} onHandlerMouseLeave={handleMouseLeave} />)}
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  {filteredOffers && filteredOffers.length !== 0 && (<Map city={activeCity} points={filteredOffers} selectedPoint={selectedPoint} />) }
                </section>
              </div>
            </div>) : (
            <div className="cities__places-container cities__places-container--empty container">
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">We could not find any property available at the moment in {activeCity.title}</p>
                </div>
              </section>
              <div className="cities__right-section"></div>
            </div>)}
        </div>
      </main>
    </>
  );
}

export default MainPage;


