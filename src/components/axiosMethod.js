import axios from "axios";

const BASE_URL = "https://iperfume.herokuapp.com/api";
// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

const user = JSON.parse(localStorage.getItem("user"))

export const publicRequest = axios.create({
  baseURL: "https://iperfume.herokuapp.com/api",
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${user?.token}`}
});