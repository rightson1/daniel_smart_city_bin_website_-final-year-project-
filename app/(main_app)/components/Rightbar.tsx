import { useGlobalTheme } from "@/utils/themeContext";
import { styled, useTheme } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import React, { useMemo } from "react";
import { notifications } from "@/constants";
import { useGetBins } from "@/utils/hooks/useBin";

const Rightbar = () => {
  const theme = useTheme();
  const { colors } = useGlobalTheme();
  const screenWidth = useMediaQuery(theme.breakpoints.up("md"));
  const { data: bins } = useGetBins();
  const drawerWidth = "240px";

  // {
  //     id: 1,
  //     title: "Bin Damaged",
  //     message: `
  //     The bin at ${locations[0].name} has been damaged and needs repair.`,
  //     createdAt: new Date(),
  //     sender: "Rightson Tole",
  //   },
  //notifications for all bins whose level is above 80%

  const notifications = useMemo(() => {
    if (bins) {
      return bins
        .filter((bin) => bin.level > 80)
        .map((bin) => ({
          id: bin._id,
          title: "Bin Full",
          message: `The bin at ${bin.location.name} is full and needs emptying.`,
          createdAt: new Date(),
          sender: "Rightson Tole",
        }));
    }
    return [];
  }, [bins]);
  return (
    <Drawer
      variant={screenWidth ? "persistent" : "temporary"}
      anchor="right"
      open={screenWidth}
      sx={{
        width: screenWidth ? drawerWidth : 0,
        flexShrink: 0,
        // height: "100vh",
        overflow: "hidden !important",
        "& .MuiDrawer-paper": {
          width: screenWidth ? drawerWidth : 240,
          boxSizing: "border-box",
          height: "100vh",
          overflow: "auto !important",
        },
      }}
    >
      <div className="flex-col-center px-2">
        <div className="w-full fb">
          <Button variant="text">Notifications</Button>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge
              badgeContent={bins?.filter((bin) => bin.level === 100).length}
              color="error"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </div>

        <Box className="w-full flex-col-center mt-5 gap-1">
          {notifications.map((item, i) => (
            <Box
              className="flex items-start gap-2  p-1 cursor-pointer w-full"
              border={1}
              borderColor={colors.borderColor}
              bgcolor={colors.foreground}
              key={i}
              sx={{
                "&:hover": {
                  bgcolor: `${colors.active} !important`,
                },
              }}
            >
              <Box className="fxc gap-1 p-1 ">
                <Typography variant="h6" className="font-500">
                  {item.title}
                </Typography>
                <Typography variant="body2" className="font-400">
                  {item.message}
                </Typography>
                <div className="fb py-2">
                  <Typography
                    variant="body2"
                    className="text-[10px]"
                  ></Typography>
                  <Typography variant="body2" className="text-[10px]">
                    Daniel
                  </Typography>
                </div>
              </Box>
            </Box>
          ))}
        </Box>
      </div>
    </Drawer>
  );
};

export default Rightbar;
