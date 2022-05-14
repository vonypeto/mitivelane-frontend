import React, { useState, useEffect } from "react";
import {
  getLocalStorage,
  setLocalStorageObject,
} from "api/AppController/LocalStorageController/LocalStorageController";
import { BLOTTER_FORM } from "redux/constants/Record";
import { AUTH_TOKEN } from "redux/constants/Auth";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { Tabs, Form, Button, message } from "antd";
import Flex from "components/shared-components/Flex";
import { useHistory } from "react-router-dom";
import BlotterListData from "assets/data/blotter.data.json";
import moment from "moment";
import { useParams } from "react-router-dom";
import ChildrenConflictWithLaw from "./ChildrenConflict";
import NarrativeReport from "./Narrative";
import Receipt from "./Receipt";
import ResidentInvolvement from "./ResidentInvolvement";

import axios from "axios";
import { useAuth } from "contexts/AuthContext";

const { TabPane } = Tabs;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const ADD = "ADD";
const EDIT = "EDIT";
const VIEW = "VIEW";

const MainFormList = (props) => {
  const { currentOrganization, generateToken } = useAuth();

  const { id } = useParams();
  const authToken = localStorage.getItem(AUTH_TOKEN);

  let history = useHistory();
  const { mode = ADD, param } = props;
  const [residentlists, setResidentlist] = useState([]);
  const [residentlistLoading, setResidentlistLoading] = useState(true);
  const [residentFilter, setResidentFilter] = useState([]);
  const [form] = Form.useForm();
  const [uploadedImg, setImage] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    getResidents(currentOrganization);
    setBlotterInitialValue();
  }, [form, mode, param, props]);

  const getResidents = (currentOrganization) => {
    axios
      .post(
        "/api/resident/getAll",
        { organization_id: currentOrganization },
        generateToken()[1]
      )
      .then((response) => {
        console.log("Residents ", response.data);
        setResidentlist(response.data);
        setResidentlistLoading(false);
      })
      .catch(() => {
        message.error("Could not fetch the data in the server!");
      });
  };

  const setBlotterInitialValue = () => {
    const blotterLocalStorage = getLocalStorage(BLOTTER_FORM);

    form.setFieldsValue({
      blotter_id: blotterLocalStorage.blotter_id,
      settlement_status: blotterLocalStorage.settlement_status,
      subject: blotterLocalStorage.subject,
      narrative: blotterLocalStorage.narrative,
      incident_type: blotterLocalStorage.incident_type,
      place_incident: blotterLocalStorage.place_incident,
    });

    const validateDate = (keyName) => {
      if (blotterLocalStorage.hasOwnProperty(keyName)) {
        form.setFieldsValue({
          [keyName]: new moment(blotterLocalStorage[keyName]),
        });
      }
    };

    validateDate("time_of_incident");
    validateDate("date_of_incident");
    validateDate("time_schedule");
    validateDate("date_schedule");

    // form.setFieldsValue({
    // time_of_incident: new moment(blotterLocalStorage.time_of_incident),
    // date_of_incident: new moment(blotterLocalStorage.date_of_incident),
    // time_schedule: new moment(blotterLocalStorage.time_schedule),
    // date_schedule: new moment(blotterLocalStorage.date_schedule),
    // });
  };

  const blotterForm = (values, formMode) => {
    const blotterLocalStorage = getLocalStorage(BLOTTER_FORM);

    values.organization_id = currentOrganization;
    values.uuid = authToken;

    values.reporters = blotterLocalStorage.reporters_id;
    values.victims = blotterLocalStorage.victims_id;
    values.suspects = blotterLocalStorage.suspects_id;
    values.respondents = blotterLocalStorage.respondents_id;

    if (
      values.reporters.length == 0 ||
      values.victims.length == 0 ||
      values.suspects.length == 0 ||
      values.respondents.length == 0
    ) {
      message.error("Please enter all required field ");
    } else {
      console.log("Form Data ", values);

      if (formMode == ADD) {
        setSubmitLoading(true);
        message.loading("Creating Blotter...", 0);

        axios
          .post("/api/blotter/create-blotter", values, generateToken()[1])
          .then((response) => {
            message.destroy();
            if (response.data == "Success") {
              history.goBack();
              return message.success(`Added new Blotter`);
            } else {
              return message.error("Error, please try again.");
            }
          })
          .catch((error) => {
            console.log(error);
            message.destroy();
            message.error("The action can't be completed, please try again.");
          });
      } else if (formMode == EDIT) {
        setSubmitLoading(true);
        message.loading("Editing Blotter...", 0);

        axios
          .post(`/api/blotter/edit-blotter/${id}`, values, generateToken()[1])
          .then((response) => {
            message.destroy();
            if (response.data == "Success") {
              message.success(`Edit Blotter saved`);
              history.goBack();
            } else {
              return message.error("Error, please try again.");
            }
          })
          .catch((error) => {
            console.log(error);
            message.destroy();
            message.error("The action can't be completed, please try again.");
          });
      }
    }
  };

  const onClickTab = (key) => {
    setLocalStorageObject(BLOTTER_FORM, key, "tabActiveKey");
    // console.log("Current Tab Key ", key)
  };

  const handleUploadChange = (info) => {
    if (info.file.status === "uploading") {
      setUploadLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImage(imageUrl);
        setUploadLoading(true);
      });
    }
  };

  const onFinish = () => {
    form
      .validateFields()
      .then((values) => {
        setSubmitLoading(false);
        if (mode === ADD) {
          blotterForm(values, ADD);
        }
        if (mode === EDIT) {
          blotterForm(values, EDIT);
        }
      })
      .catch((info) => {
        setSubmitLoading(false);
        console.log("info", info);
        message.error("Please enter all required field ");
      });
  };

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
      >
        <PageHeaderAlt className="border-bottom" overlap>
          <div className="container">
            <Flex
              className="py-2"
              mobileFlex={false}
              justifyContent="between"
              alignItems="center"
            >
              <h2 className="mb-3">
                {mode === ADD
                  ? "Add New Case"
                  : mode === EDIT
                  ? `Edit Cases`
                  : "View Cases"}{" "}
              </h2>
              <div className="mb-3">
                <Button onClick={history.goBack} className="mr-2">
                  {mode === VIEW ? "Back" : "Discard"}
                </Button>
                {mode === VIEW ? null : (
                  <Button
                    type="primary"
                    onClick={() => onFinish()}
                    htmlType="submit"
                    loading={submitLoading}
                  >
                    {mode === "ADD" ? "Add" : `Save`}
                  </Button>
                )}
              </div>
            </Flex>
          </div>
        </PageHeaderAlt>
        {mode === ADD || mode === EDIT ? (
          <div className="container">
            <Tabs
              defaultActiveKey={getLocalStorage(BLOTTER_FORM).tabActiveKey}
              style={{ marginTop: 30 }}
              onChange={(key) => onClickTab(key)}
            >
              <TabPane tab="Reporter Data" key="1">
                <ResidentInvolvement
                  selectionType="radio"
                  involvementType="reporters"
                  residentData={residentlists}
                  isLoading={residentlistLoading}
                  initialData={[]}
                  organizationId={currentOrganization}
                />
              </TabPane>

              <TabPane tab="Victim Data" key="2">
                <ResidentInvolvement
                  selectionType="checkbox"
                  involvementType="victims"
                  residentData={residentlists}
                  isLoading={residentlistLoading}
                  initialData={[]}
                  organizationId={currentOrganization}
                />
              </TabPane>

              <TabPane tab="Suspect Data" key="3">
                <ResidentInvolvement
                  selectionType="checkbox"
                  involvementType="suspects"
                  residentData={residentlists}
                  isLoading={residentlistLoading}
                  initialData={[]}
                  organizationId={currentOrganization}
                />
              </TabPane>

              <TabPane tab="Respondent Data" key="4">
                <ResidentInvolvement
                  selectionType="checkbox"
                  involvementType="respondents"
                  residentData={residentlists}
                  isLoading={residentlistLoading}
                  initialData={[]}
                  organizationId={currentOrganization}
                />
              </TabPane>

              <TabPane tab="Child Conflict with Law" key="5">
                <ChildrenConflictWithLaw />
              </TabPane>
              <TabPane tab="Narrative Report" key="6" forceRender>
                <NarrativeReport />
              </TabPane>
              <TabPane tab="Record Transaction Receipt" key="7">
                <Receipt />
              </TabPane>
            </Tabs>
          </div>
        ) : mode === "VIEW" ? (
          <div className="container">
            <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
              <TabPane tab="Resident Details" key="1"></TabPane>

              <TabPane tab="Blotter Records" key="2"></TabPane>
            </Tabs>
          </div>
        ) : (
          "No Page Found"
        )}
      </Form>
    </>
  );
};

export default MainFormList;
