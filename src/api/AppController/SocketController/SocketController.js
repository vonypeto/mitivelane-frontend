import { io } from "socket.io-client";
import { AUTH_TOKEN } from "redux/constants/Auth";

export const socket = io("/");

const authToken = localStorage.getItem(AUTH_TOKEN);

socket.on("connect", () => {
  console.log("Im Connected to Socket id ", socket.id);
  socket.emit("socket:add-user", authToken);
});
