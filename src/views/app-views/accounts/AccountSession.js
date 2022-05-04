import { React, useState, useEffect } from "react";
import Flex from "components/shared-components/Flex";
import {
  Row,
  Col,
  Card,
  Dropdown,
  Menu,
  Alert,
  Skeleton,
  Button,
  Empty,
} from "antd";
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
  const postsPerPage = 3;
  let arrayForHoldingSession = [];
  const { generateToken } = useAuth();
  const [sessionData, setSessionData] = useState([]);
  const [sessionDataAll, setSessionDataAll] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nextPageLoad, setNextPageLoad] = useState(false);
  const [totalSession, setTotalSession] = useState(false);
  const [currentSession, setCurrentSession] = useState(false);
  const [limit, setLimit] = useState(5);

  const [next, setNext] = useState(3);
  const [showMessage, setShowMessage] = useState({
    show: false,
    message: "",
    type: "",
  });

  const loopWithSlice = (start, end, data) => {
    for (var i = 0; i < data.length; i++) {
      if (data[i].active === localStorage.getItem(SESSION_TOKEN)) {
        setCurrentSession(data[i]);
        data.splice(i, 1);
      }
    }
    setTimeout(() => {
      setTotalSession(data.length);
      const slicedSession = data.slice(start, end);
      arrayForHoldingSession = [...arrayForHoldingSession, ...slicedSession];
      setSessionData(arrayForHoldingSession);
      setNextPageLoad(false);
    }, 1000);
  };
  const handleShowMoreSession = (data) => {
    setLimit(limit + 5);
    loopWithSlice(0, next + postsPerPage, data);
    setNext(next + postsPerPage);
    setNextPageLoad(true);
  };
  const deleteRow = (row) => {
    const objKey = "_id";
    console.log(row._id);
    let data = sessionData;
    if (selectedRows.length > 1) {
      selectedRows.forEach((elm) => {
        data = utils.deleteArrayRow(data, objKey, elm._id);
        setSessionData(data);
        deleteSession(row._id, generateToken, setShowMessage);
      });
      setSelectedRows([]);
    } else {
      data = utils.deleteArrayRow(data, objKey, row._id);
      setSessionData(data);
      deleteSession(row._id, generateToken, setShowMessage);
    }
  };
  const getData = async () => {
    const data = {
      auth_id: localStorage.getItem(AUTH_TOKEN),
      limit: limit,
    };
    await axios
      .post("/api/app/user/sessions", data, generateToken()[1])
      .then((response) => {
        setIsLoading(false);
        setSessionDataAll(response.data.session);
        setTotalSession(response.data.session.length);
        loopWithSlice(0, postsPerPage, response.data.session);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (showMessage)
      setTimeout(() => {
        setShowMessage(!showMessage);
      }, 3000);
  }, [showMessage]);
  useEffect(() => {
    let mount = true;
    // console.log(currentPhoto);

    if (mount) {
      getData();
    }
    return () => {
      mount = false;
    };
  }, []);
  //Data Dropdown
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
  //DropDown for Single Delete and Not you
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
  //DropDown for Delete All
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
  const SessionRender = (props) => {
    const { currentSessionRender } = props;
    return (
      <>
        <Skeleton loading={isLoading} active avatar>
          {" "}
          <div className="mt-3">
            <div
              className={`d-flex align-items-center justify-content-between mb-4`}
            >
              <AvatarSession
                // icon={<FcLinux size={40} className="anticon" />}
                os={currentSessionRender.os}
                name={
                  currentSessionRender.city +
                  ", " +
                  currentSessionRender.country
                }
                subTitle={currentSessionRender.browser}
                ip={currentSessionRender.host}
                active={currentSessionRender.active}
                checkActive={localStorage.getItem(SESSION_TOKEN)}
                date={currentSessionRender.date}
              />
            </div>

            {props.sessionRender.map((elm, i) => (
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
        </Skeleton>
        <Skeleton
          loading={nextPageLoad}
          active
          avatar
          size={10}
          paragraph={{ rows: 1 }}
        >
          {" "}
          <div className="mt-3">
            <div
              className={`d-flex align-items-center justify-content-between mb-4`}
            >
              <div></div>
            </div>
          </div>
        </Skeleton>
      </>
    );
  };
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
                <SessionRender
                  sessionRender={sessionData}
                  currentSessionRender={currentSession}
                />
                <div className="text-center">
                  {totalSession >= next ? (
                    <Button
                      onClick={() => handleShowMoreSession(sessionDataAll)}
                    >
                      Load More
                    </Button>
                  ) : null}
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
