import { createAction } from '@reduxjs/toolkit';
import { CardProps } from '../components/card/card';

export const changeActiveCity = createAction<{currentCity:string;DATA: CardProps[]}>('CHANGE_ACTIVE_CITY');
export const changeOfferData = createAction<{currentCity:string;DATA: CardProps[]}>('CHANGE_OFFER_DATA');

