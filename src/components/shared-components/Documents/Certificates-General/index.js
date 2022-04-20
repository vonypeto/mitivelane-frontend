import React from "react";
import ClassicTemplate from "./ClassicTemplate/ClassicTemplateList";
import ClassicTemplatePDF from "./ClassicTemplate/ClassicTemplatePDF";

import { Textfit } from "react-textfit";

const index = (props) => {
  const { selectedForm, width, type } = props;
  let size = 9;
  let lineHeight = "16px";
  if (type == "view") {
    if (0 <= props.width && 374 >= props.width) {
      size = 13;
    } else if (375 <= props.width && 424 >= props.width) {
      size = 8;
    } else if (425 <= props.width && 648 >= props.width) {
      size = 9;
    } else if (649 <= props.width && 767 >= props.width) {
      size = 8;
    } else if (768 <= props.width && 1235 >= props.width) {
      size = 11.5;
    } else if (1240 <= props.width && 1399 >= props.width) {
      size = 10;
      lineHeight = "30px";
    } else if (1400 <= props.width && 1500 >= props.width) {
      size = 12;
    } else {
      size = 13;
      lineHeight = "25px";
    }
  } else if (type == "drawer") {
    if (0 <= width && 374 >= width) {
      size = 7;
    } else if (375 <= width && 424 >= width) {
      size = 8;
    } else if (425 <= width && 648 >= width) {
      size = 9;
    } else if (649 <= width && 767 >= width) {
      size = 11;
    } else if (768 <= width && 1023 >= width) {
      size = 13;
      lineHeight = "16px";
    } else {
      size = 14;
      lineHeight = "18px";
    }
  } else {
    if (0 <= width && 349 >= width) {
      lineHeight = "4px";
      size = 3;
    } else if (350 <= width && 374 >= width) {
      lineHeight = "6px";
      size = 4;
    } else if (375 <= width && 424 >= width) {
      lineHeight = "9px";
      size = 5;
    } else if (425 <= width && 648 >= width) {
      size = 6;
      lineHeight = "10ox";
    } else if (649 <= width && 767 >= width) {
      lineHeight = "11px";
      size = 8;
    } else if (768 <= width && 1023 >= width) {
      lineHeight = "12px";
      size = 7;
    } else {
      size = 7;
      lineHeight = "14px";
    }
  }
  console.log(size);
  return (
    <>
      {type == "form" || type == "view" || type == "drawer" ? (
        <Textfit mode="multi" min={size} max={size}>
          {selectedForm == 1 ? (
            <ClassicTemplate {...props} lineHeight={lineHeight} />
          ) : null}
        </Textfit>
      ) : (
        <>
          {selectedForm == 1 ? (
            <ClassicTemplatePDF {...props} lineHeight={lineHeight} />
          ) : null}
        </>
      )}
    </>
  );
};

export default index;
