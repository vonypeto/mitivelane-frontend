import React, { useState, useEffect } from "react";
import { Card, Col, Row, Button, message, Divider } from "antd";
import { Form, Select } from "antd";
import CertDrawer from "../cert-display/Cert-Drawer";
import {
  ArrowDownOutlined,
  ArrowRightOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import CertficiateTemplate from "./component-cert/CertTemplate";
import {
  defaultGeneralCert,
  defaultGeneralBlotter,
  defaultGeneralBusiness,
} from "./Constant";
import { Menu, Dropdown, Space, Tooltip } from "antd";
import { Carousel } from "@trendyol-js/react-carousel";
import PDFTemplate from "components/shared-components/Documents/Certificates-General";
import FileTest from "assets/files/test.pdf";

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
  const [visible, setVisible] = useState(false);
  const handleVisibleChange = (flag) => {
    console.log("click");
    setVisible(flag);
  };
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

  const TESTDATA = () => {
    return (
      <div>
        <div className="container nav-profile template-dropdown nav-dropdown">
          <div className="nav-profile-header-n">
            <div className="d-flex" style={{ display: "inline-block" }}>
              <Col lg={24}>
                <Card>
                  <Carousel
                    show={3.5}
                    slide={2}
                    swiping={true}
                    className="exampleCarousel1"
                    style={{ display: "inline-block" }}
                  >
                    <Col
                      xs={18}
                      sm={18}
                      md={18}
                      lg={18}
                      xl={18}
                      xxl={18}
                      justify="center"
                    >
                      <PDFTemplate
                        certType="cert"
                        templateType="simple"
                        min={4}
                        max={9}
                        pdf={FileTest}
                        type={"template"}
                      />
                    </Col>
                    <Col
                      xs={18}
                      sm={18}
                      md={18}
                      lg={18}
                      xl={18}
                      xxl={18}
                      justify="center"
                    >
                      <PDFTemplate
                        certType="cert"
                        templateType="simple"
                        min={4}
                        max={9}
                        pdf={FileTest}
                        type={"template"}
                      />
                    </Col>
                    <Col
                      xs={18}
                      sm={18}
                      md={18}
                      lg={18}
                      xl={18}
                      xxl={18}
                      justify="center"
                    >
                      <PDFTemplate
                        certType="cert"
                        templateType="simple"
                        min={4}
                        max={9}
                        pdf={FileTest}
                        type={"template"}
                      />
                    </Col>
                    <Col
                      xs={18}
                      sm={18}
                      md={18}
                      lg={18}
                      xl={18}
                      xxl={18}
                      justify="center"
                    >
                      <PDFTemplate
                        certType="cert"
                        templateType="simple"
                        min={4}
                        max={9}
                        pdf={FileTest}
                        type={"template"}
                      />
                    </Col>
                    <Col
                      xs={18}
                      sm={18}
                      md={18}
                      lg={18}
                      xl={18}
                      xxl={18}
                      justify="center"
                    >
                      <PDFTemplate
                        certType="cert"
                        templateType="simple"
                        min={4}
                        max={9}
                        pdf={FileTest}
                        type={"template"}
                      />
                    </Col>
                  </Carousel>
                </Card>
              </Col>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Row justify="center">
      <Col xs={24} sm={24} md={24} lg={24}>
        <Card className="custom_cert">
          <div className="d-flex justify-content-between">
            <div>
              {certType ? (
                <div className="text-center">
                  <Select defaultValue={certType} onChange={handleChange}>
                    <Option value="cert">Certificate Template</Option>
                    <Option value="blotter">Blotter Template</Option>
                    <Option value="business">Business Template</Option>
                  </Select>
                </div>
              ) : null}
            </div>

            <div>
              <Dropdown
                placement="bottomCenter"
                onVisibleChange={handleVisibleChange}
                visible={visible}
                trigger={["click"]}
                overlay={TESTDATA}
                T
                icon={<SnippetsOutlined />}
              >
                <Menu mode="horizontal">
                  <Menu.Item key="language">
                    <a>
                      <SnippetsOutlined className="mr-0 nav-icon" /> Templates
                    </a>
                  </Menu.Item>
                </Menu>
              </Dropdown>
            </div>
          </div>
        </Card>
      </Col>
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
