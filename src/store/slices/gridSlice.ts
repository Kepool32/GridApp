import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rows: 10,
  cols: 15,
};

const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {},
});

export default gridSlice.reducer;
