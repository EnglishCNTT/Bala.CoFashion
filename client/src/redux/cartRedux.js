import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },

  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.quantity += 1;
      state.total += action.payload.price * action.payload.quantity;
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload.id
      );
      state.quantity -= action.payload.quantity;
      state.total -= action.payload.price * action.payload.quantity;
    },
    adjustQuantity: (state, action) => {
      state.quantity += action.payload;
    },
  },
});

export const { addProduct, removeProduct, adjustQuantity } = cartSlice.actions;
export default cartSlice.reducer;
