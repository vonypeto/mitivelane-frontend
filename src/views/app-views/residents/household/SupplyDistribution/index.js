import { React, useState, useEffect, createRef } from "react";

//Hooks
import {
  Row,
  Col,
  Table,
  Card,
  Button,
  DatePicker,
  Modal,
  Drawer,
  Form,
  Menu,
  message,
} from "antd";
import SupplyChart from "./SupplyChart";
import DataDisplayWidget from "components/shared-components/DataDisplayWidget";
import { useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import { useAuth } from "contexts/AuthContext";

//Icons
import { FaBoxes } from "react-icons/fa";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

//Components
import SupplyReceivedForm from "./SupplyReceivedForm";
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
<<<<<<< HEAD
  const [currentSupply, setCurrentSupply] = useState(0);

  //Props
  const tableProps = {
    barangay_id,
    setCurrentSupply,
    currentSupply,
  }

  //UseEffect
  useEffect(() => {
    getCurrentSupply()
  }, [])

  //Axios
=======
  const [isReceivedModalVisible, setisReceivedModalVisible] = useState(false);
  const [isReceivedDrawerVisible, setisReceivedDrawerVisible] = useState(false);
  const [supplyReceivedList, setSupplyReceivedList] = useState([]);
  const [supplyReceivedInitialVal, setSupplyReceivedInitialVal] = useState({});
  const [currentSupply, setCurrentSupply] = useState(0);
  const [receivedSelectedRowKeys, setReceivedSelectedRowKeys] = useState(0);
  const [receiveSupplyCurrentPage, setReceiveSupplyCurrentPage] = useState([]);
  const [receiveSupplyTotal, setReceiveSupplyTotal] = useState();
  const [formAction, setFormAction] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [receiveTableLoading, setReceivedTableLoading] = useState(false);
  const [pageSize, setPageSize] = useState(3);

  //Ref
  const SupplyReceivedFormRef = createRef();

  //UseEffect
  useEffect(() => {
    getAllSupplies();
    getCurrentSupply();
  }, []);

  //Axios
  const getAllSupplies = async () => {
    try {
      await axios
        .post(
          "/api/supply/receive/getAll",
          { organization_id, pageSize },
          generateToken()[1],
          { cancelToken }
        )
        .then((res) => {
          console.log("res", res);
          var SupplyReceived = res.data.SupplyReceived;
          SupplyReceived.map((data) => {
            data.date = moment(new Date(data.date));
          });

          var suppliesReceivedCount = res.data.suppliesReceivedCount;
          setReceiveSupplyTotal(suppliesReceivedCount);
          setSupplyReceivedList(SupplyReceived);
        });
    } catch (error) {
      console.log(error);
      message.error("Error in database connection!!");
    }
  };

>>>>>>> e1004f667b66f1dbf55581512ebcf6a93cffc0f0
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
            <DatePicker picker="year" />
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

<<<<<<< HEAD
      <GivenList {...tableProps} />

      <ReceievedList {...tableProps} />

=======
      <GivenList
        pageSize={pageSize}
        organization_id={organization_id}
        setCurrentSupply={setCurrentSupply}
        currentSupply={currentSupply}
      />

      <ReceievedList
        pageSize={pageSize}
        organization_id={organization_id}
        setCurrentSupply={setCurrentSupply}
        currentSupply={currentSupply}
      />
>>>>>>> e1004f667b66f1dbf55581512ebcf6a93cffc0f0
    </div>
  );
};

export default SupplyDistribution;
