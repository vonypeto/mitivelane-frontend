import React from "react";
import { notification } from "antd";
import PropTypes from "prop-types";
import { LoadingOutlined } from "@ant-design/icons";

const Notification = (props) => {
  const { message, description, duration, type } = props;

  //put if else else

  //   const args = {
  //     message: message,
  //     description: description,
  //     duration: duration,
  //   };

  const args = {
    message: message,
    description: description,
    duration: duration,
  };
  if (type == "error") return notification.error(args);
  if (type == "success") return notification.success(args);
  if (type == "info") return notification.info(args);
  if (type == "warning") return notification.warning(args);
  if (type == "warn") return notification.warn(args);
  if (type == "open") return notification.open(args);
  if (type == "close") return notification.close("Close");
  if (type == "destroy") return notification.destroy();
  else return notification.open(args);
};

Notification.propTypes = {
  message: PropTypes.string,
  description: PropTypes.string,
  duration: PropTypes.number,
  type: PropTypes.string,
};
Notification.defaultProps = {
  message: "Notification Title",
  description:
    "I will never close automatically. This is a purposely very very long description that has many many characters and words.",
  duration: 0,
  type: "simple",
};

export default Notification;
