import { createReducer} from '@reduxjs/toolkit';
import { changeActiveCity, setOffersData,setOffersDataLoadingStatus } from './actions';
import { CITIES_MOCKS } from '../mock/city';
import { City } from '../types/types';
import { CardProps } from '../components/card/card';
import { OfferCards } from '../pages/offer/offer';

interface initialStateProps {
  currentCity: City;
  offersData: undefined | CardProps[];
  offersFullData: undefined | OfferCards[];
  isOffersDataLoading: boolean;
}

const initialState: initialStateProps = {
  currentCity: CITIES_MOCKS[0],
  offersData: undefined,
  offersFullData: undefined,
  isOffersDataLoading: false,
};

export const reducer = createReducer(initialState,(builder) => {
  builder
    .addCase(changeActiveCity,(state,action)=>{
      state.currentCity = action.payload.currentCity;
    })
    .addCase(setOffersData,(state,action)=>{
      state.offersData = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    });

});


