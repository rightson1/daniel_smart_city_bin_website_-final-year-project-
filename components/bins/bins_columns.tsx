import { GridColDef } from "@mui/x-data-grid";
import { View_Google_Map } from "./view-google-map";
import { Bin_Edit } from "./edit_bin";
import { Button } from "@mui/material";
import { IBinFetched, IGoogleLocation } from "@/types";
import DeleteIcon from "@mui/icons-material/Delete";
export const bins_columns = (handleDelete?: (id: string) => void) => {
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
          {handleDelete && (
            <Button
              size="small"
              onClick={() => {
                handleDelete(params.row._id as string);
              }}
            >
              <DeleteIcon />
            </Button>
          )}
        </div>
      ),
    },
  ];
  return columns;
};
