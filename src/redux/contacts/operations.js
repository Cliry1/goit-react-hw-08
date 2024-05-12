import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchContacts = createAsyncThunk("contacts/fetchContacts",
  async(_, thunkAPI)=>{
    try {
      const response = await axios.get("https://connections-api.herokuapp.com/contacts")
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const addContact = createAsyncThunk("contacts/addContacts",
  async({name,number}, thunkAPI)=>{
    try {
      const response = await axios.post("https://connections-api.herokuapp.com/contacts", {name, number})
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const deleteContacts = createAsyncThunk("contacts/deleteContacts",
  async(id, thunkAPI)=>{
    try {
      const response = await axios.delete(`https://connections-api.herokuapp.com/contacts/${id}`)
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

