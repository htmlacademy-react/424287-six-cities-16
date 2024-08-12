import { createAction } from '@reduxjs/toolkit';

export const changeActiveCity = createAction<{currentCity:string}>('CHANGE_ACTIVE_CITY');
