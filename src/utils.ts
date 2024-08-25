// export const capitalizeFirstLetter = (word: string): string => word.charAt[0].toUpperCase() + word.slice(1);

import { CardProps } from './types/types';
import { Comment } from './pages/offer/offer';

type OfferCardByCity = {
    [key:string]:CardProps[];
}

import { Sorting } from './types/types';
import dayjs from 'dayjs';


const DateFormat = {
  DAY_FORMAT: 'MMMM D',
  MACHINE_FORMAT: 'YYYY-MM-DD',
} ;

export const getOfferCardsByCity = (offerCards:CardProps[]) => {
  const offerCardsByCity: OfferCardByCity = {};
  for(const card of offerCards) {
    if(card.isFavorite) {
      if(!offerCardsByCity[card.city.name]) {
        offerCardsByCity[card.city.name] = [];
      }
      offerCardsByCity[card.city.name].push(card);
    }
  }
  return offerCardsByCity;
};

export const getActiveOffersLength = (count: number): string => `place${count > 1 ? 's' : ''}`;
export const getCount = (count: number): string => `${count > 1 ? 's' : ''}`;

export const getSortedOffers = ({filteredOffers, sort}: {
  filteredOffers: CardProps[];
  sort: Sorting;
}): CardProps[] => {
  switch (sort) {
    case 'Price: low to high':
      return [...filteredOffers].sort((a, b) => a.price - b.price);
    case 'Price: high to low':
      return [...filteredOffers].sort((a, b) => b.price - a.price);
    case 'Top rated first':
      return [...filteredOffers].sort((a, b) => b.rating - a.rating);
    case 'Popular':
      return filteredOffers;
    default:
      return filteredOffers;
  }
};

export const humanizeDueDate = (dueDate:string) => dueDate ? dayjs(dueDate).format(DateFormat.DAY_FORMAT) : '';
export const machineDueFormat = (dueDate:string) => dueDate ? dayjs(dueDate).format(DateFormat.MACHINE_FORMAT) : '';

export const sortEventsBy = (comments: Comment[]) => [...comments].sort((a, b) => dayjs(b.date).diff(dayjs(a.date)));
