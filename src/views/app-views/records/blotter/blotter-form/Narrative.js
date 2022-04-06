import React from "react";
import SettlementFormItem from "./SettlementFormItem";
import { getLocalStorage, setLocalStorageObject } from "api/AppController/LocalStorageController/LocalStorageController";
import { BLOTTER_FORM } from "redux/constants/Record";
import {
  Tag,
  Button,
  Table,
  Input,
  Row,
  Col,
  Card,
  Form,
  Upload,
  InputNumber,
  message,
  Select,
  TimePicker,
  DatePicker,
} from "antd";
import Flex from "components/shared-components/Flex";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, EditorState } from "draft-js";
import { SettlementData } from "./BlotterData";
import moment from "moment";

const current = new Date();
const dateFormat = "YYYY/MM/DD";
const { Option } = Select;

const Narrative = () => {
  const initialData = getLocalStorage(BLOTTER_FORM)

  const content = {
    entityMap: {},
    blocks: (initialData.narrative != null)
      ? initialData.narrative.blocks
      : []
  }

  const contentState = convertFromRaw(content);
  const editorState = EditorState.createWithContent(contentState);


  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Details">
          <div className="mb-2 text-justify text-justify-content-center">
            <i>
              {" "}
              <label>
                ENTER IN DETAIL THE NARRATIVE OF THE INCIDENT OR EVENT,
                ANSWERING THE WHO, WHAT, WHEN, WHERE, WHY, AND HOW OF REPORTING.
              </label>
            </i>
          </div>
          <Form.Item
            name="subject"
            labelCol={{ span: 24 }}
            onChange={(e) => setLocalStorageObject(BLOTTER_FORM, e.target.value, "subject")}
          >
            <Input placeholder="Subject (Optional)" />
          </Form.Item>
          <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
            <Flex className="mb-1" mobileFlex={false}>
              <div className="">
                <Form.Item
                  name="narrative"
                >
                  <Editor
                    defaultEditorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onChange={(e) => setLocalStorageObject(BLOTTER_FORM, e, "narrative")}
                  />
                </Form.Item>
              </div>
            </Flex>
          </Flex>
        </Card>
      </Col>

      <Col xs={24} sm={24} md={7}>
        <Card title="Blotter Entry No:">
          <Form.Item name="blotter_id">
            <Col xs={24} sm={24} md={24}>
              <Input disabled placeholder="0000" />
            </Col>
          </Form.Item>
        </Card>
		
        <SettlementFormItem/>
		
        <Card title="Incident Details">
          <Form.Item
            name="incident_type"
            label="Type of Incident"
            rules={[{ required: true }]}
            onChange={(e) => setLocalStorageObject(BLOTTER_FORM, e.target.value, "incident_type")}>
            <Input placeholder="Incident Type" />
          </Form.Item>
          <Form.Item
            name="time_of_incident"
            label="Time occured"
            rules={[{ required: true }]}
          >
            <TimePicker
              className="w-100"
              values={moment("12:08:23", "HH:mm:ss")}
              onChange={(e) => setLocalStorageObject(BLOTTER_FORM, e, "time_of_incident")}
            />
          </Form.Item>
          <Form.Item
            name="date_of_incident"
            label="Date of Incident"
            rules={[{ required: true }]}>
            <DatePicker
              className="w-100"
              initialValues={moment(
                `${current.getFullYear()}/${current.getMonth() + 1
                }/${current.getDate()}`,
                dateFormat
              )}
              format={dateFormat}
              onChange={(e) => setLocalStorageObject(BLOTTER_FORM, e, "date_of_incident")}
            />
          </Form.Item>
          <Form.Item
            name="place_incident"
            label="Place of Incident"
            rules={[{ required: true }]}
            onChange={(e) => setLocalStorageObject(BLOTTER_FORM, e.target.value, "place_incident")}>
            <Input placeholder="Place of incident" />
          </Form.Item>
          <Form.Item
            name="time_schedule"
            label="Time Schedule">
            <TimePicker
              className="w-100"
              values={moment("12:08:23", "HH:mm:ss")}
              onChange={(e) => setLocalStorageObject(BLOTTER_FORM, e, "time_schedule")}
            />
          </Form.Item>
          <Form.Item
            name="date_schedule"
            label="Date Schedule">
            <DatePicker
              className="w-100"
              initialValues={moment(
                `${current.getFullYear()}/${current.getMonth() + 1
                }/${current.getDate()}`,
                dateFormat
              )}
              format={dateFormat}
              onChange={(e) => setLocalStorageObject(BLOTTER_FORM, e, "date_schedule")}
            />
          </Form.Item>
        </Card>
      </Col>
    </Row>
  );
};
export default Narrative;
