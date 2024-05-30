import { useState } from "react";
import Layout from "../../components/Layout";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
  Button,
  TextField,
  InputAdornment,
  Box,
  Slider,
  Stepper,
  Step,
  StepLabel,
  Tooltip,
  StepContent,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  VerifiedRounded,
  BusinessCenterRounded,
  TimelineRounded,
  FilterAltRounded,
  SearchRounded,
  CloseRounded,
  TodayRounded,
  SyncRounded,
  DescriptionRounded,
  ReceiptLongRounded,
} from "@mui/icons-material";

const rows = [
  {
    jobNumber: "x1x/333/9999",
    client: "PT kita bisa",
    reporter: "xxx xxx xxxx",
    time: "10/10/2023 10:10",
    progress: "registered",
  },
  {
    jobNumber: "x2x/333/9999",
    client: "PT kita bisa",
    reporter: "insan budi",
    time: "11/11/2020 15:15",
    progress: "ongoing",
  },
  {
    jobNumber: "x3x/333/9999",
    client: "PT kita bisa",
    reporter: "insan budi",
    time: "11/11/2020 15:15",
    progress: "finished",
  },
  {
    jobNumber: "x4x/333/9999",
    client: "PT kita bisa",
    reporter: "insan budi",
    time: "11/11/2020 15:15",
    progress: "invoicing",
  },
  {
    jobNumber: "x5x/333/9999",
    client: "PT kita bisa",
    reporter: "insan budi",
    time: "11/11/2020 15:15",
    progress: "paid",
  },
];

const steps = [
  {
    label: "Registered",
    description: `For each ad campaign that you create, you can control how much
              you're willing.`,
    icon: <TodayRounded />,
  },
  {
    label: "On Going",
    description:
      "An ad group contains one or more ads which target a shared set of keywords.",
    icon: <SyncRounded />,
  },
  {
    label: "Finished",
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads .`,
    icon: <VerifiedRounded />,
  },
  {
    label: "Invoicing",
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on.`,
    icon: <DescriptionRounded />,
  },
  {
    label: "Paid",
    description:
      "An ad group contains one or more ads which target a shared set of keywords.",
    icon: <ReceiptLongRounded />,
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

const Approvals = () => {
  // state
  const [dialogApproval, setDialogApproval] = useState(false);
  const [dialogDetailProject, setDialogDetailProject] = useState(false);
  const [dialogDetailProgress, setDialogDetailProgress] = useState(false);
  const [dialogFilterRange, setDialogFilterRange] = useState(false);
  const [rangeMonths, setRangeMonths] = useState([2, 5]);

  const columns = [
    {
      field: "jobNumber",
      headerName: "Job Number",
      width: 150,
    },
    {
      field: "client",
      headerName: "Client",
      width: 250,
    },
    {
      field: "reporter",
      headerName: "Reporter",
      width: 200,
    },
    {
      field: "time",
      headerName: "Time",
      width: 150,
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
              console.log(row);
              setDialogApproval(true);
            }}
          >
            <VerifiedRounded />
          </IconButton>
          <IconButton
            color="primary"
            title="Detail Project"
            onClick={() => {
              setDialogDetailProject(true);
            }}
          >
            <BusinessCenterRounded />
          </IconButton>
          <IconButton
            color="primary"
            title="Detail Progress"
            onClick={() => {
              setDialogDetailProgress(true);
            }}
          >
            <TimelineRounded />
          </IconButton>
        </>
      ),
    },
  ];

  const _closeDialog = (key) => {
    switch (key) {
      case "approval":
        setDialogApproval(false);
        break;
      case "detailProject":
        setDialogDetailProject(false);
        break;
      case "filterRange":
        setDialogFilterRange(false);
        break;
      default:
        setDialogDetailProgress(false);
        break;
    }
  };
  const _openDialog = (key) => {
    switch (key) {
      case "approval":
        setDialogApproval(true);
        break;
      case "detailProject":
        setDialogDetailProject(true);
        break;
      default:
        setDialogDetailProgress(true);
        break;
    }
  };

  const monthsSliderChange = (event, newValue) => {
    setRangeMonths(newValue);
  };

  // approval

  return (
    <Layout>
      <span className="block text-2xl font-bold">Approval Page</span>

      {/* filter (months range, search by job number) */}
      <div className="w-full md:w-2/3 my-8">
        <div className="flex flex-row w-full sm:w-1/2">
          <IconButton
            color="primary"
            title="Filter"
            onClick={() => setDialogFilterRange(true)}
          >
            <FilterAltRounded />
          </IconButton>
          <Autocomplete
            className="w-full"
            freeSolo
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                placeholder="JobNumber"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRounded />
                    </InputAdornment>
                  ),
                }}
              />
            )}
            value={""}
            options={[]}
            // onKeyUp={suggestSearch}
            // onKeyDown={enterSearch}
            // onInputChange={(e, v) => console.log("")}
            // onChange={() => console.log()}
          />
        </div>

        {/* chips filtered */}
        {/* {filterForm.pembayaran != "" && (
          <Stack direction="row" spacing={1} className="mt-4">
            {Object.keys(filterForm).map((key, i) => (
              <Chip
                key={i}
                variant="outlined"
                label={filterForm[key]}
                icon={renderIconFilter(key)}
              />
            ))}
          </Stack>
        )} */}
      </div>

      {/* 
        data table /10
        kolom: Job Number, Calient, Reporter, Time, Progress, #
        action: approval, detail-project, detail-progress 
      */}
      <DataGrid
        className="bg-white h-[650px]"
        getRowId={(row) => row.jobNumber}
        rows={rows}
        columns={columns}
        autoPageSize
        // pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
        // onRowDoubleClick={(p, e, d) =>
        //   console.log("detail project + detail progress")
        // }
      />

      {/* modal: detail project, detail progress */}
      <Dialog
        open={dialogApproval}
        onClose={() => _closeDialog("approval")}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle>Approval</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => _closeDialog("approval")}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseRounded />
        </IconButton>

        <DialogContent>
          <span>
            Latest Progress to Approval: requested by, level, description,
            attachment, createdAt, Project (Job Number, Client, Project Order,
            Description).
          </span>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => _closeDialog("approval")}>Reject</Button>
          <Button onClick={() => _closeDialog("approval")}>Approve</Button>
        </DialogActions>
      </Dialog>

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
        open={dialogDetailProgress}
        onClose={() => _closeDialog("detailProgress")}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle>Detail Progress</DialogTitle>
        <DialogContent>
          <Stepper activeStep={2} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={index} expanded={index <= 2 ? true : false}>
                <StepLabel
                  className={` ${
                    index <= 2 ? "text-indigo-600" : "text-gray-300"
                  }`}
                  icon={
                    <Tooltip title={step.description} placement="right">
                      {step.icon}
                    </Tooltip>
                  }
                  // error from approved
                >
                  <span className="text-base">{step.label}</span>
                </StepLabel>
                <StepContent>
                  <Typography>
                    {/*description*/}
                    {`is simply dummy text of the printing and typesetting
                  industry. Lorem Ipsum has been the standard dummy text`}
                    {/*detail: user by, attachment?, no_worksheet?(khusus On Going/ Job Finish), approved?, approval by, createdAt*/}
                  </Typography>
                  <Typography className="text-sm text-gray-400">
                    user by, attachment?, approved?, approval by, createdAt
                  </Typography>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => _closeDialog("detailProgress")}>Close</Button>
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
          <Button onClick={() => _closeDialog("filterRange")}>Close</Button>
          <Button onClick={() => console.log(rangeMonths)}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default Approvals;
