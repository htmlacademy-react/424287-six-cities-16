import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/types';
import { APIRoute } from '../const';
import { setOffersData, setOffersDataLoadingStatus } from './actions';
import { CardProps } from '../components/card/card';

export const fetchOfferAction = createAsyncThunk<void, undefined, {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(
  'fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<{offersData: CardProps[]}>(APIRoute.Offers);
    dispatch(setOffersData(data));
    dispatch(setOffersDataLoadingStatus(false));

  },
);

// export const checkAuthAction = createAsyncThunk<void, undefined, {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(
//   'user/checkAuth',
//   async (_arg, {extra: api}) => {
//     await api.get(AppRoute.Login);
//   },
// );
