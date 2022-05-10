import React, { useEffect, useState, useMemo } from "react";
import ClassicTemplate from "./ClassicTemplate/ClassicTemplateList";
import ClassicTemplatePDF from "./ClassicTemplate/ClassicTemplatePDF";
import Clearances from "./ClearanceList";
import Paging from "./Paging";
import { Textfit } from "react-textfit";

const index = React.memo(
  (props) => {
    const { selectedForm, type, pdf, certType } = props;
    //    console.log("Rendering", props);
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
    return (
      <>
        <>
          {type == "form" ||
          type == "view" ||
          type == "drawer" ||
          type == "create" ? (
            <>
              <Paging {...props} size={size} type={type} pdf={getResolve} />
            </>
          ) : (
            <>
              {certType == "cert" ? (
                <>
                  <Clearances type={type} {...props} lineHeight={lineHeight} />
                </>
              ) : certType == "blotter" ? (
                <></>
              ) : certType == "business" ? (
                <></>
              ) : null}
            </>
          )}
        </>
      </>
    );
  },
  (prevProps, nextProps) => prevProps.pdf === nextProps.pdf
);

export default index;
