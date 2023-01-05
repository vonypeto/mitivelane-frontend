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
import {
  handleTableChange,
  handlePageSizeChange,
  handlePageChange,
  handleDeletePage,
  handleDeletePages,
  searchBar,
  searchIcon,
  searchBarNumber,
  searchBarDate,
} from "helper/Pagination";
import { JSONToExcel } from "helper/ExportToExcel";
import { computeAge } from "helper/Formula";
import CustomDropdown from "components/shared-components/CustomDropdown";

const { Option } = Select;

const categories = [1, 2, 3, "Watches", "Devices"];

const ListInformation = () => {
  const source = axios.CancelToken.source();
  const cancelToken = source.token;
  const { generateToken, currentOrganization } = useAuth();
  const organization_id = currentOrganization;
  let history = useHistory();

  //Pagination State
  const [tableScreen, setTableScreen] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const defaultPageSize = 10;
  const [pageSize, setPageSize] = useState(defaultPageSize);

  //State
  const [selectShow, setShow] = useState(true);
  const [list, setList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isResidentLoading, setIsResidentLoading] = useState(true);

  useEffect(() => {
    getPage();
  }, [currentPage, pageSize, tableScreen]);

  //Axios Funtion
  const getPage = async () => {
    setIsResidentLoading(true);

    try {
      await axios
        .post(
          "/api/resident/page",
          {
            organization_id: organization_id,
            page: currentPage,
            tableScreen,
            pageSize,
          },
          generateToken()[1],
          { cancelToken }
        )
        .then((res) => {
          var data = res.data;
          console.log("data", data);
          setTotal(data.total);
          setList(data.residentList);
        });
    } catch (error) {
      console.log(error);
      message.error("Error in database connection!!");
    }

    setIsResidentLoading(false);
  };

  const deleteResident = async (resident_id) => {
    await axios.post(
      "/api/resident/delete",
      { resident_id },
      generateToken()[1]
    );
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
      handleDeletePages(
        residentIdArray,
        total,
        setTotal,
        pageSize,
        currentPage,
        setCurrentPage,
        list,
        getPage
      );
      message.success(
        `${selectedRows.length} Selected resident has been deleted.`
      );
    } else {
      data = utils.deleteArrayRow(data, objKey, row.resident_id);
      setList(data);
      residentIdArray.push(row.resident_id);
      deleteResident(residentIdArray);
      handleDeletePage(
        total,
        setTotal,
        currentPage,
        setCurrentPage,
        pageSize,
        list,
        getPage
      );
      message.success("Selected resident has been deleted.");
    }
  };

  const tableColumns = [
    {
      title: "Last Name",
      dataIndex: "lastname",
      sorter: (a, b) => utils.antdTableSorter(a, b, "lastname"),
      filterDropdown: searchBar,
      filterIcon: searchIcon,
    },
    {
      title: "First Name",
      dataIndex: "firstname",
      sorter: (a, b) => utils.antdTableSorter(a, b, "firstname"),
      filterDropdown: searchBar,
      filterIcon: searchIcon,
    },
    {
      title: "Middle Name",
      dataIndex: "middlename",
      sorter: (a, b) => utils.antdTableSorter(a, b, "middlename"),
      filterDropdown: searchBarDate,
      defaultFilteredValue: null,
      filterIcon: searchIcon,
    },
    {
      title: "Age",
      dataIndex: "age",
      sorter: (a, b) => utils.antdTableSorter(a, b, "age"),
      filterDropdown: searchBarNumber,
      filterIcon: searchIcon,
    },
    {
      title: "Civil Status",
      dataIndex: "civil_status",
      filters: [
        { text: "Single", value: "Single" },
        { text: "Married", value: "Married" },
        { text: "Widowed", value: "Widowed" },
        { text: "Divorced", value: "Divorced" },
      ],
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

  // const handleShowCategory = (value) => {
  //   if (value !== "All") {
  //     const key = "resident_id";
  //     const data = utils.filterArray(ResidentListData, key, value);
  //     setList(data);
  //   } else {
  //     setList(ResidentListData);
  //   }
  // };

  const handleExport = () => {
    console.log("exporting data from table");

    let newList = list.map((resident) => ({
      "First Name": resident.firstname,
      "Last Name": resident.lastname,
      "Middle Name": resident.firstname,
      Alias: resident.alias,
      Age: computeAge(resident.birthday),
      Birthday: new Date(resident.birthday)
        .toDateString()
        .split(" ")
        .slice(1)
        .join(" "),
      "Birth Place": resident.birth_of_place,
      "Gender": resident.gender,
      "Height": resident.height + " " + resident.height_unit,
      "Weight": resident.weight  + " " + resident.height_unit,
      "Blood type": resident.blood_type,
      "Voter status": resident.voter_status,
      "Civil status": resident.civil_status,
      "Occupation": resident.occupation,
      "Citizenship": resident.citizenship,
      "Religion": resident.religion,
      "Address 1": resident.address_1,
      "Address 2": resident.address_2,
      "Purok/Area": resident.area,
      "Telephone": resident.telephone,
      "Mobile number": resident.mobile_number,
      "Email": resident.email,
      "Father": resident.father,
      "Mother": resident.mother,
      "Spouse": resident.spouse,
      "PAG_IBIG": resident.pag_ibig,
      "PHILHEALTH": resident.philhealth,
      "SSS": resident.sss,
      "TIN": resident.tin,
    }));

    // console.log("resident list", newList);

    JSONToExcel(newList, "BarangayResidentList");
  };

  const residentMenuItems = [
    {
      text: "Refresh",
      icon: <ReloadOutlined />,
      onClick: () => alert("Resident Table Refresh"),
    },
    {
      text: "Export",
      icon: <FileExcelOutlined />,
      onClick: () => handleExport(),
    },
  ];

  return (
    <QueueAnim
      type={["right", "left"]}
      ease={["easeOutQuart", "easeInOutQuart"]}
    >
      {selectShow ? (
        <div key="demo1">
          <Card
            title="Resident Master List"
            extra={<CustomDropdown menuItems={residentMenuItems} />}
          >
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
                    // onChange={(e) => onSearch(e)}
                  />
                </div>
                <div className="mb-3">
                  <Select
                    defaultValue="All"
                    className="w-100"
                    style={{ minWidth: 180 }}
                    // onChange={handleShowCategory}
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
                  current: currentPage,
                  total: total,
                  pageSize: pageSize,
                  showSizeChanger: true,
                  defaultPageSize: defaultPageSize,
                  pageSizeOptions: [defaultPageSize, 10, 20, 50, 100],
                  onShowSizeChange: (current, size) => {
                    handlePageSizeChange(size, setList, setPageSize);
                  },
                  onChange: (page) => handlePageChange(page, setCurrentPage),
                }}
                onChange={(pagination, filters, sorter) =>
                  handleTableChange(sorter, filters, setList, setTableScreen)
                }
              />
            </div>
          </Card>
        </div>
      ) : null}
    </QueueAnim>
  );
};

export default ListInformation;
