import React from "react";
import DOMPurify from "dompurify";
import { Col, Row, Image } from "antd";
import RichText from "./RichText";
import Header from "./ContentView/Header";
import Body from "./ContentView/Body";
import Signature from "./ContentView/Signature";

import DraftToHtml from "components/util-components/DraftHtml";

const ClassicTemplateList = (props) => {
  const { data, max, min, width, lineHeight } = props;
  //  console.log(RichText({ note: data?.content }));
  let container = DraftToHtml(data);

  let clean = DOMPurify.sanitize(container);

  clean = clean.replaceAll("{NAME}", "MR & MRS RAFAEL S ESTEBAN");
  console.log(clean);
  return (
    <Row>
      <Header {...data} />
      <Body lineHeight={lineHeight} clean={clean} />
      <Signature {...data} />
    </Row>
  );
};

export default ClassicTemplateList;
