import React from 'react'
import { Avatar } from 'antd'
import { UserOutlined } from "@ant-design/icons";

const CustomAvatar = (props) => {
    const { icon, image, color, style, size} = props

    const backgroundColor = {backgroundColor: color}

    return (
        {
            ...image != null ?
                <Avatar
                    size={size}
                    style={style}
                    src={image}
                />

                :

                <Avatar
                    size={size}
                    style={{...style, ...backgroundColor}}
                    icon={icon}
                />
        
        }
    )
}

CustomAvatar.defaultProps = {
    icon: <UserOutlined/>,
    size: 70
  };

export default CustomAvatar