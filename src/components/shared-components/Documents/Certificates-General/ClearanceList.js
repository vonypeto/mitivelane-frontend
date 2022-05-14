import React from "react";
import ClassicTemplatePDF from "./ClassicTemplate/ClassicTemplatePDF";

const ClearanceList = (props) => {
  const { templateType } = props;
  console.log(props);
  const Templates = (type) => {
    switch (type.type) {
      case "simple_border":
        return <ClassicTemplatePDF {...props} />;
      case "1":
        return <ClassicTemplatePDF {...props} />;
      case "1":
        return <ClassicTemplatePDF {...props} />;
      case "1":
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
