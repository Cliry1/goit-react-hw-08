import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



export const fetchContacts = createAsyncThunk("contacts/fetchContacts",
  async(_, thunkAPI)=>{
    try {
      const response = await axios.get("/contacts")
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const addContact = createAsyncThunk("contacts/addContacts",
  async({name,phoneNumber}, thunkAPI)=>{
    try {
      
      const response = await axios.post("/contacts", {name, phoneNumber: phoneNumber.toString()})
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const deleteContacts = createAsyncThunk("contacts/deleteContacts",
  async(id, thunkAPI)=>{

    try {
      await axios.delete(`/contacts/${id}`)
      return { _id: id };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

