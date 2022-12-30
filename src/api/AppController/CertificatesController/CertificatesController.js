import axios from "axios";
import React, { useRef } from "react";
import { AUTH_ORGANIZATION } from "redux/constants/Auth";
export const getCertificateAll = async (setPdf, generateToken, count) => {
  let isApiSubscribed = true;
  await axios
    .get(`/api/cert-display?result=${count}&start=0`, generateToken)
    .then((res) => {
      if (isApiSubscribed) {
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

        return setPdf(data);
      }
    });
  return () => {
    // cancel the subscription
    isApiSubscribed = false;
  };
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
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    let isApiSubscribed = true;
    await axios
      .get(`/api/cert-display/${id}`, generateToken, {
        cancelToken: source.token,
      })
      .then((res) => {
        if (isApiSubscribed) {
          let data = res.data[0];
          setCertType(res.data[0]?.cert_type);
          setTemplateType(res.data[0]?.template_type);
          delete data["createdAt"];
          delete data["updatedAt"];
          //   delete data["cert_type"];
          //  delete data["template_type"];
          if (data.content[0]?.blocks.length == 0) delete data["content"];
          setParentData(res.data[0]);
          setFirstTime(!firstTime);
        }
      });
  } catch (e) {
    console.log(e);
    history.push(
      `/app/${localStorage.getItem(AUTH_ORGANIZATION)}/cert-display/list`
    );
  }
  return () => {
    // cancel the subscription
    isApiSubscribed = false;
    source.cancel();
  };
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
