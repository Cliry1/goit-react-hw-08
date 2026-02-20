import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContacts, changeContact } from "./operations";
import { logout } from "../auth/operations";
const handlePending = (state)=>{
  state.loading = true;
}
const handleRejected = (state)=>{
  state.loading = false;
}
const contactsSlice = createSlice({
  name:"contacts",
  initialState: {
    items:[],
    loading:false,
  },

  extraReducers:(builder)=>{
    builder
    .addCase(fetchContacts.pending, handlePending)
    .addCase(fetchContacts.fulfilled, (state, action) =>{
      state.loading = false;
      state.items = action.payload;
    })
    .addCase(fetchContacts.rejected, handleRejected)



    .addCase(addContact.pending, handlePending)
    .addCase(addContact.fulfilled, (state, action)=>{
      state.loading = false;
      state.items.unshift(action.payload);
    })
    .addCase(addContact.rejected, handleRejected)


    .addCase(deleteContacts.pending, handlePending)
    .addCase(deleteContacts.fulfilled, (state, action)=>{
      state.loading = false;
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



    .addCase(changeContact.pending, handlePending)
    .addCase(changeContact.fulfilled, (state, action)=>{
      state.loading = false;
      const index = state.items.findIndex((contact)=>contact._id===action.payload.contact._id);
      state.items[index]= action.payload.contact;
    })
    .addCase(changeContact.rejected, handleRejected)
  }
})


export const contactsReducer = contactsSlice.reducer;