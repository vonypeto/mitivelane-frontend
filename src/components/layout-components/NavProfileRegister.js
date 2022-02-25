import React from "react";
import { Menu, Dropdown, Avatar } from "antd";
import { connect } from "react-redux";
import {
  EditOutlined,
  SettingOutlined,
  ShopOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Icon from "components/util-components/Icon";
import { signOut } from "redux/actions/Auth";
import { useHistory } from "react-router-dom";
import utils from "utils";
import { useAuth } from "contexts/AuthContext";
import { logOut } from "api/ComponentController/NavProfileController";
import { PROFILE_URL } from "redux/constants/Auth";
const menuItem = [
  {
    title: "Help Center",
    icon: QuestionCircleOutlined,
    path: "/pre/help-center",
  },
];
let colortag = [
  "#0085c3",
  "#7ab800",
  "#f2af00",
  "#dc5034",
  "#ce1126",
  "#0085c3",
  "#FF1493",
];
export const NavProfile = ({ signOut }) => {
  // let history = useHistory();
  const { currentUser, generateToken, currentPhoto } = useAuth();
  // const profileImg = "/img/avatars/thumb-1.jpg";

  const profile = JSON.parse(localStorage.getItem(PROFILE_URL) || "[]");

  const user =
    currentUser?.displayName != null ? currentUser.displayName : "N/A";
  const signOutNode = () => {
    logOut(signOut, generateToken);
    // signOut();
  };
  console.log(currentPhoto?.profile_color);
  const random = Math.floor(Math.random() * colortag.length);
  console.log(random, colortag[random]);
  const profileMenu = (
    <div className="nav-profile nav-dropdown">
      <div className="nav-profile-header">
        <div className="d-flex">
          <Avatar
            src={profile?.profile_data}
            size={45}
            style={{ backgroundColor: profile?.profile_color }}
          >
            <b> {utils.getNameInitial(user)} </b>{" "}
          </Avatar>
          <div className="pl-3">
            <h4 className="mb-0">
              {currentUser?.displayName != null
                ? currentUser.displayName
                : "N/A"}
            </h4>
            <span className="text-muted">N/A</span>
          </div>
        </div>
      </div>
      <div className="nav-profile-body">
        <Menu>
          {menuItem.map((el, i) => {
            return (
              <Menu.Item key={i}>
                <a href={el.path}>
                  <Icon className="mr-3" type={el.icon} />
                  <span className="font-weight-normal">{el.title}</span>
                </a>
              </Menu.Item>
            );
          })}
          <Menu.Item key={menuItem.length + 1} onClick={() => signOutNode()}>
            <span>
              <LogoutOutlined className="mr-3" />
              <span className="font-weight-normal">Sign Out</span>
            </span>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
  return (
    <Dropdown placement="bottomRight" overlay={profileMenu} trigger={["click"]}>
      <Menu className="d-flex align-item-center" mode="horizontal">
        <Menu.Item key="profile">
          <Avatar
            src={profile?.profile_data}
            style={{ backgroundColor: profile?.profile_color }}
          >
            <b> {utils.getNameInitial(user)} </b>
          </Avatar>
        </Menu.Item>
      </Menu>
    </Dropdown>
  );
};

export default connect(null, { signOut })(NavProfile);
