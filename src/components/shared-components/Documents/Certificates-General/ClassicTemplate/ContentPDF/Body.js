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
const Body = () => {
  return (
    <>
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
    </>
  );
};

export default Body;
