import axios from "axios";

export async function updateAccount(...props) {
  const data = {
    full_name: props[0].name,
    profile_url: props[1],
  };

  await axios
    .post("/api/app/user/update", data)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
