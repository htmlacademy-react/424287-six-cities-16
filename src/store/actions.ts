import { createAction } from '@reduxjs/toolkit';
import { CardProps } from '../components/card/card';
import { City } from '../types/types';

export const changeActiveCity = createAction<{currentCity:City}>('CHANGE_ACTIVE_CITY');
export const setOffersData = createAction<{offersData: CardProps[]}>('SET_OFFERS_DATA');
export const setOffersDataLoadingStatus = createAction<boolean>('SET_OFFERS_DATA_LOADING_STATUS');
// export const setOffersFullData = createAction<{offersFullData: OfferCards[]}>('SET_OFFERS_DATA');
