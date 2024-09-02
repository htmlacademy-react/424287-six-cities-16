import { createReducer} from '@reduxjs/toolkit';
import { changeActiveCity, setOffersData,setOffersDataLoadingStatus, requireAuthorization, setFavoriteOffersData } from './actions';
import { CITIES_MOCKS } from '../mock/city';
import { City, UserData } from '../types/types';
import { CardProps } from '../types/types';
import { OfferCard } from '../types/types';
import { AuthorizationStatus } from '../const';

interface initialStateProps {
  CurrentCity: City;
  OffersData: undefined | CardProps[];
  OffersFullData: undefined | OfferCard[];
  IsOffersDataLoading: boolean;
  AuthorizationStatus:AuthorizationStatus;
  User: undefined | UserData;
  FavoritesOffersData: undefined | CardProps[];
}

const InitialState: initialStateProps = {
  CurrentCity: CITIES_MOCKS[0],
  OffersData: undefined,
  OffersFullData: undefined,
  IsOffersDataLoading: false,
  AuthorizationStatus: AuthorizationStatus.Unknown,
  User: undefined,
  FavoritesOffersData:undefined
} as const;

export const reducer = createReducer(InitialState,(builder) => {
  builder
    .addCase(changeActiveCity,(state,action)=>{
      state.CurrentCity = action.payload.currentCity;
    })
    .addCase(setOffersData,(state,action)=>{
      state.OffersData = action.payload.offersData;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.IsOffersDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.AuthorizationStatus = action.payload.authStatus;
      state.User = action.payload.userData;
    })
    .addCase(setFavoriteOffersData, (state, action) => {
      state.FavoritesOffersData = action.payload.favoritesOffersData;
    });

});


