import React, { useState } from "react";

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
const { Footer } = Layout;
const CertList = (props) => {
  const history = useHistory();
  const { width } = props;
  const [drawer, setDrawer] = useState(false);
  const [selectedUser, SetSelectedUser] = useState(null);
  const [loading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(!loading);
  //   }, 1000);
  // }, []);
  //Handle Drawer
  const onHandle = (elm) => {
    setDrawer(true);
    SetSelectedUser(elm);
  };
  const closeDrawer = () => {
    setDrawer(false);
    SetSelectedUser(null);
  };

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
      <CertDrawer
        width={width}
        data={selectedUser}
        visible={drawer}
        close={() => {
          closeDrawer();
        }}
      />
      <Row justify="right" gutter={[30, 10]}>
        <Col
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
            className="text-center apply-font cert-dash"
            style={{
              cursor: "pointer",
              paddingBottom: " calc(9/16 * 100%) ",
              marginBottom: "5px",
              height:
                0 <= props.width && 374 >= props.width
                  ? 270
                  : 375 <= props.width && 424 >= props.width
                  ? 300
                  : 425 <= props.width && 648 >= props.width
                  ? 340
                  : 649 <= props.width && 767 >= props.width
                  ? 400
                  : 768 <= props.width && 1023 >= props.width
                  ? 410
                  : 440,
            }}
          >
            <div className="pt-5 mt-4 text-center list-center font-size-lg">
              Create New Certificate
              <br /> <PlusCircleOutlined />
            </div>
          </Card>
        </Col>
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
          <Card className="pdf-template-border pdf-hover">
            <div
              onClick={() => onHandle({ id: 1, user: "na,e" })}
              style={{
                cursor: "pointer",
                height:
                  0 <= width && 374 >= width
                    ? 175
                    : 375 <= width && 424 >= width
                    ? 210
                    : 425 <= width && 648 >= width
                    ? 250
                    : 649 <= width && 767 >= width
                    ? 310
                    : 768 <= width && 1023 >= width
                    ? 320
                    : 350,
              }}
            >
              <PDFTemplate
                data={{ name: "text" }}
                selectedForm={1}
                min={4}
                max={9}
                width={width}
                type="form"
              />
            </div>

            <Footer>
              <div
                className="border demo bottomright"
                style={{ borderRadius: "50%" }}
              >
                <EllipsisDropdown placement="topRight" menu={dropdownMenu()} />
              </div>
            </Footer>
          </Card>
          <div className="pl-2 cert-font-buttom">
            <p>
              <b>
                <Input
                  style={{
                    border: "none",
                    textAlign: "left",
                    padding: "0",
                    width: "100%",
                    fontSize:
                      0 <= props.width && 374 >= props.width
                        ? 10
                        : 375 <= props.width && 424 >= props.width
                        ? 13
                        : 425 <= props.width && 648 >= props.width
                        ? 14
                        : 649 <= props.width && 767 >= props.width
                        ? 15
                        : 768 <= props.width && 1023 >= props.width
                        ? 16
                        : 17,
                    backgroundColor: "#FAFAFB",
                    margin: 0,
                    fontWeight: 900,
                  }}
                  className="cert-name "
                  defaultValue="Untitled 1"
                />
              </b>
            </p>
            <p>Modified 1 Mininutes Ago</p>
          </div>
        </Col>
        {/* ) : null} */}
      </Row>
    </div>
  );
};

export default CertList;
