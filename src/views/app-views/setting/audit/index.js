import React from "react";
import { Row, Col, Space, Timeline, Card, Avatar, List, Tag, Badge as AntdBadge } from "antd";
import { BsCircleFill } from "react-icons/bs";
import Badge from "react-bootstrap/Badge";
import { dummy_session } from "./fakedata";
import "../../../../assets/css/bootstrap.badge.css";

const Audit = () => {

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

  return (
    <div>
      <h1>Audit/Session</h1>

      <Card>
        <List
          pagination={{
            showSizeChanger: true,
            defaultPageSize: 8,
            pageSizeOptions: [8, 10, 20, 50, 100],
            onShowSizeChange: (current, size) => {
              console.log("current", current)
              console.log("size", size)
            },
            onChange: (page, pageSize) => {
              console.log("page", page)
              console.log("pageSize", pageSize)
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
                    <AntdBadge color={badgeColorPicker(item.action)} />
                  </Space>
                }
                description={
                  <Space wrap>
                    <h4 className="m-0">
                      {item.message}
                    </h4>

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
