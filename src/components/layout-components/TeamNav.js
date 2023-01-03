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
const TeamNav = () => {
  const {
    setOrganization,
    currentOrganization,
    setOrganizationMemberList,
    currentUser,
    generateToken,
  } = useAuth();
  let history = useHistory();
  const [id, setId] = useState(currentOrganization);
  const [visible, setVisible] = useState(false);
  const [organizationMember, setOrganizationMember] = useState([
    { name: "", organization_id: "", _id: "" },
  ]);

  useEffect(() => {
    const unsubscribe = setId(currentOrganization);

    return unsubscribe;
  }, [currentOrganization]);

  useEffect(() => {
    getOrganization(currentUser, setOrganizationMember, generateToken);
    return () => {
      setOrganizationMember({});
    };
    // eslint-disable-next-line
  }, []);

  const handleVisibleChange = (flag) => {
    setVisible(flag);
  };
  const handleMenuClick = (e) => {
    message.info("Click on menu item.");

    if (e.key === "1") {
      setTimeout(() => {
        setVisible(!visible);
      }, 200);

      history.push(`/app/` + id + `/setting/team-manage`);
      console.log("click", e.key);
    } else {
      setTimeout(() => {
        setVisible(!visible);
      }, 200);
      history.push(`/pre`);
      console.log("click", e.key);
    }
  };

  const handleOrganizationClick = (e) => {
    message.info("Click on menu item.");
    var split = e.key.split(",");

    console.log("click", split);
    setTimeout(() => {
      setVisible(!visible);
    }, 200);
    console.log(e);
    setOrganization(split[0]);
    setOrganizationMemberList(split[1]);
    localStorage.setItem(AUTH_ORGANIZATION, split[0]);
    localStorage.setItem(AUTH_ORGANIZATION_LIST, split[1]);

    history.push(`/app/` + split[0] + `/dashboards/home`);
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
          <Menu onClick={handleOrganizationClick} key="2">
            {organizationMember?.map((item) => (
              // eslint-disable-next-line
              <Menu.Item key={item?.organization_id + "," + item?._id}>
                {/* //eslint-disable-next-line */}
                <a href="#/">
                  <span className="d-flex justify-content-between align-items-center">
                    <div>
                      <span className=" font-weight-normal text-gray">
                        Organization {item?.organization_name}
                      </span>
                    </div>
                    {/* {console.log(id, item?.organization_id)} */}
                    {id === item?.organization_id ? (
                      <CheckOutlined className="text-success" />
                    ) : null}
                  </span>{" "}
                </a>
              </Menu.Item>
            ))}
          </Menu>
        </>
      );
    } catch (error) {
      console.log(error);
    }
  };
  const CreateTeam = () => (
    <div className="nav-profile-body">
      <div className="pl-1 padding-setting">
        <Menu key="1" onClick={handleMenuClick}>
          <Menu.Item className="ant-dropdown-menu-item-hover" key={1}>
            <a href="#/">
              <span className="font-weight-normal text-gray ">
                Organization Settings
              </span>
            </a>
          </Menu.Item>
          <Menu.Item className="ant-dropdown-menu-item-hover" key={2}>
            <a href="#/">
              <span className="font-weight-normal text-gray">
                Create Organization
              </span>
            </a>
          </Menu.Item>
          <Menu.Divider />
        </Menu>
      </div>
    </div>
  );
  const TeamMenu = (
    <>
      <div className="nav-profile nav-dropdown">
        <RenderName />
        <CreateTeam />
        <div className="nav-profile-header-n">
          <div className="d-flex">
            <div className="pl-1">
              <span className="text-muted-setting">Switch Organization</span>
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
      <Dropdown
        placement="bottomRight"
        onVisibleChange={handleVisibleChange}
        visible={visible}
        trigger={["click"]}
        overlay={TeamMenu}
        icon={<UserSwitchOutlined />}
      >
        <Menu mode="horizontal">
          <Menu.Item key="language">
            <a href="#/" onClick={(e) => e.preventDefault()}>
              <UserSwitchOutlined className="mr-0 nav-icon" />
            </a>
          </Menu.Item>
        </Menu>
      </Dropdown>
    </>
  );
};

export default TeamNav;
