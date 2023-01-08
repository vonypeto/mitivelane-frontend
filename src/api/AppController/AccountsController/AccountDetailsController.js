import axios from "axios";
import { PROFILE_URL } from "redux/constants/Auth";
import { message } from "antd";

export async function updateAccount(
  values,
  profileAvatar,
  currentUser,
  setDisplayName,
  setProfileAvatar,
  setEditOrganization,
  setLoadingButton,
  generateToken
) {
  const data = {
    full_name: values.name,
    profile_url: profileAvatar,
  };

  await axios
    .post("/api/app/user/update", data, generateToken()[1])
    .then((response) => {
      setTimeout(() => {
        let data = JSON.parse(localStorage.getItem(PROFILE_URL));
        data.profile_data = response.data.profile_url;
        // localStorage.setitem(PROFILE_URL, JSON.stringify(data));
        setProfileAvatar(response.data?.profile_url);
        setDisplayName(response.data?.full_name);
        localStorage.setItem(PROFILE_URL, JSON.stringify(data));
        currentUser.updateProfile({
          displayName: response.data?.full_name,
        });
        setLoadingButton(false);
        setEditOrganization(false);
      }, 1000);
      return;
    })
    .catch((error) => {
      console.log(error);
      return message.error(error.message);
    });
}
export async function deleteSession(session_id, generateToken, setShowMessage) {
  const data = {
    session_id: session_id,
  };
  axios
    .post("/api/app/user/sessions/delete", data, generateToken()[1])
    .then((_) => {
      return setShowMessage({
        show: true,
        message: "Delete sucessful",
        type: "success",
      });
    })
    .catch((err) => {
      console.log(err);

      return setShowMessage({
        show: true,
        message: "Delete unsucessful",
        type: "error",
      });
    });
}
