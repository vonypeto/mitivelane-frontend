import { React, useEffect, useState, useRef, createRef } from 'react'
import { useParams } from "react-router-dom";
import { Card, Form, Input, InputNumber, Select, Row, Col, Table, Menu, Button, Modal } from "antd";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";

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

  //Initialize
  const { barangay_id, mode } = props
  const { household_id } = useParams();

  const ResidentTableColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      key: "birthday",
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

  //State
  const [householdMemberList, sethouseholdMemberList] = useState(ResidentTableData)
  const [isModalVisible, setIsModalVisible] = useState(false);

  //Ref
  const NewMemberFormRef = createRef()

  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item key={1}>
        <EditOutlined />
        <span className="ml-2">Edit</span>
      </Menu.Item>
      <Menu.Item key={2} onClick={() => { deleteHousehold(row) }}>
        <DeleteOutlined />
        <span className="ml-2" style={{ color: "black" }}>Delete</span>
      </Menu.Item>
    </Menu>
  );

  //Modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    NewMemberFormRef.current.submit()
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinishAddMember = (value) => {
    console.log("Adding new member", value)
  }

  return (
    <div>
      <Card>
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
      </Card>

      <Form
        name='household_form'
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
        <Table columns={ResidentTableColumns} dataSource={householdMemberList} />
      </Card>

      <Modal title="New Household Member Information" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText={"Submit"}>
        <Form
          name='new_household_member_form'
          onFinish={onFinishAddMember}
          ref={NewMemberFormRef}
        >
          <NewHouseholdMemberForm/>
        </Form>
      </Modal>
    </div>
  )
}

export default ManageHousehold