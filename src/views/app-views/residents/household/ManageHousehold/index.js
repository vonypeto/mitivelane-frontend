import { React, useEffect, useState, useRef, createRef, } from 'react'
import { useParams, useHistory } from "react-router-dom";
import { Card, Form, Input, InputNumber, Select, Row, Col, Table, Menu, Button, Modal, message } from "antd";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import axios from 'axios';
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
  const [householdMemberList, sethouseholdMemberList] = useState([])
  const [householdInitialVal, sethouseholdInitialVal] = useState(householdDefault)
  const [householdMemberInitialVal, sethouseholdMemberInitialVal] = useState(householdMemberDefault)
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    sethouseholdMemberInitialVal(householdMemberDefault)
  };

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

  const editHouseholdMember = (row) => {
    console.log("row", row)
    console.log(householdMemberInitialVal)
    sethouseholdMemberInitialVal({...householdMemberInitialVal, ...row})
    setIsModalVisible(true)
    
  }

  const deleteHouseholdMember = (row) => {
    var currentHouseholdMemberList = [...householdMemberList]
    var objIndex = currentHouseholdMemberList.findIndex((obj => obj.id == row.id));
    currentHouseholdMemberList.splice(objIndex, 1); 
    sethouseholdMemberList(currentHouseholdMemberList)
    message.success("Deleted household members")
  }

  const onFinishAddMember = (value) => {
    // if member is new
    if (value.id == null) {
      value.action = "added"
      value.id = householdMemberList.length
      console.log("Adding new member", value.id)
      sethouseholdMemberList([...householdMemberList, value])
      setIsModalVisible(false);
    }
    // if member is edited
    else {
      value.action = "edited"
      console.log("Existing member", value.id)
      var currentHouseholdMemberList = [...householdMemberList]
      var objIndex = currentHouseholdMemberList.findIndex((obj => obj.id == value.id));
      currentHouseholdMemberList[objIndex] = value
      console.log(currentHouseholdMemberList)
      sethouseholdMemberList(currentHouseholdMemberList)
      setIsModalVisible(false)
    }
  }

  const onFinishAddHousehold = (value) => {
    console.log("Adding new household", value)
    // (household, householdMembers)
    createHousehold(value, householdMemberList)
    message.success("Success, new household has been added.")
    history.push(`/app/${barangay_id}/residents/household/list`)
    //
  }

  return (
    <div>
      <Card >
        {mode == "ADD" &&
          <h1>Add Household</h1>
        }

        {mode == "EDIT" &&
          <div>
            <h1>Manage Household</h1>
            <p>ManageHousehold: {household_id}</p>
          </div>
        }
        <p>barangay_id: {barangay_id}</p>
        <Button
          type='primary'
          style={{float:"right"}}
          onClick={() => {NewHouseholdFormRef.current.submit()}}
        >
          Submit
        </Button>
      </Card>

      <Form
        name='household_form'
        onFinish={onFinishAddHousehold}
        ref={NewHouseholdFormRef}
        initialValues={householdInitialVal}
      >
        <Card title={<h1>Household Info</h1>}>
          <HouseholdForm />
        </Card>

      </Form>

      <Card
        title={<h1>Household Members</h1>}
        extra={
          <Button
            type='primary'
            onClick={showModal}
          >
            Add Member
          </Button>
        }
      >
        <Table columns={ResidentTableColumns} dataSource={householdMemberList} rowKey={"id"} />
        <Button
            type='primary'
            onClick={() => {console.log(householdMemberList)}}
          >
            Show Member
          </Button>
      </Card>

      <Modal title="New Household Member Information" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText={"Submit"} destroyOnClose={true}>
        <Form
          name='new_household_member_form'
          onFinish={onFinishAddMember}
          ref={NewMemberFormRef}
          initialValues={householdMemberInitialVal}
        >
          <NewHouseholdMemberForm />
        </Form>
      </Modal>
    </div>
  )
}

export default ManageHousehold