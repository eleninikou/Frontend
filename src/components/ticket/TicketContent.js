import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import draftToHtml from 'draftjs-to-html'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";


class TicketContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: this.props.description,
      images: this.props.images,
      lightboxIsOpen: false
    }
}


render() {
  const { images, description } = this.props;

  var galleryImages = [ images ? images.map(image => { 
      return ({ original: image.attachment ,
               thumbnail: image.attachment }) 
    }) : null ]


  return (
    <div>
      {description  && description.blocks && description.entityMap ?  
        <div dangerouslySetInnerHTML={{ __html: draftToHtml(description) }} />
      : null }   

      <ImageGallery 
      items={galleryImages[0]}
      />
    </div>
      )
  }
}

export default TicketContent; 
