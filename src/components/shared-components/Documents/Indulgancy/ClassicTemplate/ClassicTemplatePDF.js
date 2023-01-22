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

import Header from "./ContentPDF/Header";
import Body from "./ContentPDF/Body";

// Remember pt to cm to convert the size of the typewriting
// Create Document Component
const BasicDocument = (props) => {
  const { fontType } = props;
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
      //can be dynamic chang color
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
  });

  return (
    <Document>
      <Page size="A4" style={styles.body} wrap={false}>
        <View style={styles.borders}>
          <Header {...props} />
          <Body {...props} />
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
