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
  Button,
  Space
} from "antd";

import QueueAnim from "rc-queue-anim";
import { ImageSvg } from "assets/svg/icon";
import CustomIcon from "components/util-components/CustomIcon";
import { LoadingOutlined, UserOutlined, UploadOutlined } from "@ant-design/icons";
import CustomAvatar from "components/shared-components/Avatar";
import moment from "moment";
import utils from "utils";

import { resident_details } from "./AddResidentRules";

const currentDate = new Date();
const lengthUnit = ["cm", "in", "m"];
const weightUnit = ["kg", "g", "mg"];
const dateFormat = "YYYY/MM/DD";
const { Dragger } = Upload;
const { Option } = Select;

const beforeUpload = (file) => {
  const fileTypeValid = file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg";
  if (!fileTypeValid) {
    message.error("You can only upload JPEG/JPG/PNG file!");
  }
  const fileSizeValid = file.size / 1024 / 1024 < 2;
  if (!fileSizeValid) {
    message.error("Image must smaller than 2MB!");
  }
  return fileTypeValid && fileSizeValid;
};

const numberFilter = (e) => {
  if (!/[0-9]/.test(e.key)) {
    e.preventDefault();
  }
}

const yesno = ["Yes", "No"];

const MainForm = (props) => {
  const { hiddenFileInput, setNewProfile, residentData, mode } = props
  const [selectShow, setShow] = useState(true);
  // const [age, setAge] = useState(0);
  const [newProfilePicture, setNewProfilePicture] = useState("");

  //handle upload image
  const handleImageUpload = async (event) => {
    const fileUploaded = event.target.files[0];
    const isFileValid = beforeUpload(fileUploaded)

    if (isFileValid) {
      const type = fileUploaded.type
      const base64 = await convertBase64(fileUploaded);

      console.log("fileUploaded", fileUploaded)
      setNewProfilePicture(base64)

      setNewProfile({
        fileBase64: base64,
        type
      })

      message.success("Sucess, don't forget to press save to make changes permanent.")
    }
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
                        rules={resident_details.last_name}

                      >
                        <Input placeholder="Last Name" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        name="firstname"
                        label="First Name"
                        rules={resident_details.first_name}
                      >
                        <Input placeholder="First Name" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        name="middlename"
                        label="Middle Name"
                        rules={resident_details.middle_name}
                      >
                        <Input placeholder="Middle Name" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item name="alias" label="Alias" rules={resident_details.alias}>
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
                      <Row gutter={0}>

                        <Col xs={19} sm={20} md={16} lg={18} xl={20} xxl={20}>
                          <Form.Item name="height" label="Height"
                            rules={resident_details.height}
                          >
                            <InputNumber
                              min={0}
                              className="w-100"
                              placeholder="Height"
                              onKeyPress={(e) => { numberFilter(e) }}
                            />
                          </Form.Item>
                        </Col>

                        <Col xs={3} sm={4} md={6} lg={6} xl={4} xxl={4}>
                          <Form.Item
                            name="height_unit" label={" "}
                          >
                            <Select style={{ minWidth: 70 }}>
                              {lengthUnit.map((unit) => (
                                <Option key={unit} value={unit}>
                                  {unit}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>

                    <Col xs={24} sm={24} md={12}>
                      <Row gutter={0}>

                        <Col xs={19} sm={20} md={16} lg={18} xl={20} xxl={20}>
                          <Form.Item name="weight" label="Weight"
                            rules={resident_details.height}
                          >
                            <InputNumber
                              min={0}
                              className="w-100"
                              placeholder="Weight"
                              onKeyPress={(e) => { numberFilter(e) }}
                            />
                          </Form.Item>
                        </Col>

                        <Col xs={3} sm={4} md={6} lg={6} xl={4} xxl={4}>
                          <Form.Item
                            name="weight_unit" label={" "}

                          >
                            <Select style={{ minWidth: 70 }}>
                              {weightUnit.map((unit) => (
                                <Option key={unit} value={unit}>
                                  {unit}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>

                    </Col>
                    <Col xs={12} sm={12} md={12}>
                      <Form.Item
                        name="birthday"
                        label="Birthday"
                        rules={resident_details.birthday}
                        initialValue={moment(
                          `${currentDate.getFullYear()}/${currentDate.getMonth() + 1
                          }/${currentDate.getDate()}`,
                          dateFormat
                        )}
                      >
                        <DatePicker
                          className="w-100"
                          format={dateFormat}
                          // onChange={(value) => {
                          //   setAge(age)
                          // }}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12}>
                      <Form.Item name="gender" label="Gender" initialValue={"Male"} rules={resident_details.gender}>
                        <Select className="w-100" placeholder="Gender">
                          <Option key={1} value={"Male"}>
                            Male
                          </Option>
                          <Option key={2} value={"Female"}>
                            Female
                          </Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    {/* <Col xs={24} sm={24} md={12}>
                      <Form.Item name="age" label="Age" rules={resident_details.age} >
                        <InputNumber
                          min={0}
                          className="w-100"
                          onKeyPress={(e) => { numberFilter(e) }}
                          placeholder="Age"
                          readOnly
                          value={age}
                        />
                      </Form.Item>
                    </Col> */}
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        name="birth_of_place"
                        label="Birth of Place"
                        rules={resident_details.birth_of_place}
                      >
                        <Input placeholder="Birth of Place" />
                      </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12}>
                      <Form.Item name="blood_type" label="Blood Type" initialValue={"A"} rules={resident_details.blood_type}>
                        <Select className="w-100" placeholder="Blood Type">
                          <Option key={1} value={"A"}>
                            A
                          </Option>
                          <Option key={2} value={"B"}>
                            B
                          </Option>
                          <Option key={3} value={"AB"}>
                            AB
                          </Option>
                          <Option key={4} value={"O"}>
                            O
                          </Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
              </div>

              <div key="c">
                <Card title="Miscellaneous">
                  <Row gutter={16}>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item name="occupation" label="Occupation">
                        <Input className="w-100" placeholder="Occupation" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item name="religion" label="Religion">
                        <Input placeholder="Religion" />
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
                <Card title="Profile"
                  bodyStyle={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <Space direction="vertical" align="center">
                    {(mode == "EDIT" && residentData.avatarImg == null) &&
                      <CustomAvatar
                        size={100}
                        color={residentData.avatarColor}
                        icon={utils.getNameInitial(residentData.firstname + " " + residentData.lastname)}
                        image={newProfilePicture ? newProfilePicture : null}

                      />
                    }

                    {(mode == "EDIT" && residentData.avatarImg != null) &&
                      <CustomAvatar
                        size={100}
                        color={residentData.avatarColor}
                        icon={utils.getNameInitial(residentData.firstname + " " + residentData.lastname)}
                        image={newProfilePicture ? newProfilePicture : residentData.avatarImg}

                      />
                    }

                    {mode == "ADD" &&
                      <CustomAvatar
                        size={100}
                        color={"#0047AB"}
                        image={newProfilePicture ? newProfilePicture : null}

                      />
                    }

                    <Button icon={<UploadOutlined />} size="medium"
                      onClick={() => { hiddenFileInput.current.click() }}
                    >
                      Upload image
                    </Button>

                    <input
                      ref={hiddenFileInput}
                      type="file"
                      onChange={handleImageUpload}
                      hidden
                    />
                  </Space>
                </Card>
              </div>
              <div key="b">
                {" "}
                <Card title="Additional Details">
                  <Form.Item name="voter_status" label="Voter Status" initialValue={"Registered"} rules={resident_details.voter_status}>
                    <Select className="w-100" placeholder="Voter Status">
                      <Option key={1} value={"Registered"}>
                        Registered
                      </Option>
                      <Option key={2} value={"Not Registered"}>
                        Not Registered
                      </Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name="civil_status" label="Civil Status" initialValue={"Single"}>
                    <Select className="w-100" placeholder="Civil Status">

                      <Option key={1} value={"Single"}>
                        Single
                      </Option>
                      <Option key={2} value={"Married"}>
                        Married
                      </Option>
                      <Option key={3} value={"Seperated"}>
                        Seperated
                      </Option>
                      <Option key={4} value={"Widowed"}>
                        Widowed
                      </Option>

                    </Select>
                  </Form.Item>
                  <Form.Item name="citizenship" label="Citizenship">
                    <Input placeholder="Citizenship" />
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
