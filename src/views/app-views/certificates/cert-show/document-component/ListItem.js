import React from "react";
import PropTypes from "prop-types";
import MUIListItem from "@material-ui/core/ListItem";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Row, Col } from "antd";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, EditorState } from "draft-js";
import { getBase64, dummyRequest, beforeUpload } from "helper/Formula.js";
import NormalForm from "./Forms/NormalFrom";
const ListItem = (props) => {
  const {
    setParentData,
    parentData,
    MAX_LENGTH,
    data,
    setDropDownForm,
    form,
    debounce,
  } = props;
  console.log(parentData);

  const onFill = debounce((e, title, type) => {
    console.log(type);
    try {
      //Editor
      if (type == "text") {
        form.setFieldsValue({
          [title]: e.target.value,
        });
        let data = parentData;

        data[`${title}`] = e.target.value;
        return setParentData(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, 1000);

  return (
    <MUIListItem>
      <Row>
        {data.data.map((formItems, i) => {
          return (
            <Col
              key={i}
              xl={
                formItems.type === "text" ||
                formItems.type === "editor" ||
                formItems.type === "multiform"
                  ? 24
                  : 5
              }
              lg={
                formItems.type === "text" ||
                formItems.type === "editor" ||
                formItems.type === "multiform"
                  ? 24
                  : 8
              }
              md={
                formItems.type === "text" ||
                formItems.type === "editor" ||
                formItems.type === "multiform"
                  ? 24
                  : 12
              }
              sm={
                formItems.type === "text" ||
                formItems.type === "editor" ||
                formItems.type === "multiform"
                  ? 24
                  : 24
              }
              xs={
                formItems.type === "text" ||
                formItems.type === "editor" ||
                formItems.type === "multiform"
                  ? 24
                  : 24
              }
            >
              {formItems.type == "text" ? (
                <>
                  <NormalForm onFill={onFill} formItems={formItems} />
                </>
              ) : null}
            </Col>
          );
        })}
      </Row>
    </MUIListItem>
  );
};

export default ListItem;
