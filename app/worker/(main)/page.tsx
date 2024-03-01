"use client";
import Grid from "@mui/material/Grid";
import React, { useMemo } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useGlobalTheme } from "@/utils/themeContext";
import { Avatar, Button } from "@mui/material";

import { border } from "@/components/helpers/atoms";
import Pie from "@/components/data/Pie";
import { GridColDef } from "@mui/x-data-grid";
import { useAuth } from "@/utils/AuthContext";
import { binsPieChart, workers } from "@/constants";
import { CustomGrid } from "@/components/data/CustomGrid";

import MyLocationRoundedIcon from "@mui/icons-material/MyLocationRounded";
import EngineeringRoundedIcon from "@mui/icons-material/EngineeringRounded";
import DirtyLensRoundedIcon from "@mui/icons-material/DirtyLensRounded";
import { useGetLocations } from "@/utils/hooks/useLocation";
import { useGetBins } from "@/utils/hooks/useBin";
import { useGetWorkers } from "@/utils/hooks/useUser";
import { worker_columns } from "@/components/workers/worker_columns";
import { bins_columns } from "@/components/bins/bins_columns";

const Home = () => {
  const { user } = useAuth();
  const { data: locations } = useGetLocations();
  const { data: bins } = useGetBins();
  const { data: workers } = useGetWorkers();
  const teammates = useMemo(
    () => workers?.filter((w) => w.location._id === user.location._id),
    [workers]
  );

  const w_bins = useMemo(
    () => bins?.filter((w) => w.location._id === user.location._id),
    [bins]
  );
  const SumCard = ({
    title,
    icon,
    img,
  }: {
    title: string;
    icon: React.ReactNode;
    img: string;
  }) => (
    <Box className="w-full p-4 fxc gap-2 after:" {...border()} p={1}>
      <div className="fb w-full">
        <Typography variant="body2">{title}</Typography>
        <Button>{icon}</Button>
      </div>
      <img src={img} alt="" className="h-16 w-10 self-center" />
    </Box>
  );
  return (
    <Box p={1} className="w-full fxc gap-5">
      <div className="fb">
        <Typography variant="h3">Dashboard</Typography>
        <Button>
          <Avatar
            src={"/user.jpg"}
            alt={user?.displayName}
            sx={{ width: 24, height: 24 }}
          />
        </Button>
      </div>

      <Grid container rowSpacing={1}>
        <Grid item xs={12} md={12} className="flex gap-1" p={0.3}>
          <SumCard
            title={`${user.location.name}`}
            icon={<MyLocationRoundedIcon />}
            img="/location.png"
          />

          <SumCard
            title={`${teammates?.length || "..."} Teammates`}
            icon={<EngineeringRoundedIcon />}
            img="/worker.png"
          />
          <SumCard
            title={`${w_bins?.length || "..."} Bins`}
            icon={<DirtyLensRoundedIcon />}
            img="/trash.png"
          />
        </Grid>
        <Grid item xs={12} md={12} p={0.3}>
          <CustomGrid columns={bins_columns()} rows={w_bins} height="75vh" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
