"use client";
import * as React from "react";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { useGlobalTheme } from "@/utils/themeContext";
import { border } from "@/components/helpers/atoms";
export function CustomGrid({
  columns,
  rows,
  loading,
  height = "95vh",
}: {
  columns: GridColDef[];
  rows?: GridRowsProp;
  loading?: boolean;
  height?: string;
}) {
  const { colors } = useGlobalTheme();
  const borderString = `1px solid ${colors.borderColor} !important`;
  return (
    <Box
      height={height}
      width={"full"}
      {...border()}
      sx={{
        bgcolor: colors.secondary,

        "& .MuiDataGrid-root": {
          border: "none",

          width: "full",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: borderString,
        },

        "& .MuiDataGrid-toolbarContainer": {
          bgcolor: colors.foreground + " !important",
          borderBottom: "none",
        },
        "& .MuiDataGrid-columnHeaders": {
          bgcolor: colors.foreground + " !important",
          borderBottom: borderString,
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: colors.surface + " !important",
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: borderString,
          bgcolor: colors.foreground + " !important",
        },
        "& .MuiCheckbox-root": {
          color: `${colors.indigo[200]} !important`,
        },

        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          // color: ` ${colors.grey[100]} !important`,
        },
      }}
    >
      <DataGrid
        rows={rows || []}
        columns={columns}
        getRowId={(row) => row._id || row.id}
        // loading={loading}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </Box>
  );
}
