import React, { useState, useEffect, useRef } from "react";
// Ant Design  & component
import { Col, Row, Button, Input } from "antd";
import { ArrowDownOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import DocumentInput from "./DocumentInput";
import DocumentView from "./DocumentView";
import moment from "moment";

//Libraries
import { useParams, useHistory } from "react-router-dom";
//Middleware
import { useAuth } from "contexts/AuthContext";
import Loading from "components/shared-components/Loading";
import debounce from "lodash.debounce";
// API
import {
  getCertificateDataNew,
  updateCertificateData,
} from "api/AppController/CertificatesController/CertificatesController";
// Constant
import { AUTH_ORGANIZATION } from "redux/constants/Auth";

const createFakeDataSource = (listCount = 10, listItemCount = 10) => {
  let data = [];
  for (let i = 1; i <= listCount; i++) {
    let list = {};
    list.title = `List ${i}`;
    list.id = `list${i}`;
    list.items = [];
    for (let j = 1; j <= listItemCount; j++) {
      list.items.push({
        id: `listItem${i}${j}`,
        name: `List Item ${j}`,
        value: `listItem${i}${j}`,
      });
    }
    data.push(list);
  }
  return data;
};

const Certificates = () => {
  // Props State
  const { generateToken } = useAuth();
  let { id } = useParams();
  const history = useHistory();
  // Document State
  const [firstTime, setFirstTime] = useState(true);
  const [parentData, setParentData] = useState({});
  const [certType, setCertType] = useState();
  const [templateType, setTemplateType] = useState();

  // Loading State
  const [loading, setLoading] = useState(false);
  const [switchCert, setSwitchCert] = useState(true);

  // Display Screen State
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const updateWindowDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  //Functions
  const prevParentData = usePrevious({ parentData });

  // Callback
  const handleGetCertificate = (certificate) => {
    setCertType(certificate.cert_type);
    setTemplateType(certificate.template_type);
    delete certificate.createdAt;
    delete certificate.updatedAt;
    if (certificate.content[0]?.blocks.length === 0) {
      delete certificate.content;
    }
    certificate.issued_at = moment(certificate.issued_at);
    certificate.issued_on = moment(certificate.issued_on);
    setParentData(certificate);
    setFirstTime(!firstTime);
  };

  //useEffects

  useEffect(() => {
    let isApiSubscribed = true;
    //   console.log(prevParentData?.parentData);
    if (isApiSubscribed) {
      setParentData(parentData);
      if (prevParentData?.parentData == parentData)
        updateCertificateData(parentData, generateToken()[1]);
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
        getCertificateDataNew(
          generateToken()[1],
          id,
          history,
          handleGetCertificate
        );
      }
    };

    fetchData();

    return () => {
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
  }, [height, width]);

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

  //test data
  const [checkedItems, setCheckedItems] = useState({});
  const [source] = useState(createFakeDataSource());
  const handleCheckItem = (e) => {
    let { value } = e.target;
    if (checkedItems[value] === undefined) {
      setCheckedItems((prevCheckedItems) => ({
        ...prevCheckedItems,
        [value]: value,
      }));
    } else {
      const newCheckedItems = { ...checkedItems };
      delete newCheckedItems[value];
      setCheckedItems(newCheckedItems);
    }
  };

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
                    <DocumentInput
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
                    <DocumentView
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

export default React.memo(Certificates);
