import { React, useState, useRef } from "react";
import {
  Button,
  Row,
  Col,
  Card,
  Form,
  Input,
  Avatar,
  message,
  Upload,
} from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import FileBase64 from "react-file-base64";
import { updateAccount } from "api/AppController/AccountsController/AccountDetailsController";

const AccountDetails = (props) => {
  const hiddenFileInput = useRef(null);

  const [editBarangay, setEditBarangay] = useState(false);
  const [profileAvatar, setProfileAvatar] = useState(false);

  const onClickEdit = () => {
    setEditBarangay(!editBarangay);
  };
  const handleSubmitAccount = (value) => {
    if (editBarangay) {
      console.log(value);
      updateAccount(value, profileAvatar);
    }
    setEditBarangay(!editBarangay);
  };
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleChange = async (event) => {
    const fileUploaded = event.target.files[0];
    const base64 = await convertBase64(fileUploaded);
    setProfileAvatar(base64);

    // var reader = new FileReader();
    // var url = reader.readAsDataURL(fileUploaded);
    // reader.onloadend = function (e) {
    //   setProfileAvatar(reader.result);
    // }.bind(this);
    // console.log(url);
  };
  return (
    <>
      <Col xs={24} sm={24} md={8}>
        <div className="pl-1">
          <h3>Manage Account</h3>
          <p className="mt-1 text-sm text-gray-600">
            Update MitiveLane Account password and avatar.
          </p>
        </div>
      </Col>
      <Col xs={24} sm={24} md={15} className="ant-body-pt">
        <Form
          initialValues={{ email: "von.aralar@gmail.com", name: "Dr Hologram" }}
          onFinish={handleSubmitAccount}
        >
          <Card title="Account Details">
            <Col xs={24} sm={24} md={24} className="w-100">
              {" "}
              <Row className="pt-2 border-top">
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={6}
                  xl={4}
                  className="pt-4 text-left "
                >
                  <h5 className=" font-weight-bold">Avatar:</h5>
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
                    <Avatar
                      className="mt-2 mr-2 rounded"
                      size={50}
                      icon={<UserOutlined />}
                      src={profileAvatar}
                    />

                    {editBarangay ? (
                      <>
                        <Button
                          icon={<UploadOutlined />}
                          onClick={handleClick}
                          size="medium"
                        >
                          Upload image
                        </Button>{" "}
                        <div className="custom-file-upload">
                          <input
                            ref={hiddenFileInput}
                            type="file"
                            onChange={handleChange}
                            style={{ display: "none" }}
                          />
                        </div>
                      </>
                    ) : null}
                  </Form.Item>
                </Col>
              </Row>{" "}
              <Row className="pt-2 ">
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={6}
                  xl={4}
                  className="pt-2 text-left "
                >
                  <h5 className=" font-weight-bold"> Name:</h5>
                </Col>
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={18}
                  xl={20}
                  className="text-left form-input-mb"
                >
                  <Form.Item name="name">
                    {editBarangay ? (
                      <Input placeholder="" />
                    ) : (
                      <div className="font-size-md">Dr Hologram</div>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row className="pt-2 ">
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={6}
                  xl={4}
                  className="pt-2 text-left "
                >
                  <h5 className=" font-weight-bold">Email:</h5>
                </Col>
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={18}
                  xl={20}
                  className="text-left form-input-mb"
                >
                  <Form.Item name="email">
                    {editBarangay ? (
                      <Input disabled placeholder="" />
                    ) : (
                      <div className="font-size-md">von.aralar@gmail.com</div>
                    )}
                  </Form.Item>
                </Col>
              </Row>{" "}
              <Row className="pt-2 ">
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={6}
                  xl={4}
                  className="pt-2 text-left "
                >
                  <h5 className=" font-weight-bold">Password:</h5>
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
                      <Button size="medium">
                        Reset your password by email
                      </Button>
                    ) : (
                      <div className="font-size-md">*************</div>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col xs={24} sm={24} md={24} gutter={16} className="pt-4 w-100">
                  {editBarangay ? (
                    <>
                      <Button className="mr-2" htmlType="submit" type="primary">
                        Save
                      </Button>
                      <Button onClick={() => onClickEdit()}>Cancel</Button>
                    </>
                  ) : (
                    <Button htmlType="submit" type="primary">
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

export default AccountDetails;
