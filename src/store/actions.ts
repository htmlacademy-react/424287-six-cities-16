import { createAction } from '@reduxjs/toolkit';
import { CardProps } from '../components/card/card';
import { City } from '../types/types';
import { OfferCards } from '../pages/offer/offer';

export const changeActiveCity = createAction<{currentCity:City;offersData: CardProps[]}>('CHANGE_ACTIVE_CITY');
export const setOffersData = createAction<{offersFullData: OfferCards[]}>('SET_OFFERS_DATA');
export const setOffersDataLoadingStatus = createAction<boolean>('SET_OFFERS_DATA_LOADING_STATUS');
