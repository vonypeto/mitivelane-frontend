import { React, useState } from "react";
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  Upload,
  InputNumber,
  message,
  Select,
  DatePicker,
  Avatar,
} from "antd";
import QueueAnim from "rc-queue-anim";
import { ImageSvg } from "assets/svg/icon";
import CustomIcon from "components/util-components/CustomIcon";
import { LoadingOutlined, UserOutlined } from "@ant-design/icons";
import moment from "moment";
const current = new Date();
const legthUnit = ["cm", "mm", "m"];
const weightUnit = ["kg", "g", "mg"];
const dateFormat = "YYYY/MM/DD";
const { Dragger } = Upload;
const { Option } = Select;

const rules = {
  firstname: [
    {
      required: true,
      message: "Please enter first name",
    },
  ],
  lastname: [
    {
      required: true,
      message: "Please enter last name",
    },
  ],
  middlename: [
    {
      required: true,
      message: "Please enter middle name",
    },
  ],
  alias: [
    {
      required: true,
      message: "Please enter alias",
    },
  ],
  description: [
    {
      required: true,
      message: "Please enter product description",
    },
  ],
  price: [
    {
      required: true,
      message: "Please enter product price",
    },
  ],
  comparePrice: [],
  taxRate: [
    {
      required: true,
      message: "Please enter tax rate",
    },
  ],
  cost: [
    {
      required: true,
      message: "Please enter item cost",
    },
  ],
};

const imageUploadProps = {
  name: "file",
  multiple: true,
  listType: "picture-card",
  showUploadList: false,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const yesno = ["Yes", "No"];

const MainForm = (props) => {
  const [selectShow, setShow] = useState(true);

  return (
    <>
      {selectShow ? (
        <Row gutter={16}>
          <Col key="a" xs={24} sm={24} md={17}>
            <QueueAnim
              type={["right", "left"]}
              ease={["easeOutQuart", "easeInOutQuart"]}
            >
              <div key="a">
                <Card title="Resident Information">
                  <Row gutter={16}>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        name="lastname"
                        label="Last Name"
                        rules={rules.lastname}
                      >
                        <Input placeholder="Last Name" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        name="firstname"
                        label="First Name"
                        rules={rules.firstname}
                      >
                        <Input placeholder="First Name" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        name="middlename"
                        label="Middle Name"
                        rules={rules.middlename}
                      >
                        <Input placeholder="Middle Name" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item name="alias" label="Alias" rules={rules.alias}>
                        <Input placeholder="Alias" />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
              </div>
              <div key="b">
                <Card title="Details">
                  <Row gutter={16}>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item name="height" label="Height">
                        <Input
                          rules={rules.height}
                          addonAfter={
                            <Form.Item name="heightUnit" noStyle>
                              <Select style={{ minWidth: 70 }}>
                                {legthUnit.map((unit) => (
                                  <Option key={unit} value={unit}>
                                    {unit}
                                  </Option>
                                ))}
                              </Select>
                            </Form.Item>
                          }
                        />
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={12}>
                      <Form.Item name="weight" label="Weight">
                        <Input
                          rules={rules.weight}
                          addonAfter={
                            <Form.Item name="weightUnit" noStyle>
                              <Select style={{ minWidth: 70 }}>
                                {weightUnit.map((unit) => (
                                  <Option key={unit} value={unit}>
                                    {unit}
                                  </Option>
                                ))}
                              </Select>
                            </Form.Item>
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24}>
                      <Form.Item
                        name="birthday"
                        label="Birthday"
                        rules={rules.birthday}
                      >
                        <DatePicker
                          className="w-100"
                          initialValues={moment(
                            `${current.getFullYear()}/${
                              current.getMonth() + 1
                            }/${current.getDate()}`,
                            dateFormat
                          )}
                          format={dateFormat}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item name="age" label="Age" rules={rules.age}>
                        <InputNumber
                          className="w-100"
                          value={0}
                          formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          }
                          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        name="birth_of_place"
                        label="Birth of Place"
                        rules={rules.birth_of_place}
                      >
                        <Input placeholder="Birth of Place" />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
              </div>

              <div key="c">
                <Card title="Miscellaneous">
                  <Row gutter={16}>
                    <Col xs={24} sm={24} md={24}>
                      <Form.Item name="salary" label="Salary">
                        <Input.Group className="w-100" compact>
                          <Select className="w-15" defaultValue="1">
                            <Option value="1">Between</Option>
                          </Select>
                          <InputNumber
                            className="w-40"
                            style={{ width: 100, textAlign: "center" }}
                            placeholder="Minimum"
                            value={0}
                            formatter={(value) =>
                              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }
                            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                          />
                          <Input
                            className="w-3 site-input-split"
                            style={{
                              width: 30,
                              borderLeft: 0,
                              borderRight: 0,
                              pointerEvents: "none",
                            }}
                            placeholder="~"
                            disabled
                          />
                          <InputNumber
                            className="w-40 site-input-right"
                            value={0}
                            formatter={(value) =>
                              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }
                            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                            style={{
                              width: 100,
                              textAlign: "center",
                            }}
                            placeholder="Maximum"
                          />
                        </Input.Group>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item name="occupation" label="Occupation">
                        <Input className="w-100" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item name="religion" label="Religion">
                        <Input placeholder="Christian" />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
              </div>
            </QueueAnim>
          </Col>
          <Col key="b" xs={24} sm={24} md={7}>
            <QueueAnim
              type={["right", "left"]}
              ease={["easeOutQuart", "easeInOutQuart"]}
            >
              <div key="a">
                <Card title="Profile">
                  <Dragger
                    {...imageUploadProps}
                    beforeUpload={beforeUpload}
                    onChange={(e) => props.handleUploadChange(e)}
                  >
                    {props.uploadedImg ? (
                      <img
                        src={props.uploadedImg}
                        alt="avatar"
                        className="img-fluid"
                      />
                    ) : (
                      <div>
                        {props.uploadLoading ? (
                          <div>
                            <LoadingOutlined className="font-size-xxl text-primary" />
                            <div className="mt-3">Uploading</div>
                          </div>
                        ) : (
                          <div>
                            <CustomIcon className="display-3" svg={ImageSvg} />
                            <p>Click or drag file to upload</p>
                          </div>
                        )}
                      </div>
                    )}
                  </Dragger>
                </Card>
              </div>
              <div key="b">
                {" "}
                <Card title="Additional Details">
                  <Form.Item name="voterstatus" label="Voter Status">
                    <Select className="w-100" placeholder="Voter Status">
                      {yesno.map((elm) => (
                        <Option key={elm} value={elm}>
                          {elm}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item name="civilstatus" label="Civil Status">
                    <Select className="w-100" placeholder="Civil Status">
                      {yesno.map((elm) => (
                        <Option key={elm} value={elm}>
                          {elm}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item name="citizenship" label="CitizenShip">
                    <Col xs={24} sm={24} md={24}>
                      <Input placeholder="CitizenShip" />
                    </Col>
                  </Form.Item>
                </Card>
              </div>
            </QueueAnim>
          </Col>
        </Row>
      ) : null}
    </>
  );
};
export default MainForm;
