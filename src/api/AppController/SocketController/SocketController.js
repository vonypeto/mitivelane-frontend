import { io } from "socket.io-client";
import { AUTH_TOKEN } from "redux/constants/Auth";
const IS_PROD = process.env.NODE_ENV === "production";
const URL = IS_PROD
  ? "https://mitivelane.herokuapp.com/"
  : "http://localhost:3000";
export const socket = io(URL, {
  withCredentials: true,
});

const authToken = localStorage.getItem(AUTH_TOKEN);
console.log(process.env.NODE_ENV);
socket.on("connect", () => {
  console.log("Im Connected ", socket.id);
  socket.emit("socket:add-user", authToken);
});
