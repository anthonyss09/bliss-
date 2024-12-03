import { isRejected } from "@reduxjs/toolkit";
import type { Middleware } from "@reduxjs/toolkit";

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejected(action)) {
    console.log("We got a rejected action!");
    console.log(action);
  }

  return next(action);
};
