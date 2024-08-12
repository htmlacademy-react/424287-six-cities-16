import { PayloadAction, createSlice} from '@reduxjs/toolkit';
import { CardProps } from '../../components/card/card';

type initialState = {
    currentCity: string;
    offers: CardProps[];
}
const initialState: initialState = {
  currentCity: 'Paris',
  offers: []

};

export const counterSlice = createSlice({
  name: 'rental',
  initialState,
  reducers: {
    setCurrentCity: (state,action:PayloadAction<string>) => {

      state.currentCity = action.payload;
    },
    setOfers: (state, action:PayloadAction<CardProps[]>) => {
      state.offers = action.payload;
    }
  },
});

export const {setCurrentCity, setOfers} = counterSlice.actions;
export const {actions, reducer} = counterSlice;
