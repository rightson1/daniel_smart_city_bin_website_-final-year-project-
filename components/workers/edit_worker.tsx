import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ILocationFetched, IWorkerFetched } from "@/types";
import EditIcon from "@mui/icons-material/Edit";
import { useEditWorker } from "@/utils/hooks/useUser";
import { useCustomToast } from "../helpers/functions";
import { FormLabel, InputLabel, MenuItem, Select } from "@mui/material";
import { useGetLocations } from "@/utils/hooks/useLocation";

export function Worker_Edit({ worker }: { worker: IWorkerFetched }) {
  const [open, setOpen] = React.useState(false);
  const { customToast, loading } = useCustomToast();
  const { data: locations } = useGetLocations();
  const [location, setLocation] = React.useState<ILocationFetched>(
    worker.location
  );
  const { mutateAsync } = useEditWorker();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!location) return;
    customToast({
      func: async () =>
        mutateAsync({
          _id: worker._id,
          location: location._id,
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
        <DialogTitle>Edit Worker</DialogTitle>
        <DialogContent className="fxc gap-5">
          <InputLabel id="location">Location</InputLabel>

          <Select
            value={location?.name}
            label="Location"
            id="location"
            className="min-w-[300px]"
            onChange={(e) => {
              if (!locations) return;
              setLocation(
                locations?.find(
                  (loc) => loc._id === e.target.value
                ) as ILocationFetched
              );
            }}
          >
            {locations?.map((loc) => (
              <MenuItem key={loc._id} value={loc._id}>
                {loc.name}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
