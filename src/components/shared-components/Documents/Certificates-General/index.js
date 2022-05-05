import React, { useEffect, useState } from "react";
import ClassicTemplate from "./ClassicTemplate/ClassicTemplateList";
import ClassicTemplatePDF from "./ClassicTemplate/ClassicTemplatePDF";
import Paging from "./Paging";
import { Textfit } from "react-textfit";

const index = (props) => {
  const { selectedForm, type, pdf } = props;
  const [getResolve, setGetResolve] = useState(null);
  let size = 9;
  let lineHeight = "16px";
  const ratio = 1.41451612903;

  useEffect(() => {
    let cancel = true;

    if (cancel)
      if (getResolve != pdf)
        setTimeout(() => {
          if (type == "form") {
            pdf.then(function (result) {
              setGetResolve(result);
              return result;
            });
          }
          if (type == "view" || type == "create" || type == "drawer") {
            setGetResolve(pdf);
          }
        }, 1100);
    return () => {
      cancel = false;
      setGetResolve();
    };
  }, []);
  const SelectedForm = (props) => {};
  return (
    <>
      {type == "form" ||
      type == "view" ||
      type == "drawer" ||
      type == "create" ? (
        <>
          {/* React View Pdf */}

          {selectedForm == 1 ? (
            <Paging {...props} size={size} type={type} pdf={getResolve} />
          ) : null}
        </>
      ) : (
        <>
          {selectedForm == 1 ? (
            <ClassicTemplatePDF
              type={type}
              {...props}
              lineHeight={lineHeight}
            />
          ) : null}
        </>
      )}
    </>
  );
};

export default index;
