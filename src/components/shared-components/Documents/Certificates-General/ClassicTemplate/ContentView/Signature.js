import React from "react";
import { Col, Row, Image } from "antd";
import Footer from "./Footer";

const Signature = (data) => {
  return (
    <>
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <Row justify="end" className="text-center">
          <Col span={12}>
            <div
              style={{
                // backgroundImage:
                //   "url(https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png)",
                backgroundPosition: "top",
                backgroundSize: "50px",
                backgroundRepeat: "no-repeat ",
              }}
              className="text-center "
            >
              <br />

              <Image
                src="/img/signature.png"
                style={{
                  width: "50%",

                  marginBottom: -12,
                  alignSelf: "center",
                  display: "inline",
                }}
              />
              <br />
              {/* </div> */}
              <span
                style={{
                  opacity: 0.9,
                  whiteSpace: "pre",
                  marginTop: -10,
                  paddingTop: -10,
                }}
              >
                ______________ <br />
                Applicant Signature
              </span>
            </div>
          </Col>
        </Row>
        <Footer {...data} />
      </Col>
    </>
  );
};

export default Signature;
