import axios from "axios";
import { AUTH_ORGANIZATION } from "redux/constants/Auth";
import { message } from "antd";

export const getCertificateAll = async (setPdf, generateToken, count) => {
  try {
    const res = await axios.get(
      `/api/cert-display?result=${count}&start=0`,
      generateToken
    );
    const data = res.data;

    if (data) {
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
    }

    return setPdf(data);
  } catch (error) {
    console.error(error);
    return message.error(error.message);
  }
};

export const getCertificateData = async (
  setParentData,
  generateToken,
  id,
  history,
  setCertType,
  setTemplateType,
  firstTime,
  setFirstTime
) => {
  try {
    const { data } = await axios.get(`/api/cert-display/${id}`, generateToken);
    console.log(data);
    const certificate = data;
    if (!certificate) {
      return history.push(
        `/app/${localStorage.getItem(AUTH_ORGANIZATION)}/cert-display/list`
      );
    }
    setCertType(certificate.cert_type);
    setTemplateType(certificate.template_type);
    delete certificate.createdAt;
    delete certificate.updatedAt;
    if (certificate.content[0]?.blocks.length === 0) {
      delete certificate.content;
    }
    setParentData(certificate);
    setFirstTime(!firstTime);
    return;
  } catch (error) {
    console.log(error);
    return message.error(error.message);
  }
};
export const updateCertificateData = async (data, generateToken) => {
  let isApiSubscribed = true;
  try {
    if (Object.keys(data).length === 0) return;
    if (isApiSubscribed)
      await axios
        .post(`/api/cert-display/${data.certificate_id}`, data, generateToken)
        .then((_) => {
          return console.log("updated");
          //return message.success("Document updated");
        });
  } catch (e) {
    console.log(e);
    return message.error(e.message);
  }

  return () => {
    // cancel the subscription
    isApiSubscribed = false;
  };
};
export const deleteCertificateData = async (data, generateToken) => {
  console.log(data);
  try {
    await axios.delete(`/api/cert-display/${data}`, generateToken).then((_) => {
      console.log("delete");
      return message.success("Document Deleted Successfully");
    });
  } catch (e) {
    console.log(e);
    return message.error(e.message);
  }

  return () => {
    // cancel the subscription
    isApiSubscribed = false;
  };
};
export const duplicateCertificate = async (
  data,
  setLoadingDuplicate,
  generateToken,
  loadingDuplicate,
  loading
) => {
  let isApiSubscribed = true;
  setLoadingDuplicate(true);

  if (!loadingDuplicate)
    await axios
      .post("/api/cert-display/create/data", data, generateToken()[1])
      .then((_) => {
        if (isApiSubscribed) {
          setLoadingDuplicate(!loading);
          console.log("duplicate");
          message.success("Document Duplicated");
        }
      })
      .catch((err) => {
        return console.error(err);
      });
  return () => {
    // cancel the subscription
    isApiSubscribed = false;
  };
};
