import React from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { Tabs, Form, Button, message } from "antd";
import Flex from "components/shared-components/Flex";
import { useHistory } from "react-router-dom";
import DynamicCases from "./DynamicCases";
const { TabPane } = Tabs;
const index = (props) => {
  const { param_url } = props;
  console.log("List Second Loop: " + param_url);
  return (
    <>
      <PageHeaderAlt className="border-bottom" overlap>
        <div className="container">
          <Flex
            className="py-2"
            mobileFlex={false}
            justifyContent="between"
            alignItems="center"
          >
            <h2 className="mb-3">Settlement Case</h2>
          </Flex>
        </div>
      </PageHeaderAlt>
      <div className="container">
        <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
          <TabPane tab="Scheduled Cases" key="1">
            <DynamicCases barangay_id={param_url} caseType="Scheduled" />
          </TabPane>
          <TabPane tab="Unscheduled Cases" key="2">
          <DynamicCases barangay_id={param_url} caseType="Unscheduled" />

          </TabPane>

          <TabPane tab="Unsettled Cases"  key="3">
          <DynamicCases barangay_id={param_url} caseType="Unsettled" />

          </TabPane>
          <TabPane tab="Settled Cases"  key="4">
          <DynamicCases barangay_id={param_url} caseType="Settled" />

          </TabPane>

        </Tabs>
      </div>
    </>
  );
};

export default index;
