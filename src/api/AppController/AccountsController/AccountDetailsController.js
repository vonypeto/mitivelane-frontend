import axios from "axios";
import { PROFILE_URL } from "redux/constants/Auth";

export async function updateAccount(
  values,
  profileAvatar,
  currentUser,
  setDisplayName,
  setProfileAvatar,
  setPhoto,
  setIsLoading
) {
  const data = {
    full_name: values.name,
    profile_url: profileAvatar,
  };

  await axios
    .post("/api/app/user/update", data)
    .then((response) => {
      console.log(response.data.profile_url);
      let data = JSON.parse(localStorage.getItem(PROFILE_URL));
      data.profile_data = response.data.profile_url;
      // localStorage.setitem(PROFILE_URL, JSON.stringify(data));
      setProfileAvatar(response.data?.profile_url);
      setPhoto(data);
      setIsLoading(false);
      setDisplayName(response.data?.full_name);
      localStorage.setItem(PROFILE_URL, JSON.stringify(data));
      currentUser.updateProfile({
        displayName: response.data?.full_name,
      });
    })
    .catch((error) => {
      console.log(error);
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
