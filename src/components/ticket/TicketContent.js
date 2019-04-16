import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import draftToHtml from 'draftjs-to-html'


const TicketContent = ({ description, images }) => {
    return(
        <div>
          {description.blocks && description.entityMap ? 
            <div dangerouslySetInnerHTML={{ __html: draftToHtml(description) }} />
          : <CircularProgress className="my-spinner" color="primary" /> }     
          {images ?
            images.map(image => {
              console.log(image)
              debugger;
              return <img src={image.attachment} style={{ width: 'auto', height: 'auto', display: 'block'}} alt="preview" />
            })
            : null
          }
        </div>
    )

}

export default TicketContent; 