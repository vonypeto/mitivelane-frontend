import axios from "axios";
import { AUTH_ORGANIZATION } from "redux/constants/Auth";

export const getCertificateAll = async (setPdf, generateToken, count) => {
  await axios
    .get(`/api/cert-display?result=${count}&start=0`, generateToken)
    .then((res) => {
      let data = res.data;
      console.log(data);

      data.map((elem) => {
        elem.content =
          elem.content[0]?.blocks.length == 0
            ? {
                entityMap: {},
                blocks: [],
              }
            : elem.content;
        return elem;
      });
      console.log(data);
      return setPdf(data);
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
      //   delete data["cert_type"];
      //  delete data["template_type"];

      console.log(data.content[0]?.blocks.length == 0);
      if (data.content[0]?.blocks.length == 0) delete data["content"];

      setParentData(res.data[0]);
    });
  } catch (e) {
    console.log(e);
    history.push(
      `/app/${localStorage.getItem(AUTH_ORGANIZATION)}/cert-display/list`
    );
  }
};
export const updateCertificateData = async (data, generateToken) => {
  try {
    if (Object.keys(data).length === 0) return;

    await axios
      .post(`/api/cert-display/${data.certificate_id}`, data, generateToken)
      .then((_) => {
        console.log("updated");
      });
  } catch (e) {
    console.log(e);
  }
};
