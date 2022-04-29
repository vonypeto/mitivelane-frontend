import { io } from "socket.io-client";
import { AUTH_TOKEN } from "redux/constants/Auth";
const IS_PROD = process.env.NODE_ENV === "production";
const URL = IS_PROD
  ? "https://mitivelane.herokuapp.com"
  : "https://localhost:3000";
export const socket = io(URL, {
	 transports: ["polling", "websocket"]
});

const authToken = localStorage.getItem(AUTH_TOKEN);
console.log(process.env.NODE_ENV);

socket.on("connect", () => {
  console.log("Im Connected to Socket id ", socket.id);
  socket.emit("socket:add-user", authToken);
});

socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});
