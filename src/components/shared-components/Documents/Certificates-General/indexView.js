import React from "react";
import ClassicTemplate from "./ClassicTemplate/ClassicTemplateList";
import ClassicTemplatePDF from "./ClassicTemplate/ClassicTemplatePDF";
import Paging from "./Viewing";

import { Textfit } from "react-textfit";

const index = (props) => {
  return (
    <>
      <Paging {...props} size={size} />
    </>
  );
};

export default index;
