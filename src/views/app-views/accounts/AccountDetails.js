import { React, useState, useRef, useEffect, useForm } from "react";
import {
  Button,
  Row,
  Col,
  Card,
  Form,
  Input,
  Avatar,
  // notification,
} from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import { updateAccount } from "api/AppController/AccountsController/AccountDetailsController";
import { FileUploadApi } from "api/AppController/FileUploadController/FileUploadController";

import { useAuth } from "contexts/AuthContext";
import { PROFILE_URL, AUTH_TOKEN } from "redux/constants/Auth";
import axios from "axios";

const AccountDetails = () => {
  const { currentUser, generateToken, resetEmailPassword } = useAuth();

  //Form State
  const [form] = Form.useForm();
  const formRef = useRef();
  const [initialVal, setInitialVal] = useState({});

  // Loading State
  const [editOrganization, setEditOrganization] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);

  // Name State
  const [displayName, setDisplayName] = useState();
  // Password State
  const [showResetPassword, setShowResetPassword] = useState(false);

  // File Upload State
  const hiddenFileInput = useRef(null);
  const [fileLarge, setFileLarge] = useState(false);
  const [profileUrl, setProfileUrl] = useState(false);
  const [oldUrl, setOldUrl] = useState(null);
  const [file, setFile] = useState(null);

  //get Details
  const getData = async (_) => {
    const data = {
      auth_id: localStorage.getItem(AUTH_TOKEN),
    };
    await axios
      .post("/api/app/user/details", data, generateToken()[1])
      .then((response) => {
        setIsLoading(false);
        setDisplayName(response.data.full_name);

        form.setFieldsValue({
          email: currentUser?.email,
          name: response.data.full_name,
        });
      });
  };

  //cancel edit
  const onClickEdit = () => {
    setEditOrganization(!editOrganization);
  };
  //callback data
  const handleFileUploadResponse = (res) => {
    console.log("res", res);
    setTimeout(() => {
      if (res?.profile_url) {
        let data = JSON.parse(localStorage.getItem(PROFILE_URL));
        data.profile_data = res.profile_url;
        setProfileUrl(res?.profile_url);
        setDisplayName(res?.full_name);
        localStorage.setItem(PROFILE_URL, JSON.stringify(data));
        currentUser.updateProfile({
          displayName: res?.full_name,
          photoURL: res?.profile_url,
        });
      } else {
        currentUser.updateProfile({
          displayName: res?.full_name,
        });
        setDisplayName(res?.full_name);
      }

      setLoadingButton(false);
      setEditOrganization(false);
    }, 1000);
  };

  // Submit data
  const handleSubmitAccount = async () => {
    if (editOrganization) {
      setLoadingButton(true);
      form
        .validateFields()
        .then(async (values) => {
          const profileData = {
            full_name: values.name,
          };

          const data = await FileUploadApi(
            "/api/app/user/update", //  API
            profileData, //  FORM DATA
            profileUrl, // newURL
            generateToken()[1], // token
            oldUrl, // oldURL
            "avatar", // PATH firebase
            handleFileUploadResponse //callback
          );

          console.log("profileData", profileData)
          console.log("profileUrl", profileUrl)
          console.log("oldUrl", oldUrl)

        })
        .catch((errorInfo) => {
          console.log(errorInfo);
        });
    }

    if (!editOrganization) setEditOrganization(!editOrganization);
  };

  // File Folder Input get event
  const handleChange = async (event) => {
    try {
      const fileUploaded = event.target.files[0];
      let imageValidate = "image";

      if (fileUploaded.type.includes(imageValidate)) {
        setProfileUrl(event.target.files[0]);
        const base64 = checkFileSize(event.target.files[0]);
        setFile(base64);
      } else {
        message.warning("Image not Found");
      }
    } catch (error) {
      // console.log(console.log(error.message));
    }
  };
  //Check File size
  const checkFileSize = (f) => {
    try {
      // 2.5 kilobye
      if (f?.size > 500000) {
        setFileLarge(true);
        return file;
      } else {
        return URL.createObjectURL(f);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  // Upload image button show explorer to get file
  const handleClick = (_) => {
    setFileLarge(false);
    hiddenFileInput.current.click();
  };

  //handle reset password
  const handleResetPassword = async () => {
    await resetEmailPassword(currentUser?.email)
      .then((_) => {
        setShowResetPassword(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (showResetPassword) {
      const timeoutId = setTimeout(() => {
        setShowResetPassword(false);
        setEditOrganization(false);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [showResetPassword]);
  useEffect(() => {
    let mount = true;
    if (mount) {
      let data = JSON.parse(localStorage.getItem(PROFILE_URL));
      setProfileUrl(data.profile_data);
      setOldUrl(data.profile_data);
      setFile(data.profile_data);
      form.resetFields();
      getData();
    }
    return () => {
      mount = false;
    };
  }, [form, initialVal]);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem(PROFILE_URL));
    setOldUrl(data.profile_data);
  }, [loadingButton]);
  const FormData = () => {
    return (
      <Form
        initialValues={initialVal}
        form={form}
        ref={formRef}
        onFinish={handleSubmitAccount}
      >
        <Card loading={isLoading} title="Account Details">
          <Col xs={24} sm={24} md={24} className="w-100">
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
                    src={file}
                  />
                  {editOrganization ? (
                    <>
                      <Button
                        icon={<UploadOutlined />}
                        onClick={handleClick}
                        size="medium"
                      >
                        Upload image
                      </Button>
                      {fileLarge ? (
                        <span style={{ color: "red" }}>**File too large**</span>
                      ) : null}
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
                  {editOrganization ? (
                    <Input placeholder="" maxLength="20" />
                  ) : (
                    <div className="font-size-md">{displayName}</div>
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
                  {editOrganization ? (
                    <Input disabled placeholder="" />
                  ) : (
                    <div className="font-size-md">{currentUser?.email}</div>
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
                  {editOrganization ? (
                    <>
                      <Button
                        size="medium"
                        loading={showResetPassword}
                        onClick={() => {
                          handleResetPassword();
                        }}
                      >
                        Reset your password by email
                      </Button>
                      {showResetPassword ? (
                        <span style={{ paddingLeft: "2px", color: "green" }}>
                          **reset password sent**
                        </span>
                      ) : null}
                    </>
                  ) : (
                    <div className="font-size-md">*************</div>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} md={24} gutter={16} className="pt-4 w-100">
                {editOrganization ? (
                  <>
                    <Button
                      loading={loadingButton}
                      className="mr-2"
                      htmlType="submit"
                      type="primary"
                    >
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
    );
  };
  return (
    <>
      <Col xs={24} sm={24} md={8}>
        <div className="pl-1">
          <h3>Manage Account</h3>
          <p className="mt-1 text-sm text-gray-600">
            Managing your account allows you to control your personal and
            billing information, update your preferences and settings, and
            access any available features or services. To manage your account,
            you will need to log in to your account using your username and
            password{" "}
          </p>
        </div>
      </Col>
      <Col xs={24} sm={24} md={15} className="ant-body-pt">
        <FormData />
      </Col>
    </>
  );
};

export default AccountDetails;
