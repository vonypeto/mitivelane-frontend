import React from "react";
import { Menu, Dropdown, Avatar } from "antd";
import { connect } from 'react-redux'
import { 
  EditOutlined, 
  SettingOutlined, 
  ShopOutlined, 
  QuestionCircleOutlined, 
  LogoutOutlined 
} from '@ant-design/icons';
import Icon from 'components/util-components/Icon';
import { signOut } from 'redux/actions/Auth';
import utils from "utils";

const menuItem = [
	{
		title: "Edit Profile",
		icon: EditOutlined ,
		path: "/"
    },
    
    {
		title: "Account Setting",
		icon: SettingOutlined,
		path: "/"
    },
    {
		title: "Billing",
		icon: ShopOutlined ,
		path: "/"
	},
    {
		title: "Help Center",
		icon: QuestionCircleOutlined,
		path: "/"
	}
]

export const NavProfile = ({signOut}) => {
  const profileImg = "/img/avatars/thumb-1.jpg";
  const profileMenu = (
    <div className="nav-profile nav-dropdown">
      <div className="nav-profile-header">
        <div className="d-flex">
          <Avatar size={45}   style={{ backgroundColor: "green" }} >  {utils.getNameInitial("Von Maniquis")}</Avatar>
          <div className="pl-3">
            <h4 className="mb-0">VON MANIQUIS</h4>
            <span className="text-muted">Developer</span>
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
          <Menu.Item key={menuItem.length + 1} onClick={e => signOut()}>
            <span>
              <LogoutOutlined className="mr-3"/>
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
          <Avatar style={{ backgroundColor: "green" }} >{utils.getNameInitial("Von Maniquis")} </Avatar>
        </Menu.Item>
      </Menu>
    </Dropdown>
  );
}

export default connect(null, {signOut})(NavProfile)
