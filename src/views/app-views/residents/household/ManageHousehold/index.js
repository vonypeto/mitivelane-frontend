import { React, useEffect, useState, useRef, createRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Card,
  Form,
  Input,
  InputNumber,
  Select,
  Row,
  Col,
  Table,
  Menu,
  Button,
  Modal,
  Space,
  Drawer,
  message,
} from "antd";

import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import axios from "axios";
import moment from "moment";
import { useAuth } from "contexts/AuthContext";
import ConfirmButton from "components/shared-components/ConfirmButton";

//Form
import HouseholdForm from "./HouseholdForm";
import NewHouseholdMemberForm from "./NewHouseholdMemberForm";

import {
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { delay } from "lodash";
import TableTextWrapper from "components/shared-components/TableTextWrapper";
import { computeAge } from "helper/Formula";

const ManageHousehold = (props) => {
  //Import
  const source = axios.CancelToken.source();
  const cancelToken = source.token;
  const history = useHistory();
  const { generateToken, currentOrganization } = useAuth();

  //Initialize
  const { organization_id, mode } = props;
  const { household_id } = useParams();

  const ResidentTableColumns = [
    {
      title: "Name",
      dataIndex: "fullname",
      key: "fullname",
      render: (_, data) => (
        TableTextWrapper(`${data.firstname} ${data.lastname}`)
      ),
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      key: "birthday",
      render: (_, data) => (
        <div className="d-flex align-items-center">
          <span className="ml-2">
            {new Date(data.birthday)
              .toDateString()
              .split(" ")
              .slice(1)
              .join(" ")}
          </span>
        </div>
      ),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Blood type",
      dataIndex: "blood_type",
      key: "blood_type",
    },
    {
      title: "Civil Status",
      dataIndex: "civil_status",
      key: "civil_status",
    },
    {
      title: "Educational Attainment",
      dataIndex: "educational_attainment",
      key: "educational_attainment",
    },
    {
      title: "Occupation",
      dataIndex: "occupation",
      key: "occupation",
    },
    {
      title: "OFW",
      dataIndex: "ofw",
      key: "ofw",
    },
    {
      title: "Illness",
      dataIndex: "illness",
      key: "illness",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, elm) => (
        <div className="text-right">
          <EllipsisDropdown menu={dropdownMenu(elm)} />
        </div>
      ),
    },
  ];

  const householdDefault = {
    house_status: "owned",
    water_source: "pipe",
    toilet_type: "sealed",
    waste_management: "collect",
  };

  const householdMemberDefault = {
    blood_type: "A",
    educational_attainment: "Elementary School Graduate",
    civil_status: "Single",
  };

  //State
  const [householdMemberList, setHouseholdMemberList] = useState([]);
  const [householdInitialVal, setHouseholdInitialVal] = useState(
    householdDefault
  );
  const [householdMemberInitialVal, setHouseholdMemberInitialVal] = useState(
    householdMemberDefault
  );
  const [purokList, setPurokList] = useState([]);
  const [residentList, setResidentList] = useState([]);
  const [memberModalAction, setMemberModalAction] = useState("add");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isImportResidentModalVisible, setIsImportResidentModalVisible,] = useState(false);

  //Ref
  const NewMemberFormRef = createRef();
  const NewHouseholdFormRef = createRef();

  //Axios
  const createHousehold = async (household, householdMembers) => {
    setLoading(true);
    try {
      await axios.post(
        "/api/household/add",
        { household, householdMembers, organization_id: organization_id },
        generateToken()[1],
        { cancelToken }
      );
    } catch (error) {
      console.log(error);
      message.error("Error!! Please try again later!!");
    }
    setLoading(true);
  };

  const getHousehold = async () => {
    try {
      const request = await axios.post(
        "/api/household/get",
        { household_id: household_id, organization_id: organization_id },
        generateToken()[1],
        { cancelToken }
      );

      const householdData = request.data;
      const householdMembersData = householdData.household_members;

      householdMembersData.map((member) => {
        member.birthday = moment(new Date(member.birthday));
      });

      // console.log(householdData)
      // console.log(householdMembersData)

      setHouseholdInitialVal(householdData);
      setHouseholdMemberList(householdMembersData);
    } catch (error) {
      console.log(error);
      message.error("Error!! Please try again later!!");
    }
  };

  const updateHousehold = async (
    household,
    householdMembers,
  ) => {
    try {
      await axios.post(
        "/api/household/update",
        {
          household,
          householdMembers,
          organization_id: organization_id,
        },
        generateToken()[1],
        { cancelToken }
      );
    } catch (error) {
      console.log(error);
      message.error("Error!! Please try again later!!");
    }
  };

  const updateResident = async (value) => {
    setLoading(true);
    try {
      await axios.post(
        "/api/resident/update",
        {
          values: value,
          organization_id: organization_id,
          resident_id: value._id
        },
        generateToken()[1],
        { cancelToken }
      );
    } catch (error) {
      console.log(error);
      message.error("Error!! Please try again later!!");
    }
    setLoading(false);
  };

  const getAllResident = async () => {
    try {
      await axios
        .post("/api/resident/getAll", { organization_id, fields: ["firstname", "lastname"] }, generateToken()[1], {
          cancelToken,
        })
        .then((res) => {
          const data = res.data;
          setResidentList(data);
        });

      return () => {
        source.cancel();
      };
    } catch (error) {
      message.error("Could not fetch data from server!!");
    }
  };

  const getAllPurok = async () => {
    await axios.post(
      "/api/purok/getAll",
      { organization_id: organization_id },
      generateToken()[1],
      { cancelToken }
    )
      .then((result) => {
        setPurokList(result.data)
      })
  }

  const getResident = async (resident_id) => {
    console.log("resident_id", resident_id)
    try {
      const query = await axios
        .post("/api/resident/get", { organization_id, resident_id }, generateToken()[1], {
          cancelToken,
        })

        return query
    } catch (error) {
      message.error("Could not fetch data from server!!");
    }
  }


  //UseEffect
  useEffect(() => {
    if (mode == "EDIT") {
      getHousehold();
    }

    getAllResident();
    getAllPurok()
  }, []);

  useEffect(() => {
    NewHouseholdFormRef.current.resetFields();
  }, [householdInitialVal]);

  useEffect(() => {
    if (householdMemberInitialVal.importResident == true) {
      NewMemberFormRef.current.resetFields();
      message.success("Success, resident data has been imported");
    }

    else if (householdMemberInitialVal.importResident == false) {
      NewMemberFormRef.current.resetFields();
    }

  }, [householdMemberInitialVal]);

  useEffect(() => {
    console.log("householdMemberList", householdMemberList)
  }, [householdMemberList]);

  //Household Member Modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    NewMemberFormRef.current.submit();
    // setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setHouseholdMemberInitialVal(householdMemberDefault);
  };

  //Household Member Drawer
  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  //Resident Import Modal
  const showImportResidentModal = () => {
    setIsImportResidentModalVisible(true);
  };

  const handleImportResidentModalOk = () => {
    NewMemberFormRef.current.resetFields();
    setIsImportResidentModalVisible(false);
  };

  const handleImportResidentModalCancel = () => {
    setIsImportResidentModalVisible(false);
    // formInitialVal(defaultVar) Reset the form
  };

  const onDrawerClose = () => {
    setIsDrawerVisible(false);
    setHouseholdMemberInitialVal(householdMemberDefault);
  };

  //Function
  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item
        key={1}
        onClick={() => {
          editHouseholdMember(row);
        }}
      >
        <EditOutlined />
        <span className="ml-2">Edit</span>
      </Menu.Item>
      <Menu.Item
        key={2}
        onClick={() => {
          deleteHouseholdMember(row);
        }}
      >
        <DeleteOutlined />
        <span className="ml-2" style={{ color: "black" }}>
          Delete
        </span>
      </Menu.Item>
    </Menu>
  );

  const drawerFooter = () => {
    return (
      <Button
        type="primary"
        style={{ float: "right" }}
        onClick={() => {
          handleOk();
        }}
      >
        Submit
      </Button>
    );
  };

  // function for handling drawer and modal
  const handlePopUp = (action) => {
    const screenWidth = window.innerWidth;

    if (screenWidth > 480) {
      showModal();
    }

    if (screenWidth <= 480) {
      showDrawer();
    }

    if (action != null) {
      setMemberModalAction(action)
    }
  };

  const editHouseholdMember = (row) => {
    var data = { ...row };
    setHouseholdMemberInitialVal({ ...householdMemberInitialVal, ...data });

    handlePopUp("edit");
  };

  const deleteHouseholdMember = (row) => {
    var currentHouseholdMemberList = [...householdMemberList];
    var objIndex = currentHouseholdMemberList.findIndex(
      (obj) => obj._id == row._id
    );
    currentHouseholdMemberList.splice(objIndex, 1);
    setHouseholdMemberList(currentHouseholdMemberList);

    message.success("Deleted household members");
  };

  const onFinishMember = (value) => {
    console.log("value", value)
    // if member is new
    if (memberModalAction == "add") {
      setHouseholdMemberList([...householdMemberList, value]);
      message.success("Success, New Household Member added.");
    }

    // if member is edited
    if (memberModalAction == "edit") {
      var currentHouseholdMemberList = [...householdMemberList];
      var objIndex = currentHouseholdMemberList.findIndex(
        (obj) => obj._id == value._id
      );
      currentHouseholdMemberList[objIndex] = value;
      // console.log(currentHouseholdMemberList)
      setHouseholdMemberList(currentHouseholdMemberList);

      message.success("Success, Household Member data has been updated.");
    }

    updateResident(value)


    setIsModalVisible(false);
    setIsDrawerVisible(false);
    setHouseholdMemberInitialVal(householdMemberDefault);
  };

  const onFinishHouseHoldForm = (value) => {
    if (mode == "ADD") {
      onFinishAddHousehold(value);
    }

    if (mode == "EDIT") {
      value._id = household_id;
      onFinishUpdateHousehold(value);
    }
  };

  const onFinishAddHousehold = (value) => {
    // (household, householdMembers)
    createHousehold(value, householdMemberList);

    message.success("Success, new household has been added.");
    history.replace(`/app/${organization_id}/residents/household/list`);
  };

  const onFinishUpdateHousehold = (value) => {
    updateHousehold(value, householdMemberList)
    message.success("Success, household data has been updated.");
    history.replace(`/app/${organization_id}/residents/household/list`)
  };

  const importResidentAsMember = (key) => {
    if (key != undefined) {

      const resident = residentList[key];

      getResident(resident.resident_id).then((res) => {

        var data = res.data
        console.log("resident from axios", data)

        setHouseholdMemberInitialVal({
          ...householdMemberInitialVal,
          _id: data.resident_id,
          firstname: data.firstname,
          lastname: data.lastname,
          birthday: moment(new Date(data.birthday)),
          age: computeAge(data.birthday),
          occupation: data.occupation,
          civil_status: data.civil_status,
          blood_type: data.blood_type,
          ofw: data.ofw,
          illness: data.illness,
          importResident: true,
        });
      })
    }

    else {
      setHouseholdMemberInitialVal({
        ...householdMemberInitialVal,
        first_name: null,
        first_name: null,
        last_name: null,
        birthday: null,
        age: null,
        importResident: false,
        ...householdMemberDefault
      })
    }
  };

  const printTitle = () => {
    if (mode == "ADD") {
      return <h1>Add Household</h1>;
    }
    if (mode == "EDIT") {
      return <h1>Manage Household</h1>;
    }
  };

  const handleConfirmMessage = () => {
    if (mode == "ADD") {
      return "Data you've entered will be gone."
    }
    if (mode == "EDIT") {
      return "Any unsaved changes will be gone."
    }
  };

  return (
    <div>
      <Card>
        <Row justify="space-between">
          <Col>{printTitle()}</Col>
          <Col className="mt-2">
            <Space>
              <ConfirmButton
                type="warning"
                modalTitle="Are you sure you want to leave this page?"
                modalContent={handleConfirmMessage()}
                text="Back"
                handleOk={() => history.replace(`/app/${organization_id}/residents/household/list`)}
                loading={loading}
              />
              <Button
                type="primary"
                onClick={() => {
                  NewHouseholdFormRef.current.submit();
                }}
                loading={loading}
              >
                Submit
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      <Form
        name="household_form"
        onFinish={onFinishHouseHoldForm}
        ref={NewHouseholdFormRef}
        initialValues={householdInitialVal}
      >
        <Card title={<h1>Household Info</h1>} loading={loading}>
          <HouseholdForm purokList={purokList} />
        </Card>
      </Form>

      <Card >
        <Row justify="space-between">
          <Col>
            <h1>Household Members</h1>
          </Col>

          <Col>
            <Button
              type="primary"
              onClick={() => handlePopUp("add")}
              loading={loading}
            >
              Add Member
            </Button>
          </Col>
        </Row>

        <Table
          columns={ResidentTableColumns}
          dataSource={householdMemberList}
          rowKey={"_id"}
          scroll={{ x: "max-content" }}
          loading={loading}
        />

      </Card>

      <Modal
        title="New Household Member Information"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={"Submit"}
        destroyOnClose={true}
      >
        {isModalVisible && (
          <Form
            name="new_household_member_form"
            onFinish={onFinishMember}
            ref={NewMemberFormRef}
            initialValues={householdMemberInitialVal}
          >
            <NewHouseholdMemberForm
              residentList={residentList}
              importResidentAsMember={importResidentAsMember}
              memberModalAction={memberModalAction}
            />
          </Form>
        )}
      </Modal>

      <Drawer
        title="New Household Member Information"
        placement="right"
        onClose={onDrawerClose}
        visible={isDrawerVisible}
        width={"100%"}
        height={"100%"}
        footer={drawerFooter()}
      >
        {isDrawerVisible && (
          <Form
            name="new_household_member_form"
            onFinish={onFinishMember}
            ref={NewMemberFormRef}
            initialValues={householdMemberInitialVal}
          >
            <NewHouseholdMemberForm residentList={residentList} importResidentAsMember={importResidentAsMember} />
          </Form>
        )}
      </Drawer>

      <Modal
        title="Choose Resident"
        visible={isImportResidentModalVisible}
        onOk={handleImportResidentModalOk}
        onCancel={handleImportResidentModalCancel}
        okText={"Submit"}
        destroyOnClose={true}
      >
        {isImportResidentModalVisible && "Import resident"}
      </Modal>
    </div>
  );
};

export default ManageHousehold;
