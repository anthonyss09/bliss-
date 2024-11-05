import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

interface AlertsState {
  showAlert: boolean;
  alertMessage: string;
  alertType: string;
}

const initialState = {
  showAlert: false,
  alertMessage: "",
  alertType: "",
} satisfies AlertsState as AlertsState;

const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    showAlert(state, action) {
      state.showAlert = true;
      state.alertMessage = action.payload.alertMessage;
      state.alertType = action.payload.alertType;
    },
    clearAlert(state, action) {
      state.showAlert = false;
      state.alertMessage = "";
      state.alertType = "";
    },
  },
});

export const selectAlertData = (state: RootState) => state.alerts;

export const { showAlert, clearAlert } = alertsSlice.actions;

export default alertsSlice.reducer;
