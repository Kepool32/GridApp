import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedCell {
  cell: string;
  color: string;
}

interface ColorState {
  color: string;
  selected: SelectedCell[];
}

const initialState: ColorState = {
  color: "",
  selected: [],
};

const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    setColor: (state, action: PayloadAction<SelectedCell>) => {
      const { cell, color } = action.payload;
      const existingCell = state.selected.find((item) => item.cell === cell);
      if (existingCell) {
        existingCell.color = color;
      } else {
        state.selected.push({ cell, color });
      }
    },
    clearAllColors: (state) => {
      state.selected = [];
    },
  },
});

export const { setColor, clearAllColors } = colorSlice.actions;
export default colorSlice.reducer;
