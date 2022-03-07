import React, { useState, useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { Tabs, Form, Button, message } from "antd";
import Flex from "components/shared-components/Flex";
import { useHistory } from "react-router-dom";
import BlotterListData from "assets/data/blotter.data.json";
import moment from "moment";
import { useParams } from "react-router-dom";
import Reporter from "./Reporter";
import Victim from "./Victim";
import Suspect from "./Suspect";
import Respondent from "./Respondent";
import ChildrenConflictWithLaw from "./ChildrenConflict";
import NarrativeReport from "./Narrative";
import Receipt from "./Receipt";

import { reporter, resetReporter } from "./Reporter";
import { victim, resetVictim } from "./Victim";
import { suspect, resetSuspect } from "./Suspect";
import { respondent, resetRespondent } from "./Respondent";

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
  const {
    currentBarangay,
    generateToken
  } = useAuth();

  const { id } = useParams();
  const authToken = localStorage.getItem("auth_token");

  console.log("BLotter_ID: " + id);
  let history = useHistory();
  const { mode = ADD, param } = props;
  const [residentlist, setResidentlist] = useState([]);
  const [residentFilter, setResidentFilter] = useState([]);
  const [form] = Form.useForm();
  const [uploadedImg, setImage] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [initialReporters, setInitialReporters] = useState([])

  useEffect(() => {
    resetReporter()
    resetVictim()
    resetSuspect()
    resetRespondent()

    getResidents()

    console.log("Reset Data")

    if (mode === EDIT || mode === VIEW) {

      axios.get("/api/blotter/get-blotter-initial-value/" + id, generateToken()[1]).then((response) => {
        console.log("Blotter Initial Data", response.data)
        form.setFieldsValue({
          blotter_id: response.data.blotter_id,
          settlement_status: response.data.settlement_status,
          subject: response.data.subject,
          incident_type: response.data.incident_type,
          place_incident: response.data.place_incident,
          time_of_incident: new moment(response.data.time_of_incident),
          date_of_incident: new moment(response.data.date_of_incident),
          time_schedule: new moment(response.data.time_schedule),
          date_schedule: new moment(response.data.date_schedule)
        });

      }).catch(() => {
        message.error("Could not fetch the data in the server!")
      });


    }
  }, [form, mode, param, props]);

  const getResidents = () => {
    axios.post("/api/resident/getAll", { barangay_id: currentBarangay }, generateToken()[1]).then((response) => {
      console.log("Residents ", response.data)
      setResidentlist(response.data)
    }).catch(() => {
      message.error("Could not fetch the data in the server!")
    });

  }

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
    setSubmitLoading(true);
    form
      .validateFields()
      .then((values) => {
        setTimeout(() => {
          setSubmitLoading(false);
          if (mode === ADD) {
            //Blotter ADD
            values.barangay_id = currentBarangay
            values.uuid = authToken

            values.reporters = reporter
            values.victims = victim
            values.suspects = suspect
            values.respondents = respondent

            if (values.reporters.length == 0 || values.victims.length == 0 || values.suspects.length == 0 || values.respondents.length == 0) {
              message.error("Please enter all required field ");
            } else {
              // Create Blotter
              console.log("Blotter Data ", values)
              message.loading("Creating Blotter...", 0)

              axios.post("/api/blotter/create-blotter", values, generateToken()[1]).then((response) => {
                message.destroy()
                if (response.data == "Success") {
                  return message.success(`Added ${values.blotter_id} to Blotter list`);

                } else {
                  return message.error("Error, please try again.")
                }

              }).catch(error => {
                console.log(error)
                message.destroy()
                message.error("The action can't be completed, please try again.")
              });
            }

          }
          if (mode === EDIT) {
            //Blotter EDIT
            console.log(values)
            message.loading("Editing Blotter...", 0)

            axios.post(`/api/blotter/edit-blotter/${id}`, values, generateToken()[1]).then((response) => {
              message.destroy()
              if (response.data == "Success") {
                message.success(`Edit Blotter saved`);
              } else {
                return message.error("Error, please try again.")
              }

            }).catch(error => {
              console.log(error)
              message.destroy()
              message.error("The action can't be completed, please try again.")
            });

          }
        }, 1500);
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
        initialValues={{
          heightUnit: "cm",
          widthUnit: "cm",
          weightUnit: "kg",
        }}
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
            <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
              <TabPane tab="Reporter Data" key="1">
                <Reporter residentlist={residentlist} />
              </TabPane>
              <TabPane tab="Victim Data" key="2">
                <Victim residentlist={residentlist} />
              </TabPane>
              <TabPane tab="Suspect Data" key="3">
                <Suspect residentlist={residentlist} />
              </TabPane>
              <TabPane tab="Respondent Data" key="4">
                <Respondent residentlist={residentlist} />
              </TabPane>

              <TabPane tab="Child Conflict with Law" key="5">
                <ChildrenConflictWithLaw />
              </TabPane>
              <TabPane tab="Narrative Report" key="6">
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
