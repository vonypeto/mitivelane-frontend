import { React, useState, useEffect } from "react";
import { CheckOutlined, UserSwitchOutlined } from "@ant-design/icons";
import { Menu, Dropdown, message } from "antd";
import { useAuth } from "contexts/AuthContext";
import { getBarangay } from "api/ComponentController/TeamNavController";
import { useHistory } from "react-router-dom";
import { AUTH_BARANGAY, AUTH_BARANGAY_LIST } from "redux/constants/Auth";
const TeamNav = () => {
  let history = useHistory();
  const {
    setBarangay,
    currentBarangay,
    setBarangayMemberList,
    currentUser,
    generateToken,
  } = useAuth();
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState(currentBarangay);
  const [barangayMember, setBarangayMember] = useState([
    { name: "", barangay_id: "", _id: "" },
  ]);

  useEffect(() => {
    const unsubscribe = setId(currentBarangay);

    return unsubscribe;
  }, [currentBarangay]);

  useEffect(() => {
    getBarangay(currentUser, setBarangayMember, generateToken);
    return () => {
      setBarangayMember({});
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

  const handleBarangayClick = (e) => {
    message.info("Click on menu item.");
    var split = e.key.split(",");

    console.log("click", split);
    setTimeout(() => {
      setVisible(!visible);
    }, 200);
    setBarangay(split[1]);
    setBarangayMemberList(split[0]);
    localStorage.setItem(AUTH_BARANGAY, split[1]);
    localStorage.setItem(AUTH_BARANGAY_LIST, split[0]);

    history.push(`/app/` + split[1] + `/dashboards/home`);
  };
  const RenderName = () => (
    <div className="nav-profile-header-n">
      <div className="d-flex">
        <div className="pl-1">
          <span className="text-muted-setting">Manage Barangay</span>
        </div>
      </div>
    </div>
  );
  const BarangayNames = () => {
    try {
      return (
        <>
          <Menu onClick={handleBarangayClick} key="2">
            {barangayMember?.map((item) => (
              // eslint-disable-next-line
              <Menu.Item key={item?.barangay_id + "," + item?._id}>
                {/* //eslint-disable-next-line */}
                <a href="#/">
                  <span className="d-flex justify-content-between align-items-center">
                    <div>
                      <span className=" font-weight-normal text-gray">
                        Barangay {item?.barangay_name}
                      </span>
                    </div>
                    {id === item?.barangay_id ? (
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
                Barangay Settings
              </span>
            </a>
          </Menu.Item>
          <Menu.Item className="ant-dropdown-menu-item-hover" key={2}>
            <a href="#/">
              <span className="font-weight-normal text-gray">
                Create Barangay
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
              <span className="text-muted-setting">Switch Barangay</span>
            </div>
          </div>
        </div>

        <div className="nav-profile-body">
          <div className="pl-1 padding-setting">
            {/* <Menu key="2"> */}
            <BarangayNames />
            {/* <Menu.Item key={2}>
                <a href="#">
                  <span className="font-weight-normal text-gray">
                    Barangay San Andress
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
