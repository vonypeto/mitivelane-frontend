import React from "react";
import DOMPurify from "dompurify";
import { Col, Row, Image } from "antd";
import RichText from "./RichText";
import Header from "./ContentView/Header";
import Body from "./ContentView/Body";

const draftTohtml = (data) => {
  let content = data?.content;
  let numberRow = content?.blocks.length - 1;
  let container;
  let inlineStyle;
  let dynamicDiv = [];
  let type = "span";
  container = `<${type} style="text-align: justify;text-indent: 50px; line-height: 16px;">`;
  // console.log(inlineStyle?.filter((set) => set.offset == 3));
  for (var k = 0; k <= numberRow; k++) {
    container += `<${type} > <br/>`;

    for (var i = 0; i <= content?.blocks[k].text.length; i++) {
      inlineStyle = content?.blocks[k].inlineStyleRanges;
      if (content?.blocks[k].text[i]) {
        //Start of InlineStyle
        if (inlineStyle?.filter((set) => set.offset == i)) {
          const data = inlineStyle?.filter((set) => set.offset == i);
          if (data.length >= 1) {
            dynamicDiv.push({ key: i, length: Number(data[0]?.length) });

            container += `<${type} id="!" style="text-indent: 50px;`;
            //Multiple Style
            for (var s = 0; s < data.length; s++) {
              if (data[s]?.style.includes("font-family")) {
              } else {
                if (data[s]?.style == "BOLD") {
                  container += `font-weight: 700;`;
                  //Continue this
                } else if (data[s]?.style == "ITALIC") {
                  container += `font-style: italic;`;
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
            container += `</${type}>`;
          }
        }
      }
      //  console.log(content?.blocks[k].text[i]);
    }
    container += `<br /></${type}>`;
  }
  container += `</${type}>`;
  return container;
};
const ClassicTemplateList = (props) => {
  const { data, max, min, width, lineHeight } = props;
  //  console.log(RichText({ note: data?.content }));
  let container = draftTohtml(data);

  let clean = DOMPurify.sanitize(container);

  clean = clean.replaceAll("{NAME}", "MR & MRS RAFAEL S ESTEBAN");
  console.log(clean);
  return (
    <Row>
      <Header {...data} />
      <Body lineHeight={lineHeight} clean={clean} />
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        {/* Normal Line Height 16px */} <br />
        <div>TO WHOM IT CONCERN</div>
        {/* <RichText note={!clean ? "<h1></h1>" : clean} /> */}
        <div style={{ textAlign: "justify", lineHeight: lineHeight }}>
          <div dangerouslySetInnerHTML={{ __html: clean }} />
          <span>
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
          </span>
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
