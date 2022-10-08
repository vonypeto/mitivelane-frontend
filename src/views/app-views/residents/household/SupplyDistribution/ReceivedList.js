import { React, useState, useEffect, createRef } from "react";

//Hooks
import {
  Row,
  Col,
  Table,
  Card,
  Button,
  DatePicker,
  Modal,
  Drawer,
  Form,
  Menu,
  message,
} from "antd";
import { useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import { useAuth } from "contexts/AuthContext";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

//Components
import SupplyReceivedForm from "./SupplyReceivedForm";
import { getTotalPage, searchBar, searchBarNumber, searchBarDate, searchIcon, handleTableChange } from "helper/pagination";
import utils from "utils";

const ReceievedList = (props) => {

  //Import
  const source = axios.CancelToken.source();
  const cancelToken = source.token;
  const history = useHistory();
  const { generateToken, currentOrganization } = useAuth();

  //Props
  const { pageSize, setPageSize, organization_id, currentSupply, setCurrentSupply, dateFilter } = props;

  //State
  const [tableScreen, setTableScreen] = useState({});
  const [isReceivedModalVisible, setisReceivedModalVisible] = useState(false);
  const [isReceivedDrawerVisible, setisReceivedDrawerVisible] = useState(false);
  const [supplyReceivedList, setSupplyReceivedList] = useState([]);
  const [supplyReceivedInitialVal, setSupplyReceivedInitialVal] = useState({});
  const [receivedSelectedRowKeys, setReceivedSelectedRowKeys] = useState([]);
  const [receivedSupplyCurrentPage, setReceivedSupplyCurrentPage] = useState(1);
  const [receivedSupplyTotal, setReceivedSupplyTotal] = useState(0);
  const [formAction, setFormAction] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [receiveTableLoading, setReceivedTableLoading] = useState(false);

  //Ref
  const SupplyReceivedFormRef = createRef();

  //UseEffect

  useEffect(() => {
    getPage();
  }, [receivedSupplyCurrentPage, pageSize, tableScreen, dateFilter]);


  useEffect(() => {
    var length = Object.keys(supplyReceivedList).length
    if (length > 0) {
      supplyReceivedList.map((data) => {
        data.date = moment(new Date(data.date));
      });
    }
  }, [supplyReceivedList]);

  //Axios

  const getPage = async () => {
    setReceivedTableLoading(true);
    await axios
      .post(
        `/api/supply/receive/getPage/${organization_id}/${receivedSupplyCurrentPage}/${pageSize}`,
        { tableScreen, dateFilter },
        generateToken()[1],
        { cancelToken }
      )
      .then((res) => {
        var data = res.data;
        setReceivedSupplyTotal(data.total)
        setSupplyReceivedList(data.list);
      });
    setReceivedTableLoading(false);
  };

  const addSupplyReceived = async (newSupplyReceived) => {
    setReceivedTableLoading(true);
    try {
      const new_supply_amount = currentSupply + newSupplyReceived.amount;
      await axios
        .post(
          "/api/supply/receive/add",
          {
            newSupplyReceived,
            organization_id: organization_id,
            new_supply_amount,
          },
          generateToken()[1],
          { cancelToken }
        )
        .then((res) => {
          const data = res.data;
          setCurrentSupply(new_supply_amount);
          newSupplyReceived.supply_receive_id = data.supply_receive_id;
          var newTotal = receivedSupplyTotal + 1;
          setReceivedSupplyTotal(newTotal);
          getPage()
          message.success("New Supply Received data has been added.");
        });
    } catch (error) {
      console.log(error);
      message.error("Error in database connection!!");
    }
    setReceivedTableLoading(false);
  };

  const updateSupplyReceived = async (values) => {
    try {
      const currentSupplyReceivedList = [...supplyReceivedList];
      var objIndex = currentSupplyReceivedList.findIndex(
        (obj) => obj.supply_receive_id == values.supply_receive_id
      );

      var stock_supply =
        currentSupply - currentSupplyReceivedList[objIndex].amount;
      var new_receive_supply = values.amount;
      const new_supply_amount = stock_supply + new_receive_supply;
      

      await axios.post(
        "/api/supply/receive/update",
        { newSupplyReceived: values, organization_id, new_supply_amount },
        generateToken()[1],
        { cancelToken }
      ).then((res) => {
        setCurrentSupply(new_supply_amount);
        currentSupplyReceivedList[objIndex] = values;
        getPage()
        message.success("Supply Received Table data has been updated.");
      })

    } catch (error) {
      console.log(error);
      message.error("Error in database connection!!");
    }
  };

  const popSupplyReceived = async (receivedSelectedRowKey) => {
    try {
      const currentSupplyReceivedList = [...supplyReceivedList];
      var objIndex = currentSupplyReceivedList.findIndex(
        (obj) => obj.supply_receive_id == receivedSelectedRowKey[0]._id
      );
      var supply_remove = currentSupplyReceivedList[objIndex].amount;
      var new_supply_amount = currentSupply - supply_remove;
      currentSupplyReceivedList.splice(objIndex, 1);

      await axios
        .post(
          "/api/supply/receive/delete",
          { selectedRowKeys: receivedSelectedRowKey, organization_id, new_supply_amount, supply_remove, dateFilter },
          generateToken()[1],
          { cancelToken }
        )
        .then(() => {
          setCurrentSupply(new_supply_amount);
          setReceivedSupplyTotal(receivedSupplyTotal - 1);
          setSupplyReceivedList(currentSupplyReceivedList);

          if (supplyReceivedList.length == 1 && receivedSupplyTotal > 1) {
            setReceivedSupplyCurrentPage(receivedSupplyCurrentPage - 1);
          }

          var page = getTotalPage(receivedSupplyTotal, pageSize)
          if (page > 1) {
            getPage()
          }

          message.success("Success, data has been deleted");
        });
    } catch (error) {
      console.log(error);
      message.error("Error in database connection!!");
    }
  };

  const deleteSuppliesReceived = () => {
    popSuppliesReceived();
  };

  const popSuppliesReceived = async () => {
    try {
      const currentSupplyReceivedList = [...supplyReceivedList];
      const length = currentSupplyReceivedList.length;
      var deleteLength = receivedSelectedRowKeys.length;
      var supply_remove = 0;

      receivedSelectedRowKeys.map((row) => {
        var objIndex = currentSupplyReceivedList.findIndex(
          (obj) => obj.supply_receive_id == row._id
        );
        supply_remove += currentSupplyReceivedList[objIndex].amount;
        currentSupplyReceivedList.splice(objIndex, 1);
      });

      var new_supply_amount = currentSupply - supply_remove;

      await axios
        .post(
          "/api/supply/receive/delete",
          { selectedRowKeys: receivedSelectedRowKeys, organization_id, new_supply_amount, supply_remove, dateFilter },
          generateToken()[1],
          { cancelToken }
        )
        .then(() => {
          setCurrentSupply(new_supply_amount);
          setSupplyReceivedList(currentSupplyReceivedList);
          console.log("receivedSupplyTotal", receivedSupplyTotal);
          var newTotal = receivedSupplyTotal - deleteLength;
          setReceivedSupplyTotal(newTotal);
          setReceivedSelectedRowKeys([]);


          var newPage = receivedSupplyCurrentPage;
          var lastPage = getTotalPage(receivedSupplyTotal, pageSize)

          if (length == deleteLength && receivedSupplyTotal > 1) {

            if (newPage != 1 && newPage == lastPage) {
              setReceivedSupplyCurrentPage(newPage - 1);
            }
          }

          if (newPage != lastPage) {
            getPage()
          }

          message.success("Success, data has been deleted");
        });
    } catch (error) {
      console.log(error);
      message.error("Error in database connection!!");
    }
  };

  //Table
  const SupplyReceivedColumns = [
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
      filterDropdown: searchBar,
      filterIcon: searchIcon,
      sorter: (a, b) => utils.antdTableSorter(a, b, "source")
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount - b.amount,
      filterDropdown: searchBarNumber,
      filterIcon: searchIcon,
      sorter: (a, b) => utils.antdTableSorter(a, b, "amount")
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_, data) => (
        <div className="d-flex align-items-center">
          <span className="ml-2">
            {new Date(data.date).toDateString().split(" ").slice(1).join(" ")}
          </span>
        </div>
      ),
      sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix()
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, elm) => (
        <div className="text-right">
          <EllipsisDropdown menu={dropdownMenuSupplyReceived(elm)} />
        </div>
      ),
    },
  ];

  //Modal
  const showReceiveModal = () => {
    setisReceivedModalVisible(true);
  };

  const handleReceiveModalOk = () => {
    SupplyReceivedFormRef.current.submit();
    // insert your code here...
  };

  const handleReceiveModalCancel = () => {
    setisReceivedModalVisible(false);
    setSupplyReceivedInitialVal({});
  };

  //Drawer
  const showReceiveDrawer = () => {
    setisReceivedDrawerVisible(true);
  };

  const onReceiveDrawerClose = () => {
    setisReceivedDrawerVisible(false);
    setSupplyReceivedInitialVal({});
  };

  const ReceiveDrawerFooter = () => {
    return (
      <Button
        type="primary"
        style={{ float: "right" }}
        onClick={() => {
          handleReceiveModalOk();
        }}
      >
        Submit
      </Button>
    );
  };

  //Function for handling drawer and modal
  const handleReceivePopUp = (action) => {
    setFormAction(action);

    const screenWidth = window.innerWidth;

    if (screenWidth > 480) {
      showReceiveModal();
    }

    if (screenWidth <= 480) {
      showReceiveDrawer();
    }
  };

  //Function for updateting and deleting Supply Receieved
  const editSupplyReceived = (row) => {
    setSupplyReceivedInitialVal({
      source: row.source,
      amount: row.amount,
      date: row.date,
      supply_receive_id: row.supply_receive_id,
    });
    handleReceivePopUp("edited");
  };

  const deleteSupplyReceived = (row) => {
    popSupplyReceived([{ _id: row.supply_receive_id, amount: row.amount, date: row.date }]);
  };

  const dropdownMenuSupplyReceived = (row) => (
    <Menu>
      <Menu.Item
        key={1}
        onClick={() => {
          editSupplyReceived(row);
        }}
      >
        <EditOutlined />
        <span className="ml-2">Edit</span>
      </Menu.Item>
      <Menu.Item
        key={2}
        onClick={() => {
          deleteSupplyReceived(row);
        }}
      >
        <DeleteOutlined />
        <span className="ml-2" style={{ color: "black" }}>
          Delete
        </span>
      </Menu.Item>
      {receivedSelectedRowKeys.length > 0 && (
        <Menu.Item
          key={3}
          onClick={() => {
            deleteSuppliesReceived();
          }}
        >
          <DeleteOutlined />
          <span className="ml-2" style={{ color: "black" }}>
            Delete {`(${receivedSelectedRowKeys.length})`}
          </span>
        </Menu.Item>
      )}
    </Menu>
  );

  //OnChange
  const onSelectReceivedSupplyChange = (selectedRowKeys, selectedRows) => {
    if (selectedRows.length > 0) {
      let tempSelectedRows = [];
      let tempRow = {}

      selectedRows.map((row) => {
        tempRow = { _id: row.supply_receive_id, amount: row.amount, date: row.date }
        tempSelectedRows.push(tempRow);
      });
      setReceivedSelectedRowKeys(tempSelectedRows);
    }
  };

  const handlePageSizeChange = (size) => {
    setSupplyReceivedList([])
    setPageSize(size)
  }

  const handleReceivedPageChange = async (page) => {
    if (page != null) {
      setReceivedSupplyCurrentPage(page);
    }
  };

  const onFinishSupplyReceivedForm = (values) => {
    console.log(values);

    if (formAction == "added") {
      addSupplyReceived(values);
    }

    if (formAction == "edited") {
      updateSupplyReceived(values);
    }

    setisReceivedModalVisible(false);
    setisReceivedDrawerVisible(false);
    setSupplyReceivedInitialVal({});
  };

  const SupplyReceivedRowSelection = {
    receivedSelectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      onSelectReceivedSupplyChange(selectedRowKeys, selectedRows);
    },
  };

  return (
    <>
      <Card>
        <Row justify="space-between">
          <Col>
            <h1>Received Supply</h1>
          </Col>

          <Col>
            <Button type="primary" onClick={() => handleReceivePopUp("added")}>
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
            total: receivedSupplyTotal,
            pageSize: pageSize,
            current: receivedSupplyCurrentPage,
            showSizeChanger: true,
            defaultPageSize: 4,
            pageSizeOptions: [4, 10, 20, 50, 100],
            onShowSizeChange: (current, size) => {
              handlePageSizeChange(size)
            },
            onChange: (page) => handleReceivedPageChange(page)
          }}
          onChange={(pagination, filters, sorter) => handleTableChange(sorter, filters, setSupplyReceivedList, setTableScreen)}
          loading={receiveTableLoading}
          bordered
        />
      </Card>

      <Modal
        title="Supply Received Information"
        visible={isReceivedModalVisible}
        onOk={handleReceiveModalOk}
        onCancel={handleReceiveModalCancel}
        okText={"Submit"}
        destroyOnClose={true}
      >
        {isReceivedModalVisible && (
          <Form
            name="supply_Received_form"
            onFinish={onFinishSupplyReceivedForm}
            ref={SupplyReceivedFormRef}
            initialValues={supplyReceivedInitialVal}
          >
            <SupplyReceivedForm action={formAction} />
          </Form>
        )}
      </Modal>

      <Drawer
        title="Supply Received Information"
        placement="right"
        onClose={onReceiveDrawerClose}
        visible={isReceivedDrawerVisible}
        width={"100%"}
        height={"100%"}
        footer={ReceiveDrawerFooter()}
      >
        {isReceivedDrawerVisible && (
          <Form
            name="supply_received_form"
            onFinish={onFinishSupplyReceivedForm}
            ref={SupplyReceivedFormRef}
            initialValues={supplyReceivedInitialVal}
          >
            <SupplyReceivedForm action={formAction} />
          </Form>
        )}
      </Drawer>
    </>
  );
};

export default ReceievedList;