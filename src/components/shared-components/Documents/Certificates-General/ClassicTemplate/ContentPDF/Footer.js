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
const Footer = (props) => {
  const styles = StyleSheet.create({
    container_sig: {
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
      padding: "12px",
      textAlign: "center",
    },

    col_signature_center: {
      textAlign: "center",
    },
    col_footer: {
      textAlign: "center",
    },
    image_signature: {
      marginBottom: -15,
      alignSelf: "center",
      display: "inline",
    },
  });
  return (
    <>
      <View style={styles.container_sig}>
        <View style={styles.col_signature}></View>
        <View style={styles.col_signature}>
          <Image src="/img/signature.png" style={styles.image_signature} />
          <Text>JOYCE MARIE</Text>
          <Text>Sample Captain</Text>
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
        Note not valid with erasures and without the official seal of issuing
        office
      </Text>
    </>
  );
};

export default Footer;
