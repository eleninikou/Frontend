import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteAttachment } from '../../redux/actions/tickets/Actions'

import Avatar from '@material-ui/core/Avatar'
import Remove from "@material-ui/icons/Remove"
import Tooltip from "@material-ui/core/Tooltip"

class TicketPreviews extends Component {
    constructor(props) {
      super(props);
      this.state = {
 
      }
  }

  componentWillMount = () => {
  
    }

  removeImage(url) {
    this.props.deleteAttachment(url)
    .then(res => { console.log(res)})
  }


  render() {
    const { url, classes } = this.props;
    return(
        <div style={{ display: 'flex', width: '100%'}}>
          <img src={url} style={{ width: 'auto', height: 'auto', display: 'block'}} alt="preview" /> 
            <Tooltip
              id="tooltip-top-start"
              title="Remove image"
              placement="top"
              onClick={this.removeImage.bind(this, url)}
              classes={{ tooltip: classes.tooltip }}>  
                <Avatar style={{ backgroundColor: '#f44336' }}> 
                  <Remove /> 
                </Avatar>
            </Tooltip>
        </div>
        )
  }
}

const mapDispatchToProps = dispatch => { return { 
    deleteAttachment: url => dispatch(deleteAttachment(url))

} }
const mapStateToProps = state => ({ 
    images: state.ticket.images
});

export default connect(mapStateToProps, mapDispatchToProps)(TicketPreviews)
