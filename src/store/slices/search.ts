import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  title : ""
}


const searchSlice = createSlice({
  name : 'search',
  initialState,
  reducers: {
    searchDb : (state, action)=>{
      state.title = action.payload
    },
    clearTitle: (state) =>{
      state.title = "";
    }
  }
})

export const {clearTitle, searchDb} = searchSlice.actions



export default searchSlice.reducer;