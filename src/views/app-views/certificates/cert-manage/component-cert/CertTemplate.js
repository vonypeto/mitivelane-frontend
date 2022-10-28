import React, { useState, useEffect } from "react";
import { Card, Col, Row, Button, Upload, message } from "antd";
import {
  PlusCircleOutlined,
  PlusOutlined,
  LoadingOutlined,
  MinusCircleOutlined,
  InfoCircleOutlined,
  CheckSquareOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Form, Input, Popconfirm } from "antd";
import debounce from "lodash.debounce";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, EditorState } from "draft-js";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};
function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 1;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

const CertOrganization = React.memo(
  (props) => {
    const {
      setParentData,
      parentData,
      MAX_LENGTH,
      dropDownForm,
      setDropDownForm,
      form,
    } = props;
    const content = {
      entityMap: {},
      blocks: parentData?.content != null ? parentData?.content.blocks : [],
    };
    const contentState = convertFromRaw(content);
    const [loading, setLoading] = useState(false);
    const [signatureImage, setSignatureImage] = useState([]);
    // const [editorState, setEditorStateChange] = useState(
    //   EditorState.createWithContent(contentState)
    // );
    const editorState = EditorState.createWithContent(contentState);

    const [logoList, setLogoList] = useState([
      { id: 1, image: "" },
      { id: 2, image: "" },
    ]);
    const handleAddSignature = () => {
      let logoID = signatureImage.length;
      let logoEnd;
      if (logoID == 0) {
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

    const handleRemoveSignature = (index) => {
      setLoading(true);
      const values = [...signatureImage];
      values.splice(index, 1);
      setSignatureImage(values);
      setLoading(false);
    };

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
    const handlerLogoSignature = (info, index, name) => {
      if (info.file.status === "uploading") {
        setLoading(true);
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
          AddImageSignature(index, imageUrl);
          setLoading(false);

          return onImageSignature();
        });
      }
    };
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

    const AddDetails = (currentId) => {
      setDropDownForm((existingItems) => {
        const itemIndex = existingItems.findIndex(
          (item) => item.id === currentId
        );
        return [
          ...existingItems.slice(0, itemIndex),
          {
            // spread all the other items in the object and update only the score
            ...existingItems[itemIndex],
            isOpen: !existingItems[itemIndex].isOpen,
          },
          ...existingItems.slice(itemIndex + 1),
        ];
      });
    };
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
    const AddImageSignature = (currentId, Image) => {
      setSignatureImage((existingItems) => {
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

    const onFill = debounce((e, title, type) => {
      try {
        //Editor
        if (type == "editor") {
          const length = editorState?.getCurrentContent().getPlainText("")
            .length;
          if (length <= MAX_LENGTH && 5 >= e.blocks.length) {
            //   setEditorStateChange(e); or this.setState({ editorState: editorState })
            let data = parentData;
            form.setFieldsValue({
              [title]: e,
            });
            data[`${title}`] = e;

            return setParentData(data);
          } else {
            return console.log(
              `Sorry, you've exceeded your limit of ${MAX_LENGTH}`
            );
          }
          //multiform signature
        } else if (type == "multiform") {
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
        } else {
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
    const onImage = debounce((image, title) => {
      form.setFieldsValue({
        [title]: image,
      });
      let data = parentData;

      data[`${title}`] = image;
      return setParentData(data);
    }, 100);
    const onImageSignature = debounce(() => {
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
    return (
      <>
        {dropDownForm.map((item, index) => {
          return (
            <Card
              className="custom_cert_child"
              style={{
                borderRadius: "0px",
                borderRight: "0px",
                borderLeft: "0px",
                borderTop: "0px",
                paddingTop: "0px",
                paddingBottom: "0px",
                marginBottom: "0px",
                marginTop: "0px",
              }}
              key={item.id}
            >
              <Row justify="between">
                <Col xs={24} sm={24} md={24} lg={24} xl={24} justify="between">
                  <Row>
                    <Col className="pt-2" span={12}>
                      <h4>{item.Details}</h4>
                    </Col>
                    <Col span={6} offset={6} className="text-right">
                      {item.isOpen ? (
                        <Button
                          onClick={() => AddDetails(item.id)}
                          icon={<MinusCircleOutlined />}
                        ></Button>
                      ) : (
                        <Button
                          onClick={() => AddDetails(item.id)}
                          icon={<PlusCircleOutlined />}
                        ></Button>
                      )}
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row justify="between">
                <Col xs={24} sm={24} md={24} lg={24} xl={24} justify="between">
                  <></>
                  {item.isOpen ? (
                    <Row>
                      {item.data.map((formItems, index) => {
                        return (
                          <Col
                            key={index}
                            xl={
                              formItems.type == "text" ||
                              formItems.type == "editor" ||
                              formItems.type == "multiform"
                                ? 24
                                : 5
                            }
                            lg={
                              formItems.type == "text" ||
                              formItems.type == "editor" ||
                              formItems.type == "multiform"
                                ? 24
                                : 8
                            }
                            md={
                              formItems.type == "text" ||
                              formItems.type == "editor" ||
                              formItems.type == "multiform"
                                ? 24
                                : 12
                            }
                            sm={
                              formItems.type == "text" ||
                              formItems.type == "editor" ||
                              formItems.type == "multiform"
                                ? 24
                                : 24
                            }
                            xs={
                              formItems.type == "text" ||
                              formItems.type == "editor" ||
                              formItems.type == "multiform"
                                ? 24
                                : 24
                            }
                          >
                            {formItems.type == "text" ? (
                              <Form.Item
                                label={formItems.titleName}
                                name={formItems.formName}
                              >
                                <Input
                                  style={{
                                    border: "none",
                                    backgroundColor: "#f4f4f5",
                                  }}
                                  onChange={(e) => {
                                    onFill(e, formItems.formName);
                                  }}
                                />
                              </Form.Item>
                            ) : formItems.type == "editor" ? (
                              <>
                                {/* options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 
                                    'embedded', 'emoji', 'image', 'remove', 'history'] */}
                                <i>*Max 5 paragraph*</i>
                                <Editor
                                  toolbarClassName="toolbarClassName"
                                  wrapperClassName="wrapperClassName"
                                  editorClassName="editorClassName"
                                  //     onEditorStateChange={setEditorStateChange}
                                  defaultEditorState={editorState}
                                  toolbar={{
                                    options: [
                                      "inline",

                                      "fontSize",
                                      "colorPicker",
                                      "textAlign",
                                      "list",
                                      "history",
                                    ],
                                    inline: { inDropdown: true },
                                    list: { inDropdown: true },
                                    textAlign: { inDropdown: true },
                                    link: { inDropdown: true },
                                    history: { inDropdown: true },
                                  }}
                                  onChange={(e) => {
                                    onFill(e, formItems.formName, "editor");
                                  }}
                                />
                              </>
                            ) : formItems.type == "multiform" ? (
                              <>
                                <i>
                                  *Click the Information Circle if Applicant is
                                  required*
                                </i>
                                <Row>
                                  {signatureImage.map((data, index) => (
                                    <Col
                                      key={index}
                                      xs={24}
                                      sm={12}
                                      md={8}
                                      lg={8}
                                    >
                                      <Form.Item>
                                        <div>
                                          <Row className="signature-class">
                                            <Col
                                              xs={10}
                                              sm={10}
                                              md={11}
                                              lg={14}
                                            >
                                              <Form.Item
                                                name={`name${data.id}`}
                                              >
                                                <Input
                                                  onChange={(e) => {
                                                    onFill(
                                                      e,
                                                      {
                                                        type: "name",
                                                        id: data.id,
                                                      },

                                                      "multiform"
                                                    );
                                                  }}
                                                  style={{
                                                    border: "none",
                                                    fontWeight: 900,
                                                  }}
                                                  className="cert-name "
                                                  placeholder={`Name${
                                                    index + 1
                                                  }`}
                                                />
                                              </Form.Item>
                                              <Form.Item
                                                name={`position${data.id}`}
                                              >
                                                <Input
                                                  onChange={(e) => {
                                                    onFill(
                                                      e,
                                                      {
                                                        type: "position",
                                                        id: data.id,
                                                      },
                                                      "multiform"
                                                    );
                                                  }}
                                                  style={{
                                                    border: "none",
                                                    fontWeight: 900,
                                                  }}
                                                  className="cert-name "
                                                  placeholder={`Position${
                                                    index + 1
                                                  }`}
                                                />
                                              </Form.Item>
                                            </Col>
                                            <Col xs={2} sm={3} md={3} lg={2}>
                                              <div className="pt-3 text-center ">
                                                <MinusCircleOutlined
                                                  onClick={() =>
                                                    handleRemoveSignature(index)
                                                  }
                                                />
                                              </div>
                                              <Popconfirm
                                                placement="top"
                                                title="Set as Applicant?"
                                                okText="Yes"
                                                cancelText="No"
                                                icon={
                                                  <QuestionCircleOutlined
                                                    style={{ color: "red" }}
                                                  />
                                                }
                                              >
                                                <div
                                                  className="pt-3 text-center "
                                                  style={{ cursor: "pointer" }}
                                                >
                                                  <InfoCircleOutlined />
                                                </div>
                                              </Popconfirm>
                                            </Col>
                                          </Row>
                                        </div>

                                        <Upload
                                          name="avatar"
                                          listType="picture-card"
                                          className="pt-2 pl-2 avatar-uploader"
                                          showUploadList={false}
                                          customRequest={dummyRequest}
                                          beforeUpload={beforeUpload}
                                          accept=".png,.jpeg"
                                          onChange={(e) =>
                                            handlerLogoSignature(
                                              e,
                                              data.id,
                                              data.formName
                                            )
                                          }
                                        >
                                          {signatureImage[index].image ? (
                                            <img
                                              src={signatureImage[index].image}
                                              alt="avatar"
                                              style={{ width: "100%" }}
                                            />
                                          ) : (
                                            uploadButton
                                          )}
                                        </Upload>
                                      </Form.Item>
                                    </Col>
                                  ))}
                                </Row>
                                <Form.Item>
                                  {signatureImage.length <= 3 ? (
                                    <Button
                                      type="dashed"
                                      onClick={() => handleAddSignature()}
                                      block
                                      icon={<PlusOutlined />}
                                    >
                                      Add field
                                    </Button>
                                  ) : null}
                                </Form.Item>
                              </>
                            ) : (
                              <Col
                                lg={6}
                                xs={6}
                                md={6}
                                key={index}
                                label={formItems.titleName}
                                name={formItems.formName}
                              >
                                <Upload
                                  name="avatar"
                                  listType="picture-card"
                                  className="avatar-uploader"
                                  showUploadList={false}
                                  customRequest={dummyRequest}
                                  beforeUpload={beforeUpload}
                                  accept=".png,.jpeg"
                                  onChange={(e) =>
                                    handlerLogo(
                                      e,
                                      formItems.logoID,
                                      formItems.formName
                                    )
                                  }
                                >
                                  {logoList[index]?.image ? (
                                    <img
                                      src={logoList[index]?.image}
                                      alt="avatar"
                                      style={{ width: "100%" }}
                                    />
                                  ) : (
                                    uploadButton
                                  )}
                                </Upload>
                                {}
                              </Col>
                            )}
                          </Col>
                        );
                      })}
                    </Row>
                  ) : null}
                </Col>
              </Row>
            </Card>
          );
        })}
      </>
    );
  },
  (prevProps, nextProps) =>
    prevProps.parentData === nextProps.parentData && prevProps === nextProps
);

export default CertOrganization;
