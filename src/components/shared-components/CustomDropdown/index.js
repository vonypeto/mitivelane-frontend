import React from "react";
import { Dropdown, Menu } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const CustomDropdown = (props) => {

	// console.log("props", props)
	const menu = (menuItems) => {
		return (
			<Menu>
				{
					menuItems.map((item, key) => {
						return (
							<Menu.Item key={key} onClick={item.onClick} >
								<span>
									<div className="d-flex align-items-center" >
										{item.icon}
										<span className="ml-2">{item.text}</span>
									</div>
								</span>
							</Menu.Item>
						)
					})
				}
			</Menu>
		)
	}


	return (
		<Dropdown overlay={menu(props.menuItems)} placement={props.placement} trigger={['click']}>
			<div className="ellipsis-dropdown">
				<EllipsisOutlined />
			</div>
		</Dropdown>
	)
}

CustomDropdown.propTypes = {
  trigger: PropTypes.string,
  placement: PropTypes.string,
};

CustomDropdown.defaultProps = {
  trigger: "click",
  placement: "bottomRight",
  menuItems: [],
};

export default CustomDropdown;
