import { React, useState, useEffect, createRef } from "react";

//Hooks
import {
  Row,
  Col,
  Card,
  DatePicker,
} from "antd";
import SupplyChart from "./SupplyChart";
import DataDisplayWidget from "components/shared-components/DataDisplayWidget";
import { useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { useAuth } from "contexts/AuthContext";

//Icons
import { FaBoxes } from "react-icons/fa";

//Components
import GivenList from "./GivenList";
import ReceievedList from "./ReceivedList";

const SupplyDistribution = (props) => {
  const { organization_id } = props;

  //Import
  const source = axios.CancelToken.source();
  const cancelToken = source.token;
  const history = useHistory();
  const { generateToken, currentOrganization } = useAuth();

  //State
  const [currentSupply, setCurrentSupply] = useState(0);
  const [pageSize, setPageSize] = useState(4);
  const currentDate = moment();
  const [dateFilter, setDateFilter] = useState(currentDate);
  const [givenSupplyInventory, setGivenSupplyInventory] = useState([]);
  const [receivedSupplyInventory, setReceivedSupplyInventory] = useState([]);

  //Ref
  const SupplyReceivedFormRef = createRef();

  //Child Components for Given and Received List
  const supplyProps = {
    pageSize,
    organization_id,
    setPageSize,
    setCurrentSupply,
    currentSupply,
    dateFilter,
  }

  const inventoryProps = {
    givenSupplyInventory,
    receivedSupplyInventory
  }

  //UseEffect
  useEffect(() => {
    getCurrentSupply();
  }, []);

  useEffect(() => {
    console.log("dateFilter", dateFilter)
    getSupplyInventory()
  }, [dateFilter, currentSupply]);

  //Axios
  const getCurrentSupply = async () => {
    await axios.post(
      "/api/supply/get/current",
      { organization_id },
      generateToken()[1],
      { cancelToken }
    ).then((res) => {
      setCurrentSupply(res.data.organization_supply);
    })


  };

  const getSupplyInventory = async () => {
    await axios.get(
      `/api/supply/inventory/${organization_id}/${dateFilter.year()}`,
      generateToken()[1],
      { cancelToken }
    ).then((res) => {
      var data = res.data
      if (data != null) {
        setGivenSupplyInventory(data.given_month)
        setReceivedSupplyInventory(data.received_month)

        console.log("givenSupplyInventory", data.given_month)
        console.log("receivedSupplyInventory", data.received_month)
      }

      else {
        setGivenSupplyInventory([0,0,0,0,0,0,0,0,0,0,0,0])
        setReceivedSupplyInventory([0,0,0,0,0,0,0,0,0,0,0,0])
      }
    })
  };

  return (
    <div>
      <Card>
        <Row justify="space-between" align="middle">
          <Col>
            <h1>Supply</h1>
          </Col>

          <Col>
            <DatePicker picker="year"
              defaultValue={currentDate}
              onChange={(value) => {
                if (value != null) {
                  setDateFilter(value)
                }
              }} />
          </Col>
        </Row>
      </Card>

      <Row gutter={20} style={{ overflow: "hidden" }} className="mt-3">
        <Col xs={24} sm={24} md={24} lg={24} xl={20} className="w-100">
          <SupplyChart {...inventoryProps} />
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={4} className="w-100 mb-3">
          <DataDisplayWidget
            cardClassName="h-100"
            centerCardBody
            centerIcon
            icon={<FaBoxes />}
            value={currentSupply}
            title="Current Supply Stock"
            vertical={true}
            color="green"
            avatarSize={100}
          />
        </Col>
      </Row>

      <GivenList
        {...supplyProps}
      />

      <ReceievedList
        {...supplyProps}
      />
    </div>
  );
};

export default SupplyDistribution;
