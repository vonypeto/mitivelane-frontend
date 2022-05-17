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
const Footer = () => {
  return (
    <>
      <Text style={styles.col_footer}>
        Note not valid with erasures and without the official seal of issuing
        office
      </Text>
    </>
  );
};

export default Footer;
