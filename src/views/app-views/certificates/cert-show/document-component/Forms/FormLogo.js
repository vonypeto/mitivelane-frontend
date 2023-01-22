import React, { useState, useEffect } from "react";
import { Col, Upload } from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import debounce from "lodash.debounce";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, EditorState } from "draft-js";
import { getBase64, dummyRequest, beforeUpload } from "helper/Formula.js";

const FormLogo = (props) => {
  const { handlerLogo, logoList, loading, formItems, index } = props;

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
      <Col
        lg={6}
        xs={6}
        md={6}
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
          onChange={(e) => handlerLogo(e, formItems.logoID, formItems.formName)}
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
    </>
  );
};

export default FormLogo;
