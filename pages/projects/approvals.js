import Layout from "../../components/Layout";
// import { Data } from '@mui/material'
import { DataGrid } from "@mui/x-data-grid";

const Approvals = () => {
  // state

  const columns = [
    {
      field: "jobNumber",
      headerName: "Job Number",
      width: 170,
      headerClassName: "underline underline-offset-4 decoration-2",
    },
    {
      field: "client",
      headerName: "Client",
      width: 300,
      headerClassName: "underline underline-offset-4 decoration-2",
    },
    {
      field: "reporter",
      headerName: "Reporter",
      width: 200,
      headerClassName: "underline underline-offset-4 decoration-2",
    },
    {
      field: "time",
      headerName: "Time",
      width: 200,
      headerClassName: "underline underline-offset-4 decoration-2",
    },
    {
      field: "progress",
      headerName: "Progress",
      width: 200,
      headerClassName: "underline underline-offset-4 decoration-2",
    },
    {
      field: "actions",
      headerName: "#",
      headerClassName:
        "underline underline-offset-4 decoration-2 decoration-purple-700",
      width: 70,
      sortable: false,
      filterable: false,
      // renderCell: ({ row }) =>
      //   row.progress == 3 && (
      //     <Tooltip title="dd/mm/yyy" placement="top">
      //       <CheckCircleRounded className="text-purple-700" />
      //     </Tooltip>
      //   ),
    },
  ];

  // approval

  // filter (months range, search by job number)

  return (
    <Layout>
      <span>Approval Page</span>

      {/* 
        data table /10
        kolom: Job Number, Client, Reporter, Time, Progress, #
        action: approval, detail project, detail progress 
      */}
      <DataGrid
        className="bg-white my-6 h-[631px]"
        // getRowId={(row) => row.jobNumber}
        rows={[]}
        columns={columns}
        autoPageSize
        // pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
        onRowDoubleClick={(p, e, d) =>
          console.log("detail project + detail progress")
        }
      />

      {/* modal: detail project, detail progress */}
    </Layout>
  );
};

export default Approvals;
