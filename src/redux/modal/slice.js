import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState:{
    modalType: null,
    modalProps: null,
    isModalOpen:false
  },
  reducers: {
    openModal: (state, action) => {
      state.modalType = action.payload.type
      state.modalProps = action.payload.props || null
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.modalType = null
      state.modalProps = null
      state.isModalOpen = false;
    }
  }
})

export const { openModal, closeModal } = modalSlice.actions
export const modalReducer = modalSlice.reducer;