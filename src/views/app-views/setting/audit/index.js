import React from "react";
import { Row, Col, Space, Timeline, Card, Avatar, List, Tag } from "antd";
import { BsCircleFill } from "react-icons/bs";
import Badge from "react-bootstrap/Badge";
import { dummy_session } from "./fakedata";
import "../../../../assets/css/bootstrap.badge.css";

const Audit = () => {

  const badgeColorPicker = (action) => {
    if (action == "create") {
      return "success";
    }
    if (action == "update") {
      return "primary";
    }
    if (action == "delete") {
      return "danger";
    }
  };

  return (
    <div>
      <h1>Audit/Session</h1>

      <Card>
        <List
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 8,
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
                    <b>{item.name}</b>
                    <p style={{ color: "#1565c0", margin: 0 }}>{item.createdAt}</p>
                  </Space>
                }
                description={
                  <Space wrap>
                    <Badge
                      bg={badgeColorPicker(item.action)}
                      style={{ fontSize: "12px !important" }}
                      pill
                    >
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
