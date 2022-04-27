import React, { useState, useEffect } from "react";

import {
  Card,
  Col,
  Row,
  Image,
  Button,
  Layout,
  Divider,
  Menu,
  Input,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  CopyOutlined,
  ArrowDownOutlined,
  HighlightOutlined,
} from "@ant-design/icons";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import CertDrawer from "./Cert-Drawer";
import PDFTemplate from "components/shared-components/Documents/Certificates-General";
import { useHistory } from "react-router-dom";
import { AUTH_BARANGAY } from "redux/constants/Auth";
import SinglePagePDFViewer from "components/shared-components/Documents/Certificates-General/Paging";
import FileTest from "assets/files/test.pdf";
import CreateLayout from "assets/files/create.pdf";

const { Footer } = Layout;
const CertList = (props) => {
  const history = useHistory();

  const [counter, setCounter] = useState(1);

  const [drawer, setDrawer] = useState(false);
  const [selectedUser, SetSelectedUser] = useState(null);
  const [loading, setIsLoading] = useState(false);
  let ratio = 1.41451612903;
  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(!loading);
  //   }, 1000);
  // }, []);
  //Handle Drawer
  const counterClick = () => {
    setCounter("click");
    console.log("click");
  };
  const onHandle = (e, elm) => {
    e.preventDefault();

    // setDrawer(true);
    // SetSelectedUser(elm);
  };
  const closeDrawer = () => {
    setDrawer(false);
    SetSelectedUser(null);
  };
  useEffect(() => {
    counterClick();
  }, []);
  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item key={1}>
        <Flex alignItems="center">
          <EditOutlined />
          <span className="ml-2"> Edit</span>
        </Flex>
      </Menu.Item>
      <Menu.Item key={2}>
        <Flex alignItems="center">
          <HighlightOutlined />
          <span className="ml-2">Rename</span>
        </Flex>
      </Menu.Item>
      <Menu.Item key={3}>
        <Flex alignItems="center">
          <ArrowDownOutlined />
          <span className="ml-2">Download</span>
        </Flex>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key={4}>
        <Flex alignItems="center">
          <DeleteOutlined />
          <span className="ml-2">Delete</span>
        </Flex>
      </Menu.Item>
      <Menu.Item key={5}>
        <Flex alignItems="center">
          <CopyOutlined />
          <span className="ml-2">Duplicate</span>
        </Flex>
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      {/* <CertDrawer
        data={selectedUser}
        visible={drawer}
        close={() => {
          closeDrawer();
        }}
      /> */}
      <Row gutter={[50, 40]}>
        {/* <Col
          onClick={() =>
            history.push(
              "/app/" +
                localStorage.getItem(AUTH_BARANGAY) +
                "/cert-display/create"
            )
          }
          justify="right"
          className="pr-1"
          xs={11}
          sm={11}
          md={8}
          lg={8}
          xl={6}
          xxl={5}
        >
          <Card
            className="ml-5 text-center apply-font cert-dash"
            style={{
              cursor: "pointer",
              paddingBottom: " calc(9/16 * 100%) ",
              marginBottom: "5px",
              height:
                0 <= width && 374 >= width
                  ? 270
                  : 375 <= width && 424 >= width
                  ? 300
                  : 425 <= width && 648 >= width
                  ? 340
                  : 649 <= width && 767 >= width
                  ? 400
                  : 768 <= width && 1023 >= width
                  ? 410
                  : 440,
            }}
          >
            <div className="pt-5 mt-4 text-center list-center font-size-lg">
              Create New Certificate
              <br /> <PlusCircleOutlined />
            </div>
          </Card>
        </Col> */}
        {/* {loading ? ( */}

        <Col
          justify="right"
          className="pr-1 pdf-input-hover"
          xs={11}
          sm={11}
          md={8}
          lg={8}
          xl={6}
          xxl={5}
        >
          <div>
            <div
              onClick={(e) => onHandle(e, CreateLayout)}
              style={{
                cursor: "pointer",
              }}
            >
              <PDFTemplate
                data={{ name: "text" }}
                selectedForm={1}
                min={4}
                max={9}
                pdf={CreateLayout}
                type={"view"}
                counterClick={counterClick}
              />
            </div>
          </div>
        </Col>
        <Col
          justify="right"
          className="pr-1 pdf-input-hover"
          xs={11}
          sm={11}
          md={8}
          lg={8}
          xl={6}
          xxl={5}
        >
          <div>
            <div
              onClick={(e) => onHandle(e, FileTest)}
              style={{
                cursor: "pointer",
              }}
            >
              <PDFTemplate
                data={{ name: "text" }}
                selectedForm={1}
                min={4}
                max={9}
                pdf={FileTest}
                type={"view"}
                counterClick={counterClick}
              />
            </div>
          </div>
        </Col>

        {/* ) : null} */}
      </Row>
    </div>
  );
};

export default CertList;
