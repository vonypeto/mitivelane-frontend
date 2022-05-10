import axios from "axios";
import { AUTH_BARANGAY } from "redux/constants/Auth";

export const getCertificateAll = async (setPdf, generateToken, count) => {
  await axios
    .get(`/api/cert-display?result=${count}&start=0`, generateToken)
    .then((res) => {
      setPdf(res.data);
    });
};

export const getCertificateData = async (
  setParentData,
  generateToken,
  id,
  history,
  setCertType,
  setTemplateType
) => {
  try {
    await axios.get(`/api/cert-display/${id}`, generateToken).then((res) => {
      let data = res.data[0];
      setCertType(res.data[0]?.cert_type);
      setTemplateType(res.data[0]?.template_type);
      delete data["createdAt"];
      delete data["updatedAt"];
      delete data["cert_type"];
      delete data["template_type"];

      console.log(data);
      setParentData(res.data[0]);
    });
  } catch (e) {
    console.log(e);
    history.push(
      `/app/${localStorage.getItem(AUTH_BARANGAY)}/cert-display/list`
    );
  }
};
export const updateCertificateData = async (data, generateToken) => {
  try {
    await axios
      .post(`/api/cert-display/${data.certificate_id}`, data, generateToken)
      .then((_) => {
        console.log("updated");
      });
  } catch (e) {
    console.log(e);
  }
};
