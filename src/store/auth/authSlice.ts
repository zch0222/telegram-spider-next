import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  user: { username: string } | null;
  isInitialized: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  isInitialized: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ username: string }>) => {
      state.isLoggedIn = true;
      state.user = { username: action.payload.username };
      state.isInitialized = true;
      if (typeof window !== 'undefined') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', action.payload.username);
      }
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.isInitialized = true;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
      }
    },
    initializeAuth: (state) => {
      if (typeof window !== 'undefined') {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const username = localStorage.getItem('username');
        if (isLoggedIn && username) {
          state.isLoggedIn = true;
          state.user = { username };
        } else {
            state.isLoggedIn = false;
            state.user = null;
        }
      }
      state.isInitialized = true;
    },
  },
});

export const { loginSuccess, logoutSuccess, initializeAuth } = authSlice.actions;

export default authSlice.reducer;
