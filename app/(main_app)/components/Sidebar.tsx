"use client";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { menuType, IOpen } from "@/types";
import { Button, Chip, useMediaQuery } from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import HomeIcon from "@mui/icons-material/Home";
import { useGlobalTheme } from "@/utils/themeContext";
import { useRouter } from "next/navigation";
import EngineeringIcon from "@mui/icons-material/Engineering";
import RecyclingIcon from "@mui/icons-material/Recycling";
import NotificationsIcon from "@mui/icons-material/Notifications";

const drawerWidth = "220px";

export default function Sidebar({ open, setOpen }: IOpen) {
  const theme = useTheme();
  const { colors } = useGlobalTheme();
  const router = useRouter();
  const screenWidth = useMediaQuery(theme.breakpoints.up("md"));
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menu = [
    {
      name: "Pages",
      links: [
        {
          name: "Home",
          icon: <HomeIcon />,
          link: "/",
        },
        {
          name: "Locations",
          icon: <MyLocationIcon />,
          link: "/locations",
        },
        {
          name: "Workers",
          icon: <EngineeringIcon />,
          link: "/workers",
        },
        {
          name: "Bins",
          icon: <RecyclingIcon />,
          link: "/bins",
        },
      ],
    },
  ];

  return (
    <Drawer
      sx={{
        width: screenWidth ? drawerWidth : 0,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: screenWidth ? drawerWidth : 240,
          boxSizing: "border-box",
        },
      }}
      variant={screenWidth ? "permanent" : "temporary"}
      anchor="left"
      open={open}
      onClose={handleDrawerClose}
    >
      <Box
        component="img"
        src="/logo.svg"
        alt="logo"
        sx={{
          width: "100px",
        }}
        p={1}
        className="mt-5 mr-2"
      />

      <Divider />

      {menu.map((item, index) => (
        <Box
          key={index}
          border={1}
          borderColor={colors.borderColor}
          bgcolor={colors.foreground}
        >
          <List disablePadding>
            <ListItem>
              <ListItemText primary={item.name} />
            </ListItem>
          </List>
          <List disablePadding>
            {item.links.map((text, index) => (
              <Box
                onClick={() => router.push(text.link)}
                // className="w-full fb px-4 py-1 cursor-pointer transition-all duration-300 ease-in-out"
                sx={{
                  "&:hover": {
                    bgcolor: `${colors.active} !important`,
                  },
                  display: "flex !important",
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: 2,
                  my: 0.2,
                  py: 1,
                  width: "100%",
                  bgcolor: `${colors.surface} !important`,
                }}
                key={text.name}
                className="cursor-pointer"
                borderColor={colors.borderColor}
                bgcolor={colors.foreground}
              >
                <Button startIcon={text.icon}>{text.name}</Button>
                {/* {text.info && (
                  <Chip
                    label={text.info}
                    size="small"
                    variant="filled"
                    color="secondary"
                  />
                )} */}
              </Box>
            ))}
          </List>
          <Divider />
        </Box>
      ))}
      <Divider />
    </Drawer>
  );
}
