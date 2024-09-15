import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk async để xử lý đăng nhập
export const login = createAsyncThunk("login", async (inforLogin) => {
  const res = await axios.get("http://localhost:3000/userList");
  return {
    users: res.data, // Cú pháp return đã được chỉnh sửa để trả về đối tượng
    inforLogin: inforLogin,
  };
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    userList: [],
    isError: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true; // Đặt trạng thái đang tải
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("action", action.payload);
        state.isLoading = false; // Đặt lại trạng thái đang tải
        state.userList = action.payload.users; // Cập nhật state với danh sách người dùng đã lấy
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false; // Xử lý lỗi (tùy chọn)
        state.isError= true
      });
  },
});

export default userSlice.reducer;

