import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Card, Col, Row, Button, Upload, message } from "antd";
import {
  UserOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  LoadingOutlined,
  MinusCircleOutlined,
  ArrowDownOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { Form, Input } from "antd";
import debounce from "lodash.debounce";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, EditorState } from "draft-js";
import CertDrawer from "../cert-display/Cert-Drawer";

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
function findArrayElementByTitle(array, id) {
  return array.find((element) => {
    return element.id === id;
  });
}
function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}
const CertDisplay = (props) => {
  const { setParentData, parentData, width } = props;
  // const [countOpenForm, setCountOpenForm] = useState([]);
  const [drawer, setDrawer] = useState(false);
  const [selectedUser, SetSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const [logoList, setLogoList] = useState([
    { id: 1, image: "" },
    { id: 2, image: "" },
  ]);
  const handleChangeFirstLogo = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        AddImage(1, imageUrl);
        setLoading(false);

        return onImage(imageUrl, "firstLogo");
      });
    }
  };
  const handleChangeSecondLogo = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        AddImage(2, imageUrl);
        setLoading(false);

        return onImage(imageUrl, "secondLogo");
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const onHandle = (elm) => {
    setDrawer(true);
    SetSelectedUser(elm);
  };
  const closeDrawer = () => {
    setDrawer(false);
    SetSelectedUser(null);
  };

  const [dropDownForm, setDropDownForm] = useState([
    {
      id: 1,
      Details: "Goverment Details",
      isOpen: false,
      type: "government",
      data: [
        {
          id: 1,
          formName: "firstLogo",
          type: "file",
          titleName: "FirstLogo",
          handler: handleChangeFirstLogo,
        },
        {
          id: 2,
          formName: "firstLogo",
          type: "file",
          titleName: "FirstLogo",
          handler: handleChangeSecondLogo,
        },
        {
          id: 3,
          formName: "republic",
          type: "text",
          titleName: "Country",
        },
        {
          id: 4,
          formName: "munipality",
          type: "text",

          titleName: "Municipality",
        },
        {
          id: 5,
          formName: "barangay",
          type: "text",

          titleName: "Barangay",
        },
        {
          id: 6,
          formName: "office",
          type: "text",
          titleName: "Ofiice",
        },
      ],
    },
    {
      id: 2,
      Details: "Clearance Details",
      isOpen: false,
      type: "clearance",
      data: [
        {
          id: 2,
          formName: "clearance",
          titleName: "Clearance Type",
          type: "text",
        },
      ],
    },
    {
      id: 3,
      Details: "Content",
      isOpen: false,
      type: "content",
      data: [
        {
          id: 2,
          formName: "content",
          titleName: "Content Editor",
          type: "editor",
        },
      ],
    },
    {
      id: 4,
      Details: "Content",
      isOpen: false,
      type: "content",
      data: [
        {
          id: 2,
          formName: "barangay captain",
          titleName: "barangay",
          type: "text",
        },
      ],
    },
  ]);

  const [form] = Form.useForm();
  // form.setFieldsValue({
  //   barangay: "test",
  //   office: "test",
  // });
  const onFinish = () => {
    let data = [];
    dropDownForm.map((value) => {
      value.data.map((nestedValue) => {
        const value = form.getFieldValue(nestedValue.formName);
        const name = nestedValue.formName;
        if (value) data.push({ [name]: value });
      });
    });
    const i = [].concat.apply([], data);

    console.log("Received values of form:", i);
  };

  //isOpen Array
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
    console.log(currentId);
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
  const onFill = debounce((e, title, type) => {
    if (type == "editor") {
      form.setFieldsValue({
        [title]: e,
      });
      let data = parentData;

      data[`${title}`] = e;
      return setParentData(data);
    } else {
      form.setFieldsValue({
        [title]: e.target.value,
      });
      let data = parentData;

      data[`${title}`] = e.target.value;
      return setParentData(data);
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
  // const items = [
  //   { id: 1, num: 1 },
  //   { id: 2, num: 2 },
  //   { id: 3, num: 3 },
  // ];
  // const [vals, setVals] = useState(items);

  // const onClick = () => {
  //   setVals((vals) => {
  //     return [
  //       ...vals.slice(0, 1),
  //       { id: 2, num: Math.random() * 100 },
  //       ...vals.slice(2),
  //     ];
  //   });
  // };

  return (
    <Row justify="center">
      <CertDrawer
        width={width}
        data={selectedUser}
        visible={drawer}
        close={() => {
          closeDrawer();
        }}
      />
      <Col
        justify="center"
        className=""
        xs={24}
        sm={24}
        md={24}
        lg={24}
        xl={24}
      >
        <Form
          name="dynamic_form_nest_item"
          onFinish={onFinish}
          autoComplete="off"
          form={form}
          layout="vertical"
        >
          <Card className="custom_cert">
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
                    <Col
                      xs={24}
                      sm={24}
                      md={24}
                      lg={24}
                      xl={24}
                      justify="between"
                    >
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
                    <Col
                      xs={24}
                      sm={24}
                      md={24}
                      lg={24}
                      xl={24}
                      justify="between"
                    >
                      <></>
                      {item.isOpen ? (
                        <Row>
                          {item.data.map((formItems, index) => {
                            return (
                              <Col
                                key={index}
                                xl={
                                  formItems.type == "text" ||
                                  formItems.type == "editor"
                                    ? 24
                                    : 5
                                }
                                lg={
                                  formItems.type == "text" ||
                                  formItems.type == "editor"
                                    ? 24
                                    : 8
                                }
                                md={
                                  formItems.type == "text" ||
                                  formItems.type == "editor"
                                    ? 24
                                    : 12
                                }
                                sm={
                                  formItems.type == "text" ||
                                  formItems.type == "editor"
                                    ? 24
                                    : 24
                                }
                                xs={
                                  formItems.type == "text" ||
                                  formItems.type == "editor"
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
                                    <Editor
                                      toolbarClassName="toolbarClassName"
                                      wrapperClassName="wrapperClassName"
                                      editorClassName="editorClassName"
                                      toolbar={{
                                        options: [
                                          "inline",
                                          "blockType",
                                          "fontSize",

                                          "textAlign",
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
                                      onChange={formItems.handler}
                                    >
                                      {logoList[index].image ? (
                                        <img
                                          src={logoList[index].image}
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
            {/* <Card>
              <Row justify="between">
                <Col xs={24} sm={24} md={24} lg={24} xl={24} justify="between">
                  
                  <Row>
                    <Col className="pt-2" span={12}>
                      <h3>Clearance Details</h3>
                    </Col>
                    <Col span={6} offset={6} className="text-right">
                      <Button icon={<MinusCircleOutlined />}></Button>
                      <Button icon={<PlusCircleOutlined />}></Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
            <Card>
              <Row justify="between">
                <Col xs={24} sm={24} md={24} lg={24} xl={24} justify="between">
                  
                  <Row>
                    <Col className="pt-2" span={12}>
                      <h3>Person Details</h3>
                    </Col>
                    <Col span={6} offset={6} className="text-right">
                      <Button icon={<MinusCircleOutlined />}></Button>
                      <Button icon={<PlusCircleOutlined />}></Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
            <Card> */}
            {/* <Row justify="between">
                <Col xs={24} sm={24} md={24} lg={24} xl={24} justify="between">
                  
                  <Row>
                    <Col className="pt-2" span={12}>
                      <h3>Government Personals</h3>
                    </Col>
                    <Col span={6} offset={6} className="text-right">
                      <Button icon={<MinusCircleOutlined />}></Button>
                      <Button icon={<PlusCircleOutlined />}></Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>*/}
            <Col className="mt-2 text-right">
              {width >= 1399 ? (
                <Button
                  icon={<ArrowDownOutlined />}
                  type="primary"
                  htmlType="submit"
                >
                  Download
                </Button>
              ) : (
                <Button
                  icon={<ArrowRightOutlined />}
                  type="primary"
                  htmlType="submit"
                  onClick={() => onHandle(parentData)}
                >
                  Preview
                </Button>
              )}
            </Col>
          </Card>
        </Form>
      </Col>
    </Row>
  );
};

export default CertDisplay;

// <Card>
// {dropDownForm.map((item) => {
//   return (
//     <Card key={item.id}>
//       <Row justify="between">
//         <Col
//           xs={24}
//           sm={24}
//           md={24}
//           lg={24}
//           xl={24}
//           justify="between"
//         >
//
//           <Row>
//             <Col className="pt-2" span={12}>
//               <h4>{item.Details}</h4>
//             </Col>
//             <Col span={6} offset={6} className="text-right">
//               {item.isOpen ? (
//                 <Button
//                   onClick={() => AddDetails(item.id)}
//                   icon={<MinusCircleOutlined />}
//                 ></Button>
//               ) : (
//                 <Button
//                   onClick={() => AddDetails(item.id)}
//                   icon={<PlusCircleOutlined />}
//                 ></Button>
//               )}
//             </Col>
//           </Row>
//         </Col>
//       </Row>
//       <Row justify="between">
//         <Col
//           xs={24}
//           sm={24}
//           md={24}
//           lg={24}
//           xl={24}
//           justify="between"
//         >
//           {item.isOpen ? (
//             <div>
//
//               <Form.List name="users">
//                 {(fields, { add, remove }) => (
//                   <>
//                     {fields.map(({ key, name, ...restField }) => (
//                       <Space
//                         key={key}
//                         style={{ display: "flex", marginBottom: 8 }}
//                         align="baseline"
//                       >
//                         <Col lg={24}>
//
//                           <Form.Item
//                             {...restField}
//                             name={[name, "first"]}
//                             rules={[
//                               {
//                                 required: true,
//                                 message: "Missing first name",
//                               },
//                             ]}
//                           >
//                             <Input placeholder="First Name" />
//                           </Form.Item>
//                         </Col>

//                         <MinusCircleOutlined
//                           onClick={() => remove(name)}
//                         />
//                       </Space>
//                     ))}
//                     <Form.Item>
//                       <Button
//                         type="dashed"
//                         onClick={() => add()}
//                         block
//                         icon={<PlusOutlined />}
//                       >
//                         Add field
//                       </Button>
//                     </Form.Item>
//                   </>
//                 )}
//               </Form.List>
//             </div>
//           ) : null}
//         </Col>
//       </Row>
//     </Card>
//   );
// })}
// {/* <Card>
//   <Row justify="between">
//     <Col xs={24} sm={24} md={24} lg={24} xl={24} justify="between">
//
//       <Row>
//         <Col className="pt-2" span={12}>
//           <h3>Clearance Details</h3>
//         </Col>
//         <Col span={6} offset={6} className="text-right">
//           <Button icon={<MinusCircleOutlined />}></Button>
//           <Button icon={<PlusCircleOutlined />}></Button>
//         </Col>
//       </Row>
//     </Col>
//   </Row>
// </Card>
// <Card>
//   <Row justify="between">
//     <Col xs={24} sm={24} md={24} lg={24} xl={24} justify="between">
//
//       <Row>
//         <Col className="pt-2" span={12}>
//           <h3>Person Details</h3>
//         </Col>
//         <Col span={6} offset={6} className="text-right">
//           <Button icon={<MinusCircleOutlined />}></Button>
//           <Button icon={<PlusCircleOutlined />}></Button>
//         </Col>
//       </Row>
//     </Col>
//   </Row>
// </Card>
// <Card> */}
// {/* <Row justify="between">
//     <Col xs={24} sm={24} md={24} lg={24} xl={24} justify="between">
//
//       <Row>
//         <Col className="pt-2" span={12}>
//           <h3>Government Personals</h3>
//         </Col>
//         <Col span={6} offset={6} className="text-right">
//           <Button icon={<MinusCircleOutlined />}></Button>
//           <Button icon={<PlusCircleOutlined />}></Button>
//         </Col>
//       </Row>
//     </Col>
//   </Row>
// </Card>*/}
// <Col className="text-right">
//
//   <Button type="primary" htmlType="submit">
//     Submit
//   </Button>
// </Col>
// </Card>
