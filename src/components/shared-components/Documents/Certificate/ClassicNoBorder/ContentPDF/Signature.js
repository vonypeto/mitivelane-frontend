import React from "react";

const Signature = () => {
  return (
    <>
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
    </>
  );
};

export default Signature;
