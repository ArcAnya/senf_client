/** @format */

import React, { Component, Fragment } from "react";
import { isMobileCustom } from "../../../util/customDeviceDetect";

// Icons
import CloseIcon from "@material-ui/icons/Close";

//Components
import Altersgruppe from "./altersgruppe";

// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import MyButtonStyle from "../../atoms/CustomButtons/MyButtonStyle";
import ExpandButton from "../../atoms/CustomButtons/ExpandButton";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = {
  root: {
    //backgroundColor: "rgb(0,0,0,0.5)",
    padding: "0",
    overflow: "hidden",
  },

  paper: {
    //backgroundColor: "rgb(0,0,0,0.5)",
    boxShadow: "none",
    overflow: "hidden",
    padding: "0",
    top: "8em",
    borderRadius: "10px",
  },
  paperWeb: {
    borderRadius: "20px",
    width: "1000px",
    height: "auto",
    maxHeight: "calc(100vh - 80px)",
    overflowX: "hidden",
  },

  closeButton: {
    position: "absolute",
    top: "2.5vw",
    left: "2.5vw",
    color: "black",
    zIndex: "990",
    padding: 10,
  },

  expandButton: {
    position: "absolute",
    left: "0%",
    top: "0%",
    width: "100%",
    height: "100%",
    borderRadius: 0,
    zIndex: 9,
  },
  dialogcontent: {
    position: "relative",
    marginLeft: "2.5vw",

    width: "95vw",
    height: "auto",
  },

  card: {
    marginTop: "0",
    top: "0em",
    position: "relative",
    overflow: "hidden",
    paddingTop: "1em",
    backgroundColor: "white",
    height: "auto",
    paddingBottom: "0em",
    borderRadius: "10px",
  },
  title: {
    fontFamily: "Futura PT W01-Bold",
    position: "relative",
    height: "2em",
    width: "100%",
    fontSize: "28",
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Futura PT W01 Book",
    position: "relative",
    height: "auto",
    width: "100%",
    maxWidth: "500px",
    marginLeft: "50%",
    transform: "translateX(-50%)",
    fontSize: "20",
    textAlign: "center",
  },
  plot: {
    position: "relative",
    width: "100%",
  },
  clickblocker: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: "9",
  },
  legendwrapper: {
    color: "black",
    zIndex: "1",
    position: "relative",
    width: "100%",

    borderRadius: "10px",
    top: "2vh",
    paddingLeft: "20px",

    marginBottom: "20px",
    maxWidth: "500px",
    marginLeft: "50%",
    transform: "translateX(-50%)",
  },
};

class AltersgruppeDialog extends Component {
  state = {
    open: false,

    oldPath: "",
    newPath: "",
    path: "",
  };

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    const dialogComponent = isMobileCustom ? (
      <Dialog
        scroll={"body"}
        open={this.state.open}
        onClose={this.handleClose}
        BackdropProps={{ classes: { root: classes.root } }}
        PaperProps={{ classes: { root: classes.paper } }}
        TransitionComponent={Transition}
        fullScreen
        className="dialogOverlayContent"
        maxWidth={"lg"}
      >
        <MyButtonStyle onClick={this.handleClose} btnClassName={classes.closeButton}>
          <CloseIcon />
        </MyButtonStyle>

        <DialogContent>
          <Altersgruppe data={this.props.data} classes={this.props.classes} />
        </DialogContent>
      </Dialog>
    ) : (
      <Dialog
        scroll={"body"}
        open={this.state.open}
        onClose={this.handleClose}
        BackdropProps={{ classes: { root: classes.root } }}
        PaperProps={{ classes: { root: classes.paperWeb } }}
        TransitionComponent={Transition}
        fullScreen
        className="dialogOverlayContent"
        maxWidth={"lg"}
      >
        <MyButtonStyle onClick={this.handleClose} btnClassName={classes.closeButton}>
          <CloseIcon />
        </MyButtonStyle>

        <DialogContent>
          <Altersgruppe data={this.props.data} classes={this.props.classes} />
        </DialogContent>
      </Dialog>
    );

    return (
      <Fragment>
        <ExpandButton
          handleButtonClick={this.handleOpen}
        ></ExpandButton>
        {dialogComponent}
      </Fragment>
    );
  }
}

export default withStyles(styles)(AltersgruppeDialog);
