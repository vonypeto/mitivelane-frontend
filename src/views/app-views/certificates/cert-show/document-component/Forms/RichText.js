import React from "react";
import { Editor } from "react-draft-wysiwyg";

const RichText = (props) => {
  const { onFill, formItems, editorState } = props;
  return (
    <>
      {/* Reference 
  options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 
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
      />{" "}
    </>
  );
};

export default RichText;
