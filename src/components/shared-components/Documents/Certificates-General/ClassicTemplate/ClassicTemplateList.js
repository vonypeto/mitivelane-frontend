import React from "react";
import DOMPurify from "dompurify";
import { Col, Row, Image } from "antd";

const ClassicTemplateList = (props) => {
  const { data, max, min, width, lineHeight } = props;
  let content = data?.content;
  let numberRow = content?.blocks.length - 1;
  let container;
  let inlineStyle;
  let dynamicDiv = [];
  container = '<span style="text-align: justify; line-height: 16px;">';
  // console.log(inlineStyle?.filter((set) => set.offset == 3));
  for (var k = 0; k <= numberRow; k++) {
    container += "<span > <br/>";

    for (var i = 0; i <= content?.blocks[k].text.length; i++) {
      inlineStyle = content?.blocks[k].inlineStyleRanges;
      if (content?.blocks[k].text[i]) {
        //Start of InlineStyle
        if (inlineStyle?.filter((set) => set.offset == i)) {
          const data = inlineStyle?.filter((set) => set.offset == i);
          if (data.length >= 1) {
            dynamicDiv.push({ key: i, length: Number(data[0]?.length) });

            container += '<span id="!" style="';
            //Multiple Style
            for (var s = 0; s < data.length; s++) {
              if (data[s]?.style.includes("font-family")) {
              } else {
                if (data[s]?.style == "BOLD") {
                  container += `font-weight: 700;`;
                } else if (data[s]?.style == "italic") {
                }
              }
            }
            container += '">';
          }
        }
        // Character Output
        container += `${content?.blocks[k].text[i]}`;
        // End of InlineStyle
        for (var a = 0; a < dynamicDiv.length; a++) {
          dynamicDiv[a].length = dynamicDiv[a]?.length - 1;
          if (dynamicDiv[a]?.length == 0) {
            container += "</span>";
          }
        }
      }
      //  console.log(content?.blocks[k].text[i]);
    }
    container += "<br /></span>";
  }
  container += "</span>";
  let clean = DOMPurify.sanitize(container);

  clean = clean.replaceAll("{NAME}", "MR & MRS RAFAEL S ESTEBAN");
  console.log(clean);
  return (
    <Row>
      <Col
        className="text-center "
        style={{
          float: "right",
          marginLeft: "auto",
          marginRight: 0,
        }}
        xs={6}
        sm={6}
        md={6}
        lg={6}
        xl={6}
      >
        <Image
          style={{
            height: "20%",
            width: "80%",
            float: "right",
            marginLeft: "auto",
            marginRight: 0,
          }}
          className="rounded"
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
      </Col>
      <Col xs={12} sm={12} md={12} lg={12} xl={12}>
        <div className="text-center ">
          <b>Republic of the Philippines</b> <br />
          <b>Province of ____</b> <br />
          <b>Municipality of _____</b> <br />
          <b>Barangay ______</b> <br />
          <b>Office of the ________</b> <br /> <br /> <br />
          {/* <b style={{ letterSpacing: 2 }}>BARANGAY CLEARANCE</b> */}
        </div>
      </Col>
      <Col
        xs={6}
        sm={6}
        md={6}
        lg={6}
        xl={6}
        className="text-center"
        style={{ float: "left" }}
      >
        <Image
          style={{ height: "20%", width: "80%" }}
          className="rounded"
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
      </Col>

      <Col className="text-center" xs={24} sm={24} md={24} lg={24} xl={24}>
        <b style={{ letterSpacing: 2 }}>BARANGAY CLEARANCE</b>
      </Col>
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        {/* Normal Line Height 16px */} <br />
        <div>TO WHOM IT CONCERN</div>
        <div style={{ textAlign: "justify", lineHeight: lineHeight }}>
          <div dangerouslySetInnerHTML={{ __html: clean }} />
          {/*  <span>
            This is to certify that
            <b> MR & MRS RAFAEL S ESTEBAN </b>is to bonafide resident of
            Barangay Fiesishare, talisay, Batangas.
          </span>
          <br />
          <br />
          <span>
            This certification issued upon the request of
            <b> MR & MRS RAFAEL S ESTEBAN </b> and whatever legal purpose this
            may serve him/her best
          </span>
          <br />
          <br />
          <span>
            Issuied thus 14th day if January, 2020 at Barangay BUhangin Proper,
            Davo CIty, Philippines
          </span>*/}
        </div>
      </Col>

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
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <br />
          <span>OR No. _______</span> <br />
          <span>Issued at ______</span>
          <br />
          <span>Issued on ______</span>
          <br />
          <div className="text-center">
            <br />
            <span>
              <i>
                Note not valid with erasures and without the official seal of
                issuing office
              </i>
            </span>
          </div>
        </Col>
      </Col>
    </Row>
  );
};

export default ClassicTemplateList;
