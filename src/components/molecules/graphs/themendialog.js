/** @format */

import React, { Fragment, useState } from "react";

//Extra-Packages
import { isMobileCustom } from "../../../util/customDeviceDetect";

// Icons
import CloseIcon from "../../../images/icons/close.png";

//Components
import Thema from "./thema";

// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import ExpandButton from "../../atoms/CustomButtons/ExpandButton";
import MyButtonStyle from "../../atoms/CustomButtons/MyButtonStyle";
import MyButton from "../../../util/MyButton";
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
    height: "auto",
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
};

const ThemenDialog = ({ classes, screams }) => {
  const [open, setOpen] = useState(false);

  const dialogComponent = isMobileCustom ? (
    <Dialog
      scroll={"body"}
      open={open}
      onClose={() => setOpen(false)}
      className="dialogOverlayContent"
      BackdropProps={{ classes: { root: classes.root } }}
      PaperProps={{ classes: { root: classes.paper } }}
      TransitionComponent={Transition}
      fullScreen
      maxWidth={"lg"}
    >
      <MyButton
        onClick={() => setOpen(false)}
        btnClassName={classes.closeButton}
      >
        <img src={CloseIcon} width="20px" />
      </MyButton>

      <DialogContent>
        <Thema screams={screams} />
        {/* <br />
        <Trends /> */}
      </DialogContent>
    </Dialog>
  ) : (
    <Dialog
      scroll={"body"}
      open={open}
      onClose={() => setOpen(false)}
      className="dialogOverlayContent"
      BackdropProps={{ classes: { root: classes.root } }}
      PaperProps={{ classes: { root: classes.paperWeb } }}
      TransitionComponent={Transition}
      fullScreen
      maxWidth={"lg"}
    >
      <MyButton
        onClick={() => setOpen(false)}
        btnClassName={classes.closeButton}
      >
        <img src={CloseIcon} width="20px" />
      </MyButton>

      <DialogContent>
        <Thema screams={screams} />
        {/* <br />
        <Trends /> */}
      </DialogContent>
    </Dialog>
  );
  return (
    <Fragment>
      <ExpandButton handleButtonClick={() => setOpen(true)}></ExpandButton>

      {dialogComponent}
    </Fragment>
  );
};

export default withStyles(styles)(ThemenDialog);
