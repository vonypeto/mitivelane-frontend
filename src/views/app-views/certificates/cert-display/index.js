import React, { useState, useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import { Radio } from "antd";
import { AppstoreOutlined, UnorderedListOutlined } from "@ant-design/icons";
import CertList from "./Cert-List";
import CertRequest from "./Cert-Request";

const Certificates = () => {
  const [pdfFile, setPdfFile] = useState([]);
  const [switchCert, setSwitchCert] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  const updateWindowDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  // useEffect(
  //   () => {
  //     const listener = window.addEventListener(
  //       "resize",
  //       updateWindowDimensions
  //     );
  //     updateWindowDimensions();

  //     return listener;
  //   },
  //   [height],
  //   [width]
  // );
  // const setData = (data) => {
  //   setLoading(!loading);
  //   console.log(data);
  //   let x = data;
  //   console;
  //   return setParentData(x);
  // };
  const onChangeSwitch = () => {
    setSwitchCert(!switchCert);
  };

  useEffect(() => {
    setPdfFile(pdfFile);
  }, [pdfFile]);

  return (
    <div>
      <PageHeaderAlt className="padding-none border-bottom" overlap>
        {/* <div className="container-fluid">
          <Flex
            className="py-2"
            mobileFlex={false}
            justifyContent="between"
            alignItems="center"
          >
            <Button>Back</Button>
            <div>
              <Input
                style={{
                  border: "none",
                }}
                className="mb-3 cert-name"
                defaultValue="Untitled 1"
              />
              <Button type="primary">Download</Button>{" "}
            </div>
          </Flex>
        </div> */}{" "}
        <div className="container-fluid">
          <Flex justifyContent="between" alignItems="center" className="py-2">
            {switchCert ? (
              <>
                <h2>Certificate </h2>
                <div>
                  <Radio.Group
                    defaultValue={switchCert}
                    onChange={onChangeSwitch}
                  >
                    <Radio.Button value={true}>
                      <UnorderedListOutlined />
                    </Radio.Button>
                    <Radio.Button value={false}>
                      <AppstoreOutlined />
                    </Radio.Button>
                  </Radio.Group>
                </div>
              </>
            ) : (
              <>
                <h2>Certificate</h2>
                <div>
                  <Radio.Group
                    defaultValue={switchCert}
                    onChange={onChangeSwitch}
                  >
                    <Radio.Button value={true}>
                      <UnorderedListOutlined />
                      npm
                    </Radio.Button>
                    <Radio.Button value={false}>
                      <AppstoreOutlined />
                    </Radio.Button>
                  </Radio.Group>
                </div>
              </>
            )}
          </Flex>
          {/* new folder */}
          {/* <Button icon={<ArrowLeftOutlined />}>Back</Button>{" "}
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
                </div> */}
        </div>
      </PageHeaderAlt>
      <div className="pb-5 mb-5" style={{ marginTop: 95 }}>
        {/* width: {width} ~ height: {height} */}
        {switchCert ? (
          <>
            <div>
              <CertRequest />
            </div>
          </>
        ) : (
          <>
            <div className="container">
              <CertList
                width={width}
                pdfFile={pdfFile}
                setPdfFile={setPdfFile}
              />
            </div>
          </>
        )}
        {/* NEW FLODER */}
        {/* <div>
          <Row>
            <Col
              className="pl-2 "
              xs={0}
              sm={0}
              md={9}
              lg={12}
              style={{
                borderRightStyle: " solid",
                borderRight: "1px",
              }}
            >
              <InputCert parentData={parentData} setParentData={setData} />
            </Col>
            <Col
              style={{ overflow: "auto" }}
              justify="center"
              className="pl-2"
              xs={24}
              sm={24}
              md={15}
              lg={12}
            >
              {" "}
              <CertDisplay
                width={width}
                height={height}
                data={parentData}
                loadingImage={loading}
              />
            </Col>{" "}
          </Row>
        </div>{" "} */}
      </div>
    </div>
  );
};

export default React.memo(Certificates);
