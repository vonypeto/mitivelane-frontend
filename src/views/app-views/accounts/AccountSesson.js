import { React, useState, useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import { Row, Col, Card, Dropdown, Menu } from "antd";
import {
  EllipsisOutlined,
  MinusCircleOutlined,
  QuestionCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import axios from "axios";
import { FcPhoneAndroid, FcIphone, FcLinux } from "react-icons/fc";
import { AiFillWindows, AiFillTablet } from "react-icons/ai";
import { AUTH_TOKEN, SESSION_TOKEN } from "redux/constants/Auth";
import { NewMembersData } from "./DefaultDashboardData";
import AvatarSession from "components/shared-components/AvatarSession";

const newJoinMemberOption = (
  <Menu>
    <Menu.Item key="0">
      <span>
        <div className="d-flex align-items-center">
          <MinusCircleOutlined />
          <span className="ml-2">Clear all session</span>
        </div>
      </span>
    </Menu.Item>
  </Menu>
);
const dropdownMenu = (_) => (
  <Menu>
    <Menu.Item onClick={() => {}}>
      <Flex alignItems="center">
        <QuestionCircleOutlined />
        <span className="ml-2">Not you</span>
      </Flex>
    </Menu.Item>
    <Menu.Item onClick={() => {}}>
      <Flex alignItems="center">
        <ExclamationCircleOutlined />{" "}
        <span className="ml-2">Remove device</span>
      </Flex>
    </Menu.Item>
  </Menu>
);
const cardDropdown = (menu) => (
  <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
    <a
      href="/#"
      className="text-gray font-size-lg"
      onClick={(e) => e.preventDefault()}
    >
      <EllipsisOutlined />
    </a>
  </Dropdown>
);
const AccountSession = () => {
  const [newMembersData] = useState(NewMembersData);
  const [sessionData, setSessionData] = useState([]);

  useEffect(() => {
    let mount = true;
    // console.log(currentPhoto);
    if (mount) {
      const data = {
        auth_id: localStorage.getItem(AUTH_TOKEN),
      };
      axios.post("/api/app/user/sessions", data).then((response) => {
        console.log(response.data[0].host);
        setSessionData(response.data);
      });
    }
    return () => {
      mount = false;
    };
  }, []);
  return (
    <>
      <Col xs={24} sm={24} md={8}>
        <div className="pl-1">
          <h3>Manage Session MitveLane</h3>
          <p className="mt-1 text-sm text-gray-600">
            Manage all devices login to this applications.
          </p>
        </div>
      </Col>
      <Col xs={24} sm={24} md={15} className="ant-body-pt">
        <Card title="Sessions" extra={cardDropdown(newJoinMemberOption)}>
          <Col xs={24} sm={24} md={24} className="w-100">
            <Row className="pt-2 border-top ">
              <Col xs={24} sm={24} md={24} className="pt-2 text-left ">
                <div className="mt-3">
                  {sessionData.reverse().map((elm, i) => (
                    <div
                      key={i}
                      className={`d-flex align-items-center justify-content-between mb-4`}
                    >
                      <AvatarSession
                        id={i}
                        icon={<FcLinux size={40} className="anticon" />}
                        os={elm.os}
                        name={elm.city + ", " + elm.country}
                        subTitle={elm.browser}
                        ip={elm.host}
                        active={elm.active}
                        checkActive={localStorage.getItem(SESSION_TOKEN)}
                        date={elm.date}
                      />
                      <div>
                        <EllipsisDropdown menu={dropdownMenu(elm)} />
                      </div>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
          </Col>
        </Card>
      </Col>
    </>
  );
};

export default AccountSession;
