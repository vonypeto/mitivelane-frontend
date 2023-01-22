import React from "react";
import { Form, Input } from "antd";
const NormalFrom = (props) => {
  const { onFill, formItems } = props;
  return (
    <>
      <Form.Item label={formItems.titleName} name={formItems.formName}>
        <Input
          style={{
            border: "none",
            backgroundColor: "#f4f4f5",
          }}
          onChange={(e) => {
            onFill(e, formItems.formName, "text");
          }}
        />
      </Form.Item>
    </>
  );
};

export default NormalFrom;
