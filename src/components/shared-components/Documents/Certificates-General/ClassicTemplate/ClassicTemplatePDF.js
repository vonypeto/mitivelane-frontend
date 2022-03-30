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
// Remember pt to cm to convert the size of the typewriting
// Create Document Component
const BasicDocument = (props) => {
  const { data, fontType } = props;
  console.log(data.secondLogo);
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
      height: "14vh",
      border: " 5px solid black",
      borderBottom: 0, // margin: 0,
      lineHeight: "1.5",
    },
    container_body: {
      fontFamily: props.fontType,
      flexDirection: "row",
      display: "grid",
      fontSize: 13,
      gridTemplateColumn: "1fr 1fr",
      gridGap: "10px",
      height: "77vh",
      border: " 5px solid black",
      borderTop: 0, // margi
      lineHeight: "1.8",
    },
    col: {
      width: "50%",
      float: "left",
      padding: "20px",
      // border: "2px solid red",
    },
    col_center: {
      textAlign: "center",
      width: "50%",
      fontSize: "13px",
      float: "left",
      padding: "10px",
      //   border: "2px solid red",
    },
    col_center_space: {
      // margin: " 3px 0px",
    },
    col_center_space_bold: {
      fontFamily: props.fontType,
      fontWeight: "bold",
    },
    col_center_space_bold_clearance: {
      marginBottom: "18px",
      marginTop: "-5px",
      fontWeight: "bold",
      fontSize: "20px",
      textAlign: "center",
    },
    col_image: {
      width: "25%",
      float: "left",
      padding: "20px",
      //    border: "2px solid red",
    },
    col_sidename: {
      width: "20%",
      float: "left",
      padding: "20px",
      //  border: "2px solid red",
    },
    col_content: {
      width: "80%",
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
      fontFamily: props.fontType,
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
  console.log(props);
  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <View style={styles.container_head}>
          <View style={styles.col_image}>
            {data.firstLogo ? (
              <Image style={styles.image} src={data.firstLogo} />
            ) : null}
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
              OFFICE OF THE BARANGAY CAPTAIN {data.office}
            </Text>
          </View>
          <View style={styles.col_image}>
            {data.secondLogo ? (
              <Image style={styles.image} src={data.secondLogo} />
            ) : null}
          </View>
        </View>
        <View style={styles.container_body}>
          <View style={styles.col_sidename}>
            <Text>if else if the user enable the show barangay member</Text>
          </View>
          <View style={styles.col_content}>
            <Text style={styles.col_center_space_bold_clearance}>
              BARANGAY CLEARANCE
            </Text>
            <Text style={styles.line}>TO WHOM IT MAY CONCERNS:</Text>
            <Text style={styles.indent}>
              This is to certify that{" "}
              <Text style={styles.bold}>MR & MRS RAFAEL S ESTEBAN </Text>is to
              bonafide resident of Barangay Fiesishare, talisay, Batangas.
            </Text>
            <Text style={styles.indent}>
              This certification issued upon the request of{" "}
              <Text style={styles.bold}>MR & MRS RAFAEL S ESTEBAN </Text> and
              whatever legal purpose this may serve him/her best
            </Text>
            <Text style={styles.indent}>
              Issuied thus 14th day if January, 2020 at Barangay BUhangin
              Proper, Davo CIty, Philippines
            </Text>
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
      </Page>
    </Document>
  );
};
export default BasicDocument;
