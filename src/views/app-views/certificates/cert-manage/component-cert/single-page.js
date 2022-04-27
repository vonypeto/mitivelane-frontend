import React, { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;
import { Card, Col, Row, Image, Button } from "antd";

const SinglePage = (props) => {
  const [numPages, setNumPages] = useState(null);
  const documentWrapperRef = useRef();
  const [getResolve, setGetResolve] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page

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

  let { pdf } = props;

  useEffect(() => {
    let cancel = true;
    if (cancel)
      setTimeout(() => {
        let data = pdf.then(function (result) {
          setGetResolve(result);
          return result;
        });
        console.log(data);
      }, 1100);
    return () => {
      cancel = false;
      setGetResolve();
    };
  }, [pdf]);

  const PdfRender = React.memo(({ pdf }) => {
    console.log(pdf);
    return (
      <>
        {pdf ? (
          <>
            {" "}
            <div id="ResumeContainer" ref={documentWrapperRef}>
              <Document
                renderMode="svg"
                className={"PDFDocument"}
                file={{ url: pdf }}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page
                  width={
                    documentWrapperRef.current?.getBoundingClientRect().width ||
                    undefined
                  }
                  className={"PDFPage PDFPageOne"}
                  renderTextLayer={false}
                  renderInteractiveForms={false}
                  pageNumber={pageNumber}
                />
              </Document>
              {type == "view" ? (
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
              ) : null}
            </div>
          </>
        ) : null}
      </>
    );
  });
  return (
    <>
      <PdfRender pdf={getResolve} />
    </>
  );
};
export default React.memo(SinglePage);
