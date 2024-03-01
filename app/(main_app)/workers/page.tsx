"use client";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import { CustomGrid } from "@/components/data/CustomGrid";
import { Typography } from "@mui/material";
import { useGetWorkers } from "@/utils/hooks/useUser";
import { Worker_Edit } from "@/components/workers/edit_worker";
import { IWorkerFetched } from "@/types";
import { worker_columns } from "@/components/workers/worker_columns";

const Locations = () => {
  const { data: workers, isLoading } = useGetWorkers();
  return (
    <div className="pxs fxc gap-5 py-5">
      <Typography variant="h4">Workers</Typography>
      <CustomGrid columns={worker_columns} rows={workers} loading={isLoading} />
    </div>
  );
};

export default Locations;
