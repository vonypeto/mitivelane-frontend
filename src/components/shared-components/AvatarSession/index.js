import React from "react";
import PropTypes from "prop-types";
import { Avatar, Tooltip } from "antd";
import { FcPhoneAndroid, FcIphone, FcLinux } from "react-icons/fc";
import { MdOutlineDevices } from "react-icons/md";
import { AiFillWindows } from "react-icons/ai";
const renderAvatar = (props) => {
  const { os } = props;
  let icon;
  if (os == "Android") {
    icon = <FcPhoneAndroid className="anticon" size="40" />;
  } else if (os == "Linux") {
    icon = <FcLinux className="anticon" size="40" />;
  } else if (os == "Windows") {
    icon = (
      <AiFillWindows
        size="39"
        className="anticon"
        style={{ color: "#0979D9" }}
      />
    );
  } else if (os == "Iphone") {
    icon = <FcIphone className="anticon" size="40" />;
  } else {
    icon = <MdOutlineDevices className="anticon" size="40" />;
  }
  return <Avatar icon={icon} style={{ backgroundColor: "white" }}></Avatar>;
};

const timeSince = (date) => {
  var time = new Date(date);
  var seconds = Math.floor((new Date() - time) / 1000);
  // seconds -= +28800;
  var interval = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
};
export const AvatarSession = (props) => {
  const {
    name,
    suffix,
    subTitle,
    id,
    src,
    icon,
    ip,
    checkActive,
    active,
    date,
    onNameClick,
    os,
  } = props;
  return (
    <div className="avatar-status d-flex align-items-center">
      {renderAvatar({ icon, os })}
      <div className="ml-2">
        <div>
          {onNameClick ? (
            <div
              onClick={() => onNameClick({ name, subTitle, src, id })}
              className="avatar-status-name clickable"
            >
              <Tooltip title={ip}>{name}</Tooltip>
            </div>
          ) : (
            <Tooltip title={ip}>
              <div className="avatar-status-name">{name}</div>{" "}
            </Tooltip>
          )}

          <span>{suffix}</span>
        </div>
        <div className="text-muted avatar-status-subtitle">
          {subTitle}:
          {active == checkActive ? (
            <>
              <span style={{ color: "green" }}> Active Now</span>
            </>
          ) : (
            <> Last {timeSince(date)}</>
          )}
        </div>
      </div>
    </div>
  );
};

AvatarSession.propTypes = {
  name: PropTypes.string,
  src: PropTypes.string,
  type: PropTypes.string,
  onNameClick: PropTypes.func,
};

export default AvatarSession;
