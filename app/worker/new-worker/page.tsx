"use client";
import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useGlobalTheme } from "@/utils/themeContext";
import Button from "@mui/material/Button";
import { auth } from "@/utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { useAddUser, useAddWorker } from "@/utils/hooks/useUser";
import { useCustomToast } from "@/components/helpers/functions";
import { useGetLocations } from "@/utils/hooks/useLocation";
import toast from "react-hot-toast";
const Create = () => {
  const { customToast, loading } = useCustomToast();
  const { colors } = useGlobalTheme();
  const { mutateAsync } = useAddWorker();
  const { data: locations } = useGetLocations();
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email")?.toString().trim();
    const password = data.get("password")?.toString().trim();
    const name = data.get("name")?.toString().trim();
    const location = data.get("location")?.toString();
    if (!name || !location)
      return toast.error("Name and Location are required");

    if (!email || !password) return;
    const signIn = async () => {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (res) => {
          const { displayName, uid, email } = res.user;
          if (email && uid) {
            await mutateAsync({
              displayName: name!,
              email,
              uid,
              admin: false,
              photoURL: "",
              location,
            });
          } else {
            throw new Error("Could not sign in");
          }
        })
        .catch((e) => {
          const message = e.message;
          throw new Error(message);
        });
    };
    customToast({
      func: signIn,
      sfunc: () => (window.location.href = "/"),
    });
  };
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        md={8}
        bgcolor={colors.foreground}
        className="h-screen hidden md:flex  overflow-hidden relative"
      >
        <div className="absolute top-5 left-5">
          <img src="/logo.svg" alt="" />
        </div>
        <img src="/login.svg" alt="" />
      </Grid>
      <Grid
        item
        xs={12}
        p={2}
        md={4}
        className="h-screen flex flex-col
         items-center justify-center overflow-hidden relative"
      >
        <form
          onSubmit={submit}
          className="flex gap-5 flex-col items-start justify-center w-full max-w-[500px]"
        >
          <Typography variant="h2">Welcome to Modernize</Typography>
          <Typography color="GrayText" variant="h6">
            Your Admin Dashboard
          </Typography>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <TextField name="name" required label="Name" />
          </FormControl>
          <Select label="Location" required fullWidth name="location">
            {locations?.map((loc) => (
              <MenuItem key={loc._id} value={loc._id}>
                {loc.name}
              </MenuItem>
            ))}
          </Select>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <TextField name="email" required label="Email" />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <TextField
              name="password"
              required
              label="Password"
              type="password"
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
              Sign In
            </Button>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};

export default Create;
