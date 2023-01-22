import React, { useEffect, useState } from "react";
import { DocumentList, IndulgancyList } from "./DocumentList";

import Paging from "./Paging";
//import { Textfit } from "react-textfit";

const index = React.memo(
  (props) => {
    const { type, pdf, certType } = props;
    const [getResolve, setGetResolve] = useState(null);

    let size = 9;
    let lineHeight = "16px";

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
            if (type == "view") {
              pdf.then(function (result) {
                setGetResolve(result);
                return result;
              });
            }
            if (type == "create" || type == "drawer" || type == "template") {
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
          type == "template" ||
          type == "create" ? (
            <>
              <Paging {...props} size={size} type={type} pdf={getResolve} />
            </>
          ) : (
            <>
              {certType == "cert" ? (
                <>
                  <DocumentList
                    type={type}
                    {...props}
                    lineHeight={lineHeight}
                  />
                </>
              ) : certType == "blotter" ? (
                <></>
              ) : certType == "business" ? (
                <></>
              ) : certType == "indulgancy" ? (
                <>
                  {" "}
                  <IndulgancyList
                    type={type}
                    {...props}
                    lineHeight={lineHeight}
                  />
                </>
              ) : null}
            </>
          )}
        </>
      </>
    );
  },
  (prevProps, nextProps) =>
    prevProps.pdf === nextProps.pdf ||
    prevProps.templateId === nextProps.templateId ||
    prevProps.template_type === nextProps.template_type
);

export default index;
