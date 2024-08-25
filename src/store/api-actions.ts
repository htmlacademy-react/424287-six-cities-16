import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { AppDispatch, State, UserData, AuthData } from '../types/types';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { redirectToRoute, requireAuthorization, setFavoriteOffersData, setOffersData, setOffersDataLoadingStatus } from './actions';
import { CardProps } from '../types/types';
import { dropToken, saveToken } from '../services/token';

export const fetchOfferAction = createAsyncThunk<void, undefined, {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(
  'fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    const { data } = await api.get<CardProps[]>(APIRoute.Offers);
    dispatch(setOffersData({ offersData: data }));
    dispatch(setOffersDataLoadingStatus(false));

  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<UserData>(APIRoute.Login);
      dispatch(requireAuthorization({userData: data, authStatus: AuthorizationStatus.Auth}));
    } catch {
      dispatch(requireAuthorization({userData: undefined, authStatus: AuthorizationStatus.NoAuth}));
    }
  },
);


export const loginAction = createAsyncThunk<void, AuthData, {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    const {data} = await api.get<UserData>(APIRoute.Login);
    dispatch(requireAuthorization({userData: data, authStatus: AuthorizationStatus.Auth}));
    dispatch(redirectToRoute(AppRoute.Root));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization({userData: undefined, authStatus: AuthorizationStatus.NoAuth}));
  },
);

export const fetchFavoriteOfferAction = createAsyncThunk<void, undefined, {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(
  'fetchFavoriteOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<CardProps[]>(`${APIRoute.Favorite}`);
    dispatch(setFavoriteOffersData({favoritesOffersData: data}));
  },
);
