import { useState } from "react";
import Layout from "../components/Layout";
import {
  Card,
  CardContent,
  IconButton,
  Link,
  Button,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import {
  EventRepeatRounded,
  VerifiedRounded,
  ReceiptLongRounded,
  EditCalendarRounded,
  CheckCircleRounded,
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";

//kolom: Job Number, Client, (ongoing 0 - finished 1 - invoicing 2 - paid 3), status
const columns = [
  { field: "jobNumber", headerName: "Job Number", width: 170 },
  { field: "client", headerName: "Client", width: 300 },
  { field: "po", headerName: "Project Order", width: 300 },
  {
    field: "registered",
    headerName: "Registered",
    width: 100,
    renderCell: ({ row }) =>
      row.progress == -1 && (
        <Tooltip title="dd/mm/yyy" placement="top">
          <CheckCircleRounded className="text-orange-500" />
        </Tooltip>
      ),
  },
  {
    field: "ongoing",
    headerName: "Ongoing",
    width: 70,
    renderCell: ({ row }) =>
      row.progress == 0 && (
        <Tooltip title="dd/mm/yyy" placement="top">
          <CheckCircleRounded />
        </Tooltip>
      ),
  },
  {
    field: "finished",
    headerName: "Finished",
    width: 70,
    renderCell: ({ row }) =>
      row.progress == 1 && (
        <Tooltip title="dd/mm/yyy" placement="top">
          <CheckCircleRounded className="text-blue-500" />
        </Tooltip>
      ),
  },
  {
    field: "invoicing",
    headerName: "Invoicing",
    width: 70,
    renderCell: ({ row }) =>
      row.progress == 2 && (
        <Tooltip title="dd/mm/yyy" placement="top">
          <CheckCircleRounded className="text-red-600" />
        </Tooltip>
      ),
  },
  {
    field: "paid",
    headerName: "Paid",
    width: 70,
    renderCell: ({ row }) =>
      row.progress == 3 && (
        <Tooltip title="dd/mm/yyy" placement="top">
          <CheckCircleRounded className="text-green-500" />
        </Tooltip>
      ),
  },
  // {
  //   field: "projectStatus",
  //   headerName: "Status",
  //   width: 100,
  // },
];

const rows = [
  {
    jobNumber: "x1",
    client: "PT kita bisa",
    po: "xxx xxx xxxx",
    progress: 0,
  },
  {
    jobNumber: "x2",
    client: "PT kita bisa",
    po: "aaa xxx ccc",
    progress: 3,
  },
  {
    jobNumber: "x3",
    client: "PT kita bisa",
    po: "dfkj kjgd uuu",
    progress: 1,
  },
  {
    jobNumber: "x4",
    client: "PT kita bisa",
    po: "xxx xxx xxxx",
    progress: 2,
  },
  {
    jobNumber: "x5",
    client: "PT kita bisa",
    po: "ttt xxx xxxx",
    progress: -1,
  },
  {
    jobNumber: "x6",
    client: "PT kita bisa",
    po: "yyrr opopop",
    progress: 2,
  },
  {
    jobNumber: "x7",
    client: "PT kita bisa",
    po: "qwr xxx xxxx",
    progress: 3,
  },
];

const Dashboard = () => {
  const [dialogFilterRange, setDialogFilterRange] = useState(false);
  const [dialogDetailProject, setDialogDetailProject] = useState(false);

  const _openDialog = (key) => {
    switch (key) {
      case "filterRange":
        setDialogFilterRange(true);
        break;
      default:
        setDialogDetailProject(true);
        break;
    }
  };

  const _closeDialog = (key) => {
    switch (key) {
      case "filterRange":
        setDialogFilterRange(false);
        break;
      default:
        setDialogDetailProject(false);
        break;
    }
  };

  return (
    <Layout>
      <span className="block text-2xl font-bold mb-8">Project Monitoring</span>
      <span className="text-base text-gray-500 block mb-6 underline">
        hi Username 😊, have a nice day 🌈
      </span>

      {/* hightlight information */}
      <div className=" flex flex-row space-x-2 sm:space-x-6">
        <Card
          variant="outlined"
          className="w-1/4 rounded-xl content-center no-underline border-2 "
          sx={{
            borderColor: "primary.main",
            boxShadow: "3",
            ":hover": {
              cursor: "pointer",
            },
          }}
          component={Link}
          onClick={() => _openDialog("filterRange")}
        >
          <CardContent className="flex flex-row items-center p-2 md:p-4">
            <EditCalendarRounded className="hidden sm:block text-2xl sm:text-4xl md:text-6xl" />
            <div className="ml-1 sm:ml-2 md:ml-4">
              <span className="text-sm sm:text-base md:text-xl font-bold block">
                06-12 2024
              </span>
              <span className="text-sm md:text-base">Range</span>
            </div>
          </CardContent>
        </Card>

        <Card variant="outlined" className="w-1/4 rounded-xl content-center">
          <CardContent className="flex flex-row items-center p-2 md:p-4">
            <EventRepeatRounded className="hidden sm:block text-2xl sm:text-4xl md:text-6xl" />
            <div className="ml-1 sm:ml-2 md:ml-4">
              <span className="text-xl sm:text-2xl md:text-3xl font-bold block">
                99
              </span>
              <span className="text-sm md:text-base">Ongoing</span>
            </div>
          </CardContent>
        </Card>
        <Card variant="outlined" className="w-1/4 rounded-xl content-center">
          <CardContent className="flex flex-row items-center p-2 md:p-4">
            <VerifiedRounded className="hidden sm:block text-2xl sm:text-4xl md:text-6xl" />
            <div className="ml-1 sm:ml-2 md:ml-4">
              <span className="text-xl sm:text-2xl md:text-3xl font-bold block">
                99
              </span>
              <span className="text-sm md:text-base">Finished</span>
            </div>
          </CardContent>
        </Card>
        <Card variant="outlined" className="w-1/4 rounded-xl content-center">
          <CardContent className="flex flex-row items-center p-2 md:p-4">
            <ReceiptLongRounded className="hidden sm:block text-2xl sm:text-4xl md:text-6xl" />
            <div className="ml-1 sm:ml-2 md:ml-4">
              <span className="text-xl sm:text-2xl md:text-3xl font-bold block">
                99
              </span>
              <span className="text-sm md:text-base">Paid</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* projects, /10 data */}
      <DataGrid
        className="rounded-xl bg-white my-6 h-[633px]"
        getRowId={(row) => row.jobNumber}
        rows={rows}
        columns={columns}
        autoPageSize
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
        onRowDoubleClick={(p, e, d) => _openDialog("detailProject")}
      />

      {/* DIALOGS */}
      <Dialog
        open={dialogDetailProject}
        onClose={() => _closeDialog("detailProject")}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle>Detail Project</DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-2 mt-2">
            <div>
              <span className="text-base font-medium text-gray-500 mb-1 block">
                Job Number
              </span>
              <span className="text-base font-normal text-gray-400">...</span>
            </div>
            <div>
              <span className="text-base font-medium text-gray-500 mb-1 block">
                Client
              </span>
              <span className="text-base font-normal text-gray-400">...</span>
            </div>
            <div>
              <span className="text-base font-medium text-gray-500 mb-1 block">
                Project Order
              </span>
              <span className="text-base font-normal text-gray-400">...</span>
            </div>
            <div>
              <span className="text-base font-medium text-gray-500 mb-1 block">
                Description
              </span>
              <span className="text-base font-normal text-gray-400">...</span>
            </div>
            <div>
              <span className="text-base font-medium text-gray-500 mb-1 block">
                Project Status
              </span>
              <span className="text-base font-normal text-gray-400">...</span>
            </div>
            <div>
              <span className="text-base font-medium text-gray-500 mb-1 block">
                No. Contract/ PO/ SO/ Date
              </span>
              <span className="text-base font-normal text-gray-400">...</span>
            </div>
            <div>
              <span className="text-base font-medium text-gray-500 mb-1 block">
                Start Date
              </span>
              <span className="text-base font-normal text-gray-400">...</span>
            </div>
            <div>
              <span className="text-base font-medium text-gray-500 mb-1 block">
                Finish Date
              </span>
              <span className="text-base font-normal text-gray-400">...</span>
            </div>
            <div>
              <span className="text-base font-medium text-gray-500 mb-1 block">
                Project Type
              </span>
              <span className="text-base font-normal text-gray-400">...</span>
            </div>
            <div>
              <span className="text-base font-medium text-gray-500 mb-1 block">
                PO Date
              </span>
              <span className="text-base font-normal text-gray-400">...</span>
            </div>
            <div>
              <span className="text-base font-medium text-gray-500 mb-1 block">
                No.PES
              </span>
              <span className="text-base font-normal text-gray-400">...</span>
            </div>
            <div>
              <span className="text-base font-medium text-gray-500 mb-1 block">
                No. REG Contract
              </span>
              <span className="text-base font-normal text-gray-400">...</span>
            </div>
            <div>
              <span className="text-base font-medium text-gray-500 mb-1 block">
                Remark
              </span>
              <span className="text-base font-normal text-gray-400">...</span>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => _closeDialog("detailProject")}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={dialogFilterRange}
        onClose={() => _closeDialog("filterRange")}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle>Filter Range</DialogTitle>
        <DialogContent>
          <span>date range for data project filters, maximum 6 months</span>
          <TextField
            name="startDate"
            onChange={() => {}}
            margin="dense"
            helperText="Start Date"
            type="date"
            fullWidth
            variant="standard"
          />
          <TextField
            name="EndDate"
            onChange={() => {}}
            margin="dense"
            helperText="End Date"
            type="date"
            fullWidth
            variant="standard"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => _closeDialog("filterRange")}>Close</Button>
          <Button onClick={() => _closeDialog("...")}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default Dashboard;
