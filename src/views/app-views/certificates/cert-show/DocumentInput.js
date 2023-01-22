import React, { useState, useEffect } from "react";
// Ant Design Component
import {
  Card,
  Col,
  Row,
  Button,
  message,
  Divider,
  Form,
  Select,
  Menu,
  Dropdown,
  Space,
  Tooltip,
} from "antd";
import {
  ArrowDownOutlined,
  ArrowRightOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
// Shared Component
import PDFTemplate from "components/shared-components/Documents";
import CarouselPdf from "components/shared-components/CarouselPdf";
import debounce from "lodash.debounce";

// Constant
import {
  defaultGeneralCert,
  defaultGeneralBlotter,
  defaultGeneralBusiness,
  defaultTemplateCert,
  defaultTemplateBlotter,
} from "./Constant";
// Libraries
import { Carousel } from "@trendyol-js/react-carousel";
import CertificateForm from "./document-component/CertificateForm";

const DocumentInput = React.memo(
  (props) => {
    // Props State
    const {
      setParentData,
      switchCol,
      certType,
      setCertType,
      templateType,
      setTemplateType,
      width,
      parentData,
    } = props;
    // Fixed State
    const MAX_LENGTH = 2000;
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

    const onHandleTemplateChange = (e, data) => {
      e.preventDefault();

      let templateType = data;

      let parent = parentData;
      parent.template_type = templateType;
      setTemplateType(data);
      setParentData(parent);
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
    useEffect(() => {
      form.setFieldsValue(parentData);
    }, [parentData]);
    return (
      <div>
        {" "}
        <Row justify="center">
          {" "}
          <Col xs={24} sm={24} md={24} lg={24}>
            <Card className="custom_cert">
              <div className="ml-2 mr-2 d-flex justify-content-between">
                <div>
                  {certType ? (
                    <div className="text-center dropdown-certificate">
                      <Select defaultValue={certType} onChange={handleChange}>
                        <Select.Option value="cert">
                          Certificate Template
                        </Select.Option>
                        <Select.Option value="indulgancy">
                          Indulgancy Template
                        </Select.Option>
                        <Select.Option value="business">
                          Business Template
                        </Select.Option>
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
                    overlay={
                      <CarouselPdf
                        onHandleTemplateChange={onHandleTemplateChange}
                        templateState={templateState}
                        certType={certType}
                      />
                    }
                    T
                    icon={<SnippetsOutlined />}
                  >
                    <Menu mode="horizontal">
                      <Menu.Item key="language">
                        <a>
                          <SnippetsOutlined className="mr-0 nav-icon" />{" "}
                          Templates
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
              // onFinish={onFinish}
              autoComplete="off"
              form={form}
              layout="vertical"
            >
              <Card className="custom_cert">
                {certType == "cert" ? (
                  <>
                    <CertificateForm
                      dropDownForm={dropDownForm}
                      form={form}
                      {...{ setParentData, parentData }}
                      setDropDownForm={setDropDownForm}
                      debounce={debounce}
                    />
                  </>
                ) : certType == "blotter" ? (
                  <>
                    {dropDownForm.map((item) => {
                      return <>{item.id}</>;
                    })}
                  </>
                ) : null}
                <Col className="mt-2 ml-2 mr-2 text-right ">
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
                      //   onClick={() => onHandle(parentData)}
                    >
                      Preview
                    </Button>
                  )}
                </Col>
              </Card>
            </Form>
          </Col>
        </Row>
      </div>
    );
  },
  (prevProps, nextProps) => prevProps === nextProps
);

export default React.memo(DocumentInput);
