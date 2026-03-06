import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchWithRefresh } from "../auth/operations";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (_, thunkAPI) => {
    return fetchWithRefresh(thunkAPI, async () => {
      const response = await axios.get("/contacts",{}, { withCredentials: true });
      return response.data.data;
    });
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (formData, thunkAPI) => {
    return fetchWithRefresh(thunkAPI, async () => {
      const response = await axios.post("/contacts", formData, { withCredentials: true });
      return response.data.data;
    });
  }
);

export const deleteContacts = createAsyncThunk(
  "contacts/deleteContact",
  async (id, thunkAPI) => {
    return fetchWithRefresh(thunkAPI, async () => {
      await axios.delete(`/contacts/${id}`,{}, { withCredentials: true });
      return { _id: id};
    });
  }
);

export const changeContact = createAsyncThunk(
  "contacts/changeContact",
  async ({ id, formData }, thunkAPI) => {
    return fetchWithRefresh(thunkAPI, async () => {
      const response = await axios.patch(`/contacts/${id}`, formData, {withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.data;
    });
  }
);
