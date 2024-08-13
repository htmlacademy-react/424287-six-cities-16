import { createReducer} from '@reduxjs/toolkit';
import { changeActiveCity, changeOfferData } from './actions';
import { DATA } from '../mock/offers';

const initialState = {
  currentCity: 'Paris',
  DATA

};

export const reducer = createReducer(initialState,(builder) => {
  builder
    .addCase(changeActiveCity,(state,action)=>{
      // console.log(state,action);
      state.currentCity = action.payload.currentCity;
    })
    .addCase(changeOfferData,(state,action)=>{
      console.log(state,action);
      const {currentCity, DATA} = action.payload;
      state.DATA = DATA.filter((offer) => offer.city.name === currentCity);
    });
});


