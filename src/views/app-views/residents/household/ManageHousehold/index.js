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

//Form
import HouseholdForm from "./HouseholdForm";
import NewHouseholdMemberForm from "./NewHouseholdMemberForm";

import {
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

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
      dataIndex: "name",
      key: "name",
      render: (_, data) => (
        <div className="d-flex align-items-center">
          <span className="ml-2">{`${data.first_name} ${data.last_name}`}</span>
        </div>
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
  const [deletedMembers, setDeletedMembers] = useState([]);
  const [purokList, setPurokList] = useState([]);
  const [residentList, setResidentList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [
    isImportResidentModalVisible,
    setIsImportResidentModalVisible,
  ] = useState(false);

  //Ref
  const NewMemberFormRef = createRef();
  const NewHouseholdFormRef = createRef();

  //Axios
  const createHousehold = async (household, householdMembers) => {
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
        member.isOld = true;
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
    deletedMembers
  ) => {
    try {
      await axios.post(
        "/api/household/update",
        {
          household,
          householdMembers,
          deletedMembers,
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

  const getAllResident = async () => {
    try {
      await axios
        .post("/api/resident/getAll", { organization_id }, generateToken()[1], {
          cancelToken,
        })
        .then((res) => {
          const data = res.data;
          data.map((data) => {
            data.birthday = moment(new Date(data.birthday));
          });
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
  }, [householdMemberList]);

  useEffect(() => {
    console.log("deletedMembers", deletedMembers);
  }, [deletedMembers]);

  useEffect(() => {
    if (householdMemberInitialVal.importResident == true) {
      NewMemberFormRef.current.resetFields();
      message.success("Success, resident data has been imported");
    }
  }, [householdMemberInitialVal]);

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
    setHouseholdMemberInitialVal({ first_name: "test" });
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
      setHouseholdMemberInitialVal({ ...householdMemberInitialVal, action });
    }
  };

  const editHouseholdMember = (row) => {
    var data = { ...row };
    data.action = "edited";
    setHouseholdMemberInitialVal({ ...householdMemberInitialVal, ...data });

    handlePopUp();
  };

  const deleteHouseholdMember = (row) => {
    var currentHouseholdMemberList = [...householdMemberList];
    var objIndex = currentHouseholdMemberList.findIndex(
      (obj) => obj._id == row._id
    );
    currentHouseholdMemberList.splice(objIndex, 1);
    setHouseholdMemberList(currentHouseholdMemberList);

    if (row.isOld == true) {
      setDeletedMembers([...deletedMembers, row._id]);
    }

    message.success("Deleted household members");
  };

  const onFinishAddMember = (value) => {
    setLoading(true);

    if (value.isOld == null) {
      value.isOld = false;
    }

    // if member is new
    if (value.action == "added") {
      value._id = householdMemberList.length;
      // console.log("Adding new member", value._id)
      setHouseholdMemberList([...householdMemberList, value]);
      message.success("Success, New Household Member added.");
    }

    // if member is edited
    if (value.action == "edited") {
      // console.log("Existing member", value._id)
      var currentHouseholdMemberList = [...householdMemberList];
      var objIndex = currentHouseholdMemberList.findIndex(
        (obj) => obj._id == value._id
      );
      currentHouseholdMemberList[objIndex] = value;
      // console.log(currentHouseholdMemberList)
      setHouseholdMemberList(currentHouseholdMemberList);

      message.success("Success, Household Member data has been updated.");
    }

    setIsModalVisible(false);
    setIsDrawerVisible(false);
    setHouseholdMemberInitialVal(householdMemberDefault);
    setLoading(false);
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
    setLoading(true);
    // (household, householdMembers)
    createHousehold(value, householdMemberList);

    message.success("Success, new household has been added.");
    history.push(`/app/${organization_id}/residents/household/list`);
  };

  const onFinishUpdateHousehold = (value) => {
    setLoading(true);
    // (household, householdMembers, deletedMemberArray)
    updateHousehold(value, householdMemberList, deletedMembers);
    message.success("Success, household data has been updated.");
    // history.push(`/app/${organization_id}/residents/household/list`)
  };

  const importResidentAsMember = (key) => {
    const resident = residentList[key];
    console.log("resident", resident);

    setHouseholdMemberInitialVal({
      ...householdMemberInitialVal,
      first_name: resident.firstname,
      last_name: resident.lastname,
      birthday: resident.birthday,
      age: resident.age,
      occupation: resident.occupation,
      blood_type: resident.blood_type,
      civil_status: resident.civil_status,
      blood_type: resident.blood_type,
      importResident: true,
    });
  };

  const printTitle = () => {
    if (mode == "ADD") {
      return <h1>Add Household</h1>;
    }
    if (mode == "EDIT") {
      return <h1>Manage Household</h1>;
    }
  };

  return (
    <div>
      <Card>
        <Row justify="space-between">
          <Col>{printTitle()}</Col>
          <Col>
            <Button
              type="primary"
              style={{ float: "right" }}
              onClick={() => {
                NewHouseholdFormRef.current.submit();
              }}
              loading={loading}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Card>

      <Form
        name="household_form"
        onFinish={onFinishHouseHoldForm}
        ref={NewHouseholdFormRef}
        initialValues={householdInitialVal}
      >
        <Card title={<h1>Household Info</h1>}>
          <HouseholdForm purokList={purokList}/>
        </Card>
      </Form>

      <Card>
        <Row justify="space-between">
          <Col>
            <h1>Household Members</h1>
          </Col>

          <Col>
            <Button
              type="primary"
              onClick={() => handlePopUp("added")}
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
        />

        {/* <Button
          type='primary'
          onClick={() => { console.log(householdMemberList) }}
        >
          Show Member
        </Button> */}
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
            onFinish={onFinishAddMember}
            ref={NewMemberFormRef}
            initialValues={householdMemberInitialVal}
          >
            <NewHouseholdMemberForm
              residentList={residentList}
              importResidentAsMember={importResidentAsMember}
              NewMemberFormRef={NewMemberFormRef}
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
            onFinish={onFinishAddMember}
            ref={NewMemberFormRef}
            initialValues={householdMemberInitialVal}
          >
            <NewHouseholdMemberForm residentList={residentList} />
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
        {isImportResidentModalVisible && "Import resident hell yeah"}
      </Modal>
    </div>
  );
};

export default ManageHousehold;
