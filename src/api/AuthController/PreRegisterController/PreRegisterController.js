import moment from "moment";
import { DATE_FORMAT_YYYY_MM_DD } from "constants/DateConstant";
import axios from "axios";
import { AUTH_BARANGAY, AUTH_BARANGAY_LIST } from "redux/constants/Auth";
import { APP_PREFIX_PATH } from "configs/AppConfig";

export async function createBarangay(
  history,
  currentUser,
  values,
  user_id,
  setBarangay,
  setBarangayMemberList
) {
  const data = values;

  console.log(moment(values.birthday).format(DATE_FORMAT_YYYY_MM_DD));

  console.log(values);
  const dataInfo = {
    barangay_name: values.barangay,
    email: currentUser?.email,
    auth_id: user_id,
    role: "Administrator",
  };
  axios
    .post("http://localhost:5000/pre/create-barangay", dataInfo)
    .then((response) => {
      if (response.data.length > 0) {
        console.log(response.data);
        console.log(response.data[0].barangay_id);

        setBarangay(response.data[0].barangay_id);
        setBarangayMemberList(response.data[0].barangay_member_id);
        localStorage.setItem(
          AUTH_BARANGAY_LIST,
          response.data[0].barangay_member_id
        );
        localStorage.setItem(AUTH_BARANGAY, response.data[0].barangay_id);
        return history.push(APP_PREFIX_PATH);
      }
    })
    .catch((error) => {
      console.log(error);
    });

  // await db
  //   .collection("barangay_list")
  //   .doc(uuid)
  //   .set({
  //     name: "Baras",
  //   })
  //   .then(() => {
  //     console.log("Document successfully written!");
  //     db.collection("barangay_members")
  //       .doc()
  //       .set({
  //         name: data.first_name,
  //         email: currentUser?.email,
  //         role: "Administrator",
  //         auth_id: user_id,
  //         barangay_id: uuid,
  //       })
  //       .catch(() => {
  //         db.collection("barangay_list")
  //           .doc(uuid)
  //           .delete()
  //           .then(() => {
  //             console.log("Document successfully deleted!");
  //           })
  //           .catch((error) => {
  //             console.error("Error removing document: ", error);
  //           });
  //       });
  //   })
  //   .catch((error) => {
  //     console.error("Error writing document: ", error);
  //   });
}
