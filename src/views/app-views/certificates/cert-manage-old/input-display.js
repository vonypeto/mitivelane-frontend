import React, { useState, useEffect } from "react";
import { Card, Col, Row, Button, message, Divider } from "antd";
import { Form, Select } from "antd";
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
  defaultTemplateCert,
  defaultTemplateBlotter,
} from "./Constant";
import { Menu, Dropdown, Space, Tooltip } from "antd";
import { Carousel } from "@trendyol-js/react-carousel";
import PDFTemplate from "components/shared-components/Documents";

const { Option } = Select;

const CertDisplay = React.memo(
  (props) => {
    // Fixed State
    const MAX_LENGTH = 2000;

    // Props
    const {
      setParentData,
      parentData,
      width,
      certType,
      setCertType,
      templateType,
      setTemplateType,
    } = props;

    // Form State
    const [form] = Form.useForm();
    const [selectedUser, SetSelectedUser] = useState(null);
    const [dropDownForm, setDropDownForm] = useState([]);
    const [templateState, setTemplateState] = useState([]);

    // Loading State
    const [visible, setVisible] = useState(false);
    const [drawer, setDrawer] = useState(false);

    const handleVisibleChange = (flag) => {
      setVisible(flag);
    };
    const onFinish = () => {
      let data = [];
      console.log(form.getFieldValue("signatures1"));
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
      let data = parentData;

      data.cert_type = value;
      if (value == "cert") {
        data.template_type = "simple_border";
      }

      setParentData(data);
      setCertType(value);
    };

    useEffect(() => {
      let isApiSubscribed = true;

      if (isApiSubscribed) {
        setCertType(certType);
        switch (certType) {
          case "cert":
            setDropDownForm(defaultGeneralCert);
            setTemplateState(defaultTemplateCert);
            break;
          case "blotter":
            setDropDownForm(defaultGeneralBlotter);
            setTemplateState(defaultTemplateBlotter);

            break;
          case "business":
            setDropDownForm(defaultGeneralBusiness);
            break;
        }
      }
      return () => {
        // cancel the subscription
        isApiSubscribed = false;
      };
    }, [certType]);
    const onHandleTemplateChange = (e, data) => {
      e.preventDefault();

      let templateType = data;

      let parent = parentData;
      parent.template_type = templateType;
      setTemplateType(data);
      setParentData(parent);
    };
    const TESTDATA = () => {
      return (
        <div>
          <div className="container nav-profile template-dropdown nav-dropdown">
            <div className="nav-profile-header-n">
              <div className="d-flex" style={{ display: "inline-block" }}>
                <Col lg={24}>
                  <Card>
                    {certType == "cert" ? (
                      <Carousel
                        show={3.5}
                        slide={2}
                        swiping={true}
                        responsive={true}
                        dynamic={true}
                        className="exampleCarousel1"
                        style={{ display: "inline-block" }}
                      >
                        {templateState.map((item) => {
                          return (
                            <Col
                              onClick={(e) =>
                                onHandleTemplateChange(e, item.templateType)
                              }
                              key={item.template_id}
                              xs={18}
                              sm={18}
                              md={18}
                              lg={18}
                              xl={18}
                              xxl={18}
                              justify="center"
                            >
                              <PDFTemplate
                                style={{ cursor: "pointer" }}
                                templateId={item.template_id}
                                certType="cert"
                                templateType={item.templateType}
                                min={4}
                                max={9}
                                pdf={item.pdf}
                                type={"template"}
                              />
                            </Col>
                          );
                        })}
                      </Carousel>
                    ) : certType == "blotter" ? (
                      <Carousel
                        show={3.5}
                        slide={2}
                        swiping={true}
                        responsive={true}
                        dynamic={true}
                        className="exampleCarousel1"
                        style={{ display: "inline-block" }}
                      >
                        {templateState.map((item) => {
                          return (
                            <Col
                              key={item.template_id}
                              xs={18}
                              sm={18}
                              md={18}
                              lg={18}
                              xl={18}
                              xxl={18}
                              justify="center"
                            >
                              <PDFTemplate
                                templateId={item.template_id}
                                certType="cert"
                                templateType={item.templateType}
                                min={4}
                                max={9}
                                pdf={item.pdf}
                                type={"template"}
                              />
                            </Col>
                          );
                        })}
                      </Carousel>
                    ) : null}
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
                  className="border-bottom-0"
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
  },
  (prevProps, nextProps) => prevProps === nextProps
);

export default React.memo(CertDisplay);
