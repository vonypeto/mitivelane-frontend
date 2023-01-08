import React, { useState, useEffect, useRef } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import CertDisplay from "./cert-display";
import InputCert from "./input-display";
import { Col, Row, Button, Input } from "antd";
import { ArrowDownOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { AUTH_ORGANIZATION } from "redux/constants/Auth";
import { useParams } from "react-router-dom";
import {
  getCertificateData,
  updateCertificateData,
} from "api/AppController/CertificatesController/CertificatesController";
import { useAuth } from "contexts/AuthContext";
import Loading from "components/shared-components/Loading";
import debounce from "lodash.debounce";

const Certificates = () => {
  // Props State
  const { generateToken } = useAuth();
  let { id } = useParams();

  const [firstTime, setFirstTime] = useState(true);
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
  const prevParentData = usePrevious({ parentData });
  //useEffects

  useEffect(() => {
    let isApiSubscribed = true;
    //   console.log(prevParentData?.parentData);
    if (isApiSubscribed) {
      setParentData(parentData);
      if (prevParentData?.parentData == parentData)
        updateCertificateData(parentData, generateToken()[1]);

      if (loading) {
        setTimeout(() => {
          setLoading(!loading);
        }, 500);
      }
    }

    return () => {
      // cancel the subscription
      isApiSubscribed = false;
    };
  }, [parentData, loading]);

  useEffect(() => {
    let isApiSubscribed = true;

    const fetchData = () => {
      if (isApiSubscribed) {
        getCertificateData(
          setParentData,
          generateToken()[1],
          id,
          history,
          setCertType,
          setTemplateType,
          firstTime,
          setFirstTime
        );
      }
    };

    fetchData();

    // the cleanup function is called when the component is unmounted
    return () => {
      // cancel the subscription
      isApiSubscribed = false;
    };
  }, []); // the empty array means the effect only runs once
  useEffect(() => {
    let isApiSubscribed = true;

    const fetchData = () => {
      if (isApiSubscribed) {
        const listener = window.addEventListener(
          "resize",
          updateWindowDimensions
        );
        updateWindowDimensions();
        return listener;
      }
    };

    const unsubscribe = fetchData();

    // the cleanup function is called when the component is unmounted
    return () => {
      // cancel the subscription
      isApiSubscribed = false;
      window.removeEventListener("resize", updateWindowDimensions, unsubscribe);
    };
  }, [height, width]); // the dependencies array means the effect runs when either value changes
  const setData = (data) => {
    setLoading(!loading);
    let x = data;
    return setParentData(x);
  };
  const navigate = () => {
    history.push(
      `/app/${localStorage.getItem(AUTH_ORGANIZATION)}/cert-display/list`
    );
  };
  // custom prev hooks
  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
  }

  const updateTitle = debounce((e) => {
    let data = parentData;
    data.title = e.target.value;
    setData(data);
  }, 1000);
  return (
    <div>
      {firstTime ? (
        <Loading cover="content" />
      ) : (
        <>
          <PageHeaderAlt className="padding-none border-bottom" overlap>
            <div className="container-fluid">
              <Flex
                justifyContent="between"
                alignItems="center"
                className="py-2"
              >
                {/* new folder */}
                <Button icon={<ArrowLeftOutlined />} onClick={navigate}>
                  Back
                </Button>
                <Input
                  onChange={updateTitle}
                  style={{
                    border: "none",
                    fontWeight: 900,
                  }}
                  className="cert-name "
                  defaultValue={parentData?.title}
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
                {(width >= 1399 || switchCert) && (
                  <Col
                    className="pl-2 "
                    xs={24}
                    sm={24}
                    md={24}
                    lg={24}
                    xl={12}
                    xxl={12}
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
                )}
                {(width >= 1399 || !switchCert) && (
                  <Col
                    style={{ overflow: "auto" }}
                    justify="center"
                    className="pl-2"
                    xs={24}
                    sm={24}
                    md={24}
                    lg={24}
                    xl={12}
                    xxl={12}
                  >
                    <CertDisplay
                      data={parentData}
                      setParentData={setData}
                      loadingImage={loading}
                      certType={certType}
                      setCertType={setCertType}
                      templateType={templateType}
                      setTemplateType={setTemplateType}
                    />
                  </Col>
                )}
              </Row>{" "}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(Certificates, InputCert);
