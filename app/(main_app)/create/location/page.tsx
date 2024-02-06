"use client";
import { useCustomToast } from "@/components/helpers/functions";
import { useAddLocation } from "@/utils/hooks/useLocation";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const Location = () => {
  const { mutateAsync } = useAddLocation();
  const [name, setName] = useState("");
  const { customToast, loading } = useCustomToast();
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    customToast({
      func: () => mutateAsync({ name }),
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
        <Typography variant="h3">New Location</Typography>
      </div>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <TextField
          name="name"
          required
          label="Name"
          type="name"
          onChange={(e) => setName(e.target.value)}
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

export default Location;
