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
import { bins_columns } from "@/components/bins/bins_columns";

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

  return (
    <div className="pxs fxc gap-5 py-5">
      <Typography variant="h4">Bins</Typography>
      <CustomGrid columns={bins_columns(handleDelete)} rows={bins} />
    </div>
  );
};

export default Bins;
