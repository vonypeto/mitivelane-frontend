import { React, useEffect, useState } from "react";
import { Row, Col, Card, Table, Badge, Button, Menu, message } from "antd";
import { useAuth } from "contexts/AuthContext";
import axios from "axios";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import { Link } from "react-router-dom";

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
import CustomDropdown from "components/shared-components/CustomDropdown";

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

  //useEffect
  useEffect(() => {
    getAllHousehold();
  }, []);

  //Axios
  const getAllHousehold = async () => {
    setLoading(true)
    try {
      const households = await axios.post(
        "/api/household/getAll",
        { organization_id: organization_id },
        generateToken()[1],
        { cancelToken }
      );

      sethouseholdList(households.data);
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
    household_members.map((member) => {
      member.name = `${member.first_name} ${member.last_name}`;
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

          <CustomDropdown/>
          
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
        pagination="true"
        loading={loading}
        bordered
      />
    </Card>
  );
};

export default AyudaTable;