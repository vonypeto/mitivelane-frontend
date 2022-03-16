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
import notification from "components/shared-components/Notification";
import { updateAccount } from "api/AppController/AccountsController/AccountDetailsController";
import { useAuth } from "contexts/AuthContext";
import { PROFILE_URL, AUTH_TOKEN } from "redux/constants/Auth";
import axios from "axios";

const AccountDetails = () => {
  const {
    currentUser,
    setPhoto,
    currentPhoto,
    generateToken,
    resetEmailPassword,
  } = useAuth();
  const [form] = Form.useForm();
  const formRef = useRef();
  const [initialVal, setInitialVal] = useState({});
  const hiddenFileInput = useRef(null);
  const [fileLarge, setFileLarge] = useState(false);
  const [editBarangay, setEditBarangay] = useState(false);
  const [profileAvatar, setProfileAvatar] = useState(false);
  const [displayName, setDisplayName] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

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
        // setInitialVal({
        //   email: currentUser?.email,
        //   name: response.data.full_name,
        // });
        form.setFieldsValue({
          email: currentUser?.email,
          name: response.data.full_name,
        });
      });
  };
  //mount data
  // useEffect(() => {
  //   form.resetFields();
  // }, [initialVal, form]);
  useEffect(() => {
    if (showResetPassword)
      setTimeout(() => {
        setShowResetPassword(false);
        setEditBarangay(false);
      }, 3000);
  }, [showResetPassword]);
  useEffect(() => {
    let mount = true;
    if (mount) {
      let data = JSON.parse(localStorage.getItem(PROFILE_URL));
      setProfileAvatar(data.profile_data);
      form.resetFields();
      getData();
    }
    return () => {
      mount = false;
    };
  }, [form, initialVal]);
  //cancel edit
  const onClickEdit = () => {
    setEditBarangay(!editBarangay);
  };
  //submit edit
  const handleSubmitAccount = () => {
    if (editBarangay) {
      setLoadingButton(true);
      form
        .validateFields()
        .then((values) => {
          updateAccount(
            values,
            profileAvatar,
            currentUser,
            setDisplayName,
            setProfileAvatar,
            setEditBarangay,
            setLoadingButton,
            generateToken
          );
        })
        .catch((errorInfo) => {
          console.log(errorInfo);
        });
    }

    if (!editBarangay) setEditBarangay(!editBarangay);
  };
  //hidden file set upload
  const handleClick = (_) => {
    setFileLarge(false);
    hiddenFileInput.current.click();
  };
  //convert profile
  const convertBase64 = (file) => {
    console.log(file);
    if (file.size > 25000) {
      // notification({
      //   message: "Warning",
      //   description: "File to large",
      //   duration: 4,
      // });
      setFileLarge(true);
      // alert("File is too big!");
    } else {
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
    }
  };
  //handle upload image
  const handleChange = async (event) => {
    const fileUploaded = event.target.files[0];
    const base64 = await convertBase64(fileUploaded);
    setProfileAvatar(base64);
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
  const FormData = () => {
    return (
      <Form
        initialValues={initialVal}
        form={form}
        ref={formRef}
        onFinish={handleSubmitAccount}
      >
        {" "}
        <Card loading={isLoading} title="Account Details">
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
                  {editBarangay ? (
                    <Input disabled placeholder="" />
                  ) : (
                    <div className="font-size-md">{currentUser?.email}</div>
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
                    <>
                      {" "}
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
                {editBarangay ? (
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
        </Card>{" "}
      </Form>
    );
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
        <FormData />
      </Col>
    </>
  );
};

export default AccountDetails;
