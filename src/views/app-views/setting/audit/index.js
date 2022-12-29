import { React, useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";

import { Row, Col, Space, Card, Avatar, List, Tag, DatePicker, Badge as AntdBadge, Select } from "antd";
import { BsCircleFill } from "react-icons/bs";
import Badge from "react-bootstrap/Badge";
import { dummy_session } from "./fakedata";
import "../../../../assets/css/bootstrap.badge.css";
import { handlePageChange } from "helper/Pagination";

const { Option } = Select;

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
  const defaultPageSize = 10
  const [pageSize, setPageSize] = useState(defaultPageSize)
  const currentDate = moment();
  const [dateFilter, setDateFilter] = useState(currentDate)
  const defaultSortFilter = "desc"
  const [sortFilter, setSortFilter] = useState(defaultSortFilter)

  //Const for color
  const badgeColorPicker = (action) => {
    action = action.toLowerCase()
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
      setDateFilter(value)
    }
  }

  const sortChange = (value) => {
    if (value != null) {
      setSortFilter(value)
    }
  }

  const getPage = async () => {
    await axios.post(
      `/api/session/getPage`,
      { currentPage, pageSize, dateFilter, sortFilter, organization_id: currentOrganization },
      generateToken()[1],
      { cancelToken }
    ).then((res) => {
      var data = res.data
      var list = data.list
      var total = data.total
      setAuditLog(list)
      setTotal(total)
    })
  }

  useEffect(() => {
    getPage()
  }, [dateFilter, pageSize, currentPage, sortFilter])


  return (
    <div>
      <Row justify="space-between">
        <Col>
          <h1>Audit Log</h1>
        </Col>

        <Col>
          <Space align="center">
            <p className="m-0">Date until:</p>
            <DatePicker defaultValue={currentDate} onChange={(value) => dateChange(value)} />
            <Select className="w-100" defaultValue={defaultSortFilter} onChange={(value) => sortChange(value)}>
              <Option value={"desc"}>Desc</Option>
              <Option value={"asc"}>Asc</Option>
            </Select>
          </Space>
        </Col>
      </Row>
      <Card>
        <List
          pagination={{
            current: currentPage,
            showSizeChanger: true,
            defaultPageSize: defaultPageSize,
            pageSizeOptions: [5, 10, 20, 50, 100],
            total,
            onShowSizeChange: (current, size) => {
              setPageSize(size)
            },
            onChange: (page) => {
              handlePageChange(page, setCurrentPage)
            }
          }}
          dataSource={auditLog}
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
                    <h4 style={{ color: "#1565c0", margin: 0 }}>{moment(item.createdAt).format("MMM-DD-YYYY h:mm A")}</h4>
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
