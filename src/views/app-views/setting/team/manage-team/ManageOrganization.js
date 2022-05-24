import { React, useState } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import {
  Button,
  Row,
  Col,
  Card,
  Form,
  Input,
  Avatar,
  Divider,
  Popconfirm,
  message,
} from "antd";
import {
  UserOutlined,
  UploadOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
const ManageOrganization = (props) => {
  const [editOrganization, setEditOrganization] = useState(false);

  const onClickEdit = () => {
    setEditOrganization(!editOrganization);
  };

  const onDeleteOrganization = () => {
    message.info("Clicked on Yes.");
  };
  return (
    <>
      <Col xs={24} sm={24} md={8}>
        <div className="pl-1">
          <h3>Manage Organization</h3>
          <p className="mt-1 text-sm text-gray-600">
            Update your Organization, Slug, Logo, and Members.
          </p>
        </div>
      </Col>
      <Col xs={24} sm={24} md={15} className="ant-body-pt">
        <Form>
          <Card title="Organization Details">
            <Col xs={24} sm={24} md={24} className="w-100">
              <Row className="pt-2 border-top ">
                <Col xs={24} sm={24} md={4} className="pt-2 text-left ">
                  <h5 className=" font-weight-bold"> Name:</h5>
                </Col>
                <Col
                  xs={24}
                  sm={24}
                  md={20}
                  className="text-left form-input-mb"
                >
                  <Form.Item>
                    {editOrganization ? (
                      <Input placeholder="Organization Name" />
                    ) : (
                      <div className="font-size-md">
                        Organization test label
                      </div>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row className="pt-2 ">
                <Col xs={24} sm={24} md={4} className="pt-2 text-left ">
                  <h5 className=" font-weight-bold">Slug:</h5>
                </Col>
                <Col
                  xs={24}
                  sm={24}
                  md={20}
                  className="text-left form-input-mb"
                >
                  <Form.Item>
                    {editOrganization ? (
                      <Input placeholder="Url Name" />
                    ) : (
                      <div className="font-size-md">
                        Organization test label
                      </div>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row className="pt-2">
                <Col xs={24} sm={24} md={4} className="pt-4 text-left ">
                  <h5 className=" font-weight-bold">Logo:</h5>
                </Col>
                <Col
                  xs={24}
                  sm={24}
                  md={20}
                  className="text-left form-input-mb"
                >
                  <Form.Item>
                    <Avatar
                      shape="square"
                      className="mr-2 rounded"
                      size={75}
                      icon={<UserOutlined />}
                    />

                    {editOrganization ? (
                      <Button icon={<UploadOutlined />} size="medium">
                        Upload image
                      </Button>
                    ) : null}
                  </Form.Item>
                </Col>
              </Row>
              <Row className="pt-2">
                <Col xs={24} sm={24} md={4} className="pt-4 text-left ">
                  <h5 className=" font-weight-bold">Country Logo:</h5>
                </Col>
                <Col
                  xs={24}
                  sm={24}
                  md={20}
                  className="text-left form-input-mb"
                >
                  <Form.Item>
                    <Avatar
                      shape="square"
                      className="mr-2 rounded"
                      size={75}
                      icon={<UserOutlined />}
                    />

                    {editOrganization ? (
                      <Button icon={<UploadOutlined />} size="medium">
                        Upload image
                      </Button>
                    ) : null}
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} gutter={16} className="pt-4 w-100">
                  {editOrganization ? (
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

export default ManageOrganization;
