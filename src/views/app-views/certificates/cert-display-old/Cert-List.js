import React, { useState, useEffect } from "react";
import { Col, Row, message } from "antd";
import CertDrawer from "./Cert-Drawer";
import PDFTemplate from "components/shared-components/Documents";
import { useHistory } from "react-router-dom";
import { AUTH_ORGANIZATION } from "redux/constants/Auth";
import FileTest from "assets/files/test.pdf";
import CreateLayout from "assets/files/create.pdf";
import { base64pdf } from "constants/PdfConstant";
import axios from "axios";
import { useAuth } from "contexts/AuthContext";
import { getCertificateAll } from "api/AppController/CertificatesController/CertificatesController";
import InfinitScroll from "react-infinite-scroll-component";
import Spin from "components/shared-components/Loading";
import BasicDocument from "components/shared-components/Documents";
import { pdf } from "@react-pdf/renderer";
import { PDF_LIST } from "redux/constants/Auth";
import mongoose from "mongoose";
import {
  updateCertificateData,
  deleteCertificateData,
} from "api/AppController/CertificatesController/CertificatesController";

const CertList = React.memo(
  (props) => {
    // Props State & context
    const auth_organization = localStorage.getItem(AUTH_ORGANIZATION);
    const { pdfFile, setPdfFile } = props;
    const { generateToken } = useAuth();

    // History State
    const history = useHistory();

    // Page State
    const count = 6;
    const [start, setStart] = useState(7);

    //Loading State
    const [drawer, setDrawer] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [refresh, setRefresh] = useState(true);
    const [loading, setLoading] = useState(false);
    const [loadingDuplicate, setLoadingDuplicate] = useState(false);

    // Select Certificate State
    const [selectedUser, SetSelectedUser] = useState(null);

    //Test data
    const arrayData = [
      { id: 1, pdf: FileTest, type: "view", selectedform: 1 },
      { id: 2, pdf: FileTest, type: "view", selectedform: 1 },
      { id: 3, pdf: FileTest, type: "view", selectedform: 1 },
    ];

    const onHandle = (elm, created, updated, title, id) => {
      // setDrawer(true);
      SetSelectedUser({ elm, created, updated, title, id });
      setDrawer(true);
    };

    const closeDrawer = () => {
      setDrawer(false);
      SetSelectedUser(null);
    };

    const onHandleDocument = (title, id) => {
      let data = { certificate_id: id, title: title };
      updateCertificateData(data, generateToken()[1]);
    };

    const createDocument = async (data) => {
      setLoading(true);
      let isApiSubscribed = true;
      if (!loading) {
        console.log(data);
        await axios
          .post("/api/cert-display/create/data", data, generateToken()[1])
          .then((res) => {
            console.log(res.data.id);
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
    const createDocumentDuplicate = async (data) => {
      let isApiSubscribed = true;
      setLoadingDuplicate(true);

      if (!loadingDuplicate)
        await axios
          .post("/api/cert-display/create/data", data, generateToken()[1])
          .then((_) => {
            if (isApiSubscribed) {
              setLoadingDuplicate(!loading);
              console.log("duplicate");
              message.success("Document Duplicated");
            }
          })
          .catch((err) => {
            console.error(err);
            return message.error(err.message);
          });
      return () => {
        // cancel the subscription
        isApiSubscribed = false;
      };
    };
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

          setPdfFile((oldArray) => [...oldArray, ...data]);

          if (data.length === 0) setHasMore(false);
        });
    };

    const deleteRow = (row, i) => {
      //deleting document in the array

      deleteCertificateData(row, generateToken()[1]);
      let clone = JSON.parse(localStorage.getItem(PDF_LIST));
      clone.splice(i, 1);
      console.log(clone);
      setPdfFile(clone);

      localStorage.setItem(PDF_LIST, JSON.stringify(clone));
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
          return URL.createObjectURL(blob);
        } catch (e) {
          console.log(e);
        }
      else return;
    };

    const duplicateDocument = async (data) => {
      let id = mongoose.Types.ObjectId();
      console.log(id.toString());
      const date = new Date();
      let document = JSON.parse(localStorage.getItem(PDF_LIST));
      let tmp = JSON.parse(localStorage.getItem(PDF_LIST));
      document = document.find((o) => o.certificate_id === data);
      document.certificate_id = id.toString();
      document.createdAt = date.toLocaleString();
      document.updatedAt = date.toLocaleString();
      createDocumentDuplicate(document);
      tmp.push(document);
      setPdfFile(tmp);
    };

    const base64toBlob = (data) => {
      // Cut the prefix `data:application/pdf;base64` from the raw base 64
      const base64WithoutPrefix = data.substr(
        "data:application/pdf;base64,".length
      );

      const bytes = window.atob(base64WithoutPrefix);
      let length = bytes.length;
      let out = new Uint8Array(length);

      while (length--) {
        out[length] = bytes.charCodeAt(length);
      }

      return new Blob([out], { type: "application/pdf" });
    };

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
      localStorage.setItem(PDF_LIST, JSON.stringify(pdfFile));
      setPdfFile(pdfFile);
    }, [pdfFile, refresh]);

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
                  onClick={() => createDocument({})}
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
                      pdf={URL.createObjectURL(base64toBlob(base64pdf))}
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
                              duplicateDocument={{
                                onClick: function () {
                                  duplicateDocument(item?.certificate_id);
                                },
                              }}
                              pdfFile={pdfFile}
                              setPdfFile={setPdfFile}
                              onHandleDocument={onHandleDocument}
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
