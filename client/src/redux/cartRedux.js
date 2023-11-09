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
        (product) => product._id !== action.payload
      );
      state.quantity -= 1;
      state.total -= action.payload.price * action.payload.quantity;
    },
    adjustQuantity: (state, action) => {
      state.quantity += action.payload;
    },
    resetCart: () => {
      return {
        products: [],
        quantity: 0,
        total: 0,
      };
    },
  },
});

export const { addProduct, removeProduct, adjustQuantity, resetCart } =
  cartSlice.actions;
export default cartSlice.reducer;
