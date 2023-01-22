import React from "react";
import { Form, Input } from "antd";
const NormalFrom = (props) => {
  const { onFill, formItems } = props;
  return (
    <>
      <Form.Item label={formItems.titleName} name={formItems.formName}>
        <Input
          placeholder={formItems.titleName}
          style={{
            border: "none",
            backgroundColor: "#F0F0F0",
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
