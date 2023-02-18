import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

import { darkTheme, lightTheme } from '../styles/Theme';

// Define a type for the slice state
interface themeProps {
  theme: typeof darkTheme | typeof lightTheme;
}

// Define the initial state using that type
const initialState: themeProps = {
  theme: darkTheme || lightTheme,
};

export const themeSlice = createSlice({
  name: 'theme',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setTheme: (
      state,
      action: PayloadAction<typeof darkTheme | typeof lightTheme>
    ) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
