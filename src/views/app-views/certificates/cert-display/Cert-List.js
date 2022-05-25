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
import {
  updateCertificateData,
  deleteCertificateData,
} from "api/AppController/CertificatesController/CertificatesController";
import utils from "utils";
import { useCert } from "contexts/CertificateContext";
import { conforms } from "lodash";

const CertList = React.memo(
  (props) => {
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

    //Handle Drawer
    useEffect(() => {
      // setCurrentFunctionList(pdfFile);
      localStorage.setItem("pdfFile", JSON.stringify(pdfFile));
      setPdfFile(pdfFile);
    }, [pdfFile, refresh]);
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

    const deleteRow = (row, i) => {
      //deleting resident in table
      deleteCertificateData(row, generateToken()[1]);
      let clone = JSON.parse(localStorage.getItem("pdfFile"));
      clone.splice(i, 1);
      console.log(row);
      setPdfFile(clone);

      localStorage.setItem("pdfFile", clone);
      setTimeout(() => {
        setRefresh(!refresh);
      }, 1000);
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
                              deleteRow={{
                                onClick: function () {
                                  deleteRow(item?.certificate_id, i);
                                },
                              }}
                              pdfFile={pdfFile}
                              setPdfFile={setPdfFile}
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
  },
  (prevProps, nextProps) =>
    prevProps.pdfFile.length === nextProps.pdfFile.length
);

export default CertList;
