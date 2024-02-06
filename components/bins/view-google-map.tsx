import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { IGoogleLocation } from "../../types";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const View_Google_Map = (location: IGoogleLocation) => {
  const [longitude, latitude] = location.coordinates;
  console.log(typeof latitude);
  const mapUrl = `https://www.bing.com/maps/embed?h=400&w=500&cp=${latitude}~${longitude}&lvl=18&typ=d&sty=r&src=SHELL&FORM=MBEDV8`;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        <LocationSearchingIcon />
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>{"View Bins Location"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <iframe
              width="600"
              height="450"
              // frameborder="0"
              // style={{ border: 0 }}
              src={mapUrl}
            ></iframe>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
