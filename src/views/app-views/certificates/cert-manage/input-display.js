import React, { useState, useEffect } from "react";
import { Card, Col, Row, Button, message, Divider } from "antd";
import { Form, Select } from "antd";
import CertDrawer from "../cert-display/Cert-Drawer";
import { ArrowDownOutlined, ArrowRightOutlined } from "@ant-design/icons";
import CertficiateTemplate from "./component-cert/CertTemplate";
import {
  defaultGeneralCert,
  defaultGeneralBlotter,
  defaultGeneralBusiness,
} from "./Constant";

const { Option } = Select;

const CertDisplay = (props) => {
  const MAX_LENGTH = 2000;
  const {
    setParentData,
    parentData,
    width,
    certType,
    setCertType,
    templateType,
  } = props;
  const [drawer, setDrawer] = useState(false);
  const [selectedUser, SetSelectedUser] = useState(null);
  const [dropDownForm, setDropDownForm] = useState([]);
  const [form] = Form.useForm();
  const onFinish = () => {
    let data = [];
    dropDownForm.map((value) => {
      value.data.map((nestedValue) => {
        const value = form.getFieldValue(nestedValue.formName);
        const name = nestedValue.formName;
        if (value) data.push({ [name]: value });
      });
    });
    const i = [].concat.apply([], data);

    console.log("Received values of form:", i);
  };
  //OnOpen
  const onHandle = (elm) => {
    setDrawer(true);
    SetSelectedUser(elm);
  };
  //Drawer
  const closeDrawer = () => {
    setDrawer(false);
    SetSelectedUser(null);
  };
  // Change this to caroasel later
  const handleChange = (value) => {
    setCertType(value);
  };

  useEffect(() => {
    setCertType(certType);
    switch (certType) {
      case "cert":
        setDropDownForm(defaultGeneralCert);
        break;
      case "blotter":
        setDropDownForm(defaultGeneralBlotter);
        break;
      case "business":
        setDropDownForm(defaultGeneralBusiness);
        break;
    }
  }, [certType]);
  return (
    <Row justify="center">
      <CertDrawer
        width={width}
        data={selectedUser}
        visible={drawer}
        close={() => {
          closeDrawer();
        }}
      />
      <Col
        justify="center"
        className=""
        xs={24}
        sm={24}
        md={24}
        lg={24}
        xl={24}
      >
        <Form
          name="dynamic_form_nest_item"
          onFinish={onFinish}
          autoComplete="off"
          form={form}
          layout="vertical"
        >
          <Card className="custom_cert">
            {certType ? (
              <div className="text-center">
                <Select defaultValue={certType} onChange={handleChange}>
                  <Option value="cert">Certificate Template</Option>
                  <Option value="blotter">Blotter Template</Option>
                  <Option value="business">Business Template</Option>
                </Select>
              </div>
            ) : null}
            <Divider />
            {certType == "cert" ? (
              <>
                <>
                  <CertficiateTemplate
                    {...props}
                    MAX_LENGTH={MAX_LENGTH}
                    dropDownForm={dropDownForm}
                    setDropDownForm={setDropDownForm}
                    form={form}
                  />
                </>
              </>
            ) : certType == "blotter" ? (
              <>
                {" "}
                {dropDownForm.map((item) => {
                  return <>{item.id}</>;
                })}
              </>
            ) : null}
            <Col className="mt-2 text-right">
              {width >= 1399 ? (
                <Button
                  icon={<ArrowDownOutlined />}
                  type="primary"
                  htmlType="submit"
                >
                  Download
                </Button>
              ) : (
                <Button
                  icon={<ArrowRightOutlined />}
                  type="primary"
                  htmlType="submit"
                  onClick={() => onHandle(parentData)}
                >
                  Preview
                </Button>
              )}
            </Col>
          </Card>
        </Form>
      </Col>
    </Row>
  );
};

export default React.memo(CertDisplay);
