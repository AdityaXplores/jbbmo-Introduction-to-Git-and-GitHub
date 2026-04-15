import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const item = action.payload;
      const existingItem = state.items.find(i => i.id === item.id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }

      state.totalQuantity++;
      state.totalPrice += item.price;
    },

    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(i => i.id === id);

      if (!existingItem) return;

      state.totalQuantity -= existingItem.quantity;
      state.totalPrice -= existingItem.price * existingItem.quantity;

      state.items = state.items.filter(i => i.id !== id);
    },

    updateQuantity(state, action) {
      const { id, type } = action.payload;
      const item = state.items.find(i => i.id === id);

      if (!item) return;

      if (type === "increase") {
        item.quantity++;
        state.totalQuantity++;
        state.totalPrice += item.price;
      } else if (type === "decrease") {
        if (item.quantity > 1) {
          item.quantity--;
          state.totalQuantity--;
          state.totalPrice -= item.price;
        } else {
          // remove if quantity becomes 0
          state.items = state.items.filter(i => i.id !== id);
          state.totalQuantity--;
          state.totalPrice -= item.price;
        }
      }
    }
  }
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
