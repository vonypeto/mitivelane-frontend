import React, { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;
import { Card, Col, Row, Menu, Button, Input } from "antd";
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
const SinglePage = (props) => {
  const [numPages, setNumPages] = useState(null);
  const documentWrapperRef = useRef();
  const [getResolve, setGetResolve] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page

  const { pdf, type } = props;
  console.log(props);
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
  const [counter, setCounter] = useState(1);
  console.log(counter);
  function handleClick() {
    props.counterClick();
  }
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
        ) : null}
      </>
    );
  };

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

  const [width, setWidth] = React.useState(0);

  React.useLayoutEffect(() => {
    setTimeout(
      () => setWidth(documentWrapperRef.current?.getBoundingClientRect().width),
      200
    );
  });
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

  const PdfRender = React.memo((data) => {
    console.log(data.pdf);
    return (
      <>
        <>
          <div
            id="ResumeContainer"
            style={{ position: "relative" }}
            ref={documentWrapperRef}
          >
            <Document
              //   renderMode="svg"
              className={"PDFDocument"}
              file={{ url: data.pdf }}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page
                //   width={width || undefined}
                className={"PDFPage PDFPageOne"}
                renderTextLayer={false}
                renderInteractiveForms={false}
                pageNumber={pageNumber}
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
                      <EllipsisDropdown
                        placement="topRight"
                        menu={dropdownMenu()}
                      />
                    </div>
                  </div>
                </div>
              </Page>
            </Document>
            <TypeView type={type} /> {counter}
          </div>
        </>
      </>
    );
  });
  return (
    <>
      <PdfRender pdf={pdf} />{" "}
      <Button
        type="button"
        onClick={() => {
          handleClick();
        }}
      >
        sadas
      </Button>
    </>
  );
};
export default React.memo(SinglePage);
