import React, { useState, useEffect } from "react";
import { Table, Button, Tooltip, Row, Col, Card } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import BillingDrawer from "components/shared-components/DrawerBilling";
import { AUTH_TOKEN } from "redux/constants/Auth";

const cc_format = (value) => {
  var v = value;

  var match = v;
  var parts = [];

  for (var i = 1, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }

  if (parts.length) {
    return parts.join(" ");
  } else {
    return value;
  }
};
const tableColumns = [
  {
    title: "Card type",
    dataIndex: "issuer",
    key: "issuer",
    render: (_, record) => {
      let image = "";
      if (record.issuer == "mastercard") image = "/img/others/img-9.png";

      if (record.issuer == "visa") image = "/img/others/img-8.png";

      if (record.issuer == "GCash") image = "/img/others/cards/GCash-Logo.png";
      return (
        <>
          {record.issuer == "GCash" ? (
            <img style={{ height: "13%" }} src={image} alt={record.cardType} />
          ) : (
            <img style={{ height: "auto" }} src={image} alt={record.cardType} />
          )}

          <span className="ml-2">{record.issuer}</span>
        </>
      );
    },
  },

  {
    title: "Card Number",
    dataIndex: "cardNumber",
    key: "cardNumber",
    render: (_, record) => {
      let creditFormat;
      if (record.cardNumber) creditFormat = cc_format(record.cardNumber);
      return (
        <>
          <span className="ml-2">
            {cc_format(
              record.cardNumber.replace(
                record.cardNumber.substr(0, record.cardNumber.length - 4),
                record.cardNumber
                  .substr(1, record.cardNumber.length - 3)
                  .replace(/./g, "•")
              )
            )}
          </span>
        </>
      );
    },
  },

  {
    title: "Expiry",
    dataIndex: "validThru",
    key: "validThru",
  },
  {
    title: () => <div className="text-right"></div>,
    key: "actions",
    render: (_, record) => (
      <Tooltip title="Remove card">
        <Button
          type="text"
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={() => {}}
        />
      </Tooltip>
    ),
  },
];

const Billing = () => {
  const tmp = [
    {
      cardHolder: "12321",
      cardNumber: "1232132113112323",
      card_id: 1,
      cvc: "N/A",
      issuer: "visa",
      user_id: "kwWXpExbfoTAVnQZQVeVqMzCRFP2",
      validThru: "N/A",
    },
  ];
  const [creditCards, setCreditCards] = useState(tmp);
  const [paymentMethod, setPaymentMethod] = useState({});
  const [paymentMethodType, setPaymentMethodType] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState("card-1");
  console.log(creditCards);
  const [drawer, setDrawer] = useState(false);
  const locale = {
    emptyText: (
      <div className="my-4 text-center">
        <img
          src="/img/others/img-7.png"
          alt="Add credit card"
          style={{ maxWidth: "90px" }}
        />
        <h3 className="mt-3 font-weight-light">Please add a payment method!</h3>
      </div>
    ),
  };
  console.log(paymentMethod);
  const showDrawer = (type) => {
    console.log("open");
    setPaymentMethodType(type);
    setDrawer(true);
  };

  const closeDrawer = () => {
    setDrawer(false);
  };

  useEffect(() => {
    if (!(JSON.stringify(paymentMethod) === "{}")) {
      let credit = creditCards;
      let payment = paymentMethod;
      payment.user_id = localStorage.getItem(AUTH_TOKEN);
      payment.card_id = credit.length + 1;
      setCreditCards((oldArray) => [...oldArray, payment]);
    }
  }, [paymentMethod]);
  return (
    <>
      <BillingDrawer
        forceRender
        visible={drawer}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        setDrawer={setDrawer}
        paymentType={paymentMethodType}
        close={() => {
          closeDrawer();
        }}
      />
      <Col xs={24} sm={24} md={8}>
        <div className="pl-1">
          <h3>Billing Account</h3>
          <p className="mt-1 text-sm text-gray-600">
            Select the option to add a new payment method, choose "credit card"
            or "E-wallet" as the payment type, enter your payment information
            (including the card number, expiration date, and security code), and
            review the information to ensure it is correct, and click the submit
            button to save your payment information
          </p>
        </div>
      </Col>
      <Col xs={24} sm={24} md={15} className="ant-body-pt">
        <Card className="setting-content" title={"Billing Method"}>
          <Table
            locale={locale}
            dataSource={creditCards}
            // rowSelection={rowSelection}
            columns={tableColumns}
            pagination={false}
            rowKey="card_id"
          />
          <div className="mt-3 text-left">
            <Row gutter={24}>
              <Col sm={24} md={24} lg={17} className="text-left">
                <h4 className="mb-2">Credit Card/Debit Card</h4>
              </Col>
              <Col sm={24} md={24} lg={17}>
                <Button
                  style={{ padding: "0 20px" }}
                  className="card-platform"
                  onClick={() => showDrawer("credit")}
                >
                  <Row justify="space-between" className=" d-flex">
                    <Col sm={10} md={10} lg={15} className="text-left">
                      <img
                        style={{ width: "9%", marginRight: "5px" }}
                        src="/img/others/img-7.png"
                      />
                      Credit Card/Debit Card
                    </Col>
                    <Col sm={5} md={5} lg={5}>
                      <img
                        className="card-brand"
                        style={{ width: "1rem" }}
                        src="/img/others/cards/amex.png"
                      />
                      <img
                        style={{ width: "1rem" }}
                        className="card-brand"
                        src="/img/others/cards/jcb.png"
                      />
                      <img
                        style={{ width: "1rem" }}
                        className="card-brand"
                        src="/img/others/cards/mc.png"
                      />
                      <img
                        style={{ width: "1rem" }}
                        className="card-brand"
                        src="/img/others/cards/visa.png"
                      />
                    </Col>
                  </Row>
                </Button>
              </Col>
              <Col sm={24} md={24} lg={24} className="text-left">
                <h4 className="mt-2">E-Wallet</h4>
              </Col>
              <Col sm={24} md={24} lg={12}>
                <Button
                  style={{ padding: "0 20px" }}
                  className="card-platform"
                  onClick={() => showDrawer("e-wallet")}
                >
                  <Row justify="space-between" className=" d-flex">
                    <Col className="text-left">
                      <Row>
                        <h4 className="mt-2 mr-1">GCash</h4>
                        <span className="pt-2-1">GCash</span>
                      </Row>
                    </Col>
                  </Row>
                </Button>
              </Col>
            </Row>
          </div>
        </Card>
      </Col>
    </>
  );
};

export default Billing;
