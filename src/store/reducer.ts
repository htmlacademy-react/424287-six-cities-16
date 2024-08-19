import { createReducer} from '@reduxjs/toolkit';
import { changeActiveCity, setOffersData,setOffersDataLoadingStatus} from './actions';
// import { DATA, OFFERS_DATA } from '../mock/offers';
import { CITIES_MOCKS } from '../mock/city';

const initialState = {
  currentCity: CITIES_MOCKS[0],
  offersData: [],
  offersFullData: [],//???
  isOffersDataLoading: false,
};

export const reducer = createReducer(initialState,(builder) => {
  builder
    .addCase(changeActiveCity,(state,action)=>{
      state.currentCity = action.payload.currentCity;
    })
    .addCase(setOffersData,(state,action)=>{
      state.offersFullData = action.payload.offersFullData;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    });

});


