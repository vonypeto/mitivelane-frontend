import { React, useState, useEffect, createRef } from "react";
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

import axios from "axios";
import moment from "moment";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import { useHistory } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import SupplyGivenForm from "./SupplyGivenForm";
import { getTotalPage } from "helper/pagination";

const GivenList = (props) => {
  //Import
  const source = axios.CancelToken.source();
  const cancelToken = source.token;
  const history = useHistory();
  const { generateToken, currentOrganization } = useAuth();

  //Props
  const { pageSize, setPageSize, organization_id, currentSupply, setCurrentSupply } = props;

  //State
  const [tableScreen, setTableScreen] = useState({});
  const [isGivenModalVisible, setIsGivenModalVisible] = useState(false);
  const [isGivenDrawerVisible, setIsGivenDrawerVisible] = useState(false);
  const [supplyGivenList, setSupplyGivenList] = useState([]);
  const [supplyGivenInitialVal, setSupplyGivenInitialVal] = useState({});
  const [givenSelectedRowKeys, setGivenSelectedRowKeys] = useState(0);
  const [givenSupplyCurrentPage, setGivenSupplyCurrentPage] = useState(1);
  const [givenSupplyTotal, setGivenSupplyTotal] = useState(0);
  const [givenTotalPage, setGivenTotalPage] = useState(0);
  const [givenTableLoading, setGivenTableLoading] = useState(false);
  const [formAction, setFormAction] = useState("");

  //Ref
  const SupplyGivenFormRef = createRef();

  //UseEffect
  useEffect(() => {
    getSuppliesTotal();
  }, []);

  useEffect(() => {
    getPage();
  }, [givenSupplyCurrentPage, pageSize, tableScreen]);

  useEffect(() => {
    var length = Object.keys(supplyGivenList).length
    if (length > 0) {
      supplyGivenList.map((data) => {
        data.date = moment(new Date(data.date));
      });
    }
  }, [supplyGivenList]);

  //Axios
  const getSuppliesTotal = async () => {
    try {
      await axios
        .post(
          "/api/supply/given/getTotal",
          { organization_id },
          generateToken()[1],
          { cancelToken }
        )
        .then((res) => {
          var suppliesGivenCount = res.data.suppliesGivenCount;
          setGivenSupplyTotal(suppliesGivenCount);
        });
    } catch (error) {
      console.log(error);
      message.error("Error in database connection!!");
    }
  };

  const getPage = async () => {
    setGivenTableLoading(true);

    try {
      await axios
        .post(
          `/api/supply/given/getPage/${organization_id}/${givenSupplyCurrentPage}/${pageSize}`,
          { tableScreen },
          generateToken()[1],
          { cancelToken }
        )
        .then((res) => {
          var data = res.data;
          setSupplyGivenList(data);
        });
    } catch (error) {
      console.log(error);
      message.error("Error in database connection!!");
    }
    setGivenTableLoading(false);
  };

  //Axios
  const addSupplyGiven = async (newSupplyGiven) => {
    try {
      setGivenTableLoading(true);
      var new_supply_amount = currentSupply - newSupplyGiven.amount;
      if (new_supply_amount < 0) {
        message.error("Cannot give supply that exceeds current supply stock!!");
        setGivenTableLoading(false);
        return;
      }

      await axios
        .post(
          "/api/supply/given/add",
          { newSupplyGiven, organization_id, new_supply_amount },
          generateToken()[1],
          { cancelToken }
        )
        .then((res) => {
          const data = res.data;
          setCurrentSupply(new_supply_amount);

          newSupplyGiven.supply_given_id = data.supply_given_id;
          var newTotal = givenSupplyTotal + 1;
          setGivenSupplyTotal(newTotal);
          getPage()
          setGivenTableLoading(false);
          message.success(" New Supply Given data has been added.");
        });
    } catch (error) {
      console.log(error);
      message.error("Error in database connection!!");
    }
  };

  const updateSupplyGiven = async (values) => {
    try {
      const currentSupplyGivenList = [...supplyGivenList];
      var objIndex = currentSupplyGivenList.findIndex(
        (obj) => obj.supply_given_id == values.supply_given_id
      );

      var stock_supply =
        currentSupply + currentSupplyGivenList[objIndex].amount;
      var given_supply = values.amount;
      var new_supply_amount = stock_supply - given_supply;

      if (new_supply_amount < 0) {
        message.error("Cannot give supply that exceeds current supply stock!!");
        return;
      }

      await axios
        .post(
          "/api/supply/given/update",
          { newSupplyGiven: values, organization_id, new_supply_amount },
          generateToken()[1],
          { cancelToken }
        )
        .then((res) => {
          currentSupplyGivenList[objIndex] = values;
          setCurrentSupply(new_supply_amount);
          setSupplyGivenList(currentSupplyGivenList);
          message.success("Supply Given Table data has been updated.");
        });
    } catch (error) {
      console.log(error);
      message.error("Error in database connection!!");
    }
  };

  const popSupplyGiven = async (supplyGivenIDs) => {
    try {
      const currentSupplyGivenList = [...supplyGivenList];
      var objIndex = currentSupplyGivenList.findIndex(
        (obj) => obj.supply_given_id == supplyGivenIDs
      );
      var supply_remove = currentSupplyGivenList[objIndex].amount;
      var new_supply_amount = currentSupply + supply_remove;
      currentSupplyGivenList.splice(objIndex, 1);

      await axios
        .post(
          "/api/supply/given/delete",
          { supplyGivenIDs, organization_id, new_supply_amount },
          generateToken()[1],
          { cancelToken }
        )
        .then(() => {
          setCurrentSupply(new_supply_amount);
          // setSupplyGivenList(currentSupplyGivenList);
          setGivenSupplyTotal(givenSupplyTotal - 1);

          if (supplyGivenList.length == 1 && givenSupplyTotal > 1) {
            setGivenSupplyCurrentPage(givenSupplyCurrentPage - 1);
          }

          var page = getTotalPage(givenSupplyTotal, pageSize)
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

  const popSuppliesGiven = async (supplyGivenIDs) => {
    try {
      const currentSupplyGivenList = [...supplyGivenList];
      const length = currentSupplyGivenList.length;
      var deleteLength = supplyGivenIDs.length;
      var remove_supply = 0;

      givenSelectedRowKeys.map((supply_given_id) => {
        var objIndex = currentSupplyGivenList.findIndex(
          (obj) => obj.supply_given_id == supply_given_id
        );
        console.log("objIndex", objIndex);
        remove_supply += currentSupplyGivenList[objIndex].amount;
        currentSupplyGivenList.splice(objIndex, 1);
      });

      var new_supply_amount = currentSupply + remove_supply;

      await axios
        .post(
          "/api/supply/given/delete",
          { supplyGivenIDs, organization_id, new_supply_amount },
          generateToken()[1],
          { cancelToken }
        )
        .then(() => {
          setCurrentSupply(new_supply_amount);
          // setSupplyGivenList(currentSupplyGivenList);
          var newTotal = givenSupplyTotal - deleteLength;
          setGivenSupplyTotal(newTotal);
          setGivenSelectedRowKeys(0);

          var newPage = givenSupplyCurrentPage;
          var lastPage = getTotalPage(givenSupplyTotal, pageSize)

          if (length == deleteLength && givenSupplyTotal > 1) {

            if (newPage != 1 && newPage == lastPage) {
              setGivenSupplyCurrentPage(newPage - 1);
            }
          }

          if (length != deleteLength) {
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
      sorter: (a, b) => a.amount - b.amount,
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
          <EllipsisDropdown menu={dropdownMenuSupplyGiven(elm)} />
        </div>
      ),
    },
  ];

  //Modal
  const showGivenModal = () => {
    setIsGivenModalVisible(true);
  };

  const handleGivenModalOk = () => {
    SupplyGivenFormRef.current.submit();
  };

  const handleGivenModalCancel = () => {
    setIsGivenModalVisible(false);
    setSupplyGivenInitialVal({});
  };

  //Drawer
  const showGivenDrawer = () => {
    setIsGivenDrawerVisible(true);
  };

  const onGivenDrawerClose = () => {
    setIsGivenDrawerVisible(false);
    setSupplyGivenInitialVal({});
  };

  const GivenDrawerFooter = () => {
    return (
      <Button
        type="primary"
        style={{ float: "right" }}
        onClick={() => {
          handleGivenModalOk();
        }}
      >
        Submit
      </Button>
    );
  };

  // Function for handling drawer and modal
  const handleGivenPopUp = (action) => {
    setFormAction(action);

    const screenWidth = window.innerWidth;

    if (screenWidth > 480) {
      showGivenModal();
    }

    if (screenWidth <= 480) {
      showGivenDrawer();
    }
  };

  //Function for updateting and deleting Supply Given
  const editSupplyGiven = (row) => {
    console.log(row);
    setSupplyGivenInitialVal({ ...supplyGivenInitialVal, ...row });
    handleGivenPopUp("edited");
  };

  const deleteSupplyGiven = (row) => {
    popSupplyGiven([row.supply_given_id]);
  };

  const deleteSuppliesGiven = () => {
    popSuppliesGiven(givenSelectedRowKeys);
  };

  //Dropdown
  const dropdownMenuSupplyGiven = (row) => (
    <Menu>
      <Menu.Item
        key={1}
        onClick={() => {
          editSupplyGiven(row);
        }}
      >
        <EditOutlined />
        <span className="ml-2">Edit</span>
      </Menu.Item>
      <Menu.Item
        key={2}
        onClick={() => {
          deleteSupplyGiven(row);
        }}
      >
        <DeleteOutlined />
        <span className="ml-2" style={{ color: "black" }}>
          Delete
        </span>
      </Menu.Item>
      {givenSelectedRowKeys.length > 0 && (
        <Menu.Item
          key={3}
          onClick={() => {
            deleteSuppliesGiven();
          }}
        >
          <DeleteOutlined />
          <span className="ml-2" style={{ color: "black" }}>
            Delete {`(${givenSelectedRowKeys.length})`}
          </span>
        </Menu.Item>
      )}
    </Menu>
  );

  //Onchange
  const handlePageSizeChange = (size) => {
    setSupplyGivenList([])
    setPageSize(size)
  }

  const handleTableChange = (pagination, filters, sorter) => {
    var sorter = {
      field: sorter.field,
      order: sorter.order
    }

    if (sorter.order != null) {
      setSupplyGivenList([])
      setTableScreen({ sorter })
    }

    if (sorter.order == null) {
      setTableScreen({})
    }

  }

  const onSelectGivenSupplyChange = (selectedRowKeys, selectedRows) => {
    if (selectedRows.length > 0) {
      let supplyGivenIDs = [];

      selectedRows.map((row) => {
        supplyGivenIDs.push(row.supply_given_id);
      });

      console.log(supplyGivenIDs);
      setGivenSelectedRowKeys(supplyGivenIDs);
      message.success(`Selected given row ${selectedRows.length}`);
    }
  };

  const handleGivenPageChange = async (page) => {
    if (page != null) {
      setGivenSupplyCurrentPage(page);
    }
  };

  const onFinishSupplyGivenForm = (values) => {
    if (formAction == "added") {
      addSupplyGiven(values);
    }

    if (formAction == "edited") {
      updateSupplyGiven(values);
    }

    setIsGivenModalVisible(false);
    setIsGivenDrawerVisible(false);
    setSupplyGivenInitialVal({});
  };

  const SupplyGivenRowSelection = {
    givenSelectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      onSelectGivenSupplyChange(selectedRowKeys, selectedRows);
    },
  };

  return (
    <>
      <Card>
        <Row justify="space-between">
          <Col>
            <h1>Supply Given</h1>
          </Col>

          <Col>
            <Button type="primary" onClick={() => handleGivenPopUp("added")}>
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
            current: givenSupplyCurrentPage,
            total: givenSupplyTotal,
            pageSize: pageSize,
            showSizeChanger: true,
            defaultPageSize: 4,
            pageSizeOptions: [4, 10, 20, 50, 100],
            onShowSizeChange: (current, size) => {
              handlePageSizeChange(size)
            },
            onChange: (page) => handleGivenPageChange(page)
          }}
          onChange={handleTableChange}
          loading={givenTableLoading}
          bordered
        />
      </Card>

      <Modal
        title="Supply Given Information"
        visible={isGivenModalVisible}
        onOk={handleGivenModalOk}
        onCancel={handleGivenModalCancel}
        okText={"Submit"}
        destroyOnClose={true}
      >
        {isGivenModalVisible && (
          <Form
            name="supply_given_form"
            onFinish={onFinishSupplyGivenForm}
            ref={SupplyGivenFormRef}
            initialValues={supplyGivenInitialVal}
          >
            <SupplyGivenForm />
          </Form>
        )}
      </Modal>

      <Drawer
        title="Supply Given Information"
        placement="right"
        onClose={onGivenDrawerClose}
        visible={isGivenDrawerVisible}
        width={"100%"}
        height={"100%"}
        footer={GivenDrawerFooter()}
      >
        {isGivenDrawerVisible && (
          <Form
            name="supply_given_form"
            onFinish={onFinishSupplyGivenForm}
            ref={SupplyGivenFormRef}
            initialValues={supplyGivenInitialVal}
          >
            <SupplyGivenForm />
          </Form>
        )}
      </Drawer>
    </>
  );
};

export default GivenList;
