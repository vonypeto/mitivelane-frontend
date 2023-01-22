import React from "react";
import SelectForm from "./SelectForm";
const CertificateForm = (props) => {
  const { dropDownForm, debounce, setParentData, parentData } = props;
  return (
    <>
      {dropDownForm.map((item, i) => (
        <SelectForm
          {...props}
          debounce={debounce}
          key={i}
          data={item}
          documentType="Certificate"
        />
      ))}
    </>
  );
};

export default CertificateForm;
