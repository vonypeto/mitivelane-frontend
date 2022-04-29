import { io } from "socket.io-client";
import { AUTH_TOKEN } from "redux/constants/Auth";
const IS_PROD = process.env.NODE_ENV === "production";
const URL = IS_PROD
  ? "wss://mitivelane.herokuapp.com/"
  : "ws://localhost:3000";
export const socket = io(URL, {
	 transports: ["websocket"]
});

const authToken = localStorage.getItem(AUTH_TOKEN);
console.log(process.env.NODE_ENV);
socket.on("connect", () => {
  console.log("Im Connected to Socket id ", socket.id);
  socket.emit("socket:add-user", authToken);
});
