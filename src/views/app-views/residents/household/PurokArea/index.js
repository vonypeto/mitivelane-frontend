import { React, useEffect, useState, useRef, createRef, } from 'react'
import { useParams, useHistory } from "react-router-dom";
import { Card, Form, Input, InputNumber, Select, Row, Col, Table, Menu, Button, Modal, Space, message } from "antd";

import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import axios from 'axios';
import moment from 'moment'
import { useAuth } from "contexts/AuthContext";

import NewAreaForm from "./NewAreaForm"

const PurokArea = (props) => {
  //Initialize
  const { barangay_id } = props

  const ResidentTableColumns = [
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
  const [purokList, setPurokList] = useState(tempData)

  //UseEffect 

  //Axios
  const addNewArea = (newArea) => {
    axios.post("")
  }

  // Modal Function
  const handleOk = () => {
    NewAreaFormRef.current.submit()
  };

  const handleCancel = () => {
    setShowAreaModal(false);
  };

  // Form Function
  const onFinishAddArea = (value) => {
    value.createdAt = Date.now()
    message.success("New Area has been added.")

    setPurokList([...purokList, value])
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
              onClick={() => setShowAreaModal(true)}
            >
              Add Area
            </Button>
          </Col>
        </Row>

        <Table
          columns={ResidentTableColumns}
          dataSource={purokList}
          rowKey={"_id"}
          scroll={{ x: "max-content" }}
        >
        </Table>
      </Card>

      <Modal title="New Area Information" visible={showAreaModal} onOk={handleOk} onCancel={handleCancel} okText={"Submit"} destroyOnClose={true}>
        <Form
          name='new_area_form'
          onFinish={onFinishAddArea}
          ref={NewAreaFormRef}
          // initialValues={householdMemberInitialVal}
        >
          <NewAreaForm />
        </Form>
      </Modal>
    </div>
  )
}

export default PurokArea