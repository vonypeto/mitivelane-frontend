import React from "react";
import { Row, Col, Space, Timeline, Card, Avatar, List, Tag } from "antd";
import { BsCircleFill } from "react-icons/bs";
import Badge from "react-bootstrap/Badge";

import "../../../../assets/css/bootstrap.badge.css";

const data = [
  {
    id: 1,
    name: "Giann",
    action: "Created list for ayuda.",
    color: "green",
    date: "10-11-2021",
    module: "Organization",
  },
  {
    id: 2,
    name: "Giann",
    action: "Deleted 5 users.",
    color: "red",
    date: "10-16-2021",
    module: "User",
  },
  {
    id: 3,
    name: "Rojhon",
    action: "Edited mothly funds for October 2021.",
    color: "blue",
    date: "10-21-2021",
    module: "Organization",
  },
  {
    id: 4,
    name: "Von",
    action: "Created list for good employees for this month.",
    color: "green",
    date: "10-21-2021",
    module: "Organization",
  },
  {
    id: 2,
    name: "Giann",
    action: "Deleted 2 documents.",
    color: "red",
    date: "10-16-2021",
    module: "Blotter",
  },
  {
    id: 2,
    name: "Giann",
    action: "Deleted 5 users.",
    color: "red",
    date: "10-16-2021",
    module: "User",
  },
  {
    id: 3,
    name: "Rojhon",
    action: "Edited mothly funds for October 2021.",
    color: "blue",
    date: "10-21-2021",
    module: "Organization",
  },
  {
    id: 4,
    name: "Von",
    action: "Created list for good employees for this month.",
    color: "green",
    date: "10-21-2021",
    module: "Organization",
  },
  {
    id: 2,
    name: "Giann",
    action: "Deleted 2 documents.",
    color: "red",
    date: "10-16-2021",
    module: "Blotter",
  },
  {
    id: 2,
    name: "Giann",
    action: "Deleted 5 users.",
    color: "red",
    date: "10-16-2021",
    module: "User",
  },
  {
    id: 3,
    name: "Rojhon",
    action: "Edited mothly funds for October 2021.",
    color: "blue",
    date: "10-21-2021",
    module: "Organization",
  },
  {
    id: 4,
    name: "Von",
    action: "Created list for good employees for this month.",
    color: "green",
    date: "10-21-2021",
    module: "Organization",
  },
  {
    id: 2,
    name: "Giann",
    action: "Deleted 2 documents.",
    color: "red",
    date: "10-16-2021",
    module: "Blotter",
  },
];

const index = () => {
  const badgeColorPicker = (color) => {
    if (color == "green") {
      return "success";
    }
    if (color == "blue") {
      return "primary";
    }
    if (color == "red") {
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
          dataSource={data}
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
                    <p style={{ color: "#1565c0", margin: 0 }}>{item.date}</p>
                  </Space>
                }
                description={
                  <Space wrap>
                    <Badge
                      bg={badgeColorPicker(item.color)}
                      style={{ fontSize: "12px !important" }}
                      pill
                    >
                      {item.action}
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

export default index;
