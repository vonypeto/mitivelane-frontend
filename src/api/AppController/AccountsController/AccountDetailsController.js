import axios from "axios";
import { PROFILE_URL } from "redux/constants/Auth";

export async function updateAccount(...props) {
  const setDisplayName = props[3];
  const setProfileAvatar = props[4];
  const setPhoto = props[5];

  const currentUser = props[2];
  const data = {
    full_name: props[0].name,
    profile_url: props[1],
  };

  await axios
    .post("/api/app/user/update", data)
    .then((response) => {
      console.log(response.data.profile_url);
      let data = JSON.parse(localStorage.getItem(PROFILE_URL));
      data.profile_data = response.data.profile_url;
      console.log(data);
      // localStorage.setitem(PROFILE_URL, JSON.stringify(data));
      setProfileAvatar(response.data?.profile_url);
      setPhoto(data);
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
