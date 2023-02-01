import { React, useState, useEffect, useRef } from "react";
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
import { FileUploadApi } from "api/AppController/FileUploadController/FileUploadController";
import axios from "axios";
import { useAuth } from "contexts/AuthContext";

const ManageOrganization = (props) => {
  const { currentOrganization, generateToken, currentUser } = useAuth();

  const [form] = Form.useForm();
  const formRef = useRef();

  const [organization, setOrganization] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [editOrganization, setEditOrganization] = useState(false);


  // File Upload State
  const hiddenFileInput = useRef(null);
  const [fileLarge, setFileLarge] = useState(false);
  const [profileUrl, setProfileUrl] = useState(false);
  const [oldUrl, setOldUrl] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    getOrganization()
  }, [])

  const getOrganization = async () => {
    await axios
      .get("/api/organization/get-organization/" + currentOrganization, generateToken()[1])
      .then((response) => {
        setOrganization(response.data);
        setFile(response.data.profile.fileUrl)
        setIsLoading(false);

        form.setFieldsValue(response.data)
      })
      .catch((err) => {
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
    form
      .validateFields()
      .then(async (values) => {
        message.loading("Editing Organization...", 0);

        values.organization_id = currentOrganization;
        console.log(values)

        const data = await FileUploadApi(
          "/api/organization_setting/edit-organization", //  API
          values, //  FORM DATA
          profileUrl, // newURL
          generateToken()[1], // token
          oldUrl, // oldURL
          "avatar", // PATH firebase
          handleFileUploadResponse //callback
        );

      })
      .catch((info) => {
        message.error("Please enter all required field ");
      });
  };


  //callback data
  const handleFileUploadResponse = (res) => {
    message.destroy()
    message.success(res)
    window.location.reload()
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
        <Form form={form} ref={formRef}>
          <Card title="Organization Details" loading={isLoading}>
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
        </Form >
      </Col >
    </>
  );
};

export default ManageOrganization;
