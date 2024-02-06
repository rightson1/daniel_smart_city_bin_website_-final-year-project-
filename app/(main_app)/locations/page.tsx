"use client";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { CustomGrid } from "@/components/data/CustomGrid";

import { Button, Typography } from "@mui/material";
import { Location_Edit } from "@/components/location/location_edit";
import {
  useDeleteLocation,
  useEditLocation,
  useGetLocations,
} from "@/utils/hooks/useLocation";
import { ILocationFetched } from "@/types";
import { useCustomToast } from "@/components/helpers/functions";
const Locations = () => {
  const { data: locations, isLoading } = useGetLocations();
  const { customToast, loading } = useCustomToast();
  const { mutateAsync: deleteLocation } = useDeleteLocation();
  const handleDelete = (id: string) => {
    customToast({
      func: async () => deleteLocation({ _id: id }),
      sfunc: () => console.log("Deleted"),
      efunc: () => console.log("Error"),
    });
  };

  const columns: GridColDef[] = [
    {
      field: "_id",
      headerName: "ID",
      width: 150,
    },
    { field: "name", headerName: "Name", width: 250 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        return (
          <div>
            <Location_Edit location={params.row as ILocationFetched} />
            <Button
              size="small"
              disabled={loading}
              onClick={() => handleDelete(params.row._id as string)}
            >
              <DeleteIcon />
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <div className="pxs fxc gap-5 py-5">
      <Typography variant="h4">Locations</Typography>
      <CustomGrid columns={columns} rows={locations} />
    </div>
  );
};

export default Locations;
