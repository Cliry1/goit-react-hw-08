import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

export const fetchContacts = createAsyncThunk("contacts/fetchContacts",
  async(_, thunkAPI)=>{
    try {
      const response = await axios.get("/contacts")
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const addContact = createAsyncThunk("contacts/addContacts",
  async({name,number}, thunkAPI)=>{
    try {
      const response = await axios.post("/contacts", {name, number})
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const deleteContacts = createAsyncThunk("contacts/deleteContacts",
  async(id, thunkAPI)=>{
    try {
      const response = await axios.delete(`/contacts/${id}`)
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

