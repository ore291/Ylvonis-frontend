import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  uploadProgress: 0,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchDb: (state, action) => {
      state.title = action.payload;
    },
    clearTitle: (state) => {
      state.title = "";
    },
    setUploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    },
  },
});

export const { clearTitle, searchDb, setUploadProgress } = searchSlice.actions;

export default searchSlice.reducer;
