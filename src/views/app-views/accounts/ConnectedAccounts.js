import { React, useState } from "react";
import { Button, Row, Col, Card, Form, message } from "antd";
import {
  UserOutlined,
  FacebookFilled,
  QuestionCircleOutlined,
  CloseCircleFilled,
} from "@ant-design/icons";
import { FcGoogle } from "react-icons/fc";
const ConnectedAccount = (props) => {
  console.log(props);
  const [editBarangay, setEditBarangay] = useState(false);
  const onClickEdit = () => {
    setEditBarangay(!editBarangay);
  };

  return (
    <>
      <Col xs={24} sm={24} md={8}>
        <div className="pl-1">
          <h3>Connected Accounts</h3>
          <p className="mt-1 text-sm text-gray-600">
            Connect your MitiveLane account to one or more Social providers to
            make logging in and collaborating with your team easier.
          </p>
        </div>
      </Col>
      <Col xs={24} sm={24} md={15} className="ant-body-pt">
        <Form>
          <Card title="Account Connections">
            <Col xs={24} sm={24} md={24} className="w-100">
              {" "}
              <Row className="pt-2  border-top">
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={6}
                  xl={4}
                  className="pt-2 text-left "
                >
                  <h5 className=" font-weight-bold  ">
                    {" "}
                    <span style={{ color: "#2EA1F5", fontSize: "20px" }}>
                      {" "}
                      <FacebookFilled />
                    </span>{" "}
                    Facebook:
                  </h5>
                </Col>
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={18}
                  xl={20}
                  className="text-left form-input-mb"
                >
                  <Form.Item>
                    {editBarangay ? (
                      <div className="d-flex justify-content-between">
                        <Button size="medium">Connect</Button>{" "}
                        <Button size="medium">
                          <CloseCircleFilled />
                        </Button>
                      </div>
                    ) : (
                      <div className="font-size-md">Sagiri</div>
                    )}
                  </Form.Item>
                </Col>
              </Row>{" "}
              <Row className="pt-2  border-top">
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={6}
                  xl={4}
                  className="pt-2 text-left "
                >
                  <h5 className=" font-weight-bold  ">
                    {" "}
                    <span style={{ fontSize: "20px" }}>
                      {" "}
                      <FcGoogle className="anticon" />
                    </span>{" "}
                    Google:
                  </h5>
                </Col>
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={18}
                  xl={20}
                  className="text-left form-input-mb"
                >
                  <Form.Item>
                    {editBarangay ? (
                      <div className="d-flex justify-content-between ">
                        <Button size="medium">Connect</Button>{" "}
                        <Button size="medium">
                          <CloseCircleFilled />
                        </Button>
                      </div>
                    ) : (
                      <div className="font-size-md">Barangay test label</div>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col xs={24} sm={24} md={24} gutter={16} className="pt-4 w-100">
                  {editBarangay ? (
                    <>
                      <Button className="mr-2" type="primary">
                        Save
                      </Button>
                      <Button onClick={() => onClickEdit()}>Cancel</Button>
                    </>
                  ) : (
                    <Button onClick={() => onClickEdit()} type="primary">
                      Edit Information
                    </Button>
                  )}
                </Col>
              </Row>
            </Col>
          </Card>
        </Form>
      </Col>
    </>
  );
};

export default ConnectedAccount;
