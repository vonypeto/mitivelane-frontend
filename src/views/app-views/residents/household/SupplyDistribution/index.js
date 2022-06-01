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
  const [year, setYear] = useState(currentDate);

  //Ref
  const SupplyReceivedFormRef = createRef();

  //Child Components
  const childComponents = {
    pageSize,
    organization_id,
    setPageSize,
    setCurrentSupply,
    currentSupply,
    year
  }

  //UseEffect
  useEffect(() => {
    getCurrentSupply();
  }, []);

  //Axios
  const getCurrentSupply = async () => {
    const request = await axios.post(
      "/api/supply/get/current",
      { organization_id },
      generateToken()[1],
      { cancelToken }
    );

    setCurrentSupply(request.data.organization_supply);
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
                  setYear(value)
                }
              }} />
          </Col>
        </Row>
      </Card>

      <Row gutter={20} style={{ overflow: "hidden" }} className="mt-3">
        <Col xs={24} sm={24} md={24} lg={24} xl={20} className="w-100">
          <SupplyChart />
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
      {...childComponents}
      />

      <ReceievedList
      {...childComponents}
      />
    </div>
  );
};

export default SupplyDistribution;
