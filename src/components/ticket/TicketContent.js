import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import draftToHtml from 'draftjs-to-html';

const TicketContent = ({ description }) => {

    return(
        <div>
          {description ? 
            <div dangerouslySetInnerHTML={{ __html: draftToHtml(description) }} />
          : description && description.entityMap ?
          <div>
            {/* <div dangerouslySetInnerHTML={{ __html: draftToHtml(JSON.parse(description)) }} /> */}
          </div>
          : <CircularProgress className="my-spinner" color="primary" /> }     
        </div>
    )

}

export default TicketContent; 