import React, { useState, useEffect } from "react";
import { Row, Col, Button, Card, Avatar, Table, Select, Tag } from "antd";
import ChartWidget from "components/shared-components/ChartWidget";
import AvatarStatus from "components/shared-components/AvatarStatus";
import AvatarDocument from "components/shared-components/AvatarDocument";
import axios from "axios";
import { useAuth } from "contexts/AuthContext";
import {
  VisitorChartData,
  NewMembersData,
  RecentBlotterCaseData,
  DisplayDataSet,
  newJoinMemberOption,
  latestRecentBlotterCaseOption,
  cardDropdown,
  tableColumns,
} from "./HomeDashboard";
import { updateCertificateData } from "api/AppController/CertificatesController/CertificatesController";
import { UserAddOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
const { Option } = Select;

export const DefaultDashboard = () => {
  const { currentOrganization, generateToken } = useAuth();
  const [visitorChartData] = useState(VisitorChartData);
  const [newMembersData] = useState(NewMembersData);
  const [recentBlotterCaseData] = useState(RecentBlotterCaseData);
  const { direction } = useSelector((state) => state.theme);
  const [blotterlistrequest, setBlotterListRequest] = useState([]);
  // const [blotterlistrequestData, setBlotterListRequestData] = useState([]);
  const [blotterlistRequestLoading, setBlotterListRequestLoading] = useState(
    true
  );
  const [certLoading, setCertLoading] = useState(true);
  const [currentDataCert, setcurrentDataCert] = useState({});
  const [currentDataBlotter, setcurrentDataBlotter] = useState({});
  const [prevDataCert, setPrevDataCert] = useState();
  const [prevDataBlotter, setPrevDataBlotter] = useState();
  const [documentCertList, setDocumentCertList] = useState([]);
  const [documentBlotterList, setDocumentBlotterList] = useState([]);
  const [populationStatus, setPopulationStatus] = useState({});

  const getLatestBlotterRequests = () => {
    axios
      .get(
        "/api/blotter_request/get-latest-blotter-requests/" +
          currentOrganization,
        generateToken()[1]
      )
      .then((response) => {
        setBlotterListRequest(response.data);
        setBlotterListRequestLoading(false);
      })
      .catch(() => {
        console.log("Error");
      });
  };

  const getDocumentsData = (type) => {
    axios
      .get(`/api/cert-display/name/data?cert_type=${type}`, generateToken()[1])
      .then((response) => {
        if (type) console.log(response.data);

        if (type == "cert") {
          setDocumentCertList(response.data);
          setcurrentDataCert(
            response.data.filter((doc) => doc.status === true)
          );
          let d = response.data.filter((doc) => doc.status === true);
          setPrevDataCert({
            certificate_id: d[0]?.certificate_id,
            status: false,
          });
        }
        if (type == "blotter") {
          setDocumentBlotterList(response.data);
        }
        setTimeout(() => {
          setCertLoading(false);
        }, 500);
      })
      .catch(() => {
        console.log("Error");
      });
  };

  const getResidentPopulationStatus = () => {
    axios
      .get(
        "/api/resident/populationStatus/" + currentOrganization,
        generateToken()[1]
      )
      .then((response) => {
        var data = response.data;
        setPopulationStatus(data);
      })
      .catch(() => {
        console.log("Error");
      });
  };
  const handleChangeCert = (value) => {
    const newStatus = true;
    const data = { certificate_id: value, status: newStatus };
    updateCertificateData(data, generateToken()[1]);

    if (prevDataCert) {
      const prevData = {
        certificate_id: prevDataCert.certificate_id,
        status: !newStatus,
      };
      updateCertificateData(prevData, generateToken()[1]);
    }

    setPrevDataCert(data);
  };
  const handleChangeBlotter = (value) => {
    setPrevDataBlotter(value);
    // const data = { certificate_id: value, status: true };
    // console.log(`selected ${value}`);
    // updateCertificateData(data, generateToken()[1]);
  };
  useEffect(() => {
    getLatestBlotterRequests();
    getDocumentsData("cert");
    getDocumentsData("blotter");
    getResidentPopulationStatus();
  }, []);

  return (
    <>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={24} xl={18}>
          <Row gutter={16}>
            <Col span={24}>
              <ChartWidget
                title="Visitors"
                series={visitorChartData.series}
                xAxis={visitorChartData.categories}
                height={"400px"}
                direction={direction}
              />
            </Col>

            <Col xs={24} sm={24} md={24} lg={24}>
              <Card
                title="Latest Blotter Report"
                extra={cardDropdown(latestRecentBlotterCaseOption)}
              >
                <Table
                  loading={blotterlistRequestLoading}
                  className="no-border-last"
                  columns={tableColumns}
                  dataSource={blotterlistrequest}
                  rowKey="_id"
                  pagination={false}
                />
              </Card>
            </Col>
          </Row>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={6}>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <DisplayDataSet populationStatus={populationStatus} />
            </Col>
            {/* {
              annualStatisticData.map((elm, i) => (
                <Col xs={24} sm={24} md={24} lg={24} xl={24}  key={i}>
                  <StatisticWidget
                    title={elm.title}
                    value={elm.value}
                    status={elm.status}
                    subtitle={elm.subtitle}
                  />
                </Col>
              ))
            } */}
            <Col xs={24} sm={24} md={24} lg={24}>
              <Card
                title="Organization Members"
                extra={cardDropdown(newJoinMemberOption)}
              >
                <div className="mt-3">
                  {newMembersData.map((elm, i) => (
                    <div
                      key={i}
                      className={`d-flex align-items-center justify-content-between mb-4`}
                    >
                      <AvatarStatus
                        id={i}
                        src={elm.img}
                        name={elm.name}
                        subTitle={elm.title}
                      />
                      <div>
                        <Button
                          icon={<UserAddOutlined />}
                          type="default"
                          size="small"
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </Col>{" "}
            <Col xs={24} sm={24} md={24} lg={24}>
              <Card title="Set Active Documents">
                <div className="mt-3">
                  <div
                    className={`d-flex align-items-center justify-content-between mb-4`}
                  >
                    <div>
                      <AvatarDocument
                        name="Clearance"
                        icon={
                          <UserAddOutlined
                            style={{ color: "#0979D9", fontSize: 28 }}
                          />
                        }
                      />
                    </div>
                    <div>
                      {certLoading ? null : (
                        <Select
                          defaultValue={currentDataCert[0]?.certificate_id}
                          style={{
                            width: 120,
                          }}
                          onChange={handleChangeCert}
                        >
                          {documentCertList.map((t, i) => {
                            return (
                              <Option key={i} value={t.certificate_id}>
                                {t.title}
                              </Option>
                            );
                          })}
                        </Select>
                      )}
                    </div>
                  </div>
                </div>{" "}
                <div className="mt-3">
                  <div
                    className={`d-flex align-items-center justify-content-between mb-4`}
                  >
                    <div>
                      <AvatarDocument
                        name="Blotter"
                        icon={
                          <UserAddOutlined
                            style={{ color: "#0979D9", fontSize: 28 }}
                          />
                        }
                      />
                    </div>
                    <div>
                      <Select
                        defaultValue="lucy"
                        style={{
                          width: 120,
                        }}
                        onChange={handleChangeBlotter}
                      >
                        {documentBlotterList.map((t, i) => {
                          return (
                            <Option key={i} value={t.certificate_id}>
                              {t.title}
                            </Option>
                          );
                        })}
                      </Select>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default withRouter(DefaultDashboard);
