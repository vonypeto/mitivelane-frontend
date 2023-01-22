import React from "react";
import { Skeleton, Card } from "antd";
export const DocumentLoading = () => {
  return (
    <>
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
    </>
  );
};

export default DocumentLoading;
