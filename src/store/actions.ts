import { createAction } from '@reduxjs/toolkit';
import { CardProps } from '../components/card/card';
import { City } from '../types/types';
import { AuthorizationStatus, AppRoute } from '../const';

export const changeActiveCity = createAction<{currentCity:City}>('CHANGE_ACTIVE_CITY');
export const setOffersData = createAction<{offersData: CardProps[]}>('SET_OFFERS_DATA');
export const setOffersDataLoadingStatus = createAction<boolean>('SET_OFFERS_DATA_LOADING_STATUS');
// export const setOffersFullData = createAction<{offersFullData: OfferCards[]}>('SET_OFFERS_DATA');
export const requireAuthorization = createAction<AuthorizationStatus>('REQUIRE_AUTHORIZATION');
export const redirectToRoute = createAction<AppRoute>('REDIRECT_TO_ROUTE');
