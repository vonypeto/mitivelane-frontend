import axios from "axios";

export async function getBarangay(
  currentUser,
  setBarangayMember,
  generateToken
) {
  const user = currentUser?.uid;
  await axios
    .get("/api/app/users/" + user, generateToken()[1])
    .then((response) => {
      if (response.data.length > 0) {
        const i = [].concat.apply([], response.data[0].barangays);
        const x = [].concat.apply([], response.data[0].members);
        const a3 = i.map((t1) => ({
          ...t1,
          ...x.find((t2) => t2.barangay_id === t1._id),
        }));
        return setBarangayMember(a3);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
