"use client";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { CustomGrid } from "@/components/data/CustomGrid";
import { Button, Typography } from "@mui/material";
import { useDeleteBin, useGetBins } from "@/utils/hooks/useBin";
import { Bin_Edit } from "@/components/bins/edit_bin";
import { IBinFetched, IGoogleLocation } from "@/types";
import { useCustomToast } from "@/components/helpers/functions";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import { View_Google_Map } from "@/components/bins/view-google-map";

const Bins = () => {
  const { data: bins } = useGetBins();
  const { customToast, loading } = useCustomToast();
  const { mutateAsync: deleteLocation } = useDeleteBin();
  const handleDelete = (id: string) => {
    customToast({
      func: async () => deleteLocation({ _id: id }),
      sfunc: () => console.log("Deleted"),
      efunc: () => console.log("Error"),
    });
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 150 },
    {
      field: "location",
      headerName: "Location",
      width: 150,
      renderCell: (params) => {
        return <div>{params.row.location.name}</div>;
      },
    },
    {
      field: "googleLocation",
      headerName: "Map",
      width: 150,
      renderCell: (params) => {
        return (
          <View_Google_Map
            {...(params.row.googleLocation as IGoogleLocation)}
          />
        );
      },
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <div>
          <Bin_Edit bin={params.row as IBinFetched} />
          <Button
            size="small"
            onClick={() => handleDelete(params.row._id as string)}
          >
            <DeleteIcon />
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div className="pxs fxc gap-5 py-5">
      <Typography variant="h4">Bins</Typography>
      <CustomGrid columns={columns} rows={bins} />
    </div>
  );
};

export default Bins;
