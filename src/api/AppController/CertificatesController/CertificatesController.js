import axios from "axios";
export const getCertificateAll = async (setPdf, generateToken, count) => {
  await axios
    .get(`/api/cert-display?result=${count}&start=1`, generateToken)
    .then((res) => {
      setPdf(res.data);
    });
};
