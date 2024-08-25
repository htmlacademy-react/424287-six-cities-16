import { createAction } from '@reduxjs/toolkit';
import { CardProps } from '../types/types';
import { City, UserData } from '../types/types';
import { AuthorizationStatus, AppRoute } from '../const';

export const changeActiveCity = createAction<{currentCity:City}>('CHANGE_ACTIVE_CITY');
export const setOffersData = createAction<{offersData: CardProps[]}>('SET_OFFERS_DATA');
export const setOffersDataLoadingStatus = createAction<boolean>('SET_OFFERS_DATA_LOADING_STATUS');
export const requireAuthorization = createAction<{userData: UserData | undefined ; authStatus: AuthorizationStatus}>('REQUIRE_AUTHORIZATION');
export const redirectToRoute = createAction<AppRoute>('REDIRECT_TO_ROUTE');
export const setFavoriteOffersData = createAction<{favoritesOffersData: CardProps[]}>('SET_FAVORITE_OFFERS_DATA');

