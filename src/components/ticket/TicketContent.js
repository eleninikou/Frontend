import React from 'react';

import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import draftToHtml from 'draftjs-to-html';

const TicketContent = ({ description }) => {

    return(
        <div>
          {description.blocks && description.entityMap ? 
            <Typography className="my-ticket-time"> 
              <div dangerouslySetInnerHTML={{ __html: draftToHtml(description) }} />
            </Typography> 
          : <CircularProgress className="my-spinner" color="primary" /> }     
        </div>
    )

}

export default TicketContent;