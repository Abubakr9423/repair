import { axiosRequest, SaveTokens } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (values: any, { rejectWithValue }: any) => {
    try {
      const response = await axiosRequest.post("/auth/login/", values);

      const { access, refresh } = response.data;

      if (access && refresh) {
        SaveTokens(access, refresh);
      }

      return response.data;
    } catch (error: any) {
      console.error(error);

      const message =
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "Login failed";

      return rejectWithValue(message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (values: any, { rejectWithValue }) => {
    try {
      const response = await axiosRequest.post("/auth/register/", values);

      const { access, refresh } = response.data;

      if (access && refresh) {
        SaveTokens(access, refresh);
      }

      return response.data;
    } catch (error: any) {
      console.error(error);

      const message =
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "Registration failed";

      return rejectWithValue(message);
    }
  }
);