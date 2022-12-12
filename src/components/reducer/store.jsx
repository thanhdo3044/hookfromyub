import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "./reducer";

const store = configureStore({
  reducer: {
    filters: filtersReducer,
  },
});

export default store;
