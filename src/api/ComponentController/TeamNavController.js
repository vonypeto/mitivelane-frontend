import axios from "axios";

export async function getBarangay(currentUser, setBarangayMember) {
  const user = currentUser?.uid;
  axios
    .get("/app/users/" + user)
    .then((response) => {
      if (response.data.length > 0) {
        console.log(response.data);

        const i = [].concat.apply([], response.data[0].barangays);
        if (response.data[0].barangays[4]) {
          console.log("true");
        } else {
          console.log("false");
        }
        const getBarangays = i.map((barangay) => [
          {
            name: barangay.barangay_name,
            barangay_id: barangay._id,
          },
        ]);
        const getBarangay2 = [].concat.apply([], getBarangays);

        return setBarangayMember(getBarangay2);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
