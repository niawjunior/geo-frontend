import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { QUERY_KEY } from "../constants/queryKeys";
import { ResponseError } from "../utils/ResponseError";

import axios from "axios";
import { BASE_URL } from "../config/api";

export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

authApi.defaults.headers.common["Content-Type"] = "application/json";

// Axios instance and default configuration

export const refreshAccessToken = async () => {
  const response = await authApi.get("auth/refresh");
  return response.data;
};

authApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const errMessage = error.response.data.message;
    if (
      errMessage.includes("Invalid authorization token") &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      await refreshAccessToken();
      return authApi(originalRequest);
    }
    return Promise.reject(error);
  }
);

export const signUp = async (user) => {
  const response = await authApi.post("auth/register", user);
  return response.data;
};

export const getMe = async () => {
  const response = await authApi.get("users/me");
  return response.data;
};

export const signIn = async (user) => {
  const response = await authApi.post("auth/login", user);

  if (response.status !== 200) {
    throw new ResponseError("Failed on sign in request", response);
  }
  return await response.data;
};

export function useSignIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: signInMutation } = useMutation(
    ({ username, password }) => signIn({ username, password }),
    {
      onSuccess: (data) => {
        queryClient.setQueryData([QUERY_KEY.token], data);
        navigate("/");
      },
      onError: (error) => {
        enqueueSnackbar(error.response?.data?.message, {
          variant: "error",
        });
      },
    }
  );

  return signInMutation;
}
