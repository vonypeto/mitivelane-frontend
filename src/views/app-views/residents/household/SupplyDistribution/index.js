import { React, useState, useEffect, createRef } from 'react'
import { Row, Col, Table, Card, Button, DatePicker, Modal, Drawer, Form, Menu, message } from 'antd'
import SupplyChart from './SupplyChart'
import SupplyDonut from './SupplyDonut'
import DataDisplayWidget from "components/shared-components/DataDisplayWidget";
import { useParams, useHistory } from "react-router-dom";

import axios from 'axios';
import moment from 'moment'
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import { useAuth } from "contexts/AuthContext";

//Icons
import {
  FaBox,
  FaBoxes,
} from "react-icons/fa";

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

import SupplyGivenForm from './SupplyGivenForm';
import SupplyReceivedForm from './SupplyReceivedForm';


const SupplyDistribution = (props) => {
  const { barangay_id } = props

  //Import
  const source = axios.CancelToken.source();
  const cancelToken = source.token;
  const history = useHistory();
  const { generateToken, currentBarangay } = useAuth();

  //State
  const [isReceiveModalVisible, setisReceiveModalVisible] = useState(false);
  const [isReceiveDrawerVisible, setisReceiveDrawerVisible] = useState(false);
  const [isGivenModalVisible, setIsGivenModalVisible] = useState(false);
  const [isGivenDrawerVisible, setIsGivenDrawerVisible] = useState(false);
  const [supplyGivenList, setSupplyGivenList] = useState([]);
  const [supplyReceivedList, setSupplyReceivedList] = useState([]);
  const [supplyGivenInitialVal, setSupplyGivenInitialVal] = useState({})
  const [supplyReceivedInitialVal, setSupplyReceivedInitialVal] = useState({})
  const [receivedSelectedRowKeys, SetReceivedSelectedRowKeys] = useState(0)
  const [givenSelectedRowKeys, SetGivenSelectedRowKeys] = useState(0)
  const [formAction, setFormAction] = useState('')
  const [submitting, setSubmitting] = useState(false)

  //Ref
  const SupplyGivenFormRef = createRef()
  const SupplyReceivedFormRef = createRef()

  //UseEffect
  useEffect(() => {
    getAllSupplies()
  }, [])

  //Axios
  const getAllSupplies = async () => {
    try {
      const request = await axios.post(
        '/api/supply/getAll',
        { barangay_id },
        generateToken()[1],
        { cancelToken }
      );

      var SupplyGiven = request.data.SupplyGiven
      SupplyGiven.map((data) => {
        data.date = moment(new Date(data.date))
      })

      setSupplyGivenList(SupplyGiven)


    } catch (error) {
      console.log(error)
      message.error("Error in database connection!!")
    }
  }

  const addSupplyGiven = async (newSupplyGiven) => {
    try {
      const request = await axios.post(
        '/api/supply/given/add',
        { newSupplyGiven, barangay_id },
        generateToken()[1],
        { cancelToken }
      );

      const data = request.data
      console.log("data", data)

      newSupplyGiven.supply_given_id = data.supply_given_id
      setSupplyGivenList([...supplyGivenList, newSupplyGiven])
      message.success(" New Supply Given data has been added.")
    } catch (error) {
      console.log(error);
      message.error("Error in database connection!!")
    }
  }

  const updateSupplyGiven = async (values) => {
    try {
      const request = await axios.post(
        '/api/supply/given/update',
        { newSupplyGiven: values, barangay_id },
        generateToken()[1],
        { cancelToken }
      );

      const currentSupplyGivenList = [...supplyGivenList]
      var objIndex = currentSupplyGivenList.findIndex((obj => obj.supply_given_id == values.supply_given_id));
      currentSupplyGivenList[objIndex] = values
      setSupplyGivenList(currentSupplyGivenList)
      message.success("Supply Given Table data has been updated.")

    } catch (error) {
      console.log(error)
      message.error("Error in database connection!!")
    }
  }

  const popSupplyGiven = async (supplyGivenIDs) => {
    try {
      const request = await axios.post(
        '/api/supply/given/delete',
        { supplyGivenIDs, barangay_id },
        generateToken()[1],
        { cancelToken }
      );

      const currentSupplyGivenList = [...supplyGivenList]
      var objIndex = currentSupplyGivenList.findIndex((obj => obj.supply_given_id == supplyGivenIDs));
      currentSupplyGivenList.splice(objIndex, 1);
      setSupplyGivenList(currentSupplyGivenList)
  
      message.success("Success, data has been deleted")
    } catch (error) {
      console.log(error)
      message.error("Error in database connection!!")
    }
  }

  const popSuppliesGiven = async (supplyGivenIDs) => {
    try {
      const request = await axios.post(
        '/api/supply/given/delete',
        { supplyGivenIDs, barangay_id },
        generateToken()[1],
        { cancelToken }
      );

      const currentSupplyGivenList = [...supplyGivenList]

      givenSelectedRowKeys.map((row) => {
        var objIndex = currentSupplyGivenList.findIndex((obj => obj.supply_given_id == row.supply_given_id));
        currentSupplyGivenList.splice(objIndex, 1);
      })

      console.log(currentSupplyGivenList);
      setSupplyGivenList(currentSupplyGivenList)
      message.success("Success, data has been deleted")
    } catch (error) {
      console.log(error)
      message.error("Error in database connection!!")
    }
  }

  //Table
  const SupplyGivenColumns = [
    {
      title: "Household Name",
      dataIndex: "household_name",
      key: "household_name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_, data) => (
        <div className="d-flex align-items-center">
          <span className="ml-2">
            {new Date(data.date).toDateString().split(' ').slice(1).join(' ')}
          </span>
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, elm) => (
        <div className="text-right">
          <EllipsisDropdown menu={dropdownMenuSupplyGiven(elm)} />
        </div>
      ),
    }
  ];

  const SupplyReceivedColumns = [
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_, data) => (
        <div className="d-flex align-items-center">
          <span className="ml-2">
            {new Date(data.date).toDateString().split(' ').slice(1).join(' ')}
          </span>
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, elm) => (
        <div className="text-right">
          <EllipsisDropdown menu={dropdownMenuSupplyReceived(elm)} />
        </div>
      ),
    }
  ];

  //Modal
  const showReceiveModal = () => {
    setisReceiveModalVisible(true);
  };

  const handleReceiveModalOk = () => {
    SupplyReceivedFormRef.current.submit()
    // insert your code here...
  };

  const handleReceiveModalCancel = () => {
    setisReceiveModalVisible(false);
    setSupplyReceivedInitialVal({})
  };

  //Drawer
  const showReceiveDrawer = () => {
    setisReceiveDrawerVisible(true);
  }

  const onReceiveDrawerClose = () => {
    setisReceiveDrawerVisible(false);
    setSupplyReceivedInitialVal({})
  }

  const ReceiveDrawerFooter = () => {
    return (
      <Button
        type='primary'
        style={{ float: 'right' }}
        onClick={() => { handleReceiveModalOk() }}
      >
        Submit
      </Button>
    )
  };

  // function for handling drawer and modal
  const handleReceivePopUp = (action) => {
    setFormAction(action)

    const screenWidth = window.innerWidth

    if (screenWidth > 480) {
      showReceiveModal()
    }

    if (screenWidth <= 480) {
      showReceiveDrawer()
    }
  }

  //Modal
  const showGivenModal = () => {
    setIsGivenModalVisible(true);
  };

  const handleGivenModalOk = () => {
    SupplyGivenFormRef.current.submit()
    // insert your code here...
  };

  const handleGivenModalCancel = () => {
    setIsGivenModalVisible(false);
    setSupplyGivenInitialVal({})
  };

  //Drawer
  const showGivenDrawer = () => {
    setIsGivenDrawerVisible(true);
  }

  const onGivenDrawerClose = () => {
    setIsGivenDrawerVisible(false);
    setSupplyGivenInitialVal({})
  }

  const GivenDrawerFooter = () => {
    return (
      <Button
        type='primary'
        style={{ float: 'right' }}
        onClick={() => { handleGivenModalOk() }}
      >
        Submit
      </Button>
    )
  };

  // Function for handling drawer and modal
  const handleGivenPopUp = (action) => {
    setFormAction(action)

    const screenWidth = window.innerWidth

    if (screenWidth > 480) {
      showGivenModal()
    }

    if (screenWidth <= 480) {
      showGivenDrawer()
    }
  }

  //Function for updateting and deleting Supply Given
  const editSupplyGiven = (row) => {
    console.log(row)
    setSupplyGivenInitialVal({ ...supplyGivenInitialVal, ...row })
    handleGivenPopUp("edited")
  }

  const deleteSupplyGiven = (row) => {
    popSupplyGiven([row.supply_given_id])
  }

  const deleteSuppliesGiven = () => {
      popSuppliesGiven(givenSelectedRowKeys)
  }

  //Function for updatating and deleting Supply Given
  const editSupplyReceived = (row) => {
    row.date = new Date(row.date).toDateString().split(' ').slice(1).join(' ')
    setSupplyReceivedInitialVal({ 'source': row.source, 'amount': row.amount, 'date': row.date, supply_receive_id: row.supply_receive_id })
    handleReceivePopUp("edited")
  }

  const deleteSupplyReceived = (row) => {
    // deleteArea(row.purok_id)

    const currentsupplyReceivedList = [...supplyReceivedList]
    var objIndex = currentsupplyReceivedList.findIndex((obj => obj.supply_received_id == row.supply_received_id));
    currentsupplyReceivedList.splice(objIndex, 1);
    setSupplyReceivedList(currentsupplyReceivedList)

    message.success("Success, data has been deleted")
  }

  const dropdownMenuSupplyGiven = (row) => (
    <Menu>
      <Menu.Item key={1} onClick={() => { editSupplyGiven(row) }}>
        <EditOutlined />
        <span className="ml-2">Edit</span>
      </Menu.Item>
      <Menu.Item key={2} onClick={() => { deleteSupplyGiven(row) }}>
        <DeleteOutlined />
        <span className="ml-2" style={{ color: "black" }}>Delete</span>
      </Menu.Item>
      {givenSelectedRowKeys.length > 0 &&
        <Menu.Item key={3} onClick={() => { deleteSuppliesGiven() }}>
          <DeleteOutlined />
          <span className="ml-2" style={{ color: "black" }}>Delete {`(${givenSelectedRowKeys.length})`}</span>
        </Menu.Item>
      }
    </Menu>
  );

  const dropdownMenuSupplyReceived = (row) => (
    <Menu>
      <Menu.Item key={1} onClick={() => { editSupplyReceived(row) }}>
        <EditOutlined />
        <span className="ml-2">Edit</span>
      </Menu.Item>
      <Menu.Item key={2} onClick={() => { deleteSupplyReceived(row) }}>
        <DeleteOutlined />
        <span className="ml-2" style={{ color: "black" }}>Delete</span>
      </Menu.Item>
    </Menu>
  );

  const onSelectReceivedSupplyChange = (selectedRowKeys, selectedRows) => {
    if (selectedRows.length > 0) {
      let supplyReceiveIDs = []

      selectedRows.map((row) => {
        supplyReceiveIDs.push(row.supply_given_id)
      })

      console.log(supplyReceiveIDs);
      SetReceivedSelectedRowKeys(supplyReceiveIDs)
      message.success(`Selected receive row ${selectedRows.length}`)

    }
  }

  const onSelectGivenSupplyChange = (selectedRowKeys, selectedRows) => {
    if (selectedRows.length > 0) {
      let supplyGivenIDs = []

      selectedRows.map((row) => {
        supplyGivenIDs.push(row.supply_given_id)
      })

      console.log(supplyGivenIDs);
      SetGivenSelectedRowKeys(supplyGivenIDs)
      message.success(`Selected given row ${selectedRows.length}`)
    }
  }

  const onFinishSupplyGivenForm = (values) => {
    console.log(values);

    if (formAction == "added") {
      addSupplyGiven(values)
    }

    if (formAction == "edited") {
      updateSupplyGiven(values)
    }

    setIsGivenModalVisible(false)
    setIsGivenDrawerVisible(false)
    setSupplyGivenInitialVal({})
  }

  const onFinishSupplyReceivedForm = (values) => {
    console.log(values);

    if (formAction == "added") {
      values.supply_receive_id = supplyReceivedList.length + 1
      setSupplyReceivedList([...supplyReceivedList, values])
      message.success(" New Supply Received data has been added.")
    }

    if (formAction == "edited") {

      const currentSupplyReceivedList = [...supplyReceivedList]
      var objIndex = currentSupplyReceivedList.findIndex((obj => obj.supply_receive_id == values.supply_receive_id));
      console.log(currentSupplyReceivedList[objIndex])
      currentSupplyReceivedList[objIndex] = values
      console.log(currentSupplyReceivedList[objIndex])
      setSupplyReceivedList(currentSupplyReceivedList)
      message.success("Supply Received Table data has been updated.")
    }

    setisReceiveModalVisible(false)
    setisReceiveDrawerVisible(false)
  }

  const SupplyReceivedRowSelection = {
    receivedSelectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => { onSelectReceivedSupplyChange(selectedRowKeys, selectedRows) },
  };

  const SupplyGivenRowSelection = {
    givenSelectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => { onSelectGivenSupplyChange(selectedRowKeys, selectedRows) },
  };

  return (
    <div>
      <Card>
        <Row justify="space-between" align='middle'>
          <Col>
            <h1>Supply</h1>
          </Col>

          <Col>
            <DatePicker picker="year" />
          </Col>
        </Row>
      </Card>


      <Row gutter={20} style={{ overflow: "hidden" }} className="mt-3">
        <Col xs={24} sm={24} md={24} lg={24} xl={20} className="w-100">
          <SupplyChart />
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={4} className="w-100 mb-3">
          <DataDisplayWidget
            cardClassName="h-100"
            centerCardBody
            centerIcon
            icon={<FaBoxes />}
            value="13"
            title="Current Supply Stock"
            vertical={true}
            color="green"
            avatarSize={100}
          />
        </Col>
      </Row>

      <Card>
        <Row justify='space-between'>
          <Col>
            <h1>Supply Given</h1>
          </Col>

          <Col>
            <Button
              type='primary'
              onClick={() => handleGivenPopUp("added")}
            >
              <p style={{ color: "white" }}>Give Supply</p>
            </Button>
          </Col>
        </Row>

        <Table
          columns={SupplyGivenColumns}
          dataSource={supplyGivenList}
          scroll={{ x: "max-content" }}
          rowKey="supply_given_id"
          rowSelection={SupplyGivenRowSelection}
          bordered
        />
      </Card>

      <Card>
        <Row justify='space-between'>
          <Col>
            <h1>Received Supply</h1>
          </Col>

          <Col>
            <Button
              type='primary'
              onClick={() => handleReceivePopUp("added")}
            >
              <p style={{ color: "white" }}>Add Stock</p>
            </Button>
          </Col>
        </Row>

        <Table
          columns={SupplyReceivedColumns}
          dataSource={supplyReceivedList}
          scroll={{ x: "max-content" }}
          rowKey="supply_receive_id"
          rowSelection={SupplyReceivedRowSelection}
          bordered
        />
      </Card>

      <Modal title='Supply Received Information' visible={isReceiveModalVisible} onOk={handleReceiveModalOk}
        onCancel={handleReceiveModalCancel} okText={'Submit'} destroyOnClose={true}>

        {isReceiveModalVisible &&
          <Form
            name='supply_Received_form'
            onFinish={onFinishSupplyReceivedForm}
            ref={SupplyReceivedFormRef}
            initialValues={supplyReceivedInitialVal}
          >
            <SupplyReceivedForm />
          </Form>
        }

      </Modal>

      <Drawer title='Supply Received Information' placement='right' onClose={onReceiveDrawerClose}
        visible={isReceiveDrawerVisible} width={'100%'} height={'100%'} footer={ReceiveDrawerFooter()}>
        {isReceiveDrawerVisible &&
          <Form
            name='supply_received_form'
            onFinish={onFinishSupplyReceivedForm}
            ref={SupplyReceivedFormRef}
            initialValues={supplyReceivedInitialVal}
          >
            <SupplyReceivedForm />
          </Form>
        }
      </Drawer>

      <Modal title='Supply Given Information' visible={isGivenModalVisible} onOk={handleGivenModalOk}
        onCancel={handleGivenModalCancel} okText={'Submit'} destroyOnClose={true}>

        {isGivenModalVisible &&
          <Form
            name='supply_given_form'
            onFinish={onFinishSupplyGivenForm}
            ref={SupplyGivenFormRef}
            initialValues={supplyGivenInitialVal}
          >
            <SupplyGivenForm />
          </Form>
        }

      </Modal>

      <Drawer title='Supply Given Information' placement='right' onClose={onGivenDrawerClose}
        visible={isGivenDrawerVisible} width={'100%'} height={'100%'} footer={GivenDrawerFooter()}>
        {isGivenDrawerVisible &&
          <Form
            name='supply_given_form'
            onFinish={onFinishSupplyGivenForm}
            ref={SupplyGivenFormRef}
            initialValues={supplyGivenInitialVal}
          >
            <SupplyGivenForm />
          </Form>
        }
      </Drawer>

    </div>
  )
}

export default SupplyDistribution