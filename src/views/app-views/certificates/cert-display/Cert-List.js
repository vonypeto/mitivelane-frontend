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
import axios from "axios";
import { useAuth } from "contexts/AuthContext";
import { getCertificateAll } from "api/AppController/CertificatesController/CertificatesController";
import InfinitScroll from "react-infinite-scroll-component";
import Spin from "components/shared-components/Loading";

const CertList = () => {
  const history = useHistory();
  const { generateToken } = useAuth();
  const auth_barangay = localStorage.getItem(AUTH_BARANGAY);

  const [loading, setLoading] = useState(false);
  const arrayData = [
    { id: 1, pdf: FileTest, type: "view", selectedform: 1 },
    { id: 2, pdf: FileTest, type: "view", selectedform: 1 },
    { id: 3, pdf: FileTest, type: "view", selectedform: 1 },
  ];
  const [pdfFile, setPdfFile] = useState([]);
  const [drawer, setDrawer] = useState(false);
  const [selectedUser, SetSelectedUser] = useState(null);
  const [count, setCount] = useState(6);
  const [start, setStart] = useState(7);
  const [hasMore, setHasMore] = useState(true);
  const [counter, setCounter] = useState(true);
  //const [loading, setIsLoading] = useState(false);

  //let ratio = 1.41451612903;
  useEffect(() => {
    console.log("load file");
    setTimeout(() => {
      getCertificateAll(setPdfFile, generateToken()[1], count);
      //  setPdfFile(arrayData);
    }, 1000);
  }, []);
  //Handle Drawer
  const counterClick = (elm) => {
    setCounter(counter + 1);
    console.log(counter);
  };
  const onHandle = (elm) => {
    // setDrawer(true);
    SetSelectedUser(elm);
    setDrawer(true);
  };
  const closeDrawer = () => {
    console.log("clicked");
    setDrawer(false);
    SetSelectedUser(null);
  };
  // useEffect(() => {ss
  //   counterClick();
  // }, []);
  const createDocument = async () => {
    if (!loading) {
      await axios
        .post("/api/cert-display/create", {}, generateToken()[1])
        .then((res) => {
          console.log(res.data);
          setLoading(!loading);
          history.push(`/app/${auth_barangay}/cert-display/${res.data.id}`);
        });
    }
  };
  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
  const getCertificateNext = async () => {
    setStart(start + count);
    await axios
      .get(
        `/api/cert-display?result=${count}&start=${start}`,
        generateToken()[1]
      )
      .then((res) => {
        let data = res.data;
        console.log(data);

        setPdfFile((oldArray) => [...oldArray, ...data]);

        console.log(isEmpty(data));
        if (data.length === 0) setHasMore(false);
      });
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
    <div className="container">
      <CertDrawer
        data={selectedUser}
        visible={drawer}
        close={() => {
          closeDrawer();
        }}
      />

      <InfinitScroll
        dataLength={pdfFile.length}
        hasMore={hasMore}
        loader={<Spin />}
        next={getCertificateNext}
      >
        <Row gutter={[0, 40]}>
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
            <div onClick={createDocument}>
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
                  // counterClick={counterClick}
                  // onHandle={onHandle}
                />
              </div>
            </div>
          </Col>
          {pdfFile ? (
            <>
              {console.log(pdfFile)}
              {pdfFile.map((item, i) => {
                return (
                  <Col
                    key={i}
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
                      <div>
                        <PDFTemplate
                          data={item.id}
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
                );
              })}
            </>
          ) : null}
          {/* ) : null} */}
        </Row>{" "}
      </InfinitScroll>
    </div>
  );
};

export default CertList;
