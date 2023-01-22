import React from "react";
import ClassicTemplate from "./Certificate/ClassicTemplate/ClassicTemplateList";
import ClassicTemplatePDF from "./Certificate/ClassicTemplate/ClassicTemplatePDF";
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
