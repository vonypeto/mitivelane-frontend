import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import RichText from "../RichText";
import DOMPurify from "dompurify";
import DraftToHtml from "components/util-components/DraftHtml";
import Footer from "./Footer";

const Body = (props) => {
  const { data, fontType } = props;
  const fontSize =
    data.font_size === "S"
      ? 10
      : data.font_size === "M"
      ? 13
      : data.font_size === "L"
      ? 15
      : data.font_size === "XL"
      ? 18
      : data.font_size === "XS"
      ? 7
      : null;

  const styles = StyleSheet.create({
    container_body: {
      fontFamily: fontType,
      flexDirection: "row",
      display: "grid",
      fontSize: fontSize,
      gridTemplateColumn: "1fr 1fr",
      gridGap: "10px",
      height: "100%",
      //  border: " 5px solid black",
      borderTop: 0, // margi
      lineHeight: data?.line_height || "1.8",
    },

    col_center_space_bold_clearance: {
      marginBottom: "18px",
      marginTop: "-5px",
      fontWeight: "bold",
      fontSize: "20px",
      textAlign: "center",
    },

    col_sidename: {
      width: "20%",
      float: "left",
      //  padding: "20px",
      //  border: "2px solid red",
    },
    col_content: {
      //  width: "80%",
      width: "100%",
      float: "left",
      padding: "20px",
      paddingLeft: 5,
      // backgroundImage: `url(${data?.firstLogo})`,
      //   border: "2px solid red",

      textAlign: "justify",
    },

    indent: {
      textIndent: 30,
      margin: 13,
      textAlign: "justify",
    },
    line: {
      lineHeight: 2,
    },

    bold: {
      fontWeight: "bold",
    },
    pageBackground: {
      position: "absolute",
      minWidth: "100%",
      minHeight: "100%",
      display: "block",
      height: "80%",
      marginLeft: "auto",
      marginRight: "auto",
      width: "100%",
      left: 50,
      top: " 22%",
      transform: "translate(-50%, -50%)",
      objectFit: "cover",
      opacity: 0.3,
      marginLeft: 8,
    },
  });
  let container = DraftToHtml(data);

  let clean = DOMPurify.sanitize(container);

  clean = clean.replaceAll("{NAME}", "MR & MRS RAFAEL S ESTEBAN");

  return (
    <>
      <View style={styles.container_body}>
        {/* <View style={styles.col_sidename}>
              <Text>if else if the user enable the show organization member</Text>
            </View> */}
        <View style={styles.col_content}>
          {data?.firstLogo ? (
            <Image src={data?.firstLogo} style={styles.pageBackground} />
          ) : null}

          <Text style={styles.col_center_space_bold_clearance}>
            {data?.clearance}
          </Text>
          <Text style={styles.line}>TO WHOM IT MAY CONCERNS:</Text>
          <Text style={styles.indent}>
            <RichText note={clean} />
            {/* This is to certify that
              <Text style={styles.bold}>MR & MRS RAFAEL S ESTEBAN </Text>is to
              bonafide resident of Organization Fiesishare, talisay, Batangas. */}
          </Text>

          <Footer {...props} />
        </View>
      </View>
    </>
  );
};

export default Body;
