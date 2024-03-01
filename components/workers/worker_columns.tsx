import { IWorkerFetched } from "@/types";
import { GridColDef } from "@mui/x-data-grid";
import { Worker_Edit } from "./edit_worker";

export const worker_columns: GridColDef<IWorkerFetched>[] = [
  { field: "displayName", headerName: "Display Name", width: 150 },

  { field: "email", headerName: "Email", width: 200 },
  {
    field: "location",
    headerName: "Location",
    width: 100,
    renderCell: (params) => {
      return <div>{params.row.location?.name}</div>;
    },
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    sortable: false,
    renderCell: (params) => <Worker_Edit worker={params.row as any} />,
  },
];
