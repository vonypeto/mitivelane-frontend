import React from "react";
import ClassicTemplate from "./ClassicTemplate/ClassicTemplateList";
import ClassicTemplatePDF from "./ClassicTemplate/ClassicTemplatePDF";

import { Textfit } from "react-textfit";

const index = (props) => {
  const { selectedForm, width, type } = props;
  let size = 9;
  let borderSize = 3.5;
  let drawerSize = 600;
  let lineHeight = "16px";
  const ratio = 1.41451612903;
  let tmp = true;
  if (type == "view") {
    borderSize = 3.5;
    if (0 <= width && 374 >= width) {
      size = 13;
    } else if (375 <= width && 424 >= width) {
      size = 8;
    } else if (425 <= width && 648 >= width) {
      size = 9;
    } else if (649 <= width && 767 >= width) {
      size = 8;
    } else if (768 <= width && 1235 >= width) {
      size = 11.5;
    } else if (1240 <= width && 1399 >= width) {
      size = 10;
      lineHeight = "30px";
    } else if (1400 <= width && 1600 >= width) {
      size = 11;
    } else if (1601 <= width && 1800 >= width) {
      size = 12;
    } else {
      size = 13;
      lineHeight = "25px";
    }
  } else if (type == "drawer") {
    borderSize = 15;
    if (width > 1400) {
      drawerSize = 600;
    } else if (width > 1024) {
      drawerSize = 550;
    } else if (width >= 550) {
      drawerSize = 550;
    } else if (width >= 425) {
      drawerSize = width;
    } else {
      drawerSize = width;
    }
    if (0 <= width && 374 >= width) {
      size = 7;
    } else if (375 <= width && 424 >= width) {
      size = 8;
    } else if (425 <= width && 648 >= width) {
      size = 9;
    } else if (649 <= width && 767 >= width) {
      size = 11;
    } else if (768 <= width && 1023 >= width) {
      size = 11;
      lineHeight = "16px";
    } else {
      size = 12;
      lineHeight = "18px";
    }
  } else {
    if (0 <= width && 374 >= width) {
      drawerSize = 232;
    } else if (375 <= width && 424 >= width) {
      drawerSize = 260;
    } else if (425 <= width && 648 >= width) {
      drawerSize = 285;
    } else if (649 <= width && 767 >= width) {
      drawerSize = 310;
    } else if (768 <= width && 1023 >= width) {
      drawerSize = 320;
    } else {
      drawerSize = 350;
    }

    if (0 <= width && 349 >= width) {
      lineHeight = "4px";
      size = 3.5;
    } else if (350 <= width && 374 >= width) {
      lineHeight = "6px";
      size = 3.8;
    } else if (375 <= width && 424 >= width) {
      lineHeight = "9px";
      size = 4.5;
    } else if (425 <= width && 648 >= width) {
      size = 5.3;
      lineHeight = "10ox";
    } else if (649 <= width && 767 >= width) {
      lineHeight = "11px";
      size = 6;
    } else if (768 <= width && 1023 >= width) {
      lineHeight = "12px";
      size = 6.7;
    } else {
      size = 7;
      lineHeight = "14px";
    }
  }
  console.log(size);

  return (
    <>
      {type == "form" || type == "view" || type == "drawer" ? (
        <Textfit
          mode="multi"
          min={size}
          max={size}
          style={{
            height:
              type == "view"
                ? Math.floor((width / 3.5) * ratio) - 40
                : type == "drawer"
                ? Math.floor(drawerSize * ratio) - 70
                : type == "form"
                ? Math.floor(drawerSize * ratio) - 100
                : null,
            border: tmp == true ? "5px solid #888888" : "none",
            padding: 5,
          }}
        >
          {selectedForm == 1 ? (
            <ClassicTemplate
              {...props}
              lineHeight={lineHeight}
              drawerSize={drawerSize}
              borderSize={borderSize}
            />
          ) : null}
        </Textfit>
      ) : (
        <>
          {selectedForm == 1 ? (
            <ClassicTemplatePDF
              type={type}
              {...props}
              lineHeight={lineHeight}
            />
          ) : null}
        </>
      )}
    </>
  );
};

export default index;
