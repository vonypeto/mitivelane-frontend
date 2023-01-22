import React, { useState, useEffect, Suspense } from "react";
// Antd & style Component
import { Col, Row, message } from "antd";
import Spin from "components/shared-components/Loading";
import Loading from "components/shared-components/Loading";

// Library Component
import { pdf } from "@react-pdf/renderer";
import InfinitScroll from "react-infinite-scroll-component";
import axios from "axios";
import mongoose from "mongoose";
import { useHistory } from "react-router-dom";
import { base64toBlobPdf } from "helper/Formula";
// Middleware
import { useAuth } from "contexts/AuthContext";
import { AUTH_ORGANIZATION } from "redux/constants/Auth";

// PDF Component
import { PDF_LIST } from "redux/constants/Auth";
import BasicDocument from "components/shared-components/Documents/Certificates-General/";
import CertDrawer from "components/shared-components/PdfDrawer";
import PDFTemplate from "components/shared-components/Documents/Certificates-General";
import FileTest from "assets/files/test.pdf";
import CreateLayout from "assets/files/create.pdf";
import { base64pdf } from "constants/PdfConstant";

//API Component
import {
  deleteCertificateData,
  createCertificate,
  getCertificateAllNew,
  getCertificateNext,
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
    const [landingLoading, setlandingLoading] = useState(true);

    // Select Certificate State
    const [selectedUser, SetSelectedUser] = useState(null);

    //Test data
    const arrayData = [
      { id: 1, pdf: FileTest, type: "view", selectedform: 1 },
      { id: 2, pdf: FileTest, type: "view", selectedform: 1 },
      { id: 3, pdf: FileTest, type: "view", selectedform: 1 },
    ];
    // CallBack Fetch CertificateAll
    const fetchCertifiateDataAll = (res) => {
      setPdfFile(res);
      setlandingLoading(!landingLoading);
      console.log("fech");
    };

    // CallBack handleCertificateNext
    const handleCertificateNext = (data) => {
      setPdfFile((oldArray) => [...oldArray, ...data]);
      console.log(hasMore);
      if (data.length === 0) setHasMore(false);
    };

    // CallBack handleCreateCertificate
    const handleCreateDocument = (res) => {
      setLoading(!loading);
      history.push(`/app/${auth_organization}/cert-display/${res.data.id}`);
    };
    // CallBack handleDuplicateCertificate
    const handleDuplicateCertificate = (res) => {
      setLoading(!loading);
      message.success("Document Duplicated");
    };

    // Generate DocumentShow
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
      console.log(data);
      let id = mongoose.Types.ObjectId();
      console.log(id.toString());
      const date = new Date();
      let document = JSON.parse(localStorage.getItem(PDF_LIST));
      let tmp = JSON.parse(localStorage.getItem(PDF_LIST));
      document = document.find((o) => o.certificate_id === data);
      console.log(document);
      document.certificate_id = id.toString();
      document.createdAt = date.toLocaleString();
      document.updatedAt = date.toLocaleString();
      setLoading(!loading);
      createCertificate(
        loading,
        document,
        generateToken()[1],
        handleDuplicateCertificate
      );
      tmp.push(document);
      setPdfFile(tmp);
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
    //View Document Select Drawer
    const onHandleSelect = (elm, created, updated, title, id) => {
      // setDrawer(true);
      console.log(id);
      SetSelectedUser({ elm, created, updated, title, id });
      setDrawer(true);
    };
    //Close Document Select Drawer
    const closeDrawer = () => {
      setDrawer(false);
      SetSelectedUser(null);
    };

    //UseEffect Fetch Certificate
    useEffect(() => {
      let isApiSubscribed = true;
      setTimeout(async () => {
        if (isApiSubscribed) {
          await getCertificateAllNew(
            fetchCertifiateDataAll,
            generateToken()[1],
            count
          );
        }
      }, 1000);
      return () => {
        // cancel the subscription
        isApiSubscribed = false;
      };
    }, []);
    useEffect(() => {
      // setCurrentFunctionList(pdfFile);
      localStorage.setItem(PDF_LIST, JSON.stringify(pdfFile));
      setPdfFile(pdfFile);
    }, [pdfFile, refresh]);
    return (
      <>
        <CertDrawer
          data={selectedUser}
          visible={drawer}
          close={() => {
            closeDrawer();
          }}
        />
        {landingLoading ? (
          <div
            style={{
              left: "50%",
              position: "absolute",
              height: "30rem",
              textAlign: "center",
              top: "50%",
            }}
          >
            <Loading loading={landingLoading} cover="content" />
          </div>
        ) : (
          <>
            {" "}
            {pdfFile ? (
              <InfinitScroll
                dataLength={pdfFile.length}
                hasMore={hasMore}
                loader={<Spin />}
                next={() => {
                  setStart(count + start);
                  getCertificateNext(
                    count,
                    start,
                    generateToken()[1],
                    handleCertificateNext
                  );
                }}
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
                      onClick={() => {
                        setLoading(true);
                        createCertificate(
                          loading,
                          {},
                          generateToken()[1],
                          handleCreateDocument
                        );
                      }}
                      className={`${loading ? "pointer-events" : ""}`}
                    >
                      <div>
                        <PDFTemplate
                          data={0}
                          certType="cert"
                          templateType="simple"
                          min={4}
                          max={9}
                          pdf={URL.createObjectURL(base64toBlobPdf(base64pdf))}
                          type={"create"}
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
                                <>
                                  <PDFTemplate
                                    index={i}
                                    {...{
                                      data: item.certificate_id,
                                      title: item?.title,
                                      certType: item.cert_type,
                                      createdAt: item.createdAt,
                                      updatedAt: item.updatedAt,
                                      templateType: item.template_type,
                                    }}
                                    min={4}
                                    max={9}
                                    type={"view"}
                                    pdfFile={pdfFile}
                                    setPdfFile={setPdfFile}
                                    onHandleSelect={onHandleSelect}
                                    pdf={generatePdfDocumentShow(item)}
                                    duplicateDocument={{
                                      onClick: function () {
                                        duplicateDocument(item?.certificate_id);
                                      },
                                    }}
                                    deleteRow={{
                                      onClick: function () {
                                        deleteRow(item?.certificate_id, i);
                                      },
                                    }}
                                  />
                                </>
                              ) : null}
                            </div>
                          </div>
                        </Col>
                      );
                    })}
                  </>
                </Row>{" "}
              </InfinitScroll>
            ) : null}
          </>
        )}
      </>
    );
  },
  (prevProps, nextProps) =>
    prevProps.pdfFile.length === nextProps.pdfFile.length
);

export default CertList;
