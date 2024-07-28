// export const capitalizeFirstLetter = (word: string): string => word.charAt[0].toUpperCase() + word.slice(1);

import { CardProps } from './components/card/card';
type OfferCardByCity = {
    [key:string]:CardProps[];
}

export const getOfferCardsByCity = (offerCards:CardProps[]) => {
  const offerCardsByCity: OfferCardByCity = {};
  for(const card of offerCards) {
    if(!offerCardsByCity[card.city.name]) {
      offerCardsByCity[card.city.name] = [];
    }
    offerCardsByCity[card.city.name].push(card);
  }

  return offerCardsByCity;
};
