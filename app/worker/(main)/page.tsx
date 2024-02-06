"use client";
import { useAuth } from "@/utils/AuthContext";
import React from "react";

const User = () => {
  const { user } = useAuth();
  console.log(user);
  return <div>User</div>;
};

export default User;
