import { SORTING } from '../const.js';
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

export type LoginData = {
  id: number;
  email: string;
  token: string;
};

export interface UserData {
  name: string;
avatarUrl: string;
isPro: boolean;
email: string;
token: string;
}

export type Sorting = typeof SORTING[number];
