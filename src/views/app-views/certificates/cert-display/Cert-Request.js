import React, { useState } from "react";
import { Card, Table, Select, Input, Button, Menu, Space } from "antd";
import CertList from "assets/data/cert-list.data.json";
import QueueAnim from "rc-queue-anim";
import {
  EyeOutlined,
  EllipsisOutlined,
  DeleteOutlined,
  SearchOutlined,
  FileExcelOutlined,
  PrinterOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import { Dropdown } from "antd";
import utils from "utils";
const { Option } = Select;

const categories = [1, 2, 3, "Watches", "Devices"];

const ListInformation = () => {
  const [selectShow, setShow] = useState(true);
  const [list, setList] = useState(CertList);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item onClick={() => editDetails(row)}>
        <Flex alignItems="center">
          <EditOutlined />
          <span className="ml-2"> Details</span>
        </Flex>
      </Menu.Item>
      <Menu.Item onClick={() => viewDetails(row)}>
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">Approve</span>
        </Flex>
      </Menu.Item>
      <Menu.Item onClick={() => deleteRow(row)}>
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

  const viewDetails = (row) => {
    setShow(!selectShow);

    setTimeout(() => {
      //   history.push(
      //     `/app/1002/residents/resident-information/${row.resident_id}/view`
      //   );
    }, 1000);
  };
  const editDetails = (row) => {
    setShow(!selectShow);
    setTimeout(() => {
      //   history.push(
      //     `/app/1002/residents/resident-information/${row.resident_id}/edit`
      //   );
    }, 1000);
  };
  const deleteRow = (row) => {
    const objKey = "resident_id";
    let data = list;
    if (selectedRows.length > 1) {
      selectedRows.forEach((elm) => {
        data = utils.deleteArrayRow(data, objKey, elm.resident_id);
        setList(data);
        setSelectedRows([]);
      });
    } else {
      data = utils.deleteArrayRow(data, objKey, row.resident_id);
      setList(data);
    }
  };

  const tableColumns = [
    {
      title: "Request ID",
      dataIndex: "request_id",
      sorter: (a, b) => utils.antdTableSorter(a, b, "lastname"),
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => utils.antdTableSorter(a, b, "lastname"),
    },
    {
      title: "Cert. Type",
      dataIndex: "cert_type",
      sorter: (a, b) => utils.antdTableSorter(a, b, "firstname"),
    },
    {
      title: "Date Issued",
      dataIndex: "date_issued",
      sorter: (a, b) => utils.antdTableSorter(a, b, "middlename"),
    },

    {
      title: "Residency",
      dataIndex: "residency",
      render: (_, cert) => (
        <div className="">
          <Button>Check</Button>
        </div>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
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
    const searchArray = e.currentTarget.value ? list : CertList;
    const data = utils.wildCardSearch(searchArray, value);
    setList(data);
    setSelectedRowKeys([]);
  };

  const handleShowCategory = (value) => {
    if (value !== "All") {
      const key = "resident_id";
      const data = utils.filterArray(CertList, key, value);
      setList(data);
    } else {
      setList(CertList);
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
          <Card title="Requests" extra={cardDropdown(ResidentList)}>
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
            </Flex>
            <div className="table-responsive">
              <Table
                columns={tableColumns}
                dataSource={list}
                rowKey="request_id"
                rowSelection={{
                  selectedRowKeys: selectedRowKeys,
                  type: "checkbox",
                  preserveSelectedRowKeys: false,
                  ...rowSelection,
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
