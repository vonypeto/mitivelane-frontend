import React from "react";
// Clearance
import CertificateClassicTemplatePDF from "./Certificate/ClassicTemplate/ClassicTemplatePDF";
import CertificateClassicNoBorderPDF from "./Certificate/ClassicNoBorder/ClassicNoBorderTemplatePDF";
// Indulgancy
import IndulgancyClassicTemplatePDF from "./Indulgancy/ClassicTemplate/ClassicTemplatePDF";
import IndulgancyClassicNoBorderPDF from "./Indulgancy/ClassicNoBorder/ClassicNoBorderTemplatePDF";
export const DocumentList = (props) => {
  const { templateType } = props;
  // console.log(props);
  const Templates = (type) => {
    switch (type.type) {
      case "simple_border":
        return <CertificateClassicTemplatePDF {...props} />;
      case "simple_no_border":
        return <CertificateClassicNoBorderPDF {...props} />;
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
export const IndulgancyList = (props) => {
  const { templateType } = props;
  // console.log(props);
  const Templates = (type) => {
    switch (type.type) {
      case "simple_border":
        return <IndulgancyClassicTemplatePDF {...props} />;
      case "simple_no_border":
        return <IndulgancyClassicNoBorderPDF {...props} />;
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
