import { createReducer} from '@reduxjs/toolkit';
import { changeActiveCity, setOffersData,setOffersDataLoadingStatus, requireAuthorization, setFavoriteOffersData } from './actions';
import { CITIES_MOCKS } from '../mock/city';
import { City, UserData } from '../types/types';
import { CardProps } from '../types/types';
import { OfferCard } from '../types/types';
import { AuthorizationStatus } from '../const';

interface initialStateProps {
  currentCity: City;
  offersData: undefined | CardProps[];
  offersFullData: undefined | OfferCard[];
  isOffersDataLoading: boolean;
  authorizationStatus:AuthorizationStatus;
  user: undefined | UserData;
  favoritesOffersData: undefined | CardProps[];
}

const initialState: initialStateProps = {
  currentCity: CITIES_MOCKS[0],
  offersData: undefined,
  offersFullData: undefined,
  isOffersDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: undefined,
  favoritesOffersData:undefined
} as const;

export const reducer = createReducer(initialState,(builder) => {
  builder
    .addCase(changeActiveCity,(state,action)=>{
      state.currentCity = action.payload.currentCity;
    })
    .addCase(setOffersData,(state,action)=>{
      state.offersData = action.payload.offersData;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload.authStatus;
      state.user = action.payload.userData;
    })
    .addCase(setFavoriteOffersData, (state, action) => {
      state.favoritesOffersData = action.payload.favoritesOffersData;
    });

});


