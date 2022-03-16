import React from "react";

import { Tabs, Card, Button, Row, Col } from "antd";
import { Link } from "react-router-dom";

//Charts
import AyudaDonut from "./AyudaDonut";
import AyudaChart from "./AyudaChart";
import AyudaTable from "./AyudaTable";


const { TabPane } = Tabs;

const index = (props) => {
  const { param_url } = props;
  console.log("List Second Loop: " + param_url);
  return (
    <div>
      <Card>
        <Row justify="space-between" align="middle">
          <h1 className="m-0">Household & Fund</h1>
          <Link to={ `/app/${param_url}/residents/household/archive`}>
            <Button style={{ display: "block", float: "right" }} type="primary">
              Archive
            </Button>
          </Link>
        </Row>
      </Card>

      <Row gutter={20} style={{ overflow: "hidden" }}>

        <Col xs={24} sm={24} md={24} lg={24} xl={18} className="w-100">
          <AyudaChart />
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={6} className="w-100">
          <AyudaDonut />
        </Col>

        <Col span={24}>
          <AyudaTable />
        </Col>
      </Row>
    </div>
  );
};

export default index;
