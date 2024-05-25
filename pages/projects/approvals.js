import Layout from "../../components/Layout";
import { IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  VerifiedRounded,
  BusinessCenterRounded,
  TimelineRounded,
} from "@mui/icons-material";

const rows = [
  {
    jobNumber: "x1",
    client: "PT kita bisa",
    reporter: "xxx xxx xxxx",
    time: "dd/mm/yyy",
    progress: "registered",
  },
];

const Approvals = () => {
  // state

  const columns = [
    {
      field: "jobNumber",
      headerName: "Job Number",
      width: 170,
    },
    {
      field: "client",
      headerName: "Client",
      width: 300,
    },
    {
      field: "reporter",
      headerName: "Reporter",
      width: 250,
    },
    {
      field: "time",
      headerName: "Time",
      width: 170,
    },
    {
      field: "progress",
      headerName: "Progress",
      width: 100,
    },
    {
      field: "actions",
      headerName: "Action ⚙️",
      headerClassName:
        "underline underline-offset-4 decoration-2 decoration-purple-700",
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <>
          <IconButton
            color="primary"
            title="Approval"
            onClick={() => {
              console.log("approval");
            }}
          >
            <VerifiedRounded />
          </IconButton>
          <IconButton
            color="primary"
            title="Detail Project"
            onClick={() => {
              console.log("detail project");
            }}
          >
            <BusinessCenterRounded />
          </IconButton>
          <IconButton
            color="primary"
            title="Detail Progress"
            onClick={() => {
              console.log("detail progress");
            }}
          >
            <TimelineRounded />
          </IconButton>
        </>
      ),
    },
  ];

  // approval

  // filter (months range, search by job number)

  return (
    <Layout>
      <span>Approval Page</span>

      {/* 
        data table /10
        kolom: Job Number, Calient, Reporter, Time, Progress, #
        action: approval, detail-project, detail-progress 
      */}
      <DataGrid
        className="bg-white my-6 h-[650px]"
        getRowId={(row) => row.jobNumber}
        rows={rows}
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
