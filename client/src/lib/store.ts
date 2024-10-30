import { configureStore, combineReducers } from "@reduxjs/toolkit";
import localSliceReducer from "./features/local/localSlice";
import authSliceReducer from "./features/auth/authSlice";
import { apiSlice } from "./features/api/apiSlice";

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
  local: localSliceReducer,
  auth: authSliceReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const makeStore = (preloadedState: any) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (buildGetDefaultMiddleware: any) =>
      buildGetDefaultMiddleware().concat(apiSlice.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
