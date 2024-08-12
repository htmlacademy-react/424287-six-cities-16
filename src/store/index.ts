import { configureStore } from '@reduxjs/toolkit';
import { reducer } from '../features/rental/rentalSlice';

export const store = configureStore({reducer:{rental: reducer}});
