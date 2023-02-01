import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/storage";
// Designing Component
import MUIListItem from "@material-ui/core/ListItem";
import { Row, Col } from "antd";
// Input Component
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, EditorState } from "draft-js";
import { isValidUrl } from "helper/Formula.js";
// Form Component
import NormalForm from "./Forms/NormalFrom";
import FormLogo from "./Forms/FormLogo";
import RichText from "./Forms/RichText";
import Signature from "./Forms/Signature";

const deletePhoto = async (url) => {
  let pictureRef = firebase.storage().refFromURL(url);
  await pictureRef
    .delete()
    .then(() => {
      console.log("Picture is deleted successfully!");
    })
    .catch((err) => {
      console.log(err);
    });
};

const ListItem = (props) => {
  const { setParentData, parentData, MAX_LENGTH, data, form, debounce } = props;

  // Draftjs State
  const content = {
    entityMap: {},
    blocks: parentData?.content != null ? parentData?.content.blocks : [],
  };
  const [contentPrev, setContentPrev] = useState();
  const contentState = convertFromRaw(content);
  const editorState = EditorState.createWithContent(contentState);
  // Initial Value for logo State
  const [logoList, setLogoList] = useState([
    { id: 1, image: "" },
    { id: 2, image: "" },
  ]);
  const [signatureImage, setSignatureImage] = useState(
    parentData?.signatures || []
  );

  // Loading State
  const [loading, setLoading] = useState(false);

  // Logo Add Function
  const handlerLogo = async (info, index, name) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.

      console.log(index, name, logoList[index - 1].image);
      console.log(isValidUrl(logoList[index - 1].image));
      if (isValidUrl(logoList[index - 1].image))
        deletePhoto(logoList[index - 1].image);

      const fileUrl = info.file.originFileObj;
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(
        `/${"test"}/${Date.now()}_${fileUrl?.name}`
      );
      if (fileUrl?.type) {
        // New Image
        await fileRef.put(fileUrl).then(function (_) {
          console.log("File uploaded!");
          // initialized file upload
          fileRef
            .getDownloadURL()
            .then(async function (url) {
              console.log(url);
              AddImage(index, url);
              setLoading(false);
              return onImage(url, name);
            })
            .catch((error) => {
              // if error occure delete new image uploaded
              deletePhoto(url);
              console.log(error.message);
              return message.error(error.message);
            });
        });
      }

      // getBase64(info.file.originFileObj, (imageUrl) => {
      //   AddImage(index, imageUrl);
      //   setLoading(false);
      //   // return onImage(imageUrl, name);
      // });
    }
  };

  // Signature Add Function
  const handleAddSignature = () => {
    const logoID = signatureImage.length;
    let logoEnd;

    if (logoID === 0) {
      logoEnd = 1;
    } else {
      logoEnd = signatureImage[logoID - 1].id + 1;
    }

    setSignatureImage([
      ...signatureImage,
      {
        id: logoEnd,
        image: "",
        formName: `name${logoEnd}`,
        formName2: `position${logoEnd}`,
      },
    ]);
  };
  // Signature Remove Function
  const handleRemoveSignature = (index) => {
    setLoading(true);
    const values = [...signatureImage];
    values.splice(index, 1);
    setSignatureImage(values);
    setLoading(false);
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
    try {
      //Editor
      if (type == "editor") {
        const length = editorState?.getCurrentContent().getPlainText("").length;
        if (!(length <= MAX_LENGTH && 5 >= e.blocks.length))
          return console.log(
            `Sorry, you've exceeded your limit of ${MAX_LENGTH}`
          );

        //   setEditorStateChange(e); or this.setState({ editorState: editorState })
        let data = parentData;
        form.setFieldsValue({
          [title]: e,
        });
        data[`${title}`] = e;
        setContentPrev(editorState?.getCurrentContent().getPlainText(""));

        return setParentData(data);
      }
      // Normal Text
      if (type == "text") {
        form.setFieldsValue({
          [title]: e.target.value,
        });
        let data = parentData;

        data[`${title}`] = e.target.value;
        return setParentData(data);
      }
      if (type == "multiform") {
        //default top single form
        console.log(e.target.value, title, type);
        let signature = signatureImage;

        if (title.type == "position")
          setSignatureImage((prevState) => {
            const newState = prevState.map((obj) => {
              // 👇️ if id equals 2, update country property
              if (obj.id === title.id) {
                return { ...obj, formName2: e.target.value };
              }

              // 👇️ otherwise return object as is
              return obj;
            });

            return newState;
          });
        if (title.type == "name")
          setSignatureImage((prevState) => {
            const newState = prevState.map((obj) => {
              // 👇️ if id equals 2, update country property
              if (obj.id === title.id) {
                return { ...obj, formName: e.target.value };
              }

              // 👇️ otherwise return object as is
              return obj;
            });

            return newState;
          });
      }
    } catch (error) {
      console.log(error);
    }
  }, 1000);
  // Final output to input image signature to database
  const onImageSignature = debounce(() => {
    console.log(signatureImage);
    signatureImage.map((image) => {
      form.setFieldsValue({
        [`position${image.id}`]: image.formName2,
      });
      form.setFieldsValue({
        [`name${image.id}`]: image.formName,
      });
    });

    let data = parentData;

    data[`signatures`] = signatureImage;
    return setParentData(data);
  }, 100);

  useEffect(() => {
    if (parentData.organization_id) onImageSignature();
  }, [signatureImage, loading]);
  useEffect(() => {
    form.setFieldsValue(parentData);
    setSignatureImage(parentData.signatures);
    setLogoList([
      { id: 1, image: parentData?.firstLogo },
      { id: 2, image: parentData?.secondLogo },
    ]);
  }, [parentData]);

  console.log(signatureImage);
  return (
    <MUIListItem>
      <Row>
        {data.data.map((formItems, i) => {
          return (
            <Col
              key={i}
              xl={
                formItems.type === "text" ||
                formItems.type === "date" ||
                formItems.type === "editor" ||
                formItems.type === "multiform"
                  ? 24
                  : 5
              }
              lg={
                formItems.type === "text" ||
                formItems.type === "date" ||
                formItems.type === "editor" ||
                formItems.type === "multiform"
                  ? 24
                  : 8
              }
              md={
                formItems.type === "text" ||
                formItems.type === "date" ||
                formItems.type === "editor" ||
                formItems.type === "multiform"
                  ? 24
                  : 12
              }
              sm={
                formItems.type === "text" ||
                formItems.type === "date" ||
                formItems.type === "editor" ||
                formItems.type === "multiform"
                  ? 24
                  : 24
              }
              xs={
                formItems.type === "text" ||
                formItems.type === "date" ||
                formItems.type === "editor" ||
                formItems.type === "multiform"
                  ? 24
                  : 24
              }
            >
              {formItems.type == "text" || formItems.type == "date" ? (
                <>
                  <NormalForm onFill={onFill} formItems={formItems} />
                </>
              ) : formItems.type == "editor" ? (
                <>
                  <RichText
                    onFill={onFill}
                    formItems={formItems}
                    editorState={editorState}
                  />
                </>
              ) : formItems.type == "multiform" ? (
                <>
                  <Signature
                    onFill={onFill}
                    formItems={formItems}
                    {...{
                      handleAddSignature,
                      handleRemoveSignature,
                      signatureImage,
                      loading,
                    }}
                  />
                </>
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
