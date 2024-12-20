import { configureStore, combineReducers } from "@reduxjs/toolkit";
import localSliceReducer from "./features/local/localSlice";
import authSliceReducer from "./features/auth/authSlice";
import { apiSlice } from "./features/api/apiSlice";
import alertsSliceReducer from "./features/alerts/alertsSlice";
import productsSliceReducer from "./features/products/productSlice";
import cartSliceReducer from "./features/cart/cartSlice";
import { rtkQueryErrorLogger } from "./middleware/errorLogger";

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
  local: localSliceReducer,
  auth: authSliceReducer,
  alerts: alertsSliceReducer,
  products: productsSliceReducer,
  cart: cartSliceReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (buildGetDefaultMiddleware) =>
      buildGetDefaultMiddleware()
        .concat(apiSlice.middleware)
        .concat(rtkQueryErrorLogger),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
