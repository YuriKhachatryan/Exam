import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { API_ENDPOINT, LOCALSTORAGE } from "../constants";
import { AuthState, IUser } from "../interface/interface";

const initialState: AuthState = {
  isAuthenticated: localStorage.getItem(LOCALSTORAGE.IS_AUTH) === "true",
  loading: false,
  error: null,
  user: loadUserFromStorage(),
};

function loadUserFromStorage(): IUser | null {
  const userData = localStorage.getItem(LOCALSTORAGE.USER_INFO);
  if (userData) {
    try {
      return JSON.parse(userData);
    } catch (error) {
      console.error("Error parsing user data from local storage:", error);
    }
  }
  return null;
}

export const fetchEditUser = createAsyncThunk<
  any,
  { userId: string; userData: IUser }
>("auth/fetchEditUser", async ({ userId, userData }) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/users/${userId}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  } catch (error) {
    throw error;
  }
});

export const authenticateUser = createAsyncThunk(
  "auth/authenticateUser",
  async (credentials: { username: string; password: string }, thunkAPI) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/users`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const authData = await response.json();

      const user = authData.find(
        (u: { email: string; password: string }) =>
          u.email === credentials.username &&
          u.password === credentials.password
      );

      if (user) {
        thunkAPI.dispatch(setAuthenticated(true));
        thunkAPI.dispatch(setUser(user));
      } else {
        console.log("Invalid credentials");
      }

      return authData;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "An error occurred during authentication"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
      localStorage.setItem(
        LOCALSTORAGE.IS_AUTH,
        action.payload ? "true" : "false"
      );
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      localStorage.setItem(
        LOCALSTORAGE.USER_INFO,
        JSON.stringify(action.payload)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchEditUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      });
  },
});

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectUserData = (state: RootState) => state.auth.user;
export const selectLoading = (state: RootState) => state.auth.loading;
export const selectError = (state: RootState) => state.auth.error;
export const { setAuthenticated, setUser } = authSlice.actions;
export default authSlice.reducer;
