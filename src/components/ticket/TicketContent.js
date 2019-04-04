import React from 'react';

import {stateToHTML} from 'draft-js-export-html'; 
import { convertFromRaw } from 'draft-js';

import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const TicketContent = ({ description }) => {

    const convertFromJSONToHTML = (text) => { return stateToHTML(convertFromRaw(text))   }
  
    return(
        <div>
          {description.blocks ? 
            <Typography className="my-ticket-time"> 
              <div dangerouslySetInnerHTML={{ __html: convertFromJSONToHTML(description) }} />
            </Typography> 
          : <CircularProgress className="my-spinner" color="primary" />}     
        </div>
    )
}

export default TicketContent;