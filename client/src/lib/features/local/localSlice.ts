import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

interface LocalState {
  bigSidebarOpen: boolean;
}

const initialState = {
  bigSidebarOpen: false,
} satisfies LocalState as LocalState;

const localSlice = createSlice({
  name: "local",
  initialState,
  reducers: {},
});

export const selectLocalData = (state: RootState) => state.local;

export default localSlice.reducer;
