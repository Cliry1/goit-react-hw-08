import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContacts } from "./operations";
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
      state.items.push(action.payload);
    })
    .addCase(addContact.rejected, handleRejected)
    .addCase(deleteContacts.pending, handlePending)
    .addCase(deleteContacts.fulfilled, (state, action)=>{
      state.loading = false;
      state.error = null;
      const index = state.items.findIndex((contact)=>{contact.id===action.payload.id})
      state.items.splice(index,1)
    })
    .addCase(deleteContacts.rejected, handleRejected)
  }
})


export const contactsReducer = contactsSlice.reducer;