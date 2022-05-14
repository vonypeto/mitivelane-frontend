import React, { useState, useEffect, useRef } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import CertDisplay from "./cert-display";
import InputCert from "./input-display";
import { Col, Row, Button, Input } from "antd";
import { ArrowDownOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { AUTH_BARANGAY } from "redux/constants/Auth";
import { useParams } from "react-router-dom";
import {
  getCertificateData,
  updateCertificateData,
} from "api/AppController/CertificatesController/CertificatesController";
import { useAuth } from "contexts/AuthContext";

const Certificates = () => {
  const { generateToken } = useAuth();
  let { id } = useParams();
  const refs = useRef();
  const [parentData, setParentData] = useState({});
  const [loading, setLoading] = useState(false);
  const [switchCert, setSwitchCert] = useState(true);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const history = useHistory();
  const [certType, setCertType] = useState();
  const [templateType, setTemplateType] = useState();
  const updateWindowDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  //Functions
  const setData = (data) => {
    setLoading(!loading);
    let x = data;
    return setParentData(x);
  };
  const navigate = () => {
    history.push(
      `/app/${localStorage.getItem(AUTH_BARANGAY)}/cert-display/list`
    );
  };
  //useEffects
  console.log(parentData);
  useEffect(() => {
    setParentData(parentData);
    updateCertificateData(parentData, generateToken()[1]);
    if (loading) {
      setTimeout(() => {
        setLoading(!loading);
      }, 1000);
    }
  }, [parentData, loading]);

  useEffect(() => {
    getCertificateData(
      setParentData,
      generateToken()[1],
      id,
      history,
      setCertType,
      setTemplateType
    );
    return () => {};
  }, []);
  useEffect(
    () => {
      const listener = window.addEventListener(
        "resize",
        updateWindowDimensions
      );
      updateWindowDimensions();
      return listener;
    },
    [height],
    [width]
  );

  return (
    <div>
      <PageHeaderAlt className="padding-none border-bottom" overlap>
        <div className="container-fluid">
          <Flex justifyContent="between" alignItems="center" className="py-2">
            {/* new folder */}
            <Button icon={<ArrowLeftOutlined />} onClick={navigate}>
              Back
            </Button>
            <Input
              style={{
                border: "none",
                fontWeight: 900,
              }}
              className="cert-name "
              defaultValue="Untitled 1"
            />
            <div>
              <Button icon={<ArrowDownOutlined />} type="primary">
                <span>Download</span>
              </Button>
            </div>
          </Flex>
        </div>
      </PageHeaderAlt>
      <div className="" style={{ marginTop: 95 }}>
        {/* width: {width} ~ height: {height} */}

        <div>
          <Row>
            <Col
              className="pl-2 "
              xs={width >= 1399 || switchCert ? 24 : 0}
              sm={width >= 1399 || switchCert ? 24 : 0}
              md={width >= 1399 || switchCert ? 24 : 0}
              lg={width >= 1399 || switchCert ? 24 : 0}
              xl={width >= 1399 ? 12 : 24}
              xxl={width >= 1399 ? 12 : 24}
              style={{
                borderRightStyle: " solid",
                borderRight: "1px",
              }}
            >
              <InputCert
                parentData={parentData}
                setParentData={setData}
                switchCol={setSwitchCert}
                certType={certType}
                setCertType={setCertType}
                templateType={templateType}
                setTemplateType={setTemplateType}
              />
            </Col>
            <Col
              style={{ overflow: "auto" }}
              justify="center"
              className="pl-2"
              xs={width >= 1399 || !switchCert ? 24 : 0}
              sm={width >= 1399 || !switchCert ? 24 : 0}
              md={width >= 1399 || !switchCert ? 24 : 0}
              lg={width >= 1399 || !switchCert ? 24 : 0}
              xl={width >= 1399 ? 12 : 24}
              xxl={width >= 1399 ? 12 : 24}
            >
              <CertDisplay
                data={parentData}
                loadingImage={loading}
                certType={certType}
                setCertType={setCertType}
                templateType={templateType}
                setTemplateType={setTemplateType}
              />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Certificates, InputCert);
