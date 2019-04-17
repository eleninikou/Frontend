import React from 'react'
import draftToHtml from 'draftjs-to-html'


const TicketContent = ({ description }) => {

  return (
    <div>
      {description  && description.blocks && description.entityMap ?  
        <div dangerouslySetInnerHTML={{ __html: draftToHtml(description) }} />
      : null }   
    </div>
      )
  }

export default TicketContent; 
