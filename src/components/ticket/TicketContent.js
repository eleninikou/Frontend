import React from 'react';

import {stateToHTML} from 'draft-js-export-html'; 
import { convertFromRaw } from 'draft-js';

import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const TicketContent = ({ ticket, description }) => {

    const convertFromJSONToHTML = (text) => { return stateToHTML(convertFromRaw(text))   }
  
    return(
        <div>
            <Typography variant="h6" className="ticket-title">
                {ticket.title} created by {ticket.creator ? ticket.creator.name : null} | {ticket.created_at}
            </Typography>      

          {description.blocks ? 
            <Typography className="my-ticket-time"> 
              <div dangerouslySetInnerHTML={{ __html: convertFromJSONToHTML(description) }} />
            </Typography> 
          : <CircularProgress className="my-spinner" color="primary" />}
        
        </div>
    )
}

export default TicketContent;