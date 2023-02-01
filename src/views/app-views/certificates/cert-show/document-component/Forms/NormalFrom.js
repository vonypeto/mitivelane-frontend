import React from "react";
import { Form, Input, DatePicker } from "antd";
const NormalFrom = (props) => {
  const { onFill, formItems, type } = props;
  return (
    <>
      <Form.Item label={formItems.titleName} name={formItems.formName}>
        {formItems.type === "text" ? (
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
        ) : formItems.type === "date" ? (
          <DatePicker
            style={{
              border: "none",
              backgroundColor: "#F0F0F0",
              width: "100%",
            }}
            onChange={(e) => {
              onFill(e, formItems.formName, "date");
            }}
          />
        ) : null}
      </Form.Item>
    </>
  );
};

export default NormalFrom;
