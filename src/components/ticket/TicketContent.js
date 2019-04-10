import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import draftToHtml from 'draftjs-to-html';

const TicketContent = ({ description }) => {

    return(
        <div>
          {description && description.blocks && description.entityMap ? 
            <div dangerouslySetInnerHTML={{ __html: draftToHtml(description) }} />
          : <CircularProgress className="my-spinner" color="primary" /> }     
        </div>
    )

}

export default TicketContent;