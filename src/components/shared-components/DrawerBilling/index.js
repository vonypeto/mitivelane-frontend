import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Drawer,
  Image,
  Card,
  message,
  Button,
  Input,
  Form,
  Tooltip,
} from "antd";

import "react-credit-cards/es/styles-compiled.css";
import Cards from "react-credit-cards";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData,
} from "./utils";
import {
  CreditCardOutlined,
  CalendarOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
const UserView = (props) => {
  let size = 500;
  let data = {
    cardNumber: "",
    cardHolder: "",
    validThru: "",
    cvc: "",
    issuer: "",
    focused: "",
    formData: null,
  };
  const { setPaymentMethod, visible, close, paymentType, setDrawer } = props;

  const [form] = Form.useForm();
  const [width, setWidth] = useState(0);
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [validThru, setValidThru] = useState("");
  const [issuer, setIssuer] = useState("");
  const [cvc, setCvc] = useState("");
  const [height, setHeight] = useState(0);

  if (width > 1400) {
    size = 600;
  } else if (width > 1024) {
    size = 550;
  } else if (width >= 550) {
    size = 550;
  } else if (width >= 425) {
    size = width;
  } else {
    size = width;
  }

  const onHandleData = (type, value) => {
    if (type == "card") {
      data.cardNumber = value;
      setCardNumber(formatCreditCardNumber(value));
      console.log(value);
    }
    if (type == "holder") {
      data.cardHolder = value;
      setCardHolder(value);
    }
    if (type == "thru") {
      data.validThru = value;
      setValidThru(value);
    }
    if (type == "cvc") {
      data.cvc = value;
      setCvc(value);
    }
  };
  const handleCallback = ({ issuer }, isValid) => {
    setIssuer(issuer);
  };
  const updateWindowDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  const onFinish = (values) => {
    if (issuer == "unknown") {
      message.warning("Credit Card is Unknown");
    } else {
      values.issuer = issuer;
      setPaymentMethod(values);
      submitForm();
      setCardNumber("");
      setCardHolder("");
      setValidThru("");
      setIssuer("");
      setCvc("");
      setPaymentMethod({});

      setDrawer(false);
    }
  };
  const onFinishGcash = (values) => {
    values.issuer = "GCash";
    values.validThru = "N/A";
    values.cvc = "N/A";
    setPaymentMethod(values);
    submitForm();
    setCardNumber("");
    setCardHolder("");
    setValidThru("");
    setIssuer("");
    setCvc("");
    setPaymentMethod({});
    setDrawer(false);
  };
  const submitForm = () => {
    form.resetFields();
  };
  useEffect(
    () => {
      const listener = window.addEventListener(
        "resize",
        updateWindowDimensions
      );
      updateWindowDimensions();

      return () => {
        listener, setHeight(), setWidth();
      };
    },
    [height],
    [width]
  );
  useEffect(() => {}, []);
  // Usage
  // functions

  return (
    <Drawer
      width={size}
      placement="right"
      onClose={close}
      visible={visible}
      title="Billing Info"
      className="custom-ant-header"
    >
      <Row
        style={{
          height: "100%",
          minHeight: "95%",
          display: "flex",
          width: "100%",
        }}
        justify="center"
      >
        {paymentType == "credit" ? (
          <Col xs={22} sm={22} md={22} lg={22} xl={22} justify="center">
            <Card className="mt-2 setting-content">
              <Form onFinish={onFinish} form={form} name="basicInformation">
                <div className="mb-3">
                  <Cards
                    number={cardNumber}
                    name={cardHolder}
                    expiry={validThru}
                    cvc={cvc}
                    focused={""}
                    callback={handleCallback}
                  />
                </div>
                <Row gutter={14}>
                  <Col xs={24} sm={24} md={24}>
                    <Form.Item
                      name="cardNumber"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp(/^[\d| ]{16,22}$/),
                          message: "Please enter a valid card!",
                          whitespace: true,
                        },
                      ]}
                      hasFeedback
                    >
                      <Input
                        //  className="display-content" "([a-zA-Z]{3,30}\\s*)+""
                        suffix={<CreditCardOutlined />}
                        onChange={(e) => onHandleData("card", e.target.value)}
                        placeholder="Card Number"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24}>
                    <Form.Item
                      name="cardHolder"
                      hasFeedback
                      onChange={(e) => onHandleData("holder", e.target.value)}
                    >
                      <Input
                        suffix={<CreditCardOutlined />}
                        placeholder="Card Holder Name"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      name="validThru"
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp(/^\d{2}\/\d{2}$/),
                          message: "Please enter a valid Thru!",
                        },
                      ]}
                    >
                      <Input
                        suffix={<CalendarOutlined />}
                        placeholder="12/12"
                        onChange={(e) => onHandleData("thru", e.target.value)}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      name="cvc"
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp(/^\d{3}$/),
                          message: "Please enter a valid CVC!",
                        },
                      ]}
                    >
                      <Input
                        suffix={
                          <Tooltip title="The last three digits printed on the back of the card">
                            <QuestionCircleOutlined className="cursor-pointer" />
                          </Tooltip>
                        }
                        placeholder="CVC"
                      />
                    </Form.Item>
                  </Col>
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={24}
                    justify={"center"}
                    className="text-center "
                  >
                    <Button htmlType="submit" type="primary">
                      Add Credit/Debit Card
                    </Button>
                  </Col>
                </Row>{" "}
              </Form>
            </Card>
          </Col>
        ) : (
          <>
            {" "}
            <Col xs={22} sm={22} md={22} lg={22} xl={22} justify="center">
              <Card className="mt-2 setting-content">
                <Form
                  form={form}
                  onFinish={onFinishGcash}
                  name="basicInformation"
                >
                  <div className="mb-3">
                    <Image
                      style={{ marginBottom: "-40px", marginTop: "-20px" }}
                      preview={false}
                      src="/img/others/cards/GCash-Logo.png"
                    />
                  </div>
                  <Row gutter={14}>
                    <Col xs={24} sm={24} md={24}>
                      <Form.Item
                        name="cardNumber"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp(
                              /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g
                            ),
                            message: "Please enter a gcash number!",
                            whitespace: true,
                          },
                        ]}
                        hasFeedback
                      >
                        <Input
                          suffix={<CreditCardOutlined />}
                          //  className="display-content" "([a-zA-Z]{3,30}\\s*)+""
                          onChange={(e) => onHandleData("card", e.target.value)}
                          placeholder="xxxxxxxxxxx"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24}>
                      <Form.Item
                        name="cardHolder"
                        hasFeedback
                        rules={[
                          {
                            required: true,

                            message: "Please enter a name!",
                          },
                        ]}
                        onChange={(e) => onHandleData("holder", e.target.value)}
                      >
                        <Input
                          suffix={<CreditCardOutlined />}
                          placeholder="Phone Number Name"
                        />
                      </Form.Item>
                    </Col>

                    <Col
                      xs={24}
                      sm={24}
                      md={24}
                      lg={24}
                      justify={"center"}
                      className="text-center "
                    >
                      <Button htmlType="submit" type="primary">
                        Add Phone Number
                      </Button>
                    </Col>
                  </Row>{" "}
                </Form>
              </Card>
            </Col>{" "}
          </>
        )}
      </Row>
    </Drawer>
  );
};

export default UserView;
