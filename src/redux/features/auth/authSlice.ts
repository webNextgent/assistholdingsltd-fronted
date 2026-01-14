import { createSlice } from "@reduxjs/toolkit";

export type TUser = {
  userId: string | null;
  name: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
  profilePhoto?: string;
  gender: string;
  needPasswordChange?: string;
};

type TAuthState = {
  user: null | TUser;
  token: null | string;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;