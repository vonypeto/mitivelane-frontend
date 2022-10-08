import { React, useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";

import { Row, Col, Space, Card, Avatar, List, Tag, DatePicker, Badge as AntdBadge } from "antd";
import { BsCircleFill } from "react-icons/bs";
import Badge from "react-bootstrap/Badge";
import { dummy_session } from "./fakedata";
import "../../../../assets/css/bootstrap.badge.css";
import { handlePageChange } from "helper/pagination";

const Audit = () => {
  //Initialize

  //Import
  const source = axios.CancelToken.source();
  const cancelToken = source.token;
  const history = useHistory();
  const { generateToken, currentOrganization } = useAuth();

  //State 
  const [auditLog, setAuditLog] = useState([])

  //Pagination State
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(1)
  const defaultPageSize = 4
  const [pageSize, setPageSize] = useState(defaultPageSize)
  const currentDate = moment();
  const [dateFilter, setDateFilter] = useState(currentDate)

  //Const for color
  const badgeColorPicker = (action) => {
    if (action == "create") {
      return "#00A36C";
    }
    if (action == "update") {
      return "#0047AB";
    }
    if (action == "delete") {
      return "#FF0000";
    }
  };

  //Function
  const dateChange = (value) => {
    if (value != null) {
      console.log("value", value.format("DD-MM-YYYY"))
      setDateFilter(value)
    }
  }

  const getPage = async () => {
    await axios.post(
      `/api/session/getPage`,
      {currentPage, pageSize, dateFilter, organization_id:currentOrganization},
      generateToken()[1],
      { cancelToken }
      ).then((res) => {
        var data = res.data
        console.log("data", data)
        setAuditLog(data)
      })
  }

  useEffect(() => {
    getPage()
  }, [dateFilter])
  

  return (
    <div>
      <Row justify="space-between">
        <Col>
          <h1>Audit Log</h1>
        </Col>

        <Col>
          <DatePicker defaultValue={currentDate} onChange={(value) => dateChange(value)} />
        </Col>
      </Row>
      <Card>
        <List
          pagination={{
            current: currentPage,
            showSizeChanger: true,
            defaultPageSize: 8,
            pageSizeOptions: [8, 10, 20, 50, 100],
            onShowSizeChange: (current, size) => {
              console.log("current", current)
              console.log("size", size)
            },
            onChange: (page) => {
              handlePageChange(page, setCurrentPage)
            }
          }}
          dataSource={dummy_session}
          renderItem={(item) => (
            <List.Item className="w-100">
              <List.Item.Meta
                avatar={
                  <img
                    style={{
                      height: "25px",
                      width: "25px",
                      marginRight: "5px",
                    }}
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  />
                }
                title={
                  <Space direction="horizontal">
                    <b style={{ fontSize: 18 }}>{item.name}</b>
                    <h4 style={{ color: "#1565c0", margin: 0 }}>{item.createdAt}</h4>
                  </Space>
                }
                description={
                  <Space wrap>

                    <Badge pill text="light" bg={null} style={{ backgroundColor: badgeColorPicker(item.action) }}>
                      {item.message}
                    </Badge>
                    <Badge pill bg={"dark"}>
                      {item.module}
                    </Badge>
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default Audit;
