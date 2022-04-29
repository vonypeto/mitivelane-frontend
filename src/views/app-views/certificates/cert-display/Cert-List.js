import React, { useState, useEffect } from "react";
import { Col, Row, Layout, Menu } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
  ArrowDownOutlined,
  HighlightOutlined,
} from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import CertDrawer from "./Cert-Drawer";
import PDFTemplate from "components/shared-components/Documents/Certificates-General";
import { useHistory } from "react-router-dom";
import { AUTH_BARANGAY } from "redux/constants/Auth";
import FileTest from "assets/files/test.pdf";
import CreateLayout from "assets/files/create.pdf";

const { Footer } = Layout;
const CertList = (props) => {
  const history = useHistory();

  const [counter, setCounter] = useState(1);

  const [drawer, setDrawer] = useState(false);
  const [selectedUser, SetSelectedUser] = useState(null);

  //const [loading, setIsLoading] = useState(false);

  //let ratio = 1.41451612903;
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
  const onHandle = (elm) => {
    // setDrawer(true);
    SetSelectedUser("click");
    console.log(elm);
  };
  const closeDrawer = () => {
    setDrawer(false);
    SetSelectedUser(null);
  };
  useEffect(() => {
    counterClick();
    onHandle(null);
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
            //    onClick={(e) => onHandle(e, CreateLayout)}
            >
              <PDFTemplate
                data={{ name: "text" }}
                selectedForm={1}
                min={4}
                max={9}
                pdf={CreateLayout}
                type={"create"}
                counterClick={counterClick}
                onHandle={onHandle}
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
            //    onClick={(e) => onHandle(e, FileTest)}
            >
              <PDFTemplate
                data={{ name: "text" }}
                selectedForm={1}
                min={4}
                max={9}
                pdf={FileTest}
                type={"view"}
                counterClick={counterClick}
                onHandle={onHandle}
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
