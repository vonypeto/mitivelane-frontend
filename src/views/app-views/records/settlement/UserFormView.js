import React from "react";
import {
  Upload,
  message,
  Row,
  Select,
  Input,
  Card,
  Col,
  Form,
  Button,
  Avatar,
  DatePicker,
  TimePicker,
} from "antd";
import {
  PrinterOutlined,
  RollbackOutlined,
  EditOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import utils from "utils";
import { Editor } from "react-draft-wysiwyg";
const { Option } = Select;
const caseData = ["Settled", "Scheduled"];
const UserFormView = (props) => {
  const { selectOutShow } = props;
  const onChangeData = (e) => {
    e.preventDefault();
    selectOutShow(true);
  };
  const onSettingCLlick = (e) => {
    console.log("test");
    onChangeData(e);
  };

  const uploadProps = {
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
    },
  };
  return (
    <div style={{ fontSize: "16px !important" }}>
      <Row>
        <Col xs={24} sm={24} md={24}>
          <Card
            actions={[
              <RollbackOutlined onClick={onSettingCLlick} key="back" />,
              <EditOutlined key="edit" />,
              <PrinterOutlined key="summon" />,
            ]}
            title={"Blotter No: 1212"}
          >
            <Form size="default">
              <Row gutter={16}>
                <Col xs={24} sm={24} md={16}>
                  <Card>
                    <Row gutter={16}>
                      <Col xs={24} sm={24} md={15}>
                        <Form.Item
                          name="case"
                          label="Summon Case For:"
                          labelCol={{ span: 24 }}
                        >
                          <Input placeholder="Case Type" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={5}>
                        <Form.Item
                          name="status"
                          labelCol={{ span: 24 }}
                          label="Case Status"
                        >
                          <Select className="w-100" placeholder="Case Status">
                            {caseData.map((elm) => (
                              <Option key={elm} value={elm}>
                                {elm}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>

                      <Col xs={24} sm={24} md={20}>
                        <Form.Item
                          labelCol={{ span: 24 }}
                          name="subject"
                          label="Narrative Body"
                        >
                          <div className="mb-4">
                            <Editor
                              toolbarClassName="toolbarClassName"
                              wrapperClassName="wrapperClassName"
                              editorClassName="editorClassName"
                            />
                          </div>
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={20}>
                        <Row gutter={16}>
                          <Col xs={24} sm={24} md={9}>
                            <Form.Item
                              labelCol={{ span: 24 }}
                              name="dateoficident"
                              label="Date of Issue"
                            >
                              <DatePicker className="w-100" />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={24} md={9}>
                            <Form.Item
                              labelCol={{ span: 24 }}
                              name="daterecord"
                              label="Date Recorded"
                            >
                              <DatePicker className="w-100" />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={24} md={6}>
                            <Form.Item
                              labelCol={{ span: 24 }}
                              name="timerecorder"
                              label="Time Recorded"
                            >
                              <TimePicker className="w-100" />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Col>
                      <Col xs={24} sm={24} md={20}>
                        <Form.Item
                          name="PNP"
                          label="Document Copy to PNP"
                          labelCol={{ span: 24 }}
                        >
                          <Input placeholder="Documents Copy" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={20}>
                        <Form.Item
                          name="file_id"
                          label="File Upload"
                          labelCol={{ span: 24 }}
                        >
                          <Upload {...uploadProps}>
                            <Button icon={<UploadOutlined />}>
                              Click to Upload
                            </Button>
                          </Upload>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col xs={24} sm={24} md={8}>
                  <Row>
                    <Col xs={24} sm={24} md={24}>
                      <Card title="Reporter">
                        <div className="mt-1">
                          <hr />
                          <div className="mt-3 mb-4 table-row-light d-flex align-items-center justify-content-between">
                            <div>
                              <Avatar
                                size={40}
                                className="font-size-sm"
                                style={{ backgroundColor: "red" }}
                              >
                                {utils.getNameInitial("Von Maniquis")}
                              </Avatar>
                              <span className="ml-2">Von Maniquis</span>
                            </div>
                            <div>
                              {" "}
                              <Button
                                icon={<InfoCircleOutlined />}
                                type="default"
                                size="small"
                                className="w-100"
                              >
                                Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>

                      <Card title="Respondent">
                        <div className="mt-1">
                          <hr />
                          <div className="mt-3 mb-4 table-row-light d-flex align-items-center justify-content-between">
                            <div>
                              <Avatar
                                size={40}
                                className="font-size-sm"
                                style={{ backgroundColor: "red" }}
                              >
                                {utils.getNameInitial("Von Maniquis")}
                              </Avatar>
                              <span className="ml-2">Von Maniquis</span>
                            </div>
                            <Button
                              icon={<InfoCircleOutlined />}
                              type="default"
                              size="small"
                            >
                              Details
                            </Button>
                          </div>
                        </div>
                      </Card>

                      <Card title="Suspect">
                        <div className="mt-1">
                          <hr />
                          <div className="mt-3 mb-4 table-row-light d-flex align-items-center justify-content-between">
                            <div>
                              <Avatar
                                size={40}
                                className="font-size-sm"
                                style={{ backgroundColor: "red" }}
                              >
                                {utils.getNameInitial("Von Maniquis")}
                              </Avatar>
                              <span className="ml-2">Von Maniquis</span>
                            </div>
                            <Button
                              icon={<InfoCircleOutlined />}
                              type="default"
                              size="small"
                            >
                              Details
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  </Row>

                  {/* <div className="mt-3 mb-4 table-row-light d-flex align-items-center justify-content-between">
                        <Avatar size={30} className="font-size-sm" style={{backgroundColor: "red"}}>
                        {utils.getNameInitial("Von Maniquis")}
                        </Avatar>
                        <span className="ml-2">Von Maniquis</span>
                    </div> */}
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserFormView;
