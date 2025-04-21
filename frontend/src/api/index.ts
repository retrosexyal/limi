import axios, { AxiosResponse } from "axios";
import { UserDto } from "@shared/types";
import { USERS } from "./constants";

const API_URL = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: API_URL,
});

export const fetchExample = async () => {
  const res = await fetch("http://localhost:3000/example");
  return res.json();
};

export const getData = async <T>(url: string): Promise<T> => {
  const response = await instance.get<T>(url);
  return response.data;
};

export const createUser = async (
  body: UserDto
): Promise<AxiosResponse<UserDto>> => {
  return await instance.post(USERS, body);
};
