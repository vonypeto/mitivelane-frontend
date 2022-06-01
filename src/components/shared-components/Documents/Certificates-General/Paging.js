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
import { AUTH_ORGANIZATION } from "redux/constants/Auth";
import debounce from "lodash.debounce";
import { saveAs } from "file-saver";
import { useCert } from "contexts/CertificateContext";

const SinglePage = React.memo(
  (props) => {
    //  const { currentList } = useCert();
    let myInp = null;
    let history = useHistory();
    const [numPages, setNumPages] = useState(null);
    const documentWrapperRef = useRef();
    const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page
    const {
      data,
      pdf,
      type,
      templateType,
      updatedAt,
      createdAt,
      title,
      deleteRow,
      duplicateDocument,
    } = props;
    let id = data;
    const [renderedPageNumber, setRenderedPageNumber] = useState(null);

    // const data = useMemo(() => ({ pdf }), [pdf]);

    // function handleClick(pdf) {
    //   props.counterClick(pdf);
    // }
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
          props.onHandle(pdf, createdAt, updatedAt, title);
          break;
        case "drawer":
          break;
        case "form":
          break;
        case "template":
          break;
      }
    };

    ///https://codesandbox.io/s/react-pdf-prevent-flash-with-scale-forked-203c03?file=/src/App.js:2502-2517
    const timeSince = (date) => {
      var time = new Date(date);
      var seconds = Math.floor((new Date() - time) / 1000);
      // seconds -= +28800;
      var interval = seconds / 31536000;
      if (interval > 1) {
        return Math.floor(interval) + " years";
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        return Math.floor(interval) + " months";
      }
      interval = seconds / 86400;
      if (interval > 1) {
        return Math.floor(interval) + " days";
      }
      interval = seconds / 3600;
      if (interval > 1) {
        return Math.floor(interval) + " hours";
      }
      interval = seconds / 60;
      if (interval > 1) {
        return Math.floor(interval) + " minutes";
      }
      return Math.floor(seconds) + " seconds";
    };
    //navigate edit
    const navigateData = (data) => {
      return history.push(
        `/app/${localStorage.getItem(AUTH_ORGANIZATION)}/cert-display/${data}`
      );
    };
    //update title
    const updateTitle = debounce((e) => {
      props.onHandleDocument(e.target.value, id);
    }, 1000);
    const downloadFile = () => {
      saveAs(pdf, title);
    };
    const DeleteFile = () => {
      deleteRow.onClick();
    };
    const duplicateFile = () => {
      duplicateDocument.onClick();
    };
    const dropdownMenu = (row) => (
      <Menu>
        <Menu.Item onClick={() => navigateData(row.data)} key={1}>
          <Flex alignItems="center">
            <EditOutlined />
            <span className="ml-2"> Edit</span>
          </Flex>
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            myInp.focus();
          }}
          key={2}
        >
          <Flex alignItems="center">
            <HighlightOutlined />
            <span className="ml-2">Rename</span>
          </Flex>
        </Menu.Item>
        <Menu.Item key={3}>
          <Flex alignItems="center">
            <ArrowDownOutlined />
            <span className="ml-2" onClick={() => downloadFile()}>
              Download
            </span>
          </Flex>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item onClick={() => DeleteFile()} key={4}>
          <Flex alignItems="center">
            <DeleteOutlined />
            <span className="ml-2">Delete</span>
          </Flex>
        </Menu.Item>
        <Menu.Item onClick={() => duplicateFile()} key={5}>
          <Flex alignItems="center">
            <CopyOutlined />
            <span className="ml-2">Duplicate</span>
          </Flex>
        </Menu.Item>
        <Menu.Item onClick={() => {}} key={6}>
          <Flex alignItems="center">
            <CopyOutlined />
            <span className="ml-2">Active</span>
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
                  Page {pageNumber || (numPages ? 1 : "--")} of{" "}
                  {numPages || "--"}
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
                      ref={(ip) => (myInp = ip)}
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
                      defaultValue={title}
                      placeholder="Title"
                      onChange={(e) => {
                        updateTitle(e);
                      }}
                    />
                  </b>
                </p>
                <p>Edited {timeSince(updatedAt)} ago</p>
              </Col>
            </Row>
          ) : type == "template" ? (
            <div>
              <TemplateType />
            </div>
          ) : type == "drawer" ? (
            <></>
          ) : null}
        </>
      );
    };
    const TemplateType = () => {
      switch (templateType) {
        case "simple_border":
          return <div className="text-center">Classic Bordered</div>;
        case "simple_noBorder":
          return <div className="text-center">Classic Borderless</div>;
      }
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
                onClick={() => {
                  if (numPages) onHandle(data.pdf, data.type);
                }}
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
                        paragraph={{ rows: 7 }}
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
                              height: "852px",
                            }}
                          ></canvas>

                          <div className="react-pdf__Page__annotations annotationLayer"></div>
                        </div>
                      </div>
                    </Card>
                  }
                >
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
        <PdfRender pdf={pdf} type={type} {...props} />{" "}
      </>
    );
  },
  (prevProps, nextProps) => prevProps === nextProps
);
export default React.memo(SinglePage);
