import React, { useState, useEffect, useRef } from "react";

// PDF Component
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;
// AntD Component
import { Skeleton, Card, Col, Row, Menu, Button, Input } from "antd";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import DocumentLoading from "components/shared-components/DocumentLoading";
import Flex from "components/shared-components/Flex";
import {
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
  ArrowDownOutlined,
  HighlightOutlined,
} from "@ant-design/icons";
// Libraries
import debounce from "lodash.debounce";
import { saveAs } from "file-saver";
import { useHistory } from "react-router-dom";
import { timeSince } from "helper/Formula";
import { TypeView } from "helper/CertificateFunction";

// Middleware
import { AUTH_ORGANIZATION } from "redux/constants/Auth";

const SinglePage = React.memo(
  (props) => {
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
      onHandleDocument,
    } = props;

    let myInp = useRef(null);
    let history = useHistory();
    let id = data;
    // Page State
    const [renderedPageNumber, setRenderedPageNumber] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const documentWrapperRef = useRef();
    const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page
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
          props.onHandleSelect(pdf, createdAt, updatedAt, title, id);
          break;
        case "drawer":
          break;
        case "form":
          break;
        case "template":
          break;
      }
    };

    //navigate edit
    const navigateData = (data) => {
      return history.push(
        `/app/${localStorage.getItem(AUTH_ORGANIZATION)}/cert-display/${data}`
      );
    };
    //update title
    const updateTitle = debounce((e) => {
      onHandleDocument(e.target.value, id);
    }, 1000);
    // Dowload pdf
    const downloadFile = () => {
      saveAs(pdf, title);
    };
    // Delete Pdf
    const DeleteFile = () => {
      deleteRow.onClick();
    };
    // duplicate pdf
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
            myInp.current.focus();
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
      </Menu>
    );

    // Certificate Config
    const typeViewData = {
      type: type,
      pageNumber: pageNumber,
      numPages: numPages,
      updateTitle: updateTitle,
      updatedAt: updatedAt,
      title: title,
      templateType: templateType,
      myInp,
      nextPage: nextPage,
      previousPage: previousPage,
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
                  loading={<DocumentLoading />}
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
              <TypeView {...typeViewData} />
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
  },
  (prevProps, nextProps) => prevProps === nextProps
);
export default React.memo(SinglePage);
