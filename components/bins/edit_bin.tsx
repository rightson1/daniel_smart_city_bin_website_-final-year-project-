import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IBinFetched, IOpen } from "@/types";
import EditIcon from "@mui/icons-material/Edit";
import { useEditBin } from "@/utils/hooks/useBin";
import { useCustomToast } from "../helpers/functions";
import { FormLabel, MenuItem, Select } from "@mui/material";
import { useGetLocations } from "@/utils/hooks/useLocation";

export function Bin_Edit({ bin }: { bin: IBinFetched }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(bin.name);
  const { customToast, loading } = useCustomToast();
  const { data: locations } = useGetLocations();
  const [level, setLevel] = React.useState(bin.level);
  const [latitude, setLatitude] = React.useState(
    bin.googleLocation.coordinates[1]
  );
  const [longitude, setLongitude] = React.useState(
    bin.googleLocation.coordinates[0]
  );
  const [location, setLocation] = React.useState(bin.location._id);
  const { mutateAsync } = useEditBin();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    customToast({
      func: async () =>
        mutateAsync({
          _id: bin._id,
          name,
          level,
          googleLocation: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
        }),
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
        <DialogTitle>Edit Bin</DialogTitle>
        <DialogContent className="fxc gap-5">
          <Select
            value={location}
            label="Location"
            onChange={(e) => setLocation(e.target.value as string)}
          >
            {locations?.map((loc) => (
              <MenuItem key={loc._id} value={loc._id}>
                {loc.name}
              </MenuItem>
            ))}
          </Select>
          <TextField
            label="Latitude"
            type="number"
            value={latitude}
            onChange={(e) => setLatitude(Number(e.target.value))}
          />
          <TextField
            label="Longitude"
            value={longitude}
            type="number"
            onChange={(e) => setLongitude(Number(e.target.value))}
          />
          {/* level */}
          <TextField
            label="Level"
            type="number"
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
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
