import Card, { CardProps } from '../card/card';

type MainScreenProps = {
  dataOffers: CardProps[];
  onHover: (id:string) => void;
  onHandlerMouseLeave:() => void;
}

function CardList({dataOffers,onHover,onHandlerMouseLeave}:MainScreenProps):JSX.Element {

  return (
    <div className="cities__places-list places__list tabs__content">
      {dataOffers.map((item) => <Card onMouseOver={() =>onHover(item.id)} onMouseLeave={() =>onHandlerMouseLeave()} key={item.id} data={item}/>)}
    </div>);
}

export default CardList;
