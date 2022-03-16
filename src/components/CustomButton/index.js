import React from "react";
import { Input } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";

export const InputBorder = styled(Input)`
  border: none;
  background-color: #f4f4f5;
  &:hover {
    background-color: #f4f4f5;
  }
`;
const ButtonDark = (props) => {
  return <InputBorder onChange={props.onChange} />;
};

export default ButtonDark;
