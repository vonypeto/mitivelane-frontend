import React, { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;
import { Skeleton, Card, Col, Row, Menu, Button, Input } from "antd";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
  ArrowDownOutlined,
  HighlightOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { AUTH_BARANGAY } from "redux/constants/Auth";

const SinglePage = (props) => {
  const [numPages, setNumPages] = useState(null);
  const documentWrapperRef = useRef();
  const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page
  const { pdf, type } = props;
  const [renderedPageNumber, setRenderedPageNumber] = useState(null);
  let history = useHistory();
  // const data = useMemo(() => ({ pdf }), [pdf]);

  function handleClick(pdf) {
    props.counterClick(pdf);
  }

  useEffect(() => {
    return () => {
      setPageNumber();
    };
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }
  const onHandle = (pdf, type) => {
    switch (type) {
      case "create":
        break;
      case "view":
        props.onHandle(pdf);
        break;
      case "drawer":
        break;
      case "form":
        break;
    }
  };
  //  const isLoading = renderedPageNumber !== pageNumber;
  // const [width, setWidth] = React.useState(0);

  // React.useLayoutEffect(() => {
  //   setTimeout(
  //     () => setWidth(documentWrapperRef.current?.getBoundingClientRect().width),
  //     200
  //   );
  // });
  // useEffect(() => {
  //   let cancel = true;

  //   console.log(getResolve);
  //   if (cancel)
  //     if (getResolve != pdf)
  //       setTimeout(() => {
  //         if (type == "form") {
  //           pdf.then(function (result) {
  //             setGetResolve(result);
  //             return result;
  //           });
  //         }
  //         if (type == "view") {
  //           setGetResolve(pdf);
  //         }
  //       }, 1100);
  //   return () => {
  //     cancel = false;
  //     setGetResolve();
  //   };
  // }, [pdf]);
  // console.log(getResolve);

  ///https://codesandbox.io/s/react-pdf-prevent-flash-with-scale-forked-203c03?file=/src/App.js:2502-2517

  const navigateData = (data) => {
    console.log(data);
    return history.push(
      `/app/${localStorage.getItem(AUTH_BARANGAY)}/cert-display/${data}`
    );
  };
  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item onClick={() => navigateData(row.data)} key={1}>
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
  const TypeView = (props) => {
    const { type } = props;
    return (
      <>
        {type == "form" ? (
          <>
            <div className="text-center">
              <p>
                Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
              </p>
              {numPages == 1 ? null : (
                <Row gutter={16} justify="center">
                  <Col>
                    <Button
                      type="button"
                      disabled={pageNumber <= 1}
                      onClick={previousPage}
                    >
                      Previous
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      type="button"
                      disabled={pageNumber >= numPages}
                      onClick={nextPage}
                    >
                      Next
                    </Button>
                  </Col>
                </Row>
              )}
            </div>
          </>
        ) : type == "view" ? (
          <Row style={{ marginTop: "-15px" }}>
            <Col className="pl-3 cert-font-buttom">
              <p>
                <b>
                  <Input
                    style={{
                      border: "none",
                      textAlign: "left",
                      padding: "0",
                      width: "100%",

                      backgroundColor: "#FAFAFB",
                      margin: 0,
                      fontWeight: 900,
                    }}
                    className="cert-name "
                    defaultValue="Untitled 1"
                  />
                </b>
              </p>
              <p>Edited 1 seconds ago</p>
            </Col>
          </Row>
        ) : type == "drawer" ? (
          <></>
        ) : type == "drawer" ? (
          <></>
        ) : null}
      </>
    );
  };
  const PdfRender = (data) => {
    return (
      <>
        <>
          <div
            id="ResumeContainer"
            style={{ position: "relative" }}
            ref={documentWrapperRef}
          >
            <div
              onClick={() => onHandle(data.pdf, data.type)}
              style={{
                cursor: "pointer",
              }}
            >
              <Document
                className={"PDFDocument"}
                file={{ url: data.pdf }}
                onLoadSuccess={onDocumentLoadSuccess}
                key={renderedPageNumber}
                loading={
                  <Card className="cert_loading">
                    <Skeleton
                      size={"small"}
                      paragraph={{ rows: 9 }}
                      className="position-absolute h-100 w-100 cert_loading"
                    ></Skeleton>

                    <div className="react-pdf__Document PDFDocument">
                      <div
                        className="react-pdf__Page PDFPageOne PDFPageTwo"
                        data-page-number="1"
                        style={{ position: "relative" }}
                      >
                        <canvas
                          className="react-pdf__Page__canvas"
                          dir="ltr"
                          width="1192"
                          height="1684"
                          style={{
                            display: "block",
                            userSelect: "none",
                            width: "596px",
                            height: "842px",
                          }}
                        ></canvas>

                        <div className="react-pdf__Page__annotations annotationLayer"></div>
                      </div>
                    </div>
                  </Card>
                }
              >
                {/* {isLoading && renderedPageNumber ? (
                  <Page
                    //   width={width || undefined}
                    key={renderedPageNumber}
                    className={
                      "PDFPageOne prevPage " +
                      (type == "create" ? "PDFPageTwo" : " PDFPage") +
                      ""
                    }
                    renderTextLayer={false}
                    renderInteractiveForms={false}
                    pageNumber={pageNumber}
                    loading={
                      <Card className="cert_loading">
                        <Skeleton
                          size={"small"}
                          paragraph={{ rows: 9 }}
                          className="position-absolute h-100 w-100 cert_loading"
                        ></Skeleton>

                        <div className="react-pdf__Document PDFDocument">
                          <div
                            className="react-pdf__Page PDFPageOne PDFPageTwo"
                            data-page-number="1"
                            style={{ position: "relative" }}
                          >
                            <canvas
                              className="react-pdf__Page__canvas"
                              dir="ltr"
                              width="1192"
                              height="1684"
                              style={{
                                display: "block",
                                userSelect: "none",
                                width: "596px",
                                height: "842px",
                              }}
                            ></canvas>

                            <div className="react-pdf__Page__annotations annotationLayer"></div>
                          </div>
                        </div>
                      </Card>
                    }
                  >
                    <div>
                      <div className="text-right">
                        <div
                          className="border bottomright "
                          style={{
                            borderRadius: "50%",
                            backgroundColor: "white",
                          }}
                        >
                          {type == "view" ? (
                            <div
                              onClick={(e) => e.stopPropagation()}
                              className="children"
                            >
                              {" "}
                              <EllipsisDropdown
                                placement="topRight"
                                menu={dropdownMenu()}
                              />
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </Page>
                ) : null} */}

                <Page
                  //   width={width || undefined}
                  className={
                    "PDFPageOne  " +
                    (type == "create" ? "PDFPageTwo" : " PDFPage") +
                    ""
                  }
                  renderTextLayer={false}
                  key={renderedPageNumber}
                  renderInteractiveForms={false}
                  pageNumber={pageNumber}
                  onRenderSuccess={() => {
                    setRenderedPageNumber(pageNumber);
                  }}
                >
                  <div>
                    <div className="text-right">
                      <div
                        className="border bottomright "
                        style={{
                          borderRadius: "50%",
                          backgroundColor: "white",
                        }}
                      >
                        {type == "view" ? (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="children"
                          >
                            {" "}
                            <EllipsisDropdown
                              placement="topRight"
                              menu={dropdownMenu(data)}
                            />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </Page>
              </Document>
            </div>
            <TypeView type={type} />
          </div>
        </>
      </>
    );
  };
  return (
    <>
      <PdfRender pdf={pdf} type={type} {...props} />
    </>
  );
};
export default React.memo(SinglePage);
