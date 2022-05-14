import { createContext } from "react"
import { io } from "socket.io-client";
import { AUTH_TOKEN } from "redux/constants/Auth";
const IS_PROD = process.env.NODE_ENV === "production";
const URL = IS_PROD
  ? "https://mitivelane.herokuapp.com"
  : "http://localhost:5000";

export const socket = io(URL);
export const SocketContext = createContext();

const authToken = localStorage.getItem(AUTH_TOKEN);
// console.log(process.env.NODE_ENV);

socket.on("connect", () => {
  console.log("Im Connected to Socket id ", socket.id);
  socket.emit("socket:add-user", authToken);
});

socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
  socket.io.opts.transports = ["websocket", "polling", "flashsocket"]
});

socket.on("socket:new-user", authToken => {
  console.log("New user connected with authToken ", authToken)
})
