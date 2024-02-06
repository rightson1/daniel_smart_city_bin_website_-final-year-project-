"use client";
import { useCustomToast } from "@/components/helpers/functions";
import { useAddBin } from "@/utils/hooks/useBin";
import { useGetLocations } from "@/utils/hooks/useLocation";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const Bin = () => {
  const { mutateAsync } = useAddBin();
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const { customToast, loading } = useCustomToast();
  const { data: locations } = useGetLocations();
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    customToast({
      func: () =>
        mutateAsync({
          location,
          level: 0,
          googleLocation: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
        }),
    });
  };
  return (
    <Box
      p={1}
      className="w-full fxc gap-5"
      component={"form"}
      onSubmit={submit}
    >
      <div className="fb">
        <Typography variant="h3">New Bin</Typography>
      </div>
      <FormControl>
      
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
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <TextField
          label="Longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          disabled={loading}
          sx={{
            mt: 3,
          }}
        >
          Submit
        </Button>
      </FormControl>
    </Box>
  );
};

export default Bin;
