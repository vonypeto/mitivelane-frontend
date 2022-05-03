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
  const pageSize = 3

  //Import
  const source = axios.CancelToken.source();
  const cancelToken = source.token;
  const history = useHistory();
  const { generateToken, currentBarangay } = useAuth();

  //State
  const [isReceivedModalVisible, setisReceivedModalVisible] = useState(false);
  const [isReceivedDrawerVisible, setisReceivedDrawerVisible] = useState(false);
  const [isGivenModalVisible, setIsGivenModalVisible] = useState(false);
  const [isGivenDrawerVisible, setIsGivenDrawerVisible] = useState(false);
  const [supplyGivenList, setSupplyGivenList] = useState([]);
  const [supplyReceivedList, setSupplyReceivedList] = useState([]);
  const [supplyGivenInitialVal, setSupplyGivenInitialVal] = useState({})
  const [supplyReceivedInitialVal, setSupplyReceivedInitialVal] = useState({})
  const [currentSupply, setCurrentSupply] = useState(0);
  const [receivedSelectedRowKeys, setReceivedSelectedRowKeys] = useState(0)
  const [givenSelectedRowKeys, setGivenSelectedRowKeys] = useState(0)
  const [givenSupplyPage, setGivenSupplyPage] = useState([])
  const [givenSupplyTotal, setGivenSupplyTotal] = useState()
  const [receiveSupplyPage, setReceiveSupplyPage] = useState([])
  const [receiveSupplyTotal, setReceiveSupplyTotal] = useState()
  const [formAction, setFormAction] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [givenTableLoading, setGivenTableLoading] = useState(false)
  const [receiveTableLoading, setReceivedTableLoading] = useState(false)

  //Ref
  const SupplyGivenFormRef = createRef()
  const SupplyReceivedFormRef = createRef()

  //UseEffect
  useEffect(() => {
    getAllSupplies()
    getCurrentSupply()
  }, [])

  //Axios
  const getAllSupplies = async () => {
    try {
      const request = await axios.post(
        '/api/supply/getAll',
        { barangay_id, pageSize },
        generateToken()[1],
        { cancelToken }
      );

      console.log("request", request)
      var SupplyGiven = request.data.SupplyGiven
      SupplyGiven.map((data) => {
        data.date = moment(new Date(data.date))
      })

      var SupplyReceived = request.data.SupplyReceived
      SupplyReceived.map((data) => {
        data.date = moment(new Date(data.date))
      })

      var suppliesGivenCount = request.data.suppliesGivenCount
      var suppliesReceivedCount = request.data.suppliesReceivedCount

      console.log("SupplyGiven", SupplyGiven);
      console.log("SupplyReceived", SupplyReceived);
      console.log("suppliesGivenCount", suppliesGivenCount)
      console.log("suppliesReceivedCount", suppliesReceivedCount)

      setGivenSupplyTotal(suppliesGivenCount)
      setReceiveSupplyTotal(suppliesReceivedCount)
      setSupplyGivenList(SupplyGiven)
      setSupplyReceivedList(SupplyReceived)

    } catch (error) {
      console.log(error)
      message.error("Error in database connection!!")
    }
  }

  const getCurrentSupply = async() => {
    const request = await axios.post(
      '/api/supply/get/current',
      {barangay_id},
      generateToken()[1],
      { cancelToken }
      );
      
    setCurrentSupply(request.data.barangay_supply)
  }

  const addSupplyGiven = async (newSupplyGiven) => {
    try {
      var new_supply_amount = currentSupply - newSupplyGiven.amount
      if (new_supply_amount < 0) {
        message.error("Cannot give supply that exceeds current supply stock!!")
        return
      }

      const request = await axios.post(
        '/api/supply/given/add',
        { newSupplyGiven, barangay_id, new_supply_amount },
        generateToken()[1],
        { cancelToken }
      );

      const data = request.data
      setCurrentSupply(new_supply_amount)
      
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
      const currentSupplyGivenList = [...supplyGivenList]
      var objIndex = currentSupplyGivenList.findIndex((obj => obj.supply_given_id == values.supply_given_id));

      var stock_supply = currentSupply + currentSupplyGivenList[objIndex].amount
      var given_supply = values.amount
      var new_supply_amount = stock_supply - given_supply

      if (new_supply_amount < 0) {
        message.error("Cannot give supply that exceeds current supply stock!!")
        return
      }

      const request = await axios.post(
        '/api/supply/given/update',
        { newSupplyGiven: values, barangay_id, new_supply_amount},
        generateToken()[1],
        { cancelToken }
      );

      currentSupplyGivenList[objIndex] = values
      setCurrentSupply(new_supply_amount)
      setSupplyGivenList(currentSupplyGivenList)
      message.success("Supply Given Table data has been updated.")

    } catch (error) {
      console.log(error)
      message.error("Error in database connection!!")
    }
  }

  const popSupplyGiven = async (supplyGivenIDs) => {
    try {
      const currentSupplyGivenList = [...supplyGivenList]
      console.log("currentSupplyGivenList", currentSupplyGivenList)
      var objIndex = currentSupplyGivenList.findIndex((obj => obj.supply_given_id == supplyGivenIDs));
      console.log("objIndex", objIndex)
      console.log("currentSupplyGivenList[objIndex]", currentSupplyGivenList[2])
      var supply_remove = currentSupplyGivenList[objIndex].amount
      var new_supply_amount = currentSupply + supply_remove
      currentSupplyGivenList.splice(objIndex, 1);

      const request = await axios.post(
        '/api/supply/given/delete',
        { supplyGivenIDs, barangay_id, new_supply_amount },
        generateToken()[1],
        { cancelToken }
      );

      setCurrentSupply(new_supply_amount)
      setSupplyGivenList(currentSupplyGivenList)
  
      message.success("Success, data has been deleted")
    } catch (error) {
      console.log(error)
      message.error("Error in database connection!!")
    }
  }

  const popSuppliesGiven = async (supplyGivenIDs) => {
    try {
      const currentSupplyGivenList = [...supplyGivenList]
      var remove_supply = 0

      givenSelectedRowKeys.map((supply_given_id) => {
        var objIndex = currentSupplyGivenList.findIndex((obj => obj.supply_given_id == supply_given_id)); 
        console.log("objIndex", objIndex)
        remove_supply += currentSupplyGivenList[objIndex].amount
        currentSupplyGivenList.splice(objIndex, 1);
      })

      var new_supply_amount = currentSupply + remove_supply

      const request = await axios.post(
        '/api/supply/given/delete',
        { supplyGivenIDs, barangay_id, new_supply_amount },
        generateToken()[1],
        { cancelToken }
      );

      setCurrentSupply(new_supply_amount)
      setSupplyGivenList(currentSupplyGivenList)
      setGivenSelectedRowKeys(0)
      message.success("Success, data has been deleted")
    } catch (error) {
      console.log(error)
      message.error("Error in database connection!!")
    }
  }

  const addSupplyReceived = async (newSupplyReceived) => {
    try {
      const new_supply_amount = currentSupply + newSupplyReceived.amount
      setCurrentSupply(new_supply_amount)

      const request = await axios.post(
        '/api/supply/receive/add',
        { newSupplyReceived, barangay_id: barangay_id, new_supply_amount },
        generateToken()[1],
        { cancelToken }
      );

      const data = request.data

      newSupplyReceived.supply_receive_id = data.supply_receive_id
      setSupplyReceivedList([...supplyReceivedList, newSupplyReceived])
      message.success(" New Supply Received data has been added.")
    } catch (error) {
      console.log(error);
      message.error("Error in database connection!!")
    }
  }

  const updateSupplyReceived = async (values) => {
    try {
      const currentSupplyReceivedList = [...supplyReceivedList]
      var objIndex = currentSupplyReceivedList.findIndex((obj => obj.supply_receive_id == values.supply_receive_id));

      var stock_supply = currentSupply - currentSupplyReceivedList[objIndex].amount
      var new_receive_supply =  values.amount
      const new_supply_amount = stock_supply + new_receive_supply 
      setCurrentSupply(new_supply_amount)

      const request = await axios.post(
        '/api/supply/receive/update',
        { newSupplyReceived: values, barangay_id, new_supply_amount },
        generateToken()[1],
        { cancelToken }
      );

      currentSupplyReceivedList[objIndex] = values
      setSupplyReceivedList(currentSupplyReceivedList)
      message.success("Supply Received Table data has been updated.")

    } catch (error) {
      console.log(error)
      message.error("Error in database connection!!")
    }
  }

  const popSupplyReceived = async (supplyReceivedIDs) => {
    try {
      const currentSupplyReceivedList = [...supplyReceivedList]
      var objIndex = currentSupplyReceivedList.findIndex((obj => obj.supply_receive_id == supplyReceivedIDs));
      var remove_supply = currentSupplyReceivedList[objIndex].amount
      var new_supply_amount = currentSupply - remove_supply

      const request = await axios.post(
        '/api/supply/receive/delete',
        { supplyReceivedIDs, barangay_id, new_supply_amount},
        generateToken()[1],
        { cancelToken }
      );

      setCurrentSupply(new_supply_amount)
      currentSupplyReceivedList.splice(objIndex, 1);
      setSupplyReceivedList(currentSupplyReceivedList)
  
      message.success("Success, data has been deleted")
    } catch (error) {
      console.log(error)
      message.error("Error in database connection!!")
    }
  }

  const popSuppliesReceived = async (supplyReceivedIDs) => {
    try {

      const currentSupplyReceivedList = [...supplyReceivedList]
      var remove_supply = 0

      receivedSelectedRowKeys.map((row) => {
        var objIndex = currentSupplyReceivedList.findIndex((obj => obj.supply_receive_id == row));
        remove_supply += currentSupplyReceivedList[objIndex].amount
        currentSupplyReceivedList.splice(objIndex, 1);
      })

      var new_supply_amount = currentSupply - remove_supply

      const request = await axios.post(
        '/api/supply/receive/delete',
        { supplyReceivedIDs, barangay_id, new_supply_amount },
        generateToken()[1],
        { cancelToken }
      );

      setCurrentSupply(new_supply_amount)
      setSupplyReceivedList(currentSupplyReceivedList)
      setReceivedSelectedRowKeys(0)
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
    setisReceivedModalVisible(true);
  };

  const handleReceiveModalOk = () => {
    SupplyReceivedFormRef.current.submit()
    // insert your code here...
  };

  const handleReceiveModalCancel = () => {
    setisReceivedModalVisible(false);
    setSupplyReceivedInitialVal({})
  };

  //Drawer
  const showReceiveDrawer = () => {
    setisReceivedDrawerVisible(true);
  }

  const onReceiveDrawerClose = () => {
    setisReceivedDrawerVisible(false);
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

  const deleteSuppliesReceived = () => {
    popSuppliesReceived(receivedSelectedRowKeys)
}

  //Function for updateting and deleting Supply Receieved
  const editSupplyReceived = (row) => {
    setSupplyReceivedInitialVal({ 'source': row.source, 'amount': row.amount, 'date': row.date, supply_receive_id: row.supply_receive_id })
    handleReceivePopUp("edited")
  }

  const deleteSupplyReceived = (row) => {
    popSupplyReceived([row.supply_receive_id])
  }

  //Dropdown 
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
      {receivedSelectedRowKeys.length > 0 &&
        <Menu.Item key={3} onClick={() => { deleteSuppliesReceived() }}>
          <DeleteOutlined />
          <span className="ml-2" style={{ color: "black" }}>Delete {`(${receivedSelectedRowKeys.length})`}</span>
        </Menu.Item>
      }
    </Menu>
  );

  //OnChange
  const onSelectReceivedSupplyChange = (selectedRowKeys, selectedRows) => {
    if (selectedRows.length > 0) {
      let supplyReceiveIDs = []

      selectedRows.map((row) => {
        supplyReceiveIDs.push(row.supply_receive_id)
      })

      console.log(supplyReceiveIDs);
      setReceivedSelectedRowKeys(supplyReceiveIDs)
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
      setGivenSelectedRowKeys(supplyGivenIDs)
      message.success(`Selected given row ${selectedRows.length}`)
    }
  }

  const handleGivenPageChange = async (page) => {
    setGivenTableLoading(true)

    const request = await axios.get(
    `/api/supply/given/getPage/${barangay_id}/${page.current}/${page.pageSize}`,
    generateToken()[1],
    { cancelToken }
    );

    var data = request.data
    setSupplyGivenList(data)
    setGivenTableLoading(false)
    
  }

  const handleReceivedPageChange = async (page) => {
    setReceivedTableLoading(true)

    const request = await axios.get(
    `/api/supply/receive/getPage/${barangay_id}/${page.current}/${page.pageSize}`,
    generateToken()[1],
    { cancelToken }
    );

    var data = request.data
    setSupplyReceivedList(data)
    setReceivedTableLoading(false)
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
      addSupplyReceived(values)
    }

    if (formAction == "edited") {
      updateSupplyReceived(values)
    }

    setisReceivedModalVisible(false)
    setisReceivedDrawerVisible(false)
    setSupplyReceivedInitialVal({})
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
            value={currentSupply}
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
          pagination={{
            total: givenSupplyTotal,
            pageSize: pageSize
          }}
          onChange={(page) => handleGivenPageChange(page)}
          loading={givenTableLoading}
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
          pagination={{
            total: receiveSupplyTotal,
            pageSize: pageSize
          }}
          onChange={(page) => handleReceivedPageChange(page)}
          loading={receiveTableLoading}
          bordered
        />
      </Card>

      <Modal title='Supply Received Information' visible={isReceivedModalVisible} onOk={handleReceiveModalOk}
        onCancel={handleReceiveModalCancel} okText={'Submit'} destroyOnClose={true}>

        {isReceivedModalVisible &&
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
        visible={isReceivedDrawerVisible} width={'100%'} height={'100%'} footer={ReceiveDrawerFooter()}>
        {isReceivedDrawerVisible &&
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