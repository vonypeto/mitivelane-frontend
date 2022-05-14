import React, { useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { Tabs, Form, Button, message } from "antd";
import Flex from "components/shared-components/Flex";
import { useHistory } from "react-router-dom";
import DynamicCases from "./DynamicCases";
const { TabPane } = Tabs;

import {
  setLocalStorage,
  getLocalStorage,
  setLocalStorageObject,
} from "api/AppController/LocalStorageController/LocalStorageController";
import { SETTLEMENT_FORM } from "redux/constants/Record";

const index = (props) => {
  const { param_url } = props;

  useEffect(() => {
    if (getLocalStorage(SETTLEMENT_FORM) == null) {
      setLocalStorage(SETTLEMENT_FORM, {
        tabActiveKey: 1,
        Scheduled: {},
        Unscheduled: {},
        Unsettled: {},
        Settled: {},
      });
    }
  }, []);

  const onClickTab = (key) => {
    setLocalStorageObject(SETTLEMENT_FORM, key, "tabActiveKey");
    // console.log("Current Tab Key ", key)
  };

  const activeKey = () => {
    if (getLocalStorage(SETTLEMENT_FORM) != null) {
      return getLocalStorage(SETTLEMENT_FORM).tabActiveKey;
    }

    return 1;
  };

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
        <Tabs
          defaultActiveKey={activeKey}
          style={{ marginTop: 30 }}
          onChange={(key) => onClickTab(key)}
        >
          <TabPane tab="Scheduled Cases" key="1">
            <DynamicCases organization_id={param_url} caseType="Scheduled" />
          </TabPane>
          <TabPane tab="Unscheduled Cases" key="2">
            <DynamicCases organization_id={param_url} caseType="Unscheduled" />
          </TabPane>

          <TabPane tab="Unsettled Cases" key="3">
            <DynamicCases organization_id={param_url} caseType="Unsettled" />
          </TabPane>
          <TabPane tab="Settled Cases" key="4">
            <DynamicCases organization_id={param_url} caseType="Settled" />
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default index;
