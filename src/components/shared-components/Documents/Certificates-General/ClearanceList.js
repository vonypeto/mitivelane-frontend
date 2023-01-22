import React from "react";
import ClassicTemplatePDF from "./Certificate/ClassicTemplate/ClassicTemplatePDF";
import ClassicNoBorderPDF from "./Certificate/ClassicNoBorder/ClassicNoBorderTemplatePDF";

const ClearanceList = (props) => {
  const { templateType } = props;
  // console.log(props);
  const Templates = (type) => {
    switch (type.type) {
      case "simple_border":
        return <ClassicTemplatePDF {...props} />;
      case "simple_no_border":
        return <ClassicNoBorderPDF {...props} />;
      case "1":
        return <ClassicTemplatePDF {...props} />;
      case "1":
        return <ClassicTemplatePDF {...props} />;
      default:
        return <ClassicTemplatePDF {...props} />;
    }
  };
  return (
    <>
      <Templates type={templateType} />
    </>
  );
};

export default ClearanceList;
