import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import SettlementFormItem from "./SettlementFormItem";
import { getLocalStorage, setLocalStorageObject } from "api/AppController/LocalStorageController/LocalStorageController";
import { BLOTTER_FORM } from "redux/constants/Record";
import Flex from "components/shared-components/Flex";
import utils from "utils";
import { SettlementData, DataColor } from "./BlotterData";
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
  Avatar
} from "antd";
import {
  InfoCircleOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
const { Option } = Select;

const ResidentInvolvement = ({ selectionType, involvementType, residentData, isLoading, initialData, barangayId }) => {
  const history = useHistory();

  const [residentlist, setResidentList] = useState([]);
  const [residentlistData, setResidentListData] = useState([]);

  const [residentpick, setResidentPick] = useState([]);
  const [residentselectedRows, setResidentSelectedRows] = useState([]);
  const [residentselectedRowKeys, setResidentSelectedRowKeys] = useState([]);

  useEffect(() => {
    setResidentList(residentData)
    setResidentListData(residentData)

  }, [residentData, residentlistData])

  useEffect(() => {
    setResidentSelectedRows(getLocalStorage(BLOTTER_FORM)[involvementType])
    setResidentSelectedRowKeys(getLocalStorage(BLOTTER_FORM)[`${involvementType}_id`])

  }, []);

  const ResidentDetail = (residentId) => {
    history.push(`/app/${barangayId}/residents/resident-information/${residentId}/view`)
  }

  const rowSelectionResident = {
    onChange: (key, rows) => {
      setResidentSelectedRows(rows);
      setResidentSelectedRowKeys(key);

      var residentIds = [];
      var tags = [];
      var final = {};
      var fullname;
      var countercolor = 0;
      // console.log(rows)

      rows.map((elm) => {
        fullname = elm.firstname + " " + elm.lastname;
        tags.push([
          { label: fullname, value: DataColor[(countercolor += 1) % 4] },
        ]);
        residentIds.push(elm.resident_id);
        return [tags];
      });

      final = [].concat.apply([], tags);

      setLocalStorageObject(BLOTTER_FORM, rows, involvementType)
      setLocalStorageObject(BLOTTER_FORM, residentIds, `${involvementType}_id`)
      console.log(involvementType, " ", residentIds);

      setResidentPick(final);

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

  const tagRender = (props) => {
    const { label, value, closable, color } = props;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    const onClose = () => {
      setResidentSelectedRowKeys([]);
      setResidentSelectedRows([])
    };
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
              columns={tableResidentColumns}
              dataSource={residentlist}
              loading={isLoading}
              rowKey="resident_id"
              scroll={{ x: "max-content" }}
              rowSelection={{
                selectedRowKeys: residentselectedRowKeys,
                type: selectionType,
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

        <SettlementFormItem />

        <Card title="Reporter">
		{/* <Select
            maxTagCount="responsive"
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Reporter Name"
            tagRender={tagRender}
            options={residentpick}
            value={residentpick.map((item) => item.value)}
          >
          </Select>
		*/}

          <div className="mt-3">
		  {/*<hr />*/}
            {residentselectedRows.map((elm, i) => (
              <div
                key={i}
                className={
                  i % 2 === 0
                    ? "mt-3 table-row-light d-flex align-items-center justify-content-between mb-4"
                    : "mt-3  table-row-dark d-flex align-items-center justify-content-between mb-4"
                }
              >
                <div>
                  <Avatar size={40}
                    className="font-size-sm"
                    style={{
                      backgroundColor: elm.avatarColor
                    }}>
                    {utils.getNameInitial(`${elm.firstname} ${elm.lastname}`)}
                  </Avatar>
                  <span className="ml-2">{elm.firstname} {elm.lastname}</span>
                </div>
                <div>
                  <Button
                    onClick={() => ResidentDetail(elm.resident_id)}
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
export default ResidentInvolvement;

