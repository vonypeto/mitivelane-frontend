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
  const [newProfile, setNewProfile] = useState({});

  useEffect(() => {
    if (mode === EDIT || mode === VIEW) {
      try {
        (async () => {
          const response = await axios.post(
            "/api/resident/getAll",
            { organization_id },
            generateToken()[1],
            { cancelToken }
          );

          const ResidentListData = response.data;

          const residentID = id;
          setResidentFilter(residentID);
          const residentData = ResidentListData.filter(
            (resident) => resident.resident_id === residentID
          );

          const resident = residentData[0];
          setResidentData(residentData[0]);

          form.setFieldsValue({
            lastname: resident.lastname,
            firstname: resident.firstname,
            middlename: resident.middlename,
            alias: resident.alias,
            height: resident.height,
            birthday: new moment(resident.birthday),
            occupation: resident.occupation,
            voter_status: resident.voter_status,
            religion: resident.religion,
            weight: resident.weight,
            age: resident.age,
            civil_status: resident.civil_status,
            citizenship: resident.citizenship,
            birth_of_place: resident.birth_of_place,
            address_1: resident.address_1,
            address_2: resident.address_2,
            area: resident.area,
            father: resident.father,
            mother: resident.mother,
            spouse: resident.spouse,
            telephone: resident.telephone,
            mobile_number: resident.mobile_number,
            email: resident.email,
            pag_ibig: resident.pag_ibig,
            philhealth: resident.philhealth,
            sss: resident.sss,
            tin: resident.tin,
          });
          setImage(resident.image);
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
      console.log(request.data);
    })();
  }, []);

  const newProfileNull = () => {
    return Object.keys(newProfile).length == 0
  }

  const handleUploadChange = (info) => {
    console.log("info", info)
    if (info.file.status === "uploading") {
      setUploadLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        console.log("imageUrl", imageUrl)
        setImage(imageUrl);
        setUploadLoading(false);
      });
    }

    if (info.file.status === "error") {
      message.error("Error with the uploaded image!!")
      setUploadLoading(false);
    }
  };

  const onFinishAdd = async (values) => {
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
      setSubmitLoading(false);form
    }, 1000);
  };

  const onFinishUpdate = async (values) => {
    console.log("values", values)
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
      .then((values) => {
        if (newProfileNull() == false) {
          values.avatarImg = newProfile.fileBase64
          values.avatarImgType = newProfile.type
        }

        setTimeout(() => {
          if (mode === ADD) {
            //RESIDENT INSERT ADD
            onFinishAdd(values);
          }
          if (mode === EDIT) {
            //RESIDENT INSERT EDIT

            onFinishUpdate(values);
          }
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
                <ConfirmButton
                  className="mr-2"
                  type="warning"
                  modalTitle="Are you sure you want to leave this page?"
                  modalContent="Data you've entered will be gone."
                  text={mode === VIEW ? "Back" : "Discard"}
                  handleOk={() => history.replace(`/app/${organization_id}/residents/resident-information/list`)}
                />
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
                      handleUploadChange={handleUploadChange}
                      hiddenFileInput={hiddenFileInput}
                      setNewProfile={setNewProfile}
                      newProfile={newProfile}
                      residentData={mode == EDIT ? residentData : []}
                      mode={mode}
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

              <TabPane tab="Account Information" key="5" forceRender>
                <Account />
              </TabPane>
            </Tabs>
          </div>
        ) : mode === "VIEW" ? (
          <div className="container">
            <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
              <TabPane tab="Resident Details" key="1">
                <MainFormView residentData={residentData} />
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
