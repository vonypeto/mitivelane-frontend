import { React, useState } from "react";
import { Row, Col ,Table, Input, Button, Tooltip, Card } from "antd";
import QueueAnim from "rc-queue-anim";
import Userview from "./UserFormView";
import Flex from "components/shared-components/Flex";
import utils from "utils";

import {
  InfoCircleOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
const TableBlotterData = (props) => {
  const { testout, barangay_id, blotterData, blotterlistLoading} = props;
  const [blotterlist, setBlotterListData] = useState(blotterData);
  const [selectShow, setShow] = useState(true);
  const [blotterselectedRows, setBlotterSelectedRows] = useState([]);
  const [blotterselectedRowKeys, setBlotterSelectedRowKeys] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);

  const selectOutShow = (event) => {
    console.log("test");
    return setShow(event);
  };

  const rowSelectioBlotter = {
    onChange: (key, rows) => {
      setBlotterSelectedRows(rows);
      setBlotterSelectedRowKeys(key);
      console.log(rows);
    },
  };

  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? blotterlist : blotterData;
    const data = utils.wildCardSearch(searchArray, value);
    setBlotterListData(data);
    setBlotterSelectedRowKeys([]);
    console.log(e.currentTarget.value);
  };

  const Onclick = () => {
    testout("test");
  };

  const Blottercolumns = [
    {
      title: () => <div className="text-center">Blotter ID</div>,
      key: "blotter_id",
      render: (_, data) => <div className="text-center">{data.blotter_id}</div>,
    },
    {
      title: () => <div className="text-center">Cases</div>,
      key: "incident_type",
      render: (_, data) => <div className="text-center">{data.incident_type}</div>,
    },

    {
      title: () => <div className="text-center">Location</div>,
      key: "place_incident",
      render: (_, data) => <div className="text-center">{data.place_incident}</div>,
    },
    {
      title: () => <div className="text-center">Date Incident</div>,
      key: "date_of_incident",
      render: (_, data) => <div className="text-center">{new Date(data.date_of_incident).toDateString()}</div>,
    },
    {
      title: () => <div className="text-center"> Action</div>,
      key: "waiting",
      render: (_, data) => (
        <div className="text-center">
          <ViewDetails row={data} />
        </div>
      ),
    },
  ];

  const renderData = (e) => {
    setShow(!selectShow);
    console.log(e.row.blotter_id);
    // setSelectedUser(e.blotter_id);


    
  };

  const ViewDetails = (data) => {
    return (
      <>
        <Tooltip>
          <Button onClick={() =>  renderData(data)}>Details</Button>
        </Tooltip>
      </>
    );
  };
  return (
    <>
      <QueueAnim
        duration={250}
        type={["right", "left"]}
        ease={["easeOutQuart", "easeInOutQuart"]}
      >
        {selectShow ? (
          <div key="a">
              <Row>
        <Col xs={24} sm={24} md={24}>
            <Card>
              <div className="mb-3 ">
                <Input
                  placeholder="Search"
                  prefix={<SearchOutlined />}
                  onChange={(e) => onSearch(e)}
                />
              </div>

              <div className="table-responsive">
                {/* {barangay_id}
                <Button onClick={Onclick}> change</Button> */}

                <Table
                  loading={blotterlistLoading}
                  columns={Blottercolumns}
                  dataSource={blotterData}
                  scroll={{ x: "max-content" }}
                  rowKey="blotter_id"
                  //  rowSelection={{
                  //  selectedRowKeys: blotterselectedRowKeys,
                  //  type: 'checkbox',
                  //  preserveSelectedRowKeys: false,
                  //  ...rowSelectioBlotter,
                  //  }}
                />
              </div>
            </Card>
            </Col>
            </Row>
          </div>
        ) : (
          <>
            <QueueAnim
              delay={215}
              duration={250}
              type={["right", "left"]}
              ease={["easeOutQuart", "easeInOutQuart"]}
            >
              {!selectShow ? (
                <div key="c">
                  <Userview selectOutShow={selectOutShow.bind(this)} />
                </div>
              ) : null}
            </QueueAnim>
          </>
        )}
      </QueueAnim>
    </>
  );
};

export default TableBlotterData;
