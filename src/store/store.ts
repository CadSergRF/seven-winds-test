import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { instantsApi } from './api/instants.api';
import rowsViewReducer from './rows.slice';

const rootReducer = combineReducers({
  rowsView: rowsViewReducer,
  [instantsApi.reducerPath]: instantsApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(instantsApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
