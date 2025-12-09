import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContacts } from "./operations";
import { logout } from "../auth/operations";
const handlePending = (state)=>{
  state.loading = true;
}
const handleRejected = (state, action)=>{
  state.loading = false;
  state.error = action.payload;
}
const contactsSlice = createSlice({
  name:"contacts",
  initialState: {
    items:[],
    loading:false,
    error:null
  },

  extraReducers:(builder)=>{
    builder.addCase(fetchContacts.pending, handlePending)
    .addCase(fetchContacts.fulfilled, (state, action) =>{
      state.loading = false;
      state.error = null;
      state.items = action.payload;
    })
    .addCase(fetchContacts.rejected, handleRejected)
    .addCase(addContact.pending, handlePending)
    .addCase(addContact.fulfilled, (state, action)=>{
      state.loading = false;
      state.error = null;
      state.items.unshift(action.payload);
    })
    .addCase(addContact.rejected, handleRejected)
    .addCase(deleteContacts.pending, handlePending)
    .addCase(deleteContacts.fulfilled, (state, action)=>{
      state.loading = false;
      state.error = null;
      const index = state.items.findIndex((contact)=>contact._id===action.payload._id)
      state.items.splice(index,1)
    })
    .addCase(deleteContacts.rejected, handleRejected)
    .addCase(logout.fulfilled, state =>{
      state.loading=false;
      state.items = [];
    })
    .addCase(logout.pending, handlePending)
    .addCase(logout.rejected, handleRejected)
  }
})


export const contactsReducer = contactsSlice.reducer;