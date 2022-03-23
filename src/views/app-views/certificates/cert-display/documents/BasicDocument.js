import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { Font_Oswald, Font_Roboto, Font_Bebas, Font_Data } from "assets/font";

// Create Document Component
const BasicDocument = (props) => {
  const { data, fontType } = props;

  const font = Font_Data.filter((font) => font.family == fontType);
  console.log(font);

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
      paddingTop: 35,
      paddingBottom: 35,
      paddingHorizontal: 35,
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    container_head: {
      fontFamily: props.fontType,
      flexDirection: "row",
      display: "grid",
      gridTemplateColumn: "1fr 1fr",
      gridGap: "20px",
      height: "20vh",
      border: " 2px solid red",
      borderBottom: 0, // margin: 0,
    },
    container_body: {
      fontFamily: props.fontType,
      flexDirection: "row",
      display: "grid",
      gridTemplateColumn: "1fr 1fr",
      gridGap: "20px",
      height: "71vh",
      border: " 2px solid red",
      borderTop: 0, // margi
    },
    col: {
      width: "50%",
      float: "left",
      padding: "20px",
      border: "2px solid red",
    },
    col_center: {
      textAlign: "center",
      width: "50%",
      fontSize: "13px",
      float: "left",
      padding: "10px",
      border: "2px solid red",
    },
    col_center_space: {
      margin: " 3px 0px",
    },
    col_center_space_bold: {
      fontFamily: props.fontType,
      fontWeight: "bold",
    },
    col_image: {
      width: "25%",
      float: "left",
      padding: "20px",
      border: "2px solid red",
    },
    col_sidename: {
      width: "30%",
      float: "left",
      padding: "20px",
      border: "2px solid red",
    },
    col_content: {
      width: "70%",
      float: "left",
      padding: "20px",
      border: "2px solid red",
    },
  });
  console.log(props);
  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <View style={styles.container_head}>
          <View style={styles.col_image}>
            <Text>Image</Text>
          </View>

          <View style={styles.col_center}>
            <Text style={styles.col_center_space}>
              Republic of the Philippines
            </Text>
            <Text style={styles.col_center_space}>Province of Cavite</Text>
            <Text style={styles.col_center_space_bold}>
              MUNICIPALITY OF MARAGONDON
            </Text>
            <Text style={styles.col_center_space_bold}>
              OFFICE OF THE BARANGAY CAPTAIN
            </Text>
          </View>
          <View style={styles.col_image}>
            <Text>image</Text>
          </View>
        </View>
        <View style={styles.container_body}>
          <View style={styles.col_sidename}>
            <Text>if else if the user enable the show barangay member</Text>
          </View>
          <View style={styles.col_content}>
            <Text>Content of the barangay</Text>
          </View>
        </View>
        {/* <View style={styles.section}>
          <Text>{data.republic}</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View> */}
      </Page>
    </Document>
  );
};
export default BasicDocument;
