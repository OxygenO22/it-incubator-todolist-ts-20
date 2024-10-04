import axios from "axios"

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "c658e6f4-b2ed-4db1-aa3f-e647bb94e78c",
  },
})
