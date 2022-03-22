import { React, useState, useEffect } from "react";
import {
  Tag,
  Button,
  Table,
  Input,
  Row,
  Col,
  Card,
  Form,
  Upload,
  InputNumber,
  message,
  Select,
} from "antd";
import { useHistory } from "react-router-dom";
import ResidentListData from "assets/data/resident.data.json";
import Flex from "components/shared-components/Flex";
import {
  InfoCircleOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import utils from "utils";
import { SettlementData, DataColor } from "./BlotterData";

const { Option } = Select;
let tags = [];
let final = {};
let fullname;
let countercolor = 0;

export var victim = [];

export const resetVictim = (() => {
  victim = []
})

const Victim = (props) => {
  const history = useHistory();
  const { residentlists, residentlistLoading, initialVictims, barangayId} = props;

  const [residentlist, setResidentList] = useState([]);
  const [residentlistData, setResidentListData] = useState([]);

  const [residentpick, setResidentPick] = useState([]);

  const [residentselectedRows, setResidentSelectedRows] = useState([]);
  const [residentselectedRowKeys, setResidentSelectedRowKeys] = useState([]);

  const [initialValues, setInitialValues] = useState([])

  useEffect(() => {
      setResidentList(residentlists)
      setResidentListData(residentlists)

  }, [residentlists, residentlistData])

  useEffect(() => {
    setInitialValues(initialVictims)
    setResidentSelectedRowKeys(initialVictims)
    victim = initialVictims

  }, [initialVictims, initialValues])
  
  const ResidentDetail = (residentId) => {
    history.push(`/app/${barangayId}/residents/resident-information/${residentId}/view`)
  }

  const rowSelectionResident = {
    onChange: (key, rows) => {
      setResidentSelectedRows(rows);
      setResidentSelectedRowKeys(key);

      var residentIds = []
      // console.log(rows)

      rows.map((elm) => {
        fullname = elm.firstname + " " + elm.lastname;
        tags.push([
          { label: fullname, value: DataColor[(countercolor += 1) % 4] },
        ]);
        residentIds.push(elm.resident_id)
        return [tags];
      });

      final = [].concat.apply([], tags);
      victim = residentIds;

      console.log("Victim ", victim)

      setResidentPick(final);
      tags = [];
      final = [];
    },
  };

  const tableResidentColumns = [
    // {
    //   title: "ID",
    //   dataIndex: "resident_id",
    // },
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
  ];

  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? residentlist : residentlistData;
    const data = utils.wildCardSearch(searchArray, value);
    setResidentList(data);
  };

  const onResidentReporter = (value) => {
    setResidentPick(value);
  };

  function tagRender(props) {
    const { label, value, closable, color } = props;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    const onClose = () => {
      setResidentSelectedRowKeys([])

    }
    return (
      <Tag
        color={value}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  }

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Resident Masterlist">
          <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
            <Flex className="mb-1" mobileFlex={false}>
              <div className="mb-3 mr-md-3">
                <Input
                  placeholder="Search"
                  prefix={<SearchOutlined />}
                  onChange={(e) => onSearch(e)}
                />
              </div>
            </Flex>
          </Flex>
          <div className="table-responsive">
            <Table
              loading={residentlistLoading}
              columns={tableResidentColumns}
              dataSource={residentlist}
              rowKey="resident_id"
              scroll={{ x: "max-content" }}
              rowSelection={{
                selectedRowKeys: residentselectedRowKeys,
                type: "checkbox",
                preserveSelectedRowKeys: false,
                ...rowSelectionResident,
              }}
              pagination={{
                position: ["bottomRight"],
                defaultPageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "30", "50"],
              }}
            />
          </div>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={7}>
        <Card title="Blotter Entry No:">
          <Form.Item name="blotter_id">
            <Col xs={24} sm={24} md={24}>
              <Input disabled placeholder="0000" />
            </Col>
          </Form.Item>
        </Card>
        <Card title="Settlement Status:">
          <Form.Item
            name="settlement_status"
            label="Status"
            rules={[{ required: true }]}>
            <Select className="w-100" placeholder="Settled">
              {SettlementData.map((elm) => (
                <Option key={elm} value={elm}>
                  {elm}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Card>
        <Card title="Victim">
          {
            //eslint-disable-next-line
          }
          <Select
            maxTagCount="responsive"
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Victim Names"
            tagRender={tagRender}
            options={residentpick}
            value={residentpick.map((item) => item.value)}
          >
            {/* {residentpick.map((elm,key )=> <Option defaultValue={elm.value} key={key}>{elm.label}</Option>)} */}
          </Select>
          <div className="mt-3">
            <hr />
            {residentselectedRows.map((elm, i) => (
              <div
                key={i}
                className={
                  i % 2 === 0
                    ? "mt-3 table-row-light d-flex align-items-center justify-content-between mb-4"
                    : "mt-3  table-row-dark d-flex align-items-center justify-content-between mb-4"
                }
              >
                {elm.firstname} {elm.middlename} {elm.lastname}
                <div>
                  <Button
					onClick = {() => ResidentDetail(elm.resident_id)}
                    icon={<InfoCircleOutlined />}
                    type="default"
                    size="small"
                  >
                    Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Col>
    </Row>
  );
};
export default Victim;
