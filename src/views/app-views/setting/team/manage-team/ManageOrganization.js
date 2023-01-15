import { React, useState, useEffect } from "react";
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
import axios from "axios";
import { useAuth } from "contexts/AuthContext";

const ManageOrganization = (props) => {
  const { currentOrganization, generateToken, currentUser } = useAuth();
  const [form] = Form.useForm();

  const [organization, setOrganization] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [editOrganization, setEditOrganization] = useState(false);

  useEffect(() => {
    getOrganization()
  }, [])

  const getOrganization = async () => {
    await axios
      .get("/api/organization/get-organization/" + currentOrganization, generateToken()[1])
      .then((response) => {
        setOrganization(response.data);
        setIsLoading(false);

      })
      .catch((err) => {
        message.error("Could not fetch the data in the server!");
        console.log(err);
      });
  };

  const onClickEdit = () => {
    setEditOrganization(!editOrganization);
  };

  const onDeleteOrganization = () => {
    message.info("Clicked on Yes.");
  };

  const editCurrentOrganization = (values) => {
    axios
      .post(
        "/api/organization_setting/edit-organization",
        { organization_id: currentOrganization, organization_name: values.organization_name },
        generateToken()[1]
      )
      .then((response) => {
        if (response.data == "Success") {
          message.destroy()
          message.success("Successfully Edit Organization");
          window.location.reload()
        } else {
          message.error("The action can't be completed, please try again.");
        }
      })
      .catch(() => {
        message.error("The action can't be completed, please try again.");
      });
  };

  const onFinish = () => {
    message.loading("Editing Organization...", 0);
    form
      .validateFields()
      .then((values) => {
        values.organization_id = currentOrganization;
        console.log(values)
        editCurrentOrganization(values)

      })
      .catch((info) => {
        message.error("Please enter all required field ");
      });
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
        <Form form={form}>
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
                  <Form.Item name="organization_name">
                    {editOrganization ? (
                      <Input placeholder="Organization Name" />
                    ) : (
                      <div className="font-size-md">
                        {organization.organization_name}
                      </div>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              {/* <Row className="pt-2 ">
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
              </Row> */}
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
                <Col xs={24} sm={24} md={24} gutter={16} className="pt-4 w-100">
                  {editOrganization ? (
                    <>
                      <Button className="mr-2" type="primary" onClick={() => onFinish()} >
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
