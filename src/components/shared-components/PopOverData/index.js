import { React, useState, useEffect } from "react";
import { CheckOutlined, UserSwitchOutlined } from "@ant-design/icons";
import { Menu, Dropdown, message } from "antd";
import { useAuth } from "contexts/AuthContext";
import { getOrganization } from "api/ComponentController/TeamNavController";
import { useHistory } from "react-router-dom";
import {
  AUTH_ORGANIZATION,
  AUTH_ORGANIZATION_LIST,
} from "redux/constants/Auth";
import { Button, Popover } from "antd";

const TeamNav = () => {
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (flag) => {
    setVisible(flag);
  };
  const RenderName = () => (
    <div className="nav-profile-header-n">
      <div className="d-flex">
        <div className="pl-1">
          <span className="text-muted-setting">Manage Organization</span>
        </div>
      </div>
    </div>
  );
  const OrganizationNames = () => {
    try {
      return (
        <>
          <Menu key="2">
            <Menu.Item>
              {/* //eslint-disable-next-line */}
              <a href="#/">
                <span className="d-flex justify-content-between align-items-center">
                  <div>
                    <span className=" font-weight-normal text-gray">1</span>
                  </div>

                  <CheckOutlined className="text-success" />
                </span>{" "}
              </a>
            </Menu.Item>{" "}
            <Menu.Item>
              {/* //eslint-disable-next-line */}
              <a href="#/">
                <span className="d-flex justify-content-between align-items-center">
                  <div>
                    <span className=" font-weight-normal text-gray">1</span>
                  </div>

                  <CheckOutlined className="text-success" />
                </span>
              </a>
            </Menu.Item>
          </Menu>
        </>
      );
    } catch (error) {
      console.log(error);
    }
  };

  const TeamMenu = (
    <>
      <div className="nav-profile nav-dropdown">
        <div className="nav-profile-header-n">
          <div>
            <div className="text-center ">
              <span className="">Switch Organization</span>
            </div>
          </div>
        </div>

        <div className="nav-profile-body">
          <div className="pl-1 padding-setting">
            {/* <Menu key="2"> */}
            <OrganizationNames />
            {/* <Menu.Item key={2}>
                <a href="#">
                  <span className="font-weight-normal text-gray">
                    Organization San Andress
                  </span>
                </a>
              </Menu.Item> */}
            {/* </Menu> */}
          </div>
        </div>
      </div>
    </>
  );
  return (
    <>
      <Popover
        placement="bottom"
        content={TeamMenu}
        trigger="hover"
        className="test"
      >
        <Button>Hover me</Button>
      </Popover>
    </>
  );
};

export default TeamNav;
