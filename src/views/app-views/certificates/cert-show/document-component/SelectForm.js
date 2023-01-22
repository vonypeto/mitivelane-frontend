import React, { useState } from "react";
import PropTypes from "prop-types";
import MUIList from "@material-ui/core/List";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "./ListItem";
import DehazeIcon from "@material-ui/icons/Dehaze";
const styles = {
  list: {
    maxWidth: "auto",
    margin: " auto",
  },
};
const List = (props) => {
  const { data } = props;
  //hook to render list only when panel actually expanded
  const [expanded, setExpanded] = useState(false);
  return (
    <Accordion onClick={() => setExpanded(true)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography component={"span"} variant={"body2"}>
          <div className="d-flex">
            <DehazeIcon className="mr-1" />{" "}
            <h5 style={{ margin: 0, padding: 0, marginTop: 2 }}>
              {data?.Details}
            </h5>
          </div>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {expanded && (
          <MUIList>
            <ListItem {...props} />
          </MUIList>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default withStyles(styles)(List);
