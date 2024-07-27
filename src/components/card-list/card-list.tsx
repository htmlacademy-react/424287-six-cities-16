import Card from '../card/card';
import { MainScreenProps } from '../../pages/main/main-page';
import { useState } from 'react';

function CardList({dataOffers}:MainScreenProps):JSX.Element {
  const [, setActiveCard] = useState<string|undefined>(undefined);
  const handleMouseOver = (id:string) => {
    setActiveCard(id);
  };
  return (
    <div className="cities__places-list places__list tabs__content">
      {dataOffers.map((item) => <Card onMouseOver={() =>handleMouseOver(item.id)} key={item.id} data={item}/>)}
    </div>);
}

export default CardList;
