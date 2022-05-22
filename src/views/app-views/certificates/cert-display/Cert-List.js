import React, { useState, useEffect } from "react";
import { Col, Row, Button } from "antd";
import CertDrawer from "./Cert-Drawer";
import PDFTemplate from "components/shared-components/Documents/Certificates-General";
import { useHistory } from "react-router-dom";
import { AUTH_ORGANIZATION } from "redux/constants/Auth";
import FileTest from "assets/files/test.pdf";
import CreateLayout from "assets/files/create.pdf";
import axios from "axios";
import { useAuth } from "contexts/AuthContext";
import { getCertificateAll } from "api/AppController/CertificatesController/CertificatesController";
import InfinitScroll from "react-infinite-scroll-component";
import Spin from "components/shared-components/Loading";
import BasicDocument from "components/shared-components/Documents/Certificates-General/";
import { pdf } from "@react-pdf/renderer";
import { updateCertificateData } from "api/AppController/CertificatesController/CertificatesController";
import utils from "utils";
import { useCert } from "contexts/CertificateContext";

const CertList = (props) => {
  const history = useHistory();

  const { currentList, setCurrentFunctionList } = useCert();
  const { pdfFile, setPdfFile } = props;
  const { generateToken } = useAuth();
  const auth_organization = localStorage.getItem(AUTH_ORGANIZATION);

  const [loading, setLoading] = useState(false);
  const arrayData = [
    { id: 1, pdf: FileTest, type: "view", selectedform: 1 },
    { id: 2, pdf: FileTest, type: "view", selectedform: 1 },
    { id: 3, pdf: FileTest, type: "view", selectedform: 1 },
  ];
  const [drawer, setDrawer] = useState(false);
  const [selectedUser, SetSelectedUser] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const [count, setCount] = useState(6);
  const [start, setStart] = useState(7);
  const [hasMore, setHasMore] = useState(true);
  const [refresh, setRefresh] = useState(true);

  //let ratio = 1.41451612903;
  useEffect(() => {
    let isApiSubscribed = true;
    setTimeout(() => {
      if (isApiSubscribed) {
        getCertificateAll(setPdfFile, generateToken()[1], count);
        //  setPdfFile(arrayData);
      }
    }, 1000);
    return () => {
      // cancel the subscription
      isApiSubscribed = false;
    };
  }, []);

  console.log(pdfFile);
  //Handle Drawer
  useEffect(() => {
    setCurrentFunctionList(pdfFile);
    //   setPdfFile(currentList);
  }, [pdfFile]);
  const onHandleCertificate = (title, id) => {
    let data = { certificate_id: id, title: title };
    updateCertificateData(data, generateToken()[1]);
  };

  const onHandle = (elm, created, updated, title) => {
    // setDrawer(true);
    SetSelectedUser({ elm, created, updated, title });
    setDrawer(true);
  };
  const closeDrawer = () => {
    setDrawer(false);
    SetSelectedUser(null);
  };
  // useEffect(() => {ss
  //   counterClick();
  // }, []);
  const createDocument = async () => {
    setLoading(true);
    let isApiSubscribed = true;
    if (!loading) {
      await axios
        .post("/api/cert-display/create", {}, generateToken()[1])
        .then((res) => {
          if (isApiSubscribed) {
            setLoading(!loading);
            history.push(
              `/app/${auth_organization}/cert-display/${res.data.id}`
            );
          }
        })
        .catch((err) => {
          return console.error(err);
        });
      return () => {
        // cancel the subscription
        isApiSubscribed = false;
      };
    }
  };

  // function isEmpty(obj) {
  //   return Object.keys(obj).length === 0;
  // }
  const getCertificateNext = async () => {
    setStart(start + count);
    await axios
      .get(
        `/api/cert-display?result=${count}&start=${start}`,
        generateToken()[1]
      )
      .then((res) => {
        let data = res.data;

        data.map((elem) => {
          elem.content =
            elem.content[0]?.blocks.length == 0
              ? {
                  entityMap: {},
                  blocks: [],
                }
              : elem.content;
          return elem;
        });
        //    console.log(data);
        setPdfFile((oldArray) => [...oldArray, ...data]);

        if (data.length === 0) setHasMore(false);
      });
  };

  // const dropdownMenu = (row) => (
  //   <Menu>
  //     <Menu.Item key={1}>
  //       <Flex alignItems="center">
  //         <EditOutlined />
  //         <span className="ml-2"> Edit</span>
  //       </Flex>
  //     </Menu.Item>
  //     <Menu.Item key={2}>
  //       <Flex alignItems="center">
  //         <HighlightOutlined />
  //         <span className="ml-2">Rename</span>
  //       </Flex>
  //     </Menu.Item>
  //     <Menu.Item key={3}>
  //       <Flex alignItems="center">
  //         <ArrowDownOutlined />
  //         <span className="ml-2">Download</span>
  //       </Flex>
  //     </Menu.Item>
  //     <Menu.Divider />
  //     <Menu.Item key={4}>
  //       <Flex alignItems="center">
  //         <DeleteOutlined />
  //         <span className="ml-2">Delete</span>
  //       </Flex>
  //     </Menu.Item>
  //     <Menu.Item key={5}>
  //       <Flex alignItems="center">
  //         <CopyOutlined />
  //         <span className="ml-2">Duplicate</span>
  //       </Flex>
  //     </Menu.Item>
  //   </Menu>
  // );

  // useEffect(() => {
  //   let isApiSubscribed = true;

  //   if (isApiSubscribed) {
  //     const listener = document
  //       .getElementById(selectedRow)
  //       .addEventListener("click", deleteRow);
  //     updateWindowDimensions();
  //     return listener;
  //   }
  //   return () => {
  //     // cancel the subscription
  //     isApiSubscribed = false;
  //   };
  // }, [selectedRow]);
  const deleteRow = (row, currentList) => {
    //deleting resident in table

    // let clone = [...currentList];
    // clone.splice(row, 1);
    // setData(clone);
    // console.log(pdfFile);
    // let data = currentList;
    // setRefresh(!refresh);
    // splice(index, 1);
    let data = currentList.filter((item) => item.certificate_id !== row);
    setPdfFile([...data]);
    setCurrentFunctionList([...data]);
    // console.log("click");
    // console.log(pdfFile, row);
    // setRefresh(!refresh);
    // setSelectedRow(row);

    //  deleteResident(residentIdArray);
  };

  const generatePdfDocumentShow = async (data) => {
    let blob;
    if (data)
      try {
        blob = await pdf(
          <BasicDocument
            data={data}
            fontType={data.font_family}
            certType={data.cert_type}
            templateType={data.template_type}
            type="pdf"
          />
        ).toBlob();
        // console.log(URL.createObjectURL(blob));
        return URL.createObjectURL(blob);
      } catch (e) {
        console.log(e);
      }
    else return;
  };

  const setData = (data) => {
    setRefresh(!refresh);
    let x = data;
    return setPdfFile(x);
  };
  return (
    <div className="container">
      <CertDrawer
        data={selectedUser}
        visible={drawer}
        close={() => {
          closeDrawer();
        }}
      />
      {pdfFile ? (
        <InfinitScroll
          dataLength={pdfFile.length}
          hasMore={hasMore}
          loader={<Spin />}
          next={getCertificateNext}
          style={{ overflow: "auto" }}
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
              <div
                onClick={createDocument}
                className={`${loading ? "pointer-events" : ""}`}
              >
                <div
                //    onClick={(e) => onHandle(e, CreateLayout)}
                >
                  <PDFTemplate
                    data={0}
                    certType="cert"
                    templateType="simple"
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

            <>
              {pdfFile.map((item, i) => {
                return (
                  <Col
                    key={item?.certificate_id}
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
                      <div id={item?.certificate_id}>
                        {/* <Button
                          onClick={() => {
                            deleteRow(item?.certificate_id);
                            console.log(pdfFile);
                          }}
                          type="primary"
                        >
                          <span>Download</span>
                        </Button> */}
                        {item?.certificate_id ? (
                          <PDFTemplate
                            data={item.certificate_id}
                            title={item?.title}
                            index={i}
                            certType={item.cert_type}
                            createdAt={item.createdAt}
                            updatedAt={item.updatedAt}
                            templateType={item.template_type}
                            min={4}
                            max={9}
                            pdf={generatePdfDocumentShow(item)}
                            type={"view"}
                            onHandle={onHandle}
                            deleteRow={deleteRow}
                            onHandleCertificate={onHandleCertificate}
                          />
                        ) : null}
                      </div>
                    </div>
                  </Col>
                );
              })}
            </>

            {/* ) : null} */}
          </Row>{" "}
        </InfinitScroll>
      ) : null}
    </div>
  );
};

export default CertList;
