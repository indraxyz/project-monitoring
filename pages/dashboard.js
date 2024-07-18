import { useState } from "react";
import Layout from "../components/Layout";
import {
  Card,
  CardContent,
  Link,
  Button,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slider,
  Box,
} from "@mui/material";
import {
  EventRepeatRounded,
  VerifiedRounded,
  ReceiptLongRounded,
  EditCalendarRounded,
  CheckCircleRounded,
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";

//kolom: Job Number, Client, (ongoing 0 - finished 1 - invoicing 2 - paid 3)
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
    field: "po",
    headerName: "Project Order",
    width: 300,
    headerClassName: "underline underline-offset-4 decoration-2",
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "registered",
    headerName: "Registered",
    headerClassName:
      "underline underline-offset-4 decoration-2 decoration-yellow-400",
    width: 100,
    sortable: false,
    filterable: false,
    hideable: false,
    disableColumnMenu: true,
    renderCell: ({ row }) =>
      row.progress == 0 && (
        <Tooltip title="dd/mm/yyy" placement="top">
          <CheckCircleRounded className="text-yellow-400" />
        </Tooltip>
      ),
  },
  {
    field: "ongoing",
    headerName: "OnGoing",
    headerClassName:
      "underline underline-offset-4 decoration-2 decoration-orange-600",
    width: 80,
    sortable: false,
    filterable: false,
    hideable: false,
    disableColumnMenu: true,
    renderCell: ({ row }) =>
      row.progress == 1 && (
        <Tooltip title="dd/mm/yyy" placement="top">
          <CheckCircleRounded className="text-orange-600" />
        </Tooltip>
      ),
  },
  {
    field: "finished",
    headerName: "Finished",
    headerClassName:
      "underline underline-offset-4 decoration-2 decoration-green-700",
    width: 80,
    sortable: false,
    filterable: false,
    hideable: false,
    disableColumnMenu: true,
    renderCell: ({ row }) =>
      row.progress == 2 && (
        <Tooltip title="dd/mm/yyy" placement="top">
          <CheckCircleRounded className="text-green-700" />
        </Tooltip>
      ),
  },
  {
    field: "invoicing",
    headerName: "Invoicing",
    headerClassName:
      "underline underline-offset-4 decoration-2 decoration-blue-700",
    width: 80,
    sortable: false,
    filterable: false,
    hideable: false,
    disableColumnMenu: true,
    renderCell: ({ row }) =>
      row.progress == 3 && (
        <Tooltip title="dd/mm/yyy" placement="top">
          <CheckCircleRounded className="text-blue-700" />
        </Tooltip>
      ),
  },
  {
    field: "paid",
    headerName: "Paid",
    headerClassName:
      "underline underline-offset-4 decoration-2 decoration-purple-700",
    width: 70,
    sortable: false,
    filterable: false,
    hideable: false,
    disableColumnMenu: true,
    renderCell: ({ row }) =>
      row.progress == 4 && (
        <Tooltip title="dd/mm/yyy" placement="top">
          <CheckCircleRounded className="text-purple-700" />
        </Tooltip>
      ),
  },
];

const rows = [
  {
    jobNumber: "x155/5555/5555",
    client: "PT kita bisa",
    po: "xxx xxx xxxx",
    progress: 0,
  },
  {
    jobNumber: "x255/5555/5555",
    client: "PT kita bisa",
    po: "xxx xxx xxxx",
    progress: 3,
  },
  {
    jobNumber: "x355/5555/5555",
    client: "PT kita bisa",
    po: "xxx xxx xxxx",
    progress: 1,
  },
  {
    jobNumber: "x455/5555/5555",
    client: "PT kita bisa",
    po: "xxx xxx xxxx",
    progress: 2,
  },
  {
    jobNumber: "x555/5555/5555",
    client: "PT kita bisa",
    po: "xxx xxx xxxx",
    progress: 1,
  },
  {
    jobNumber: "x655/5555/5555",
    client: "PT kita bisa",
    po: "xxx xxx xxxx",
    progress: 2,
  },
  {
    jobNumber: "x755/5555/5555",
    client: "PT kita bisa",
    po: "xxx xxx xxxx",
    progress: 3,
  },
  {
    jobNumber: "x855/5555/5555",
    client: "PT kita bisa",
    po: "xxx xxx xxxx",
    progress: 3,
  },
  {
    jobNumber: "x955/5555/5555",
    client: "PT kita bisa",
    po: "xxx xxx xxxx",
    progress: 4,
  },
  {
    jobNumber: "x1055/5555/5555",
    client: "PT kita bisa",
    po: "xxx xxx xxxx",
    progress: 3,
  },
];

// MONTHS RANGE
const marksSliderMonths = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 5,
    label: "5",
  },
  {
    value: 6,
    label: "6",
  },
  {
    value: 7,
    label: "7",
  },
  {
    value: 8,
    label: "8",
  },
  {
    value: 9,
    label: "9",
  },
  {
    value: 10,
    label: "10",
  },
  {
    value: 11,
    label: "11",
  },
  {
    value: 12,
    label: "12",
  },
];

const Dashboard = () => {
  const [dialogFilterRange, setDialogFilterRange] = useState(false);
  const [dialogDetailProject, setDialogDetailProject] = useState(false);
  const [rangeMonths, setRangeMonths] = useState([2, 5]);

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

  const monthsSliderChange = (event, newValue) => {
    setRangeMonths(newValue);
  };

  return (
    <Layout>
      <span className="block text-2xl font-bold mb-8">Dashboard</span>
      <span className="text-base text-gray-500 block mb-6 underline">
        hi Username, have a nice day 😊🌈
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
              <span className="text-sm md:text-base font-bold">Range</span>
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
              <span className="text-sm md:text-base">OnGoing</span>
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
        className="rounded-xl bg-white my-6 h-[650px]"
        getRowId={(row) => row.jobNumber}
        rows={rows}
        columns={columns}
        autoPageSize
        // pageSizeOptions={[5, 10]}
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
        <DialogTitle>Months Range</DialogTitle>
        <DialogContent>
          {/* <span>monts range</span> */}
          <Box className=" pt-2 w-full">
            <Slider
              value={rangeMonths}
              onChange={monthsSliderChange}
              valueLabelDisplay="off"
              min={1}
              max={12}
              marks={marksSliderMonths}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => _closeDialog("filterRange")}>Cancel</Button>
          <Button onClick={() => console.log(rangeMonths)}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default Dashboard;
