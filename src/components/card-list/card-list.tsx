import Card from '../card/card';
import { MainScreenProps } from '../../pages/main/main-page';

function CardList({dataOffers}:MainScreenProps):JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {dataOffers.map((item) => <Card key={item.id} data={item}/>)}
    </div>);
}

export default CardList;
