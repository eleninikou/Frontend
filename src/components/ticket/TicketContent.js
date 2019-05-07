import React from "react";
import draftToHtml from "draftjs-to-html";
import Typography from "@material-ui/core/Typography";

const TicketContent = ({ description }) => {
  return (
    <div>
      <Typography style={{ color: "grey", marginTop: "25px" }}>
        Description
      </Typography>

      {description && description.blocks && description.blocks.length && description.entityMap ? (
        <div dangerouslySetInnerHTML={{ __html: draftToHtml(description) }} />
      ) : null}
    </div>
  );
};

export default TicketContent;
