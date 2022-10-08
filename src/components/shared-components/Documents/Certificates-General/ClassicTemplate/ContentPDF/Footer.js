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
  let data = props.data;
  let sliceCol1, sliceCol2;
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
      fontStyle: "italic",
    },
    image_signature: {
      marginBottom: -15,
      alignSelf: "center",
      display: "inline",
    },
    order_stat: {
      textDecoration: "underline",
    },
  });

  sliceCol1 = data.signatures.slice(0, 2);
  sliceCol2 = data.signatures.slice(2, 5);
  console.log(data.signatures);
  return (
    <>
      {data.signatures.length <= 1 ? (
        <View style={styles.container_sig}>
          <View style={styles.col_signature}></View>
          <View style={styles.col_signature}>
            {data.signatures[0]?.image ? (
              <Image
                src={data.signatures[0]?.image}
                style={styles.image_signature}
              />
            ) : null}
            <Text>{data.signatures[0]?.formName}</Text>
            <Text>{data.signatures[0]?.formName2}</Text>
          </View>
        </View>
      ) : (
        <>
          <View style={styles.container_sig}>
            {sliceCol1.map((signature, i) => {
              return (
                <View key={i} style={styles.col_signature}>
                  {signature?.image ? (
                    <Image
                      src={signature?.image}
                      style={styles.image_signature}
                    />
                  ) : null}
                  <Text>{signature?.formName}</Text>
                  <Text>{signature?.formName2}</Text>
                </View>
              );
            })}
          </View>
        </>
      )}

      {data.signatures.length <= 3 ? (
        <View style={styles.container_sig}>
          <View style={styles.col_signature}></View>
          <View style={styles.col_signature}>
            {data.signatures[2]?.image ? (
              <Image
                src={data.signatures[2]?.image}
                style={styles.image_signature}
              />
            ) : null}
            <Text>{data.signatures[2]?.formName}</Text>
            <Text>{data.signatures[2]?.formName2}</Text>
          </View>
        </View>
      ) : (
        <>
          <View style={styles.container_sig}>
            {sliceCol2.map((signature, i) => {
              return (
                <View key={i} style={styles.col_signature}>
                  {signature?.image ? (
                    <Image
                      src={signature?.image}
                      style={styles.image_signature}
                    />
                  ) : null}
                  <Text>{signature?.formName}</Text>
                  <Text>{signature?.formName2}</Text>
                </View>
              );
            })}
          </View>
        </>
      )}

      <Text>
        OR No. <Text style={styles.order_stat}> 888888</Text>
      </Text>
      <Text>
        Issued at <Text style={styles.order_stat}> 8/08/22</Text>{" "}
      </Text>
      <Text>
        Issued on <Text style={styles.order_stat}> 8/08/22</Text>{" "}
      </Text>
      <Text style={styles.col_footer}>
        Note not valid with erasures and without the official seal of issuing
        office
      </Text>
    </>
  );
};

export default Footer;
