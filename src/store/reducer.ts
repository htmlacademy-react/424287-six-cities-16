import { createReducer} from '@reduxjs/toolkit';
import { changeActiveCity } from './actions';
type initialState = {
    currentCity: string;
}
const initialState: initialState = {
  currentCity: 'Paris',

};

export const reducer = createReducer(initialState,(builder) => {
  builder
    .addCase(changeActiveCity,(state,action)=>{
      console.log(state,action);
      state.currentCity = action.payload.currentCity;
    });
});
