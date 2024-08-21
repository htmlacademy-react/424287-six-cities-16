import {store} from '../store/index.js';

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

export type UserData = {
  id: number;
  email: string;
  token: string;
};

