import { React, useEffect, useState, useRef, createRef, } from 'react'
import { useParams, useHistory } from "react-router-dom";
import { Card, Form, Input, InputNumber, Select, Row, Col, Table, Menu, Button, Modal, Space, message } from "antd";

import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import axios from 'axios';
import moment from 'moment'
import { useAuth } from "contexts/AuthContext";

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

import NewAreaForm from "./NewAreaForm"

const PurokArea = (props) => {
  //Initialize
  const { barangay_id } = props

  //Import
  const source = axios.CancelToken.source();
  const cancelToken = source.token;
  const history = useHistory();
  const { generateToken, currentBarangay } = useAuth();

  const purokColumn = [
    {
      title: "Purok",
      dataIndex: "name",
      key: "name",
      width: "50%"
    },
    {
      title: "Date added",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, data) => (
        <div className="d-flex align-items-center">
          <span className="ml-2">
            {new Date(data.createdAt).toDateString().split(' ').slice(1).join(' ')}
          </span>
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      width: "20px",
      render: (_, elm) => (
        <div className="text-right">
          <EllipsisDropdown menu={dropdownMenu(elm)} />
        </div>
      ),
    }
  ]

  const tempData = [
    {
      name: "Unahan",
      createdAt: "2022-04-06T07:36:41.475Z",
      _id: 1
    },
    {
      name: "Gitna",
      createdAt: "2022-04-06T07:36:41.475Z",
      _id: 2
    },
    {
      name: "Dulo",
      createdAt: "2022-04-06T07:36:41.475Z",
      _id: 3
    },
    {
      name: "Kahit Saan",
      createdAt: "2022-04-06T07:36:41.475Z",
      _id: 4
    },
  ]

  //Ref
  const NewAreaFormRef = createRef()

  //State
  const [showAreaModal, setShowAreaModal] = useState(false)
  const [purokList, setPurokList] = useState([])
  const [purokInitialVal, setPurokInitialVal] = useState({})
  const [submitting, setSubmitting] = useState(false)

  //UseEffect 
  useEffect(() => {
    getAreas()
  }, [])


  //Axios
  const addNewArea = async (newArea) => {
    const request = await axios.post(
      "/api/purok/add",
      { newArea, barangay_id: barangay_id },
      generateToken()[1],
      { cancelToken }
    );

    const data = request.data
    setPurokList([...purokList, data])
  }

  const getAreas = async () => {
    const request = await axios.post(
      "/api/purok/getAll",
      { barangay_id: barangay_id },
      generateToken()[1],
      { cancelToken }
    );

    setPurokList(request.data)
  }

  const deleteArea = async (area_id) => {
    const request = await axios.post(
      "/api/purok/delete",
      { barangay_id: barangay_id, area_id },
      generateToken()[1],
      { cancelToken }
    );
  }

  const updateArea = async (newAreaData) => {
    const request = await axios.post(
      "/api/purok/update",
      { barangay_id: barangay_id, newAreaData },
      generateToken()[1],
      { cancelToken }
    ); 
  }

  //Popup
  const handlePopUp = () => {
    setPurokInitialVal({ action: "added" })
    setShowAreaModal(true)
  }

  // Modal Function
  const handleOk = () => {
    NewAreaFormRef.current.submit()
  };

  const handleCancel = () => {
    setShowAreaModal(false);
    setPurokInitialVal({})
  };

  //Components
  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item key={1} onClick={() => { editPurok(row) }}>
        <EditOutlined />
        <span className="ml-2">Edit</span>
      </Menu.Item>
      <Menu.Item key={2} onClick={() => { deletePurok(row) }}>
        <DeleteOutlined />
        <span className="ml-2" style={{ color: "black" }}>Delete</span>
      </Menu.Item>
    </Menu>
  );

  //Function
  const editPurok = (row) => {
    setPurokInitialVal({ 'name': row.name, action: "edited", purok_id: row.purok_id})
    setShowAreaModal(true)
  }

  const deletePurok = (row) => {
    console.log("deleting purok")
    deleteArea(row.purok_id)

    const currentpurokList = [...purokList]
    var objIndex = currentpurokList.findIndex((obj => obj.purok_id == row.purok_id));
    currentpurokList.splice(objIndex, 1);
    setPurokList(currentpurokList)

    message.success("Success, area has been deleted")
  }

  // Form Function
  const onFinishAddArea = (value) => {
    value.createdAt = Date.now()

    if (value.action == "added") {
      addNewArea(value)
      message.success("New Area has been added.")
    }

    if (value.action == "edited") {
      updateArea(value)

      const currentpurokList = [...purokList]
      var objIndex = currentpurokList.findIndex((obj => obj.purok_id == value.purok_id));
      currentpurokList[objIndex] = value
      setPurokList(currentpurokList)
      message.success("Area data has been updated.")
    }

    setShowAreaModal(false);
  }

  return (
    <div>
      <p>PurokArea: {barangay_id}</p>

      <Card>

        <Row justify="space-between">
          <Col>
            <h1>Purok/Area</h1>
          </Col>

          <Col>
            <Button
              type='primary'
              onClick={() => handlePopUp()}
            >
              Add Area
            </Button>
          </Col>
        </Row>

        <Table
          columns={purokColumn}
          dataSource={purokList}
          rowKey={"purok_id"}
          scroll={{ x: "max-content" }}
        >
        </Table>
      </Card>

      <Modal title="New Area Information" visible={showAreaModal} onOk={handleOk} onCancel={handleCancel} okText={"Submit"} destroyOnClose={true}>
        <Form
          name='new_area_form'
          onFinish={onFinishAddArea}
          ref={NewAreaFormRef}
          initialValues={purokInitialVal}
        // initialValues={householdMemberInitialVal}
        >
          <NewAreaForm />
        </Form>
      </Modal>
    </div>
  )
}

export default PurokArea