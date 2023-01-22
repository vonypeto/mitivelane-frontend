import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// Designing Component
import MUIListItem from "@material-ui/core/ListItem";
import { Row, Col } from "antd";
// Input Component
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, EditorState } from "draft-js";
import { getBase64, dummyRequest, beforeUpload } from "helper/Formula.js";
// Form Component
import NormalForm from "./Forms/NormalFrom";
import FormLogo from "./Forms/FormLogo";
const ListItem = (props) => {
  const { setParentData, parentData, MAX_LENGTH, data, form, debounce } = props;
  console.log(parentData);
  // Initial Value for logo State
  const [logoList, setLogoList] = useState([
    { id: 1, image: "" },
    { id: 2, image: "" },
  ]);
  // Loading State
  const [loading, setLoading] = useState(false);
  const [signatureImage, setSignatureImage] = useState([]);

  // Logo Add Function
  const handlerLogo = (info, index, name) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        AddImage(index, imageUrl);
        setLoading(false);

        return onImage(imageUrl, name);
      });
    }
  };
  // upload to database
  const onImage = debounce((image, title) => {
    form.setFieldsValue({
      [title]: image,
    });
    let data = parentData;

    data[`${title}`] = image;
    return setParentData(data);
  }, 100);

  // Image
  const AddImage = (currentId, Image) => {
    setLogoList((existingItems) => {
      const itemIndex = existingItems.findIndex(
        (item) => item.id === currentId
      );
      return [
        ...existingItems.slice(0, itemIndex),
        {
          // spread all the other items in the object and update only the score
          ...existingItems[itemIndex],
          image: Image,
        },
        ...existingItems.slice(itemIndex + 1),
      ];
    });
  };
  // OnFill Data
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

  useEffect(() => {
    setLogoList([
      { id: 1, image: parentData?.firstLogo },
      { id: 2, image: parentData?.secondLogo },
    ]);
  }, [parentData]);
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
                  {" "}
                  <NormalForm onFill={onFill} formItems={formItems} />
                </>
              ) : formItems.type == "editor" ? (
                <>Editor</>
              ) : formItems.type == "multiform" ? (
                <>Signature</>
              ) : (
                <FormLogo
                  {...{ handlerLogo, logoList, loading, formItems }}
                  index={i}
                />
              )}
            </Col>
          );
        })}
      </Row>
    </MUIListItem>
  );
};

export default ListItem;
