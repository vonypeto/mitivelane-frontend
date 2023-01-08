import axios from "axios";
import { message } from "antd";

export async function getOrganization(
  currentUser,
  setOrganizationMember,
  generateToken
) {
  const user = currentUser?.uid;
  await axios
    .get("/api/app/users/" + user, generateToken()[1])
    .then((response) => {
      if (response.data.length > 0) {
        const i = [].concat.apply([], response.data[0].organizations);
        const x = [].concat.apply([], response.data[0].members);
        const a3 = i.map((t1) => ({
          ...t1,
          ...x.find((t2) => t2.organization_id === t1._id),
        }));
        return setOrganizationMember(a3);
      }
    })
    .catch((error) => {
      console.log(error);
      return message.error(error.message);
    });
}
