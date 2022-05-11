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
import { Font_Oswald, Font_Roboto, Font_Bebas, Font_Data } from "assets/font";
import DOMPurify from "dompurify";
import RichText from "./RichText";
import DraftToHtml from "components/util-components/DraftHtml";
import Header from "./ContentPDF/Header";
// Remember pt to cm to convert the size of the typewriting
// Create Document Component
const BasicDocument = (props) => {
  const { data, fontType } = props;
  const font = Font_Data.filter((font) => font.family == fontType);

  Font.register(
    font[0] || {
      family: "Roboto",
      src: Font_Roboto,
    }
  );

  // Create styles
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#E4E4E4",
      fontFamily: font[0].family,
    },
    body: {
      padding: 5,
      backgroundColor: "black",
      borderColor: "white",
      borderWidth: 15,
      outlineColor: "white",
      outlineStyle: "solid",
      outlineWidth: 0,
    },
    borders: { backgroundColor: "white" },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },

    container_body: {
      fontFamily: fontType,
      flexDirection: "row",
      display: "grid",
      fontSize: 13,
      gridTemplateColumn: "1fr 1fr",
      gridGap: "10px",
      height: "100%",
      //  border: " 5px solid black",
      borderTop: 0, // margi
      lineHeight: "1.8",
    },

    col_center_space_bold: {
      fontFamily: fontType,
      fontWeight: "bold",
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
      padding: "20px",
      //  border: "2px solid red",
    },
    col_content: {
      //  width: "80%",
      width: "100%",
      float: "left",
      padding: "20px",

      //   border: "2px solid red",

      textAlign: "justify",
    },
    image: {
      // marginVertical: 10,
      // marginHorizontal: 10,
      Maxheight: "95px",
      Maxwidth: "95px",
      display: "block",
      height: "auto",
      width: "auto",
      borderRadius: "50%",
      display: "inline-block",
    },
    indent: {
      textIndent: 30,
      margin: 13,
      textAlign: "justify",
    },
    line: {
      lineHeight: 2,
    },
    container_sig: {
      fontFamily: fontType,
      flexDirection: "row",
      display: "grid",
      gridTemplateColumn: "1fr 1fr",
      gridGap: "20px",
      justifySelf: "end",
      height: "10vh",
      float: "right",
      //    border: " 2px solid red",
      borderBottom: 0, // margin: 0,
    },
    col_signature: {
      width: "50%",
      float: "right",
      padding: "20px",
      textAlign: "center",
    },

    col_signature_center: {
      textAlign: "center",
    },
    col_footer: {
      textAlign: "center",
    },
    bold: {
      fontWeight: "bold",
    },
  });
  let container;
  if (data.content.length != 0) container = DraftToHtml(data);
  else container = "<><>";

  let clean = DOMPurify.sanitize(container);

  clean = clean.replaceAll("{NAME}", "MR & MRS RAFAEL S ESTEBAN");

  return (
    <Document>
      <Page size="A4" style={styles.body} wrap={false}>
        <View style={styles.borders}>
          <Header {...props} />
          <View style={styles.container_body}>
            {/* <View style={styles.col_sidename}>
            <Text>if else if the user enable the show barangay member</Text>
          </View> */}
            <View style={styles.col_content}>
              <Text style={styles.col_center_space_bold_clearance}>
                BARANGAY CLEARANCE
              </Text>
              <Text style={styles.line}>TO WHOM IT MAY CONCERNS:</Text>

              <Text style={styles.indent}>
                <RichText note={clean} />
                {/* This is to certify that
              <Text style={styles.bold}>MR & MRS RAFAEL S ESTEBAN </Text>is to
              bonafide resident of Barangay Fiesishare, talisay, Batangas. */}
              </Text>
              {/* <Text style={styles.indent}>
              This certification issued upon the request of
              <Text style={styles.bold}>MR & MRS RAFAEL S ESTEBAN </Text> and
              whatever legal purpose this may serve him/her best
            </Text>
            <Text style={styles.indent}>
              Issuied thus 14th day if January, 2020 at Barangay BUhangin
              Proper, Davo CIty, Philippines
            </Text> */}
              <View style={styles.container_sig}>
                <View style={styles.col_signature}></View>
                <View style={styles.col_signature}>
                  <Text>__________________</Text>
                  <Text>Sample CAptain</Text>
                </View>
              </View>
              <View style={styles.container_sig}>
                <View style={styles.col_signature}>
                  <Text>__________________</Text>
                  <Text>Sample Applicant</Text>
                </View>
                <View style={styles.col_signature}>
                  <Text>__________________</Text>
                  <Text>Sample Secretary</Text>
                </View>
              </View>
              <Text>OR No. _______</Text>
              <Text>Issued at ______</Text>
              <Text>Issued on ______</Text>
              <Text style={styles.col_footer}>
                Note not valid with erasures and without the official seal of
                issuing office
              </Text>
            </View>
          </View>
          {/* <View style={styles.section}>
          <Text>{data.republic}</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View> */}
        </View>
      </Page>
    </Document>
  );
};
export default BasicDocument;
