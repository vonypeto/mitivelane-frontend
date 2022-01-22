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
  setBarangayMemberList,
  firstTime,
  generateToken
) {
  // const data = values;
  let dataInfo = {};
  let token = generateToken();
  console.log(moment(values.birthday).format(DATE_FORMAT_YYYY_MM_DD));

  console.log(values);
  if (firstTime) {
    dataInfo = {
      barangay_name: values.barangay,
      email: currentUser?.email,
      auth_id: user_id,
      province: values.province,
      municipality: values.municipality,
      address: values.barangay_address,
      country: values.country,
      role: "Administrator",
      //UserProfile
      first_name: values.first_name,
      last_name: values.last_name,
      middle_name: values.middle_name,
      birthday: values.birthday,
      gender: values.gender,
      civil_status: values.civil_status,
      personal_country: values.personal_country,
      personal_province: values.personal_province,
      personal_municipality: values.personal_municipality,
      mobile: values.mobile_number,
      telephone: values.telephone_number,
      personal_address: values.personal_address,
      first_time: firstTime,
    };
  } else {
    dataInfo = {
      barangay_name: values.barangay,
      email: currentUser?.email,
      auth_id: user_id,
      province: values.province,
      municipality: values.municipality,
      address: values.barangay_address,
      country: values.country,
      role: "Administrator",
    };
  }

  await axios
    .post("/api/pre/create-barangay", dataInfo, token[1])
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
}
