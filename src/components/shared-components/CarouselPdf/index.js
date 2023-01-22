import React from "react";
import { Card, Col } from "antd";
import PDFTemplate from "components/shared-components/Documents";
import { Carousel } from "@trendyol-js/react-carousel";

const CarouselPdf = (props) => {
  const { onHandleTemplateChange, templateState, certType } = props;
  return (
    <div>
      <div className="container nav-profile template-dropdown nav-dropdown">
        <div className="nav-profile-header-n">
          <div className="d-flex" style={{ display: "inline-block" }}>
            <Col lg={24}>
              <Card>
                {certType == "cert" ? (
                  <Carousel
                    show={3.5}
                    slide={2}
                    swiping={true}
                    responsive={true}
                    dynamic={true}
                    className="exampleCarousel1"
                    style={{ display: "inline-block" }}
                  >
                    {templateState.map((item) => {
                      return (
                        <Col
                          onClick={(e) =>
                            onHandleTemplateChange(e, item.templateType)
                          }
                          key={item.template_id}
                          xs={18}
                          sm={18}
                          md={18}
                          lg={18}
                          xl={18}
                          xxl={18}
                          justify="center"
                        >
                          <PDFTemplate
                            style={{ cursor: "pointer" }}
                            templateId={item.template_id}
                            certType="cert"
                            templateType={item.templateType}
                            min={4}
                            max={9}
                            pdf={item.pdf}
                            type={"template"}
                          />
                        </Col>
                      );
                    })}
                  </Carousel>
                ) : certType == "blotter" ? (
                  <Carousel
                    show={3.5}
                    slide={2}
                    swiping={true}
                    responsive={true}
                    dynamic={true}
                    className="exampleCarousel1"
                    style={{ display: "inline-block" }}
                  >
                    {templateState.map((item) => {
                      return (
                        <Col
                          key={item.template_id}
                          xs={18}
                          sm={18}
                          md={18}
                          lg={18}
                          xl={18}
                          xxl={18}
                          justify="center"
                        >
                          <PDFTemplate
                            templateId={item.template_id}
                            certType="cert"
                            templateType={item.templateType}
                            min={4}
                            max={9}
                            pdf={item.pdf}
                            type={"template"}
                          />
                        </Col>
                      );
                    })}
                  </Carousel>
                ) : null}
              </Card>
            </Col>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselPdf;
