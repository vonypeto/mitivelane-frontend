import { timeSince } from "./Formula";
import { Skeleton, Card, Col, Row, Menu, Button, Input } from "antd";

export const TemplateType = (data) => {
  const templateType = data.templateType;
  switch (templateType) {
    case "simple_border":
      return <div className="text-center">Classic Bordered</div>;
    case "simple_no_border":
      return <div className="text-center">Classic Borderless</div>;
  }
};

export const TypeView = (props) => {
  const {
    type,
    pageNumber,
    numPages,
    previousPage,
    updateTitle,
    updatedAt,
    title,
    myInp,
    templateType,
    nextPage,
  } = props;
  return (
    <>
      {type == "form" ? (
        <>
          <div className="text-center">
            <p>
              Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
            </p>
            {numPages == 1 ? null : (
              <Row gutter={16} justify="center">
                <Col>
                  <Button
                    type="button"
                    disabled={pageNumber <= 1}
                    onClick={previousPage}
                  >
                    Previous
                  </Button>
                </Col>
                <Col>
                  <Button
                    type="button"
                    disabled={pageNumber >= numPages}
                    onClick={nextPage}
                  >
                    Next
                  </Button>
                </Col>
              </Row>
            )}
          </div>
        </>
      ) : type == "view" ? (
        <Row style={{ marginTop: "-15px" }}>
          <Col className="pl-3 cert-font-buttom">
            <p>
              <b>
                <Input
                  ref={myInp}
                  style={{
                    border: "none",
                    textAlign: "left",
                    padding: "0",
                    width: "100%",
                    backgroundColor: "#FAFAFB",
                    margin: 0,
                    fontWeight: 900,
                  }}
                  className="cert-name "
                  defaultValue={title}
                  placeholder="Title"
                  onChange={(e) => {
                    updateTitle(e);
                  }}
                />
              </b>
            </p>
            <p>Edited {timeSince(updatedAt)} ago</p>
          </Col>
        </Row>
      ) : type == "template" ? (
        <div>
          <TemplateType templateType={templateType} />{" "}
        </div>
      ) : type == "drawer" ? (
        <></>
      ) : null}
    </>
  );
};
