import React, { useState, useEffect } from "react";
import { Card, Table, Select, Input, Button, Menu, Space, message } from "antd";
import QueueAnim from "rc-queue-anim";
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
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import { useHistory } from "react-router-dom";
import utils from "utils";
import { Col, Dropdown } from "antd";
import axios from "axios";
import { useAuth } from "contexts/AuthContext";

const { Option } = Select;

const categories = [1, 2, 3, "Watches", "Devices"];

const ListInformation = (props) => {
  const source = axios.CancelToken.source();
  const cancelToken = source.token;

  const { generateToken, currentOrganization } = useAuth();
  const organization_id = currentOrganization;

  const { param_url } = props;
  const [selectShow, setShow] = useState(true);
  let history = useHistory();
  const [list, setList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isResidentLoading, setIsResidentLoading] = useState(true);

  useEffect(() => {
    getAllResident();
  }, []);

  //Axios Funtion
  const getAllResident = async () => {
    try {
      await axios
        .post("/api/resident/getAll", { organization_id }, generateToken()[1], {
          cancelToken,
        })
        .then((res) => {
          setList(res.data);
          setIsResidentLoading(false);
        });

      return () => {
        source.cancel();
      };
    } catch (error) {
      message.error("Could not fetch data from server!!");
    }
  };

  const deleteResident = async (resident_id) => {
    console.log(resident_id);
    await axios.post(
      "/api/resident/delete",
      { resident_id },
      generateToken()[1]
    );

    console.log(resident_id);
  };

  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item onClick={() => viewDetails(row)} key={1}>
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">View Details</span>
        </Flex>
      </Menu.Item>
      <Menu.Item onClick={() => editDetails(row)} key={2}>
        <Flex alignItems="center">
          <EditOutlined />
          <span className="ml-2">Edit Details</span>
        </Flex>
      </Menu.Item>
      <Menu.Item onClick={() => deleteRow(row)} key={3}>
        <Flex alignItems="center">
          <DeleteOutlined />
          <span className="ml-2">
            {selectedRows.length > 0
              ? `Delete (${selectedRows.length})`
              : "Delete"}
          </span>
        </Flex>
      </Menu.Item>
    </Menu>
  );

  const AddResident = () => {
    setShow(!selectShow);

    setTimeout(() => {
      history.push(`/app/1002/residents/resident-information/add`);
    }, 1000);
  };

  const viewDetails = (row) => {
    setShow(!selectShow);

    setTimeout(() => {
      history.push(
        `/app/1002/residents/resident-information/${row.resident_id}/view`
      );
    }, 1000);
  };

  const editDetails = (row) => {
    setShow(!selectShow);
    setTimeout(() => {
      history.push(
        `/app/1002/residents/resident-information/${row.resident_id}/edit`
      );
    }, 1000);
  };

  const deleteRow = async (row) => {
    //deleting resident in table
    const objKey = "resident_id";
    let data = list;
    let residentIdArray = [];

    if (selectedRows.length > 1) {
      selectedRows.forEach((elm) => {
        data = utils.deleteArrayRow(data, objKey, elm.resident_id);
        setList(data);
        setSelectedRows([]);
        residentIdArray.push(elm.resident_id);
      }); //end of loop
      deleteResident(residentIdArray);
    } else {
      data = utils.deleteArrayRow(data, objKey, row.resident_id);
      setList(data);
      residentIdArray.push(row.resident_id);
      deleteResident(residentIdArray);
    }
  };

  const tableColumns = [
    {
      title: "Last Name",
      dataIndex: "lastname",
      sorter: (a, b) => utils.antdTableSorter(a, b, "lastname"),
    },
    {
      title: "First Name",
      dataIndex: "firstname",
      sorter: (a, b) => utils.antdTableSorter(a, b, "firstname"),
    },
    {
      title: "Middle Name",
      dataIndex: "middlename",
      sorter: (a, b) => utils.antdTableSorter(a, b, "middlename"),
    },
    {
      title: "Age",
      dataIndex: "age",
      sorter: (a, b) => utils.antdTableSorter(a, b, "age"),
    },
    {
      title: "Civil Status",
      dataIndex: "civil_status",
      sorter: (a, b) => utils.antdTableSorter(a, b, "civil_status"),
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
  const ResidentList = (
    <Menu>
      <Menu.Item key="0">
        <span>
          <div className="d-flex align-items-center">
            <ReloadOutlined />
            <span className="ml-2">Refresh</span>
          </div>
        </span>
      </Menu.Item>
      <Menu.Item key="1">
        <span>
          <div className="d-flex align-items-center">
            <PrinterOutlined />
            <span className="ml-2">Print</span>
          </div>
        </span>
      </Menu.Item>
      <Menu.Item key="12">
        <span>
          <div className="d-flex align-items-center">
            <FileExcelOutlined />
            <span className="ml-2">Export</span>
          </div>
        </span>
      </Menu.Item>
    </Menu>
  );

  const rowSelection = {
    onChange: (key, rows) => {
      setSelectedRows(rows);
      setSelectedRowKeys(key);
    },
  };

  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? list : ResidentListData;
    const data = utils.wildCardSearch(searchArray, value);
    setList(data);
    setSelectedRowKeys([]);
  };

  const handleShowCategory = (value) => {
    if (value !== "All") {
      const key = "resident_id";
      const data = utils.filterArray(ResidentListData, key, value);
      setList(data);
    } else {
      setList(ResidentListData);
    }
  };
  const cardDropdown = (menu) => (
    <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
      <a
        href="/#"
        className="text-gray font-size-lg"
        onClick={(e) => e.preventDefault()}
      >
        <EllipsisOutlined />
      </a>
    </Dropdown>
  );
  return (
    <QueueAnim
      type={["right", "left"]}
      ease={["easeOutQuart", "easeInOutQuart"]}
    >
      {selectShow ? (
        <div key="demo1">
          <Card title="Resident Master List" extra={cardDropdown(ResidentList)}>
            <Flex
              alignItems="center"
              className=""
              justifyContent="between"
              mobileFlex={false}
            >
              <Flex className="mb-1" mobileFlex={false}>
                <div className="mb-3 mr-md-3">
                  <Input
                    placeholder="Search"
                    prefix={<SearchOutlined />}
                    onChange={(e) => onSearch(e)}
                  />
                </div>
                <div className="mb-3">
                  <Select
                    defaultValue="All"
                    className="w-100"
                    style={{ minWidth: 180 }}
                    onChange={handleShowCategory}
                    placeholder="Category"
                  >
                    <Option value="All">All</Option>
                    {categories.map((elm) => (
                      <Option key={elm} value={elm}>
                        {elm}
                      </Option>
                    ))}
                  </Select>
                </div>
              </Flex>

              <div className="justify-content-between">
                <Space>
                  <Col>
                    <Button
                      onClick={AddResident}
                      type="primary mb-3"
                      icon={<PlusCircleOutlined />}
                      block
                    >
                      Add Resident
                    </Button>
                  </Col>
                </Space>
              </div>
            </Flex>
            <div className="table-responsive">
              <Table
                columns={tableColumns}
                dataSource={list}
                rowKey="resident_id"
                scroll={{ x: "max-content" }}
                rowSelection={{
                  selectedRowKeys: selectedRowKeys,
                  type: "checkbox",
                  preserveSelectedRowKeys: false,
                  ...rowSelection,
                }}
                loading={isResidentLoading}
                pagination={{
                  defaultPageSize: 10,
                  showSizeChanger: true,
                }}
              />
            </div>
          </Card>
        </div>
      ) : null}
    </QueueAnim>
  );
};

export default ListInformation;
