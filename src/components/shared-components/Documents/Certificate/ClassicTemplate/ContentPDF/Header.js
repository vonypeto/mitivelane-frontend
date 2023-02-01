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

const Header = (props) => {
  const { data, fontType } = props; // Create styles
  const styles = StyleSheet.create({
    container_head: {
      fontFamily: fontType,
      flexDirection: "row",
      display: "grid",
      gridTemplateColumn: "1fr 1fr",
      gridGap: "20px",
      height: "14vh",

      borderBottom: 0, // margin: 0,
      lineHeight: "1.5",
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
    col_image: {
      width: "25%",
      float: "left",
      padding: "15px",
      //   border: "2px solid red",
      padding: "5px 18px 5px 18px",
    },
    image: {
      // marginVertical: 10,
      // marginHorizontal: 10,
      //border: "2px solid red",
      // Maxheight: "`100px`",
      // Maxwidth: "95px",
      // display: "block",
      // height: "auto",
      // width: "auto",
      borderRadius: "50%",
      // backgroundPposition: " 50% 50%",
      // backgroundSsize: "cover",
    },
  });
  return (
    <>
      <View style={styles.container_head}>
        <View style={styles.col_image}>
          {data?.firstLogo ? (
            <Image style={styles.image} src={data?.firstLogo} />
          ) : null}
        </View>

        <View style={styles.col_center}>
          <Text style={styles.col_center_space}>{data?.country}</Text>
          <Text style={styles.col_center_space}>{data?.province}</Text>
          <Text style={styles.col_center_space_bold}>{data?.municipality}</Text>
          <Text style={styles.col_center_space_bold}>{data?.organization}</Text>
          <Text style={styles.col_center_space_bold}>{data?.office}</Text>
        </View>
        <View style={styles.col_image}>
          {data?.secondLogo ? (
            <Image style={styles.image} src={data?.secondLogo} />
          ) : null}
        </View>
      </View>
    </>
  );
};
export default Header;
