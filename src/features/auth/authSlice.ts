import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { User } from 'models/user';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  loading: boolean;
  currentUser: User | undefined;
}

const initialState: AuthState = {
  isLoggedIn: false,
  loading: false,
  currentUser: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state: AuthState, action: PayloadAction<LoginPayload>) {
      state.loading = true;
    },
    loginSuccess(state: AuthState, action: PayloadAction<User>) {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailed(state: AuthState, action: PayloadAction<string>) {
      state.loading = false;
    },
    logout(state: AuthState) {
      state.isLoggedIn = false;
      state.currentUser = undefined;
    },
  },
});

// Actions
export const authActions = authSlice.actions;

// Selectors
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsLoading = (state: RootState) => state.auth.loading;

// Reducer

const authReducer = authSlice.reducer;

export default authReducer;
