import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axiosUser from "../../api/axiosUser";

export const fetchUserById = createAsyncThunk("getData", async () => {
  const response = await axiosUser.getAll();
  return response.data;
});

export const filtersReducer = createSlice({
  name: "filters",
  initialState: {
    search: "",
    getAllData: [],
    getEditData: [],
    result: 0,
  },
  reducers: {
    ADD: (state, action) => {
      state.search += action.payload;
      axiosUser.postAll(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.getAllData = action.payload;
    });
  },
});

export default filtersReducer.reducer;
