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
  notification.warning(args);

  //   notification.success(config)

  // notification.error(config)

  // notification.info(config)

  // notification.warning(config)

  // notification.warn(config)

  // notification.open(config)

  // notification.close(key: String)

  // notification.destroy()
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
