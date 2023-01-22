import {React, useState} from "react";
import { CheckOutlined, GlobalOutlined, DownOutlined , UserSwitchOutlined } from '@ant-design/icons';
import { Menu, Dropdown , message} from "antd";
import { useHistory } from 'react-router-dom'


const TeamNav = ({ id, configDisplay, onLocaleChange }) => {

    let history = useHistory();

	const handleMenuClick = (e) => {
		message.info('Click on menu item.');
	
		if(e.key === "1"){
	
			history.push(`/app/1002/residents/resident-information/add`);
			console.log('click', e.key);
		}
	
	  }
	  const teamMenu = (
	<>
	
	sad
	
	
	</>
	  );
    return (
        <div>
         		 <Dropdown onClick={handleMenuClick} overlay={teamMenu}>
                  {
				configDisplay ?
				(
					<a href="#/" className="text-gray" onClick={e => e.preventDefault()}>
						
					</a>
				)
				:
				(
					<Menu mode="horizontal">
						<Menu.Item key="language">
							<a href="#/" onClick={e => e.preventDefault()}>
								<GlobalOutlined className="mr-0 nav-icon" />
							</a>
						</Menu.Item>
					</Menu>
				)
			}
    </Dropdown>
   
        </div>
    )
}

export default TeamNav
