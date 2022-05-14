import React from "react";

const Archive = (props) => {
  const { organization_id } = props;
  console.log(organization_id);
  return <div>Archive: {organization_id}</div>;
};

export default Archive;
