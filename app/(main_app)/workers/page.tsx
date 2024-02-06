"use client";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import { CustomGrid } from "@/components/data/CustomGrid";
import { Typography } from "@mui/material";
import { useGetWorkers } from "@/utils/hooks/useUser";
import { Worker_Edit } from "@/components/workers/edit_worker";
import { IWorkerFetched } from "@/types";
export const worker_columns: GridColDef<IWorkerFetched>[] = [
  { field: "displayName", headerName: "Display Name", width: 150 },

  { field: "email", headerName: "Email", width: 200 },
  {
    field: "location",
    headerName: "Location",
    width: 100,
    renderCell: (params) => {
      console.log(params.row.location);
      return <div>{params.row.location?.name}</div>;
    },
  },
  {
    field: "location",

    headerName: "Actions",
    width: 150,
    sortable: false,
    renderCell: (params) => <Worker_Edit worker={params.row as any} />,
  },
];
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
