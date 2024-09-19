import Layout from "../components/Layout";
import {
  InputAdornment,
  IconButton,
  Autocomplete,
  TextField,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Typography,
  Tooltip,
  FormControl,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  SearchRounded,
  TodayRounded,
  SyncRounded,
  ReceiptLongRounded,
  VerifiedRounded,
  DescriptionRounded,
  SendRounded,
  WatchLaterRounded,
  MoreRounded,
  Description,
  Inventory2Rounded,
  AssignmentRounded,
  AttachFileRounded,
  CloseRounded,
} from "@mui/icons-material";
import { useState } from "react";
// import { MuiFileInput } from "mui-file-input";

// dummy job number
const dummyJobNumber = [
  { number: "12/44/999", name: "PT banyu mili" },
  { number: "13/49/789", name: "PT samudra perkasa" },
  { number: "13/50/779", name: "PT samudra perkasa" },
  { number: "13/55/799", name: "PT samudra perkasa" },
  { number: "14/66/789", name: "PT samudra perkasa" },
  { number: "14/36/789", name: "PT samudra perkasa" },
];

// dummy progress
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

const Progress = () => {
  // state
  const [searchKey, setSearchKey] = useState("");
  const [dialogDetailProject, setDialogDetailProject] = useState(false);

  // actions
  const _suggestSearch = (e) => {
    if (
      e.target.value !== "" &&
      e.target.value.length > 2 &&
      e.key != "Enter" &&
      e.key != "ArrowUp" &&
      e.key != "ArrowDown"
    ) {
      console.log(`Suggest ${e.target.value}`);
    }
    if (
      e.target.value !== "" &&
      e.target.value.length > 2 &&
      e.key == "Enter"
    ) {
      _jobNumberSearch(e.target.value);
    }
  };

  const _selectedSearch = (e, v, r) => {
    if (e.key != "Enter" && v != null) {
      _jobNumberSearch(v);
    }
  };

  const _jobNumberSearch = (key) => {
    console.log(`Search ${key}`);
  };

  const _klickIconSearch = (key) => {
    _jobNumberSearch(key);
  };

  const _openDialog = (key) => {
    switch (key) {
      case "detailProject":
        setDialogDetailProject(true);
        break;
      default:
        break;
    }
  };

  const _closeDialog = (key) => {
    switch (key) {
      case "detailProject":
        setDialogDetailProject(false);
        break;
      default:
        break;
    }
  };

  return (
    <Layout>
      <span className="block text-2xl font-bold mb-8">Project Progress</span>

      {/*auto complete, search (table progress where job_number,no_worksheet group by job_number,no_worksheet) */}
      <span className="text-lg font-medium underline underline-offset-4 decoration-4 decoration-purple-700">
        Search
      </span>
      <Autocomplete
        className="w-full md:w-1/3 sm:w-1/2 mt-4"
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
                  <IconButton onClick={_jobNumberSearch}>
                    <SearchRounded />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
        options={dummyJobNumber.map((option) => `${option.number}`)}
        value={searchKey}
        onInputChange={(e, v) => setSearchKey(v)}
        onKeyUp={_suggestSearch}
        onChange={_selectedSearch}
      />

      {/* Project Data */}
      <div className="mt-5 pt-5">
        <span className="text-lg font-medium underline underline-offset-4 decoration-4 decoration-purple-700">
          Project
        </span>

        {/* job Number, Client, Order, Description, status */}
        <Card className="max-w-xl mt-4">
          <CardContent>
            <div className="flex flex-col gap-2">
              <span className="block font-bold">Job Number. 389/19/031</span>
              <span className="block text-xl">PT. SMELTING</span>
              <div className="flex items-center">
                <Inventory2Rounded titleAccess="Project Order"></Inventory2Rounded>
                <span className="ml-2">JAWA SATU, TAMBAK LOROK, MLI PS 10</span>
              </div>
              <div className="flex items-center">
                <Description titleAccess="Description"></Description>
                <span className="ml-2">NDT, WI</span>
              </div>
            </div>
          </CardContent>
          <CardActions className="mx-2">
            <div className="flex items-center">
              <AssignmentRounded titleAccess="Tipe Project"></AssignmentRounded>
              <span className="ml-2">Call/ Contract</span>
            </div>
            <IconButton
              className="ml-auto"
              color="primary"
              size="large"
              onClick={() => _openDialog("detailProject")}
            >
              <MoreRounded></MoreRounded>
            </IconButton>
          </CardActions>
        </Card>
      </div>

      {/* progress data */}
      <div className="mt-5 pt-5">
        <div className="mb-2">
          <span className="text-lg font-medium underline underline-offset-4 decoration-4 decoration-purple-700">
            Progress
          </span>
        </div>

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
                  <span className="underline underline-offset-4 decoration-2 decoration-gray-500">
                    Budi
                  </span>{" "}
                  reported at 12/12/2022 12:12
                  <IconButton title="attachment" size="small" className="ml-2">
                    <AttachFileRounded fontSize="inherit" />
                  </IconButton>
                </Typography>

                <Typography>
                  {`is simply dummy text of the printing and typesetting
                  industry. Lorem Ipsum has been the standard dummy text`}
                </Typography>

                <div className="mt-3">
                  <Typography className="text-sm text-gray-400 block">
                    <span className="underline underline-offset-4 decoration-2 decoration-gray-500">
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
      </div>

      {/* update progress */}
      <div className="mt-5 pt-5">
        <span className="text-lg font-medium underline underline-offset-4 decoration-4 decoration-purple-700">
          Update Progress
        </span>
        {/* form: description, attachment, no_worksheet(khusus On Going) */}
        <div className="w-full md:w-1/2">
          <TextField
            name="description"
            value={""}
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            multiline
            rows={2}
          />
          <TextField
            name="attachment"
            value={""}
            margin="dense"
            label="Attachment Url"
            type="text"
            fullWidth
            variant="standard"
            multiline
            rows={2}
          />
          <FormControl margin="dense" variant="standard" fullWidth>
            <InputLabel>Level</InputLabel>
            <Select
              name="level"
              defaultValue={"-"}
              // value={profileValue.department}
              // onChange={_changeProfileValue}
            >
              <MenuItem value={"-"}>-</MenuItem>
              <MenuItem value={"0"}>Registered</MenuItem>
              <MenuItem value={"1"}>OnGoing</MenuItem>
              <MenuItem value={"2"}>Finished</MenuItem>
              <MenuItem value={"3"}>Invoicing</MenuItem>
              <MenuItem value={"4"}>Paid</MenuItem>
            </Select>
          </FormControl>

          <FormControl margin="dense">
            <Button variant="contained" startIcon={<SendRounded />}>
              Submit
            </Button>
          </FormControl>
        </div>
      </div>

      {/* DETAIL Project */}
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
    </Layout>
  );
};

export default Progress;
