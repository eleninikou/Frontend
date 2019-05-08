import React, { Component } from "react";
import { connect } from "react-redux";
import { removeFromStorage } from "../../redux/actions/tickets/Actions";
import GridContainer from "../theme/Grid/GridContainer.jsx";
import GridItem from "../theme/Grid/GridItem.jsx";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";

class TicketImagePreviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  removePreview (url) {
    // Remove image from storage 
    this.props.removeFromStorage(url)
    .then(() => {
      let filteredUrls = this.props.urls.filter(u => u !== url);
      this.props.filtered(filteredUrls)
    }
    );
  }

  render() {
    const { classes, urls } = this.props;

    return (
      <GridContainer>
        {urls.length
          ? urls.map(url => {
              return (
                <GridItem xs={12} sm={12} md={3} style={{ flexBasis: "unset" }} >
                  <div style={{ display: "flex", width: "100%", position: "relative" }} >
                    <img
                      src={url}
                      style={{
                        width: "auto",
                        maxWidth: "100%",
                        maxHeight: "200px",
                        display: "block",
                        position: "relative"
                      }}
                      alt="preview"
                    />
                    <Tooltip
                      style={{
                        position: "absolute",
                        right: "-12px",
                        top: "-12px"
                      }}
                      id="tooltip-top-start"
                      title="Remove image"
                      placement="top"
                      onClick={this.removePreview.bind(this, url)}
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <IconButton aria-label="Close" className={classes.tableActionButton} >
                        <Close
                          style={{ color: 'black' }}
                          className={
                            classes.tableActionButtonIcon +
                            " " +
                            classes.close
                          }
                        />
                      </IconButton>
                    </Tooltip>
                  </div>
                </GridItem>
              );
            })
          : null}
      </GridContainer>
    );
  }
}



const mapDispatchToProps = dispatch => {
  return {
    removeFromStorage: url => dispatch(removeFromStorage(url))
  };
};
const mapStateToProps = state => ({
  images: state.ticket.images
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicketImagePreviews);
