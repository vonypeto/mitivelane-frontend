import React from "react";

import { Tabs, Card, Button, Row, Col } from "antd";
import { Link } from "react-router-dom";

//Charts
import HouseholdTable from "./HouseholdTable";

const { TabPane } = Tabs;

const index = (props) => {
  const { param_url } = props;
  console.log("List Second Loop: " + param_url);
  return (
    <div>
      <Card>
        <Row justify="space-between" align="middle">
          <h1 className="m-0">Household & Fund</h1>
          <Link to={`/app/${param_url}/residents/household/archive`}>
            <Button style={{ display: "block", float: "right" }} type="primary">
              Archive
            </Button>
          </Link>
        </Row>
      </Card>

      <HouseholdTable barangay_id={param_url} />
    </div >
  );
};

export default index;
