import {store} from '../store/index.js';

export type CardProps = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: {
      name: string;
      location: {
          latitude: number;
          longitude: number;
          zoom: number;
      };
  };
  location: {
      latitude: number;
      longitude: number;
      zoom: number;
  };
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
}


export type OfferCard = Omit<CardProps, 'previewImage'> & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  };
  images: string[];
  maxAdults: number;
 }

export type City = {
    title: string;
    lat: number;
    lng: number;
    zoom: number;
  };

export type Point = {
    title: string;
    lat: number;
    lng: number;
  };

export type Points = Point[];

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch

export type AuthData = {
  login: string;
  password: string;
};

export interface UserData {
  name: string;
avatarUrl: string;
isPro: boolean;
email: string;
token: string;
password: string;
}

export type Sorting = 'Popular'| 'Price: low to high'| 'Price: high to low' | 'Top rated first';
