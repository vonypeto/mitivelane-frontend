import React, { useState, useEffect } from "react";
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
import { useHistory } from "react-router-dom";
import utils from "utils";
import moment from "moment";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, EditorState } from "draft-js";
const { Option } = Select;
const caseData = ['Settled', 'Scheduled', 'Unscheduled', 'Unsettled']

import axios from "axios";
import { useAuth } from "contexts/AuthContext";


const UserFormView = (props) => {
  const history = useHistory();
  const { currentBarangay, generateToken } = useAuth();
  const { selectOutShow, initialData } = props;
  const [form] = Form.useForm();

  const reporters = initialData.reporters
  const victims = initialData.victims
  const suspects = initialData.suspects
  const respondents = initialData.respondents

  const [editBtnDisabled, setEditBtnDisabled] = useState(false)

  const content = {
    entityMap: {},
    blocks: (initialData.narrative != null)
      ? initialData.narrative.blocks
      : []
  }

  const contentState = convertFromRaw(content);
  const editorState = EditorState.createWithContent(contentState);

  const _id = initialData._id

  useEffect(() => {
    initialData.date_of_incident = new moment(initialData.date_of_incident)
    initialData.time_of_incident = new moment(initialData.time_of_incident)
    initialData.createdAt = new moment(initialData.createdAt)
    form.setFieldsValue(initialData)
  }, [])

  const editBlotter = (values) => {
    message.loading("Editing Blotter...", 0);

    // console.log("Blotter Data ", values)

    axios
      .post(`/api/blotter/edit-blotter/${_id}`, values, generateToken()[1])
      .then((response) => {
        message.destroy();
        if (response.data == "Success") {
          message.success(`Saved`);
        } else {
          return message.error("Error, please try again.");
        }
      })
      .catch((error) => {
        console.log(error);
        message.destroy();
        message.error("The action can't be completed, please try again.");
      });
  };

  const onChangeData = (e) => {
    e.preventDefault();
    selectOutShow(true);
  };
  const onBackClick = (e) => {
    console.log("Back");
    console.log(form, " Form")
    onChangeData(e);
  };

  const onEditClick = (e) => {
    if (editBtnDisabled == false) {
      console.log("Edit")
      form
        .validateFields()
        .then((values) => {
          setEditBtnDisabled(true)

          setTimeout(() => {
            delete values.createdAt
            // console.log(values)
            editBlotter(values)
            onChangeData(e);
          }, 1500);
        })
        .catch((info) => {
          console.log("info", info);
          message.error("please enter all required field ");
        });

    }

  };

  const ResidentDetail = (barangayId, residentId) => {

    history.push(`/app/${barangayId}/residents/resident-information/${residentId}/view`)
  }

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

  const ResidentResponse = ({ name, resident }) => {
    return (
      <Card
        title={name}>
        <div className="mt-1">
          <hr />
          {
            resident.map((values, i) =>
              <div key={i}
                className="mt-3 mb-4 table-row-light d-flex align-items-center justify-content-between">
                <div>
                  <Avatar size={40}
                    className="font-size-sm"
                    style={{
                      backgroundColor: values.avatarColor
                    }}>
                    {utils.getNameInitial(`${values.firstname} ${values.lastname}`)}
                  </Avatar>
                  <span className="ml-2">{values.firstname} {values.lastname}</span>
                </div>
                <Button icon={<InfoCircleOutlined />}
                  type="default"
                  size="small"
                  onClick={() => ResidentDetail(currentBarangay, values.resident_id)}
                >
                  Details
                </Button>
              </div>
            )
          }

        </div>
      </Card>
    );
  }

  return (
    <div style={{
      fontSize: "16px !important"
    }}>
      <Row>
        <Col xs={24}
          sm={24}
          md={24}>
          <Card
            actions={[
              <RollbackOutlined
                onClick={onBackClick}
                key="back" />,
              <EditOutlined onClick={onEditClick}
                key="edit" />,
              <PrinterOutlined key="summon" />,
            ]}
            title={"Blotter No: 1212"}
          >
            <Form size="default"
              form={form}>
              <Row
                gutter={16}>
                <Col
                  xs={24}
                  sm={24}
                  md={16}>
                  <Card>
                    <Row gutter={16}>
                      <Col
                        xs={24}
                        sm={24}
                        md={15}>
                        <Form.Item
                          name="incident_type"
                          label="Summon Case For:"
                          labelCol={{
                            span:
                              24
                          }} rules={[{ required: true }]}>
                          <Input placeholder="Case Type" />
                        </Form.Item>
                      </Col>
                      <Col xs={24}
                        sm={24}
                        md={5}>
                        <Form.Item
                          name="settlement_status"
                          labelCol={{
                            span:
                              24
                          }}
                          label="Case Status"
                          rules={[{ required: true }]}>
                          <Select className="w-100"
                            placeholder="Case Status">
                            {caseData.map((elm) => (
                              <Option key={elm}
                                value={elm}>
                                {elm}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col
                        xs={24}
                        sm={24}
                        md={20}>
                        <div
                          className="mb-4">
                          <Form.Item name="narrative">
                            <Editor
                              defaultEditorState={editorState}
                              toolbarClassName="toolbarClassName"
                              wrapperClassName="wrapperClassName"
                              editorClassName="editorClassName" />
                          </Form.Item>
                        </div>
                      </Col>
                      <Col xs={24}
                        sm={24}
                        md={20}>
                        <Row
                          gutter={16}>
                          <Col
                            xs={24}
                            sm={24}
                            md={9}>
                            <Form.Item
                              labelCol={{
                                span:
                                  24
                              }}
                              name="date_of_incident"
                              label="Date of Incident"
                              rules={[{ required: true }]}>
                              <DatePicker className="w-100" />
                            </Form.Item>
                          </Col>
                          <Col xs={24}
                            sm={24}
                            md={6}>
                            <Form.Item
                              labelCol={{
                                span:
                                  24
                              }}
                              name="time_of_incident"
                              label="Time of Incident"
                              rules={[{ required: true }]}>
                              <TimePicker className="w-100" />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row gutter={16}>
                          <Col
                            xs={24}
                            sm={24}
                            md={9}>
                            <Form.Item
                              labelCol={{
                                span:
                                  24
                              }}
                              name="createdAt"
                              label="Date Recorded">
                              <DatePicker className="w-100"
                                disabled />
                            </Form.Item>
                          </Col>
                          <Col xs={24}
                            sm={24}
                            md={6}>
                            <Form.Item
                              labelCol={{
                                span:
                                  24
                              }}
                              name="createdAt"
                              label="Time Recorded">
                              <TimePicker className="w-100"
                                disabled />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Col>
                      <Col xs={24}
                        sm={24}
                        md={20}>
                        <Form.Item
                          name="PNP"
                          label="Document Copy to PNP"
                          labelCol={{
                            span:
                              24
                          }}>
                          <Input placeholder="Documents Copy" />
                        </Form.Item>
                      </Col>
                      <Col xs={24}
                        sm={24}
                        md={20}>
                        <Form.Item
                          name="file_id"
                          label="File Upload"
                          labelCol={{
                            span:
                              24
                          }}>
                          <Upload {...uploadProps}
                            fileList={[]}>
                            <Button
                              icon={<UploadOutlined />}>
                              Click to Upload
                            </Button>
                          </Upload>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col xs={24}
                  sm={24}
                  md={8}>
                  <Row>
                    <Col xs={24}
                      sm={24}
                      md={24}>
                      <ResidentResponse
                        name="Reporter"
                        resident={reporters}
                      />

                      <ResidentResponse
                        name="Victim"
                        resident={victims}
                      />

                      <ResidentResponse
                        name="Suspect"
                        resident={suspects}
                      />

                      <ResidentResponse
                        name="Respondent"
                        resident={respondents}
                      />
                    </Col>
                  </Row>
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
