import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  Card,
  Avatar,
  Table,
  Select,
  Tag,
  message,
} from "antd";
import ChartWidget from "components/shared-components/ChartWidget";
import AvatarStatus from "components/shared-components/AvatarStatus";
import AvatarDocument from "components/shared-components/AvatarDocument";
import axios from "axios";
import { useAuth } from "contexts/AuthContext";
import { AUTH_TOKEN, ORGANIZATION_REQUEST_ID } from "redux/constants/Auth";
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
import { acceptRequest } from "api/AppController/OrganizationController/OrganizationSettingController";
import { UserAddOutlined } from "@ant-design/icons";
import { withRouter, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
const { Option } = Select;

export const DefaultDashboard = () => {
  // Props State & Context & Constant
  const history = useHistory();
  const { currentOrganization, generateToken } = useAuth();
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const { direction } = useSelector((state) => state.theme);

  // Blotter Table State
  const [blotterlistrequest, setBlotterListRequest] = useState([]);

  // Certificate Current State
  const [currentDataCert, setcurrentDataCert] = useState({});
  const [currentDataBlotter, setcurrentDataBlotter] = useState({});

  // Certificate Prev State
  const [prevDataBlotter, setPrevDataBlotter] = useState();
  const [prevDataCert, setPrevDataCert] = useState();

  // Document List State
  const [documentCertList, setDocumentCertList] = useState([]);
  const [documentBlotterList, setDocumentBlotterList] = useState([]);

  // Population State
  const [populationStatus, setPopulationStatus] = useState({});

  // Loading State
  const [certLoading, setCertLoading] = useState(true);
  const [blotterlistRequestLoading, setBlotterListRequestLoading] = useState(
    true
  );

  // TBA State
  const [visitorChartData] = useState(VisitorChartData);
  const [newMembersData] = useState(NewMembersData);
  // const [blotterlistrequestData, setBlotterListRequestData] = useState([]);

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

  const handleAcceptRequest = async () => {
    if (localStorage.getItem(ORGANIZATION_REQUEST_ID) != null) {
      (async () => {
        const response = await acceptRequest(
          {
            _id: localStorage.getItem(ORGANIZATION_REQUEST_ID),
            uuid: authToken,
          },
          generateToken
        );
        if (response == "Success") {
          message.success("Join Organization");
          localStorage.removeItem(ORGANIZATION_REQUEST_ID);
          history.push("/");
        } else if (response == "Joined") {
          message.success("Already Joined");
          localStorage.removeItem(ORGANIZATION_REQUEST_ID);
        } else if (response == "Error") {
          message.error("The action can't be completed, please try again.");
          localStorage.removeItem(ORGANIZATION_REQUEST_ID);
        }
      })();
    } else {
      console.log("do nothing");
    }
  };

  useEffect(() => {
    handleAcceptRequest();
    // getLatestBlotterRequests();
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
