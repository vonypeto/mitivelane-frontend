import axios from "axios";
import { message } from "antd";
import { SESSION_TOKEN } from "redux/constants/Auth";
export async function logOut(signOut, generateToken) {
  const data = {
    session_token: localStorage.getItem(SESSION_TOKEN),
  };
  const token = generateToken();
  console.log(token);
  await axios
    .post("/api/logout", data, token[1])
    .then((response) => {
      if (response.data.length > 0) {
        return signOut();
      }
    })
    .catch((error) => {
      console.log(error);
      return message.error(error.message);
    });
}
