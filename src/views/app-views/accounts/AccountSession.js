import { React, useState, useEffect } from "react";
import Flex from "components/shared-components/Flex";
import { Row, Col, Card, Dropdown, Menu, Alert } from "antd";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import axios from "axios";
import utils from "utils";
import { AUTH_TOKEN, SESSION_TOKEN } from "redux/constants/Auth";
import AvatarSession from "components/shared-components/AvatarSession";
import { useAuth } from "contexts/AuthContext";
import { deleteSession } from "api/AppController/AccountsController/AccountDetailsController";
import Loading from "components/shared-components/Loading";
import LazyLoad from "react-lazyload";

import {
  EllipsisOutlined,
  MinusCircleOutlined,
  QuestionCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
const AccountSession = () => {
  const { generateToken } = useAuth();
  const [sessionData, setSessionData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showMessage, setShowMessage] = useState({
    show: false,
    message: "test",
    type: "success",
  });

  const deleteRow = (row) => {
    const objKey = "_id";
    console.log(row._id);
    let data = sessionData;
    if (selectedRows.length > 1) {
      selectedRows.forEach((elm) => {
        data = utils.deleteArrayRow(data, objKey, elm._id);
        setSessionData(data.reverse());
        deleteSession(row._id, generateToken, setShowMessage);
      });
    } else {
      data = utils.deleteArrayRow(data, objKey, row._id);
      setSessionData(data.reverse());
      deleteSession(row._id, generateToken, setShowMessage);
    }
  };

  useEffect(() => {
    let mount = true;
    // console.log(currentPhoto);
    if (showMessage)
      setTimeout(() => {
        setShowMessage(!showMessage);
      }, 3000);
    if (mount) {
      const data = {
        auth_id: localStorage.getItem(AUTH_TOKEN),
      };
      axios.post("/api/app/user/sessions", data).then((response) => {
        setSessionData(response.data.session);
      });
    }
    return () => {
      mount = false;
    };
  }, [showMessage]);

  const newJoinMemberOption = (
    <Menu>
      <Menu.Item key="0">
        <span>
          <div className="d-flex align-items-center">
            <MinusCircleOutlined />
            <span className="ml-2">Clear all sessions</span>
          </div>
        </span>
      </Menu.Item>
    </Menu>
  );
  const dropdownMenu = (data) => (
    <Menu>
      <Menu.Item key="0" onClick={() => {}}>
        <Flex alignItems="center">
          <QuestionCircleOutlined />
          <span className="ml-2">Not you</span>
        </Flex>
      </Menu.Item>
      <Menu.Item
        key="1"
        onClick={() => {
          deleteRow(data);
        }}
      >
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
              {" "}
              <Col xs={24} sm={24} md={24} className="pt-2 text-left ">
                {" "}
                {showMessage.show == true ? (
                  <Alert
                    message={showMessage.message}
                    type={showMessage.type}
                    showIcon
                    closable
                  />
                ) : null}
                <div className="mt-3">
                  {sessionData.reverse().map((elm, i) => (
                    <div
                      key={i}
                      className={`d-flex align-items-center justify-content-between mb-4`}
                    >
                      <AvatarSession
                        id={i}
                        // icon={<FcLinux size={40} className="anticon" />}
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
