import {selectNameFilter} from "../filters/selectors"
import { createSelector } from "@reduxjs/toolkit";

export const selectContacts = state=> state.contacts.items;
export const selectFilteredContacts = createSelector([selectContacts, selectNameFilter], (tasks, filter)=>{
  return tasks.filter((contact)=>contact.name.toLowerCase().includes(filter.toLowerCase()))
} )
export const selectIsLoading = state=>state.contacts.loading;
export const selectError = state=>state.contacts.error;