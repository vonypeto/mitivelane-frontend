import axios from "axios";
import React from "react";
import { AUTH_ORGANIZATION } from "redux/constants/Auth";

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

    setPdf(data);
  } catch (error) {
    console.error(error);
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
      history.push(
        `/app/${localStorage.getItem(AUTH_ORGANIZATION)}/cert-display/list`
      );
      return;
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
  } catch (error) {
    console.log(error);
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
          console.log("updated");
        });
  } catch (e) {
    console.log(e);
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
    });
  } catch (e) {
    console.log(e);
  }

  return () => {
    // cancel the subscription
    isApiSubscribed = false;
  };
};
