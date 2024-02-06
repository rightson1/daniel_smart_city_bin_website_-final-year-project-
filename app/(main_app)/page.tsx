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
import { worker_columns } from "./workers/page";
import MyLocationRoundedIcon from "@mui/icons-material/MyLocationRounded";
import EngineeringRoundedIcon from "@mui/icons-material/EngineeringRounded";
import DirtyLensRoundedIcon from "@mui/icons-material/DirtyLensRounded";
import { useGetLocations } from "@/utils/hooks/useLocation";
import { useGetBins } from "@/utils/hooks/useBin";
import { useGetWorkers } from "@/utils/hooks/useUser";

const Home = () => {
  const { user } = useAuth();
  const { data: locations } = useGetLocations();
  const { data: bins } = useGetBins();
  const { data: workers } = useGetWorkers();
  const binsPieChart = useMemo(() => {
    if (!bins) return [];
    const groupedBins = bins?.reduce<{ [key: string]: number }>((acc, bin) => {
      const location = bin.location.name;
      if (acc[location]) {
        acc[location] = acc[location] + 1;
      } else {
        acc[location] = 1;
      }
      return acc;
    }, {});
    if (!groupedBins) return [];
    return Object.keys(groupedBins).map((location) => ({
      id: location,
      value: groupedBins[location],
      //;atele should be are, number of bins with level 100 and total number of bins
      label: `${location} (total : ${groupedBins[location]}, full: ${
        bins?.filter(
          (bin) => bin.location.name === location && bin.level === 100
        ).length
      })`,
    }));
  }, [bins]);
  console.log(binsPieChart, "binsPieChart");
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 150 },
    {
      field: "consoleType.name",
      headerName: "PlayStation",
      width: 150,
      valueGetter: (params) => params.row.consoleType.name,
    },
    {
      field: "consoleType.rate",
      headerName: "Rate",
      width: 150,
      valueGetter: (params) => params.row.consoleType.rate,
    },
  ];

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
            title={`${locations?.length || "..."} Locations`}
            icon={<MyLocationRoundedIcon />}
            img="/location.png"
          />

          <SumCard
            title={`${workers?.length || "..."} Workers`}
            icon={<EngineeringRoundedIcon />}
            img="/worker.png"
          />
          <SumCard
            title={`${bins?.length || "..."} Bins`}
            icon={<DirtyLensRoundedIcon />}
            img="/trash.png"
          />
        </Grid>
        <Grid item xs={12} md={6} p={0.3}>
          <CustomGrid columns={worker_columns} rows={workers} height="75vh" />
        </Grid>
        <Grid item xs={12} md={6} p={0.3} className="">
          <Box
            className="w-full items-center flex-center h-[75vh] flex-col justify-center p-4 overflow-hidden"
            {...border()}
            p={1}
          >
            <Typography variant="h3" color="skyblue">
              Bin Location Summary
            </Typography>
            <Pie pieData={binsPieChart} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
