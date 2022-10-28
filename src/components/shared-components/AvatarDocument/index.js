import React from "react";
import PropTypes from "prop-types";
import { Avatar } from "antd";

const renderAvatar = (props) => {
  return (
    <Avatar
      style={{ backgroundColor: "white" }}
      {...props}
      className={`ant-avatar-${props.type}`}
    >
      {props.text}
    </Avatar>
  );
};

export const AvatarStatus = (props) => {
  const {
    name,
    suffix,
    subTitle,
    id,
    type,
    src,
    icon,
    size,
    shape,
    gap,
    text,
    onNameClick,
  } = props;
  return (
    <div className="avatar-status d-flex align-items-center">
      {renderAvatar({ icon, src, type, size, shape, gap, text })}
      <div className="ml-2">
        <div>
          <div className="avatar-status-name">{name}</div>
        </div>
      </div>
    </div>
  );
};

AvatarStatus.propTypes = {
  name: PropTypes.string,
  src: PropTypes.string,
  type: PropTypes.string,
  onNameClick: PropTypes.func,
};

export default AvatarStatus;
