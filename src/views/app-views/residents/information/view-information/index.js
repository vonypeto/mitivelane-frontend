import React from "react";
import ResidentForm from "../resident-form";

const ViewResident = (props) => {
  const { param_url } = props;
  console.log("Add Second Loop: " + param_url);
  return (
    <div>
      <ResidentForm mode="VIEW" param={props.match.params.barangay_id} />
    </div>
  );
};

export default ViewResident;
