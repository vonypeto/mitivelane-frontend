import { React } from "react";
import { Row, Col, Card, Select } from "antd";

const { Option } = Select;
const OrganizationDelete = () => {
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <>
      <Col xs={24} sm={24} md={8}>
        <div className="pl-1">
          <h3> Organization Billing</h3>
          <p className="mt-1 text-sm text-gray-600">
            Set your organization billing to the person that will manage all of
            the invoice mail.
          </p>
        </div>
      </Col>
      <Col xs={24} sm={24} md={15} className="ant-body-pt">
        <Card title="Billing Information">
          <Col xs={24} sm={24} md={24} className="w-100">
            <Row className="pt-2 border-top ">
              <Col xs={12} sm={12} md={12} className="pt-2 text-left ">
                <Select
                  style={{ width: "100%" }}
                  defaultValue={"testuser@gmail.com"}
                  onChange={onChange}
                  placeholder="Select an email to set billing"
                >
                  <Option value="testuser@gmail.com">testuser@gmail.com</Option>
                  <Option value="testuser2@gmail.com">
                    testuser2@gmail.com
                  </Option>
                </Select>
              </Col>
            </Row>
          </Col>
        </Card>
      </Col>
    </>
  );
};

export default OrganizationDelete;
