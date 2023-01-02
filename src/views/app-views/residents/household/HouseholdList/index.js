import { React, useEffect, useState } from "react";
import { Row, Col, Card, Table, Input, Select, Badge, Button, Menu, message } from "antd";
import { useAuth } from "contexts/AuthContext";
import axios from "axios";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import { Link } from "react-router-dom";
import { computeAge } from "helper/Formula";

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

import {
  ResidentTableColumns,
  ResidentTableData,
  HouseholdTableData,
} from "./ResidentAyudaData";

const { Option } = Select;
const filterCategories = [
  { text: "H.Number", value: "house_number"},
  { text: "H.Name", value: "name" },
  { text: "Address", value: "address" },
  { text: "Purok", value: "purok" },
  { text: "Status", value: "house_status" },
  { text: "Family Planning", value: "family_planning" },
  { text: "Water Source", value: "water_source" },
  { text: "Toilet Type", value: "toilet_type" },
  { text: "Waste Management", value: "waste_management" },
];

import CustomDropdown from "components/shared-components/CustomDropdown";
import { handlePageChange } from "helper/Pagination";
import moment from "moment";

const AyudaTable = (props) => {
  //Import
  const source = axios.CancelToken.source();
  const cancelToken = source.token;
  const { generateToken, currentOrganization } = useAuth();

  //Initialize
  const { param_url } = props;
  const organization_id = param_url;

  //Table
  const HouseholdTableColumns = [
    {
      title: "H. Number",
      dataIndex: "house_number",
      key: "house_number",
    },
    {
      title: "Household Address",
      dataIndex: "address",
      key: "address",
      width: 12
    },
    {
      title: "H. Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Purok",
      dataIndex: "purok",
      key: "purok",
    },
    {
      title: "Status",
      dataIndex: "house_status",
      key: "house_status",
    },
    {
      title: "Family Planning",
      dataIndex: "family_planning",
      key: "family_planning",
    },
    {
      title: "Water Source",
      dataIndex: "water_source",
      key: "water_source",
    },
    {
      title: "Toilet Type",
      dataIndex: "toilet_type",
      key: "toilet_type",
    },
    {
      title: "Waste Management",
      dataIndex: "waste_management",
      key: "waste_management",
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

  //State
  const [householdList, sethouseholdList] = useState([]);
  const [loading, setLoading] = useState(false);

  //State For Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(1)
  const defaultPageSize = 10
  const [pageSize, setPageSize] = useState(defaultPageSize)
  const defaultFilters = { sort: "desc", searchCategory: "address" }
  const [dataFilter, setDataFilter] = useState({
    value: "",
    field: defaultFilters.searchCategory,
    sort: defaultFilters.sort,
  })

  //useEffect
  useEffect(() => {
    getPage()
    console.log("dataFilter", dataFilter)
  }, [pageSize, currentPage, dataFilter])


  //Axios
  const getPage = async () => {
    setLoading(true)
    try {
      const query = await axios.post(
        "/api/household/page",
        { organization_id, dataFilter, page: currentPage, pageSize },
        generateToken()[1],
        { cancelToken }
      );

      var householdList = query.data.household
      var total = query.data.total

      console.log("householdList", householdList)
    
      sethouseholdList(householdList)
      setTotal(total)

    } catch (error) {
      console.log(error);
      message.error("Error!! Please try again later!!");
    }

    setLoading(false)
  };

  const popHousehold = async (household_id) => {
    setLoading(true)
    try {
      await axios.post(
        "/api/household/delete",
        { household_id, organization_id: organization_id },
        generateToken()[1],
        { cancelToken }
      );
    } catch (error) {
      console.log(error);
      message.error("Error!! Please try again later!!");
    }

    message.success(`Deleted selected household`);
    setLoading(false)
  };

  //Functions
  const deleteHousehold = (row) => {

    const household_id = row.household_id;
    var currentHouseholdList = [...householdList];
    var objIndex = currentHouseholdList.findIndex(
      (obj) => obj.household_id == household_id
    );
    currentHouseholdList.splice(objIndex, 1);
    sethouseholdList(currentHouseholdList);

    popHousehold(row.household_id);
  };

  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item key={1}>
        <Flex alignItems="center">
          <EditOutlined />
          <Link
            style={{ color: "black" }}
            to={`/app/${organization_id}/residents/household/${row.household_id}/edit`}
          >
            <span className="ml-2">Manage Household</span>
          </Link>
        </Flex>
      </Menu.Item>
      <Menu.Item
        key={2}
        onClick={() => {
          deleteHousehold(row);
        }}
      >
        <Flex alignItems="center">
          <DeleteOutlined />
          <span className="ml-2" style={{ color: "black" }}>
            Delete Household
          </span>
        </Flex>
      </Menu.Item>
    </Menu>
  );

  const expandedRowRender = (household_members) => {
    console.log(household_members);
    household_members.map(async (member) => {
      member.name = `${member.first_name} ${member.last_name}`;
      member.age = computeAge(member.birthday)
      member.birthdayParse = moment(member.birthday).format("MM/DD/yyyy")
    });

    return (
      <Table
        columns={ResidentTableColumns}
        dataSource={household_members}
        pagination={false}
        rowKey="_id"
      />
    );
  };

  const handleSearchChange = (e) => {
    var value = e.target.value
    setDataFilter({ ...dataFilter, value: value })
  }

  const handleFilterChange = (value) => {
    //Select Input type only returns value
    setDataFilter({ ...dataFilter, field: value })
  }

  const handleSortChange = (value) => {
    //Select Input type only returns value
    setDataFilter({ ...dataFilter, sort: value })
  }

  return (
    <Card>
      <Row justify="space-between" align="middle" className="mb-3">
        <Col>
          <h1>Organization Household List</h1>
        </Col>

        <Col>
          <Link to={`/app/${organization_id}/residents/household/add`}>
            <Button type="primary">Add Household</Button>
          </Link>

          <CustomDropdown />

        </Col>
      </Row>

      <Row align="middle" gutter={5} className="mb-3">
        <Col>
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            onChange={handleSearchChange}
          />
        </Col>

        <Col>
          <Select
            defaultValue={defaultFilters.searchCategory}
            className="w-100"
            style={{ minWidth: 120 }}
            onChange={handleFilterChange}
          >
            {filterCategories.map((choice, key) => (
              <Option key={key} value={choice.value}>
                {choice.text}
              </Option>
            ))}
          </Select>
        </Col>

        <Col>
          <Select
            defaultValue={defaultFilters.sort}
            className="w-100"
            style={{ minWidth: 120 }}
            onChange={handleSortChange}
          >
            <Option value={"desc"}>Descending</Option>
            <Option value={"asc"}>Ascending</Option>
          </Select>
        </Col>
      </Row>

      <Table
        className="no-border-last"
        columns={HouseholdTableColumns}
        dataSource={householdList}
        scroll={{ x: "max-content" }}
        expandable={{
          expandedRowRender: (data) =>
            expandedRowRender(data.household_members),
          rowExpandable: (data) => data.househole_name !== "Not Expandable",
        }}
        rowKey="household_id"
        pagination={{
          current: currentPage,
          showSizeChanger: true,
          defaultPageSize: defaultPageSize,
          pageSizeOptions: [5, 10, 20, 50, 100],
          total,
          onShowSizeChange: (current, size) => {
            setPageSize(size)
          },
          onChange: (page) => {
            handlePageChange(page, setCurrentPage)
          }
        }}
        loading={loading}
        bordered
      />
    </Card>
  );
};

export default AyudaTable;
