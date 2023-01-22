import React, { useState, useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import { Radio } from "antd";
import { AppstoreOutlined, UnorderedListOutlined } from "@ant-design/icons";
import CertList from "./Cert-List";
import CertRequest from "./Cert-Request";

const Certificates = () => {
  // Pdf State
  const [pdfFile, setPdfFile] = useState([]);
  // Switch Page
  const [switchCert, setSwitchCert] = useState(false);

  const onChangeSwitch = () => {
    setSwitchCert(!switchCert);
  };

  useEffect(() => {
    setPdfFile(pdfFile);
  }, [pdfFile]);

  return (
    <div>
      <PageHeaderAlt className="padding-none border-bottom" overlap>
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
                    </Radio.Button>
                    <Radio.Button value={false}>
                      <AppstoreOutlined />
                    </Radio.Button>
                  </Radio.Group>
                </div>
              </>
            )}
          </Flex>
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
              <CertList pdfFile={pdfFile} setPdfFile={setPdfFile} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(Certificates);
