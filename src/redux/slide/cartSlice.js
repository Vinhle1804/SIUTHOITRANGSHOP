import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const cart = JSON.parse(localStorage.getItem("cart")) ?? [];

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [...cart],
  },
  reducers: {
    addtoCart(state, action) {
      // const newProduct = action.payload;
      let index = state.cart.findIndex((item) => item.id === action.payload.id);
      let cart = [...state.cart];

      if (index === -1) {
        cart.push({ ...action.payload, quantity: 1 });
        state.cart = cart;
      } else {
        state.cart[index].quantity += 1;
      }


      state.cart = cart;
      localStorage.setItem("cart", JSON.stringify(cart));

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "add successfully",
      });
    },

    removeItem(state, action) {
      const id = action.payload; // Payload chứa id của sản phẩm để xóa

      // Sao chép trạng thái giỏ hàng hiện tại
      let cart = [...state.cart];

      // Tìm chỉ số của sản phẩm cần xóa
      const index = cart.findIndex((item) => item.id === id);

      // Nếu sản phẩm tồn tại trong giỏ hàng, xóa sản phẩm đó
      if (index !== -1) {
        cart.splice(index, 1);
      }

      // Cập nhật trạng thái với giỏ hàng đã được thay đổi
      state.cart = cart;

      // Cập nhật localStorage với giỏ hàng đã được thay đổi
      localStorage.setItem("cart", JSON.stringify(cart));
    },
 
    increaseQuantity(state, action) {
      const id = action.payload;
      let cart = [...state.cart];
      const index = cart.findIndex((item) => item.id === id);

      if (index !== -1) {
        cart[index].quantity += 1;
      }

      state.cart = cart;
      localStorage.setItem("cart", JSON.stringify(cart));
    },
    decreaseQuantity(state, action) {
      const id = action.payload;
      let cart = [...state.cart];
      const index = cart.findIndex((item) => item.id === id);

      if (index !== -1) {
        cart[index].quantity -= 1;
      }

      state.cart = cart;
      localStorage.setItem("cart", JSON.stringify(cart));
    },
  },
});

export const { addtoCart,increaseQuantity, decreaseQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
