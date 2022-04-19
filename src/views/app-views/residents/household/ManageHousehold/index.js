import { React, useEffect, useState, useRef, createRef, } from 'react'
import { useParams, useHistory } from "react-router-dom";
import { Card, Form, Input, InputNumber, Select, Row, Col, Table, Menu, Button, Modal, Space, Drawer, message } from "antd";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import axios from 'axios';
import moment from 'moment'
import { useAuth } from "contexts/AuthContext";

//Form
import HouseholdForm from './HouseholdForm';
import NewHouseholdMemberForm from './NewHouseholdMemberForm';

import {
  EyeOutlined,
  EllipsisOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
  FileExcelOutlined,
  PrinterOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

const ManageHousehold = (props) => {
  //Import 
  const source = axios.CancelToken.source();
  const cancelToken = source.token;
  const history = useHistory();
  const { generateToken, currentBarangay } = useAuth();

  //Initialize
  const { barangay_id, mode } = props
  const { household_id } = useParams();

  const ResidentTableColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, data) => (
        <div className="d-flex align-items-center">
          <span className="ml-2">
            {(`${data.first_name} ${data.last_name}`)}
          </span>
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
            {new Date(data.birthday).toDateString().split(' ').slice(1).join(' ')}
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
    }
  ];

  const ResidentTableData = [
    {
      id: "1",
      name: "John Smith",
      birthday: "12-30-1957",
      age: "69",
      sex: "Male",
      blood_type: "B",
      civil_status: "Married",
      educational_attainment: "High School Grad.",
      occupation: "n/a",
      ofw: "no",
      illness: "none",
    },
    {
      id: "2",
      name: "Michael Myers",
      birthday: "12-30-1980",
      age: "41",
      sex: "Male",
      blood_type: "A",
      civil_status: "Single",
      educational_attainment: "College Grad.",
      occupation: "n/a",
      ofw: "no",
      illness: "none",
    },
    {
      id: "3",
      name: "Juan Dela Cruz",
      birthday: "12-30-1990",
      age: "31",
      sex: "Male",
      blood_type: "0",
      civil_status: "Married",
      educational_attainment: "College Grad.",
      occupation: "Computer Engineer",
      ofw: "Japan",
      illness: "none",
    },
    {
      id: "4",
      name: "James Robles",
      birthday: "12-30-1960",
      age: "61",
      sex: "Male",
      blood_type: "AB",
      civil_status: "Married",
      educational_attainment: "Elementary School Grad.",
      occupation: "Freelance",
      ofw: "no",
      illness: "none",
    },
  ];

  const householdDefault = {
    house_status: "owned",
    water_source: "pipe",
    toilet_type: "sealed",
    waste_management: "collect"
  }

  const householdMemberDefault = {
    blood_type: "A",
    educational_attainment: "Elementary School Graduate",
    civil_status: "Single"
  }

  //State
  const [householdMemberList, setHouseholdMemberList] = useState([])
  const [householdInitialVal, setHouseholdInitialVal] = useState(householdDefault)
  const [householdMemberInitialVal, setHouseholdMemberInitialVal] = useState(householdMemberDefault)
  const [deletedMembers, setDeletedMembers] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [loading, setLoading] = useState(false);


  //Ref
  const NewMemberFormRef = createRef()
  const NewHouseholdFormRef = createRef()

  //Axios
  const createHousehold = async (household, householdMembers) => {
    await axios.post(
      "/api/household/add",
      { household, householdMembers, barangay_id: barangay_id },
      generateToken()[1],
      { cancelToken }
    );
  }

  const getHousehold = async () => {
    const request = await axios.post(
      "/api/household/get",
      { household_id: household_id, barangay_id: barangay_id },
      generateToken()[1],
      { cancelToken }
    );

    const householdData = request.data
    const householdMembersData = householdData.household_members

    householdMembersData.map((member) => {
      member.birthday = moment(new Date(member.birthday))
      member.isOld = true

    })

    console.log(householdData)
    console.log(householdMembersData)

    setHouseholdInitialVal(householdData)
    setHouseholdMemberList(householdMembersData)
  }

  const updateHousehold = async (household, householdMembers, deletedMembers) => {
    await axios.post(
      "/api/household/update",
      { household, householdMembers, deletedMembers, barangay_id: barangay_id },
      generateToken()[1],
      { cancelToken }
    );
  }

  //UseEffect 
  useEffect(() => {
    if (mode == "EDIT") {
      getHousehold()
    }
  }, [])

  useEffect(() => {
    NewHouseholdFormRef.current.resetFields()
  }, [householdMemberList])

  useEffect(() => {
    console.log("deletedMembers", deletedMembers)
  }, [deletedMembers])


  //Modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    NewMemberFormRef.current.submit()
    // setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setHouseholdMemberInitialVal(householdMemberDefault)
  };

  //Drawer
  const showDrawer = () => {
    setIsDrawerVisible(true);
  }

  const onDrawerClose = () => {
    setIsDrawerVisible(false);
    setHouseholdMemberInitialVal(householdMemberDefault)
  }

  //Function
  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item key={1} onClick={() => { editHouseholdMember(row) }}>
        <EditOutlined />
        <span className="ml-2">Edit</span>
      </Menu.Item>
      <Menu.Item key={2} onClick={() => { deleteHouseholdMember(row) }}>
        <DeleteOutlined />
        <span className="ml-2" style={{ color: "black" }}>Delete</span>
      </Menu.Item>
    </Menu>
  );

  const drawerFooter = () => {
    return (
      <Button 
      type='primary'
      style={{float: "right"}}
      onClick={() => {handleOk()}} 
      >
      
        Submit
      </Button>
    )
  };

  // function for handling drawer and modal
  const handlePopUp = (action) => {
    const screenWidth = window.innerWidth
    console.log(screenWidth)

    if (screenWidth > 480) {
      showModal()
    }

    if (screenWidth <= 480) {
      showDrawer()
    }

    if (action != null) {
      setHouseholdMemberInitialVal({ ...householdMemberInitialVal, action })
    }

  }

  const editHouseholdMember = (row) => {
    var data = { ...row }
    data.action = "edited"
    setHouseholdMemberInitialVal({ ...householdMemberInitialVal, ...data })

    handlePopUp()
  }

  const deleteHouseholdMember = (row) => {
    var currentHouseholdMemberList = [...householdMemberList]
    var objIndex = currentHouseholdMemberList.findIndex((obj => obj._id == row._id));
    currentHouseholdMemberList.splice(objIndex, 1);
    setHouseholdMemberList(currentHouseholdMemberList)

    if (row.isOld == true) {
      setDeletedMembers([...deletedMembers, row._id])
    }

    message.success("Deleted household members")
  }

  const onFinishAddMember = (value) => {
    setLoading(true)

    if (value.isOld == null) {
      value.isOld = false
    }

    // if member is new
    if (value.action == "added") {
      value._id = householdMemberList.length
      console.log("Adding new member", value._id)
      setHouseholdMemberList([...householdMemberList, value])
      message.success("Success, New Household Member added.")
    }
    // if member is edited
    if (value.action == "edited") {
      console.log("Existing member", value._id)
      var currentHouseholdMemberList = [...householdMemberList]
      var objIndex = currentHouseholdMemberList.findIndex((obj => obj._id == value._id));
      currentHouseholdMemberList[objIndex] = value
      console.log(currentHouseholdMemberList)
      setHouseholdMemberList(currentHouseholdMemberList)

      message.success("Success, Household Member data has been updated.")
    }

    setIsModalVisible(false)
    setIsDrawerVisible(false)
    setHouseholdMemberInitialVal(householdMemberDefault)
    setLoading(false)
  }

  const onFinishHouseHoldForm = (value) => {
    if (mode == "ADD") {
      onFinishAddHousehold(value)
    }

    if (mode == "EDIT") {
      value._id = household_id
      onFinishUpdateHousehold(value)
    }
  }

  const onFinishAddHousehold = (value) => {
    setLoading(true)
    // (household, householdMembers)
    createHousehold(value, householdMemberList)

    message.success("Success, new household has been added.")
    // history.push(`/app/${barangay_id}/residents/household/list`)
  }

  const onFinishUpdateHousehold = (value) => {
    setLoading(true)
    // (household, householdMembers, deletedMemberArray)
    updateHousehold(value, householdMemberList, deletedMembers)
    message.success("Success, household data has been updated.")
    // history.push(`/app/${barangay_id}/residents/household/list`)
  }

  const importResidentAsMember = (test) => {
    message.success("TBA pa hahahhaha, nagiipon pa ng sipag ang gagawa.")
    console.log(test)
  }

  const printTitle = () => {

    if (mode == "ADD") {
      return <h1>Add Household</h1>
    }
    if (mode == "EDIT") {
      return <h1>Manage Household</h1>
    }

  }

  return (
    <div>
      <Card >

        <Row justify='space-between'>
          <Col>
            {printTitle()}
          </Col>
          <Col>
            <Button
              type='primary'
              style={{ float: "right" }}
              onClick={() => { NewHouseholdFormRef.current.submit() }}
              loading={loading}
            >
              Submit
            </Button>
          </Col>
        </Row>

      </Card>

      <Form
        name='household_form'
        onFinish={onFinishHouseHoldForm}
        ref={NewHouseholdFormRef}
        initialValues={householdInitialVal}
      >
        <Card title={<h1>Household Info</h1>}>
          <HouseholdForm />
        </Card>

      </Form>

      <Card>

        <Row justify="space-between">
          <Col>
            <h1>Household Members</h1>
          </Col>

          <Col>
            <Button
              type='primary'
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

      <Modal title="New Household Member Information" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText={"Submit"} destroyOnClose={true}>

      { isModalVisible &&
          <Form
            name='new_household_member_form'
            onFinish={onFinishAddMember}
            ref={NewMemberFormRef}
            initialValues={householdMemberInitialVal}
          >
            <NewHouseholdMemberForm importResidentAsMember={importResidentAsMember} />
          </Form>
      }

      </Modal>

      <Drawer title="New Household Member Information" placement="right" onClose={onDrawerClose} visible={isDrawerVisible} width={"100%"} height={"100%"} footer={drawerFooter()}>
      { isDrawerVisible &&
          <Form
            name='new_household_member_form'
            onFinish={onFinishAddMember}
            ref={NewMemberFormRef}
            initialValues={householdMemberInitialVal}
          >
            <NewHouseholdMemberForm importResidentAsMember={importResidentAsMember} />
            
          </Form>
      }
      </Drawer>
    </div>
  )
}

export default ManageHousehold