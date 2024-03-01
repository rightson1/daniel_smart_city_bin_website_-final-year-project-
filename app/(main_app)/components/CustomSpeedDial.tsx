"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { useRouter } from "next/navigation";
import RoomIcon from "@mui/icons-material/Room";
import MyLocationRoundedIcon from "@mui/icons-material/MyLocationRounded";
import EngineeringRoundedIcon from "@mui/icons-material/EngineeringRounded";
import DirtyLensRoundedIcon from "@mui/icons-material/DirtyLensRounded";
const actions = [
  {
    name: "New Bin",
    icon: <DirtyLensRoundedIcon />,
    link: "/create/bin",
  },

  {
    name: "New Locations",
    icon: <RoomIcon />,
    link: "/create/location",
  },
];

export default function CustomSpeedDial() {
  const router = useRouter();
  //if window is not defined return null

  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      className="fixed bottom-[53px] md:bottom-5 right-3 md:right-[250px] z-[100000]"
      sx={{
        position: "fixed !important",
      }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          onClick={() => {
            router.push(`${action.link}`);
          }}
          tooltipTitle={action.name}
        />
      ))}
    </SpeedDial>
  );
}
