import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ILocationFetched, IOpen } from "@/types";
import EditIcon from "@mui/icons-material/Edit";
import { useEditLocation } from "@/utils/hooks/useLocation";
import { useCustomToast } from "../helpers/functions";

export function Location_Edit({ location }: { location: ILocationFetched }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(location.name);
  const { customToast, loading } = useCustomToast();
  const { mutateAsync } = useEditLocation();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    customToast({
      func: async () => mutateAsync({ _id: location._id, name }),
      sfunc: () => setOpen(false),
      efunc: () => setOpen(true),
    });
  };
  return (
    <React.Fragment>
      <Button size="small" onClick={handleClickOpen}>
        <EditIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: submit,
        }}
      >
        <DialogTitle>Edit Location</DialogTitle>
        <DialogContent>
          <TextField
            variant="standard"
            required
            name="name"
            label="Name "
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
