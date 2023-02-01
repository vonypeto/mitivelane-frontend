import React, { useState, useEffect, useRef } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { Tabs, Form, Button, message } from "antd";
import Flex from "components/shared-components/Flex";
import MainForm from "./MainForm";
import MainFormView from "./MainFormView";
import { useHistory } from "react-router-dom";
import AddressContacts from "./AddressContacts";
import BlotterRecords from "./BlotterRecords";
import SocialWelfare from "./SocialWelfare";
import Account from "./Account";
import moment from "moment";
import { useParams } from "react-router-dom";
import QueueAnim from "rc-queue-anim";
import axios from "axios";
import { useAuth } from "contexts/AuthContext";
import { AUTH_ORGANIZATION } from "redux/constants/Auth";
import ConfirmButton from "components/shared-components/ConfirmButton";
import { ResidentFileUploadApi } from "api/AppController/FileUploadController/ResidentFileUploadController";

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
  const source = axios.CancelToken.source();
  const cancelToken = source.token;
  const { generateToken } = useAuth();

  const hiddenFileInput = useRef(null);
  const { id } = useParams();
  const organization_id = localStorage.getItem(AUTH_ORGANIZATION);
  let history = useHistory();
  const { mode = ADD, param } = props;
  const [residentList, setResidentList] = useState([]);
  const [residentData, setResidentData] = useState([]);
  const [residentFilter, setResidentFilter] = useState([]);
  const [form] = Form.useForm();
  const [purokList, setPurokList] = useState([]);
  const [uploadedImg, setImage] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firebaseUploadData, setFirebaseUploadData] = useState({});
  const [newProfile, setNewProfile] = useState({});

  useEffect(() => {
    if (mode === EDIT || mode === VIEW) {
      try {
        (async () => {
          setLoading(true)
          const response = await axios.post(
            "/api/resident/get",
            { organization_id, resident_id: id },
            generateToken()[1],
            { cancelToken }
          );

          var resident = response.data;
          resident.birthday = new moment(resident.birthday)
          setResidentData(resident);

          form.setFieldsValue(resident);

          setImage(resident.profile?.fileUrl);
          setLoading(false)
        })();
      } catch (error) {
        console.log(error);
        message.error("Error!! Please try again later.");
      }
    }
  }, [form, mode, param, props]);

  useEffect(() => {
    (async () => {
      const request = await axios.post(
        "/api/purok/getAll",
        { organization_id: organization_id },
        generateToken()[1],
        { cancelToken }
      );

      setPurokList(request.data);
    })();
  }, []);

  const newProfileNull = () => {
    return Object.keys(newProfile).length == 0
  }


  const onFinishAdd = async (values) => {
    console.log("values", values)
    try {
      await axios
        .post(
          "/api/resident/add",
          { values, organization_id },
          generateToken()[1]
        )
        .then((res) => {
          console.log(res.data);
        });
    } catch (error) {
      console.log(error);
      message.error(`Error occurred, please try again later!`);
      return;
    }

    message.success(`Added ${values.firstname} to Resident list`);
    setTimeout(() => {
      history.push(
        `/app/${organization_id}/residents/resident-information/list`
      );
      setSubmitLoading(false); form
    }, 1000);
  };

  const onFinishUpdate = async (values) => {
    try {
      await axios
        .post(
          "/api/resident/update",
          { values, organization_id, resident_id: id },
          generateToken()[1]
        )
        .then((res) => {
          console.log(res.data);
          message.success(`Resident information has been updated`);
          setSubmitLoading(false);
          setTimeout(() => {
            history.push(
              `/app/${organization_id}/residents/resident-information/list`
            );
            setSubmitLoading(false); form
          }, 1000);
        });

    } catch (error) {
      console.log(error);
      message.error(`Error occurred, please try again later!`);
      return;
    }
  };

  const onFinish = (values) => {
    setSubmitLoading(true);
    form
      .validateFields()
      .then(async (values) => {

        setTimeout(async () => {
          var handleNewResident
          if (mode == ADD) {
            //RESIDENT INSERT ADD
            handleNewResident = onFinishAdd;
          }
          if (mode == EDIT) {
            //RESIDENT INSERT EDIT
            handleNewResident = onFinishUpdate;
          }

          if (newProfileNull() == false) {
            let profileFile = newProfile.file

            await ResidentFileUploadApi(
              values,
              profileFile,
              residentData.profile?.fileUrl,
              "avatar",
              handleNewResident
            )
          }

          else handleNewResident

        }, 1500);


      })
      .catch((info) => {
        setSubmitLoading(false);
        console.log("info", info);
        message.error("Please enter all required field ");
      });
  };

  const onFailed = (values) => {
    values.errorFields.map((field) => {
      message.error(field.errors);
    });
  };

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        name="advanced_search"
        className="ant-advanced-search-foarm"
        onFinish={onFinish}
        onFinishFailed={onFailed}
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
                  ? "Add New Resident"
                  : mode === EDIT
                    ? `Edit Resident`
                    : "View Resident"}{" "}
              </h2>
              <div className="mb-3">
                {mode === VIEW ?
                  <div>
                    <Button
                      className="mr-2"
                      type="primary"
                      onClick={() => history.replace(`/app/${organization_id}/residents/resident-information/${residentData.resident_id}/edit`)}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => history.replace(`/app/${organization_id}/residents/resident-information/list`)}
                    >
                      Back
                    </Button>
                  </div>
                  :
                  <ConfirmButton
                    className="mr-2"
                    type="warning"
                    modalTitle="Are you sure you want to leave this page?"
                    modalContent="Data you've entered will be gone."
                    text="Discard"
                    handleOk={() => history.replace(`/app/${organization_id}/residents/resident-information/list`)}
                  />
                }

                {mode === VIEW ? null : (
                  <Button
                    type="primary"
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
              <TabPane tab="Resident Details" key="1">
                <QueueAnim
                  delay={300}
                  type={["right", "left"]}
                  ease={["easeOutQuart", "easeInOutQuart"]}
                >
                  <div className="demo1">
                    <MainForm
                      uploadedImg={uploadedImg}
                      uploadLoading={uploadLoading}
                      hiddenFileInput={hiddenFileInput}
                      setNewProfile={setNewProfile}
                      newProfile={newProfile}
                      residentData={mode == EDIT ? residentData : []}
                      mode={mode}
                      loading={loading}
                    />
                  </div>
                </QueueAnim>
              </TabPane>
              <TabPane tab="Address and Contacts" key="2" forceRender>
                <AddressContacts purokList={purokList} />
              </TabPane>
              <TabPane tab="Social Welfare Service" key="3" forceRender>
                <SocialWelfare />
              </TabPane>

              {mode === "ADD" ? (
                "Add New Resident"
              ) : (
                <TabPane tab="Blotter Records" key="4" forceRender>
                  <BlotterRecords
                    organization_id={param}
                    resident_id={residentFilter}
                  />
                </TabPane>
              )}

              {/* <TabPane tab="Account Information" key="5" forceRender>
                <Account />
              </TabPane> */}
            </Tabs>
          </div>
        ) : mode === "VIEW" ? (
          <div className="container">
            <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
              <TabPane tab="Resident Details" key="1">
                <MainFormView residentData={residentData} loading={loading} />
              </TabPane>

              <TabPane tab="Blotter Records" key="2">
                <BlotterRecords
                  organization_id={param}
                  resident_id={residentFilter}
                />
              </TabPane>

              <TabPane tab="Documents" key="3">
                TBA
              </TabPane>
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
