import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import countryData from '../db/data.json';
import { CountryTypes } from '../types/countryTypes';

// Define a type for the slice state
interface CountryState {
  countries: CountryTypes[] | any; // CountryTypes[] is an array of CountryTypes objects
  singleCountry: CountryTypes | any;
  regions: string[];
  isLoading: boolean;
  error: boolean;
}

// Define the initial state using that type
const initialState: CountryState = {
  countries: countryData,
  singleCountry: [],
  regions: [],
  isLoading: false,
  error: false,
};

export const countrySlice = createSlice({
  name: 'country',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setRegions: state => {
      let countryRegion = state.countries.map((country: CountryTypes) => {
        return country.region;
      });
      let uniqueRegion = [...new Set(countryRegion)];
      state.regions = ['All', ...(uniqueRegion as any)];
    },

    setError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload;
    },

    filterByRegion: (state, action: PayloadAction<string>) => {
      // if action.payload is 'All' then return all countries
      if (action.payload === 'All') {
        return {
          ...state,
          countries: countryData,
        };
      }
      state.countries = countryData.filter(
        country => country.region === action.payload
      );
    },

    // filter pay input value payload
    filterByInput: (state, action: PayloadAction<string>) => {
      state.countries = countryData.filter(
        country =>
          country.name.toLowerCase().includes(action.payload.toLowerCase()) ||
          country.capital?.toLowerCase().includes(action.payload.toLowerCase())
      );
    },

    // singleCountry
    setSingleCountry: (state, action: PayloadAction<string>) => {
      const decode = decodeURIComponent(action.payload);

      let singleFilter = (state.singleCountry = countryData.filter(
        country =>
          country.name === decode ||
          country.alpha2Code === decode ||
          country.alpha3Code === decode
      ));

      if (singleFilter.length === 0) {
        state.error = true;
      } else {
        state.error = false;
      }
    },
  },
});

export const {
  filterByRegion,
  filterByInput,
  setRegions,
  setError,
  setSingleCountry,
} = countrySlice.actions;

export default countrySlice.reducer;
