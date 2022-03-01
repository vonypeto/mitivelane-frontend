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
        // console.log(response.data);

        const i = [].concat.apply([], response.data[0].barangays);
        const x = [].concat.apply([], response.data[0].members);

        // if (response.data[0].barangays[4]) {
        //   console.log("true");
        // } else {
        //   console.log("false");
        // }
        // const getBarangays = i.map((barangay) => [
        //   {
        //     name: barangay.barangay_name,
        //     barangay_id: barangay._id,
        //   },
        // ]);
        const a3 = i.map((t1) => ({
          ...t1,
          ...x.find((t2) => t2.barangay_id === t1._id),
        }));
        // console.log(a3);
        // const getBarangay2 = [].concat.apply([], a3);
        // console.log(x);
        return setBarangayMember(a3);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
