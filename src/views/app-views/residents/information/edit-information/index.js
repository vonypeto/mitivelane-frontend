import React from "react";
import ResidentForm from "../resident-form";

const EditInformation = (props) => {
  return (
    <ResidentForm mode="EDIT" param={props.match.params.organization_id} />
  );
};

export default EditInformation;
