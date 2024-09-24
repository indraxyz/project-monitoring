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
  AttachFileRounded,
} from "@mui/icons-material";

const dummyProgress = [{}];

const rows = [
  {
    jobNumber: "x1x/333/9999",
    client: "PT kita bisa",
    reporter: "siA xxxx",
    time: "10/10/2023 10:10",
    progress: "0",
  },
  {
    jobNumber: "x2x/333/9999",
    client: "PT kita bisa",
    reporter: "siB xxxxx xxxx",
    time: "11/11/2020 15:15",
    progress: 1,
  },
  {
    jobNumber: "x3x/333/9999",
    client: "PT kita bisa",
    reporter: "siC xxxxx xxxx",
    time: "11/11/2020 15:15",
    progress: 2,
  },
  {
    jobNumber: "x4x/333/9999",
    client: "PT kita bisa",
    reporter: "xxxx xxxxx xxxx",
    time: "11/11/2020 15:15",
    progress: 3,
  },
  {
    jobNumber: "x5x/333/9999",
    client: "PT kita bisa",
    reporter: "xxxx xxxxx xxxx",
    time: "11/11/2020 15:15",
    progress: 4,
  },
];

const steps = [
  {
    label: "Registered",
    description: `Registered Project.`,
    icon: <TodayRounded />,
  },
  {
    label: "On Going",
    description: "Project still continues.",
    icon: <SyncRounded />,
  },
  {
    label: "Finished",
    description: `Project completed approved or rejected.`,
    icon: <VerifiedRounded />,
  },
  {
    label: "Invoicing",
    description: `Expense bill.`,
    icon: <DescriptionRounded />,
  },
  {
    label: "Paid",
    description: "Project bill paid.",
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

const ProgressRow = (props) => {
  const { progress } = props;

  switch (progress) {
    case 1:
      return (
        <span className="text-sm underline underline-offset-4 decoration-4 decoration-orange-600">
          OnGoing
        </span>
      );
    case 2:
      return (
        <span className="text-sm underline underline-offset-4 decoration-4 decoration-green-700">
          Finished
        </span>
      );
    case 3:
      return (
        <span className="text-sm underline underline-offset-4 decoration-4 decoration-blue-700">
          Invoicing
        </span>
      );
    case 4:
      return (
        <span className="text-sm underline underline-offset-4 decoration-4 decoration-purple-700">
          Paid
        </span>
      );
    default:
      return (
        <span className="text-sm underline underline-offset-4 decoration-4 decoration-yellow-400">
          Registered
        </span>
      );
  }
};

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
      filterable: false,
      disableColumnMenu: true,
    },
    {
      field: "time",
      headerName: "Time",
      width: 175,
      filterable: false,
      disableColumnMenu: true,
    },
    {
      field: "progress",
      headerName: "Progress",
      width: 125,
      sortable: false,
      filterable: true,
      hideable: false,
      renderCell: ({ row }) => <ProgressRow progress={row.progress} />,
    },
    {
      field: "actions",
      headerName: "⚙️",
      width: 150,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerClassName: "text-xl",
      headerAlign: "center",
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
            title="Detail Progress"
            onClick={() => {
              setDialogDetailProgress(true);
            }}
          >
            <TimelineRounded />
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
      <span className="block text-2xl font-bold">Projects Approval</span>

      {/* filter (months range, search by job number) */}
      <div className="w-full md:w-2/3 my-8">
        <div className="flex items-center flex-row w-full sm:w-1/2">
          <IconButton
            color="primary"
            title="Filter"
            onClick={() => setDialogFilterRange(true)}
          >
            <FilterAltRounded />
          </IconButton>
          <Autocomplete
            className="w-full ml-3"
            freeSolo
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                placeholder="JobNumber/ Client"
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
            options={[]} //
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

      {/* approval new progress */}
      <Dialog
        open={dialogApproval}
        // onClose={() => _closeDialog("approval")}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle>Approval New Progress</DialogTitle>
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
          <div>
            <div className="flex items- mb-2">
              <TodayRounded /> <span className="text- ml-2">Registered</span>
            </div>
            <Typography className="text-sm text-gray-400 block">
              <span className="underline underline-offset-4 decoration-2 decoration-purple-700">
                Budi
              </span>{" "}
              reported at 12/12/2022 12:12
              <IconButton title="attachment" size="small" className="ml-2">
                <AttachFileRounded fontSize="inherit" />
              </IconButton>
            </Typography>

            <Typography>
              is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the standard dummy text
            </Typography>
          </div>

          <TextField
            name="noted"
            // value={""}
            margin="dense"
            label="Why rejected ?"
            type="text"
            fullWidth
            variant="standard"
            multiline
            rows={2}
            helperText="*required if reject the progress"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {}}>Reject</Button>
          <Button onClick={() => {}}>Approve</Button>
        </DialogActions>
      </Dialog>

      {/* detail project */}
      <Dialog
        open={dialogDetailProject}
        // onClose={() => _closeDialog("detailProject")}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle>Detail Project</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => _closeDialog("detailProject")}
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
      </Dialog>

      {/* detail progress */}
      <Dialog
        open={dialogDetailProgress}
        // onClose={() => _closeDialog("detailProgress")}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle>Detail Progress</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => _closeDialog("detailProgress")}
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
          <Stepper activeStep={2} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={index} expanded={index <= 2 ? true : false}>
                <StepLabel
                  className={` ${
                    index <= 2 ? "text-indigo-600" : "text-gray-400"
                  }`}
                  icon={
                    <Tooltip title={step.description} placement="bottom-start">
                      {step.icon}
                    </Tooltip>
                  }
                  // error if rejected
                >
                  <span className="text-base">{step.label}</span>
                </StepLabel>
                <StepContent>
                  <Typography className="text-sm text-gray-400 block">
                    <span className="underline underline-offset-4 decoration-2 decoration-purple-700">
                      Budi
                    </span>{" "}
                    reported at 12/12/2022 12:12
                    <IconButton
                      title="attachment"
                      size="small"
                      className="ml-2"
                    >
                      <AttachFileRounded fontSize="inherit" />
                    </IconButton>
                  </Typography>

                  <Typography>
                    {`is simply dummy text of the printing and typesetting
                  industry. Lorem Ipsum has been the standard dummy text`}
                  </Typography>

                  <div className="mt-3">
                    <Typography className="text-sm text-gray-400 block">
                      <span className="underline underline-offset-4 decoration-2 decoration-purple-700">
                        Bayu
                      </span>{" "}
                      approved/ rejected at 12/12/2022 12:12
                    </Typography>
                    <Typography className="text-sm text-gray-400 block">
                      noted ...
                    </Typography>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </DialogContent>
      </Dialog>

      {/* months range */}
      <Dialog
        open={dialogFilterRange}
        // onClose={() => _closeDialog("filterRange")}
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
          <Button onClick={() => console.log(rangeMonths)}>Filter</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default Approvals;
