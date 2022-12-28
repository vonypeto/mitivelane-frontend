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
import { UserAddOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
const { Option } = Select;

const handleChange = (value) => {
  console.log(`selected ${value}`);
};
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
        console.log("Latest Blotter", response.data);
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

        if (type == "cert") setDocumentCertList(response.data);
        if (type == "blotter") setDocumentBlotterList(response.data);
      });
  };

  const getResidentPopulationStatus = () => {
    axios
      .get(
        "/api/resident/populationStatus/" +
          currentOrganization,
        generateToken()[1]
      )
      .then((response) => {
        var data = response.data
        setPopulationStatus(data)
      })
      .catch(() => {
        console.log("Error");
      });
  };

  useEffect(() => {
    getLatestBlotterRequests();
    getDocumentsData("cert");
    getDocumentsData("blotter");
    getResidentPopulationStatus();
  }, []);

  useEffect(() => {
    console.log("populationStatus", populationStatus)
  }), [populationStatus]

  return (
    <>
    <h1>Bat ang pogi ko</h1>
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
              <DisplayDataSet populationStatus={populationStatus}/>
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
                      <Select
                        defaultValue="lucy"
                        style={{
                          width: 120,
                        }}
                        onChange={handleChange}
                      >
                        {documentCertList.map((t, i) => {
                          return (
                            <Option key={i} value={t.certificate_id}>
                              {t.title}
                            </Option>
                          );
                        })}
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled" disabled>
                          Disabled
                        </Option>
                        <Option value="Yiminghe">yiminghe</Option>
                      </Select>
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
                        onChange={handleChange}
                      >
                        {documentBlotterList.map((t, i) => {
                          return (
                            <Option key={i} value={t.certificate_id}>
                              {t.title}
                            </Option>
                          );
                        })}
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled" disabled>
                          Disabled
                        </Option>
                        <Option value="Yiminghe">yiminghe</Option>
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
