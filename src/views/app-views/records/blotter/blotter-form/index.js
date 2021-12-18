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
  const { id } = useParams();
  console.log("BLotter_ID: " + id);
  let history = useHistory();
  const { mode = ADD, param } = props;
  const [residentData, setResidentData] = useState([]);
  const [residentFilter, setResidentFilter] = useState([]);
  const [form] = Form.useForm();
  const [uploadedImg, setImage] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  useEffect(() => {
    if (mode === EDIT || mode === VIEW) {
      console.log("is edit & view");

      console.log("props", props);
      const blotterID = parseInt(id);
      console.log("EDIT BARANGAY: " + param);
      setResidentFilter(blotterID);
      console.log("Resident: " + residentFilter);
      const blotterData = BlotterListData.filter(
        (blotter) => blotter.blotter_id === blotterID
      );
      // const residentData = ResidentListData.filter( resident => resident.resident_id === residentID)
      const blotter = blotterData[0];
      setResidentData(residentData[0]);
      console.log(blotter.daterecorded);
      form.setFieldsValue({
        //reference this rojhon: this data is from the narrative report
        // pass the data from the child to parent to the form later cause it dont work on setstate in childform of form.item
        date_of_incident: new moment(blotter.daterecorded),
        // lastname: resident.lastname,
        // firstname: resident.firstname,
        // middlename: resident.middlename,
        // alias: resident.alias,
        // height: resident.height,
        // birthday: new moment(resident.birthday),
        // weight: resident.weight,
        // age: resident.age,
        // birth_of_place: resident.birth_of_place
      });
      // setImage(resident.image)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, mode, param, props]);

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
            //RESIDENT INSERT ADD
            message.success(`Added ${values.firstname} to Blotter list`);
          }
          if (mode === EDIT) {
            //RESIDENT INSERT EDIT
            message.success(`Case saved`);
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
                <Reporter />
              </TabPane>
              <TabPane tab="Victim Data" key="2">
                <Victim />
              </TabPane>
              <TabPane tab="Suspect Data" key="3">
                <Suspect />
              </TabPane>
              <TabPane tab="Respondent Data" key="4">
                <Respondent />
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
