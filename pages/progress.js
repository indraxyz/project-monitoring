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

const Progress = () => {
  // state
  const [searchKey, setSearchKey] = useState("");

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

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-8">Update Project Progress</h1>

      {/*auto complete, search (table progress where job_number,no_worksheet group by job_number,no_worksheet) */}
      <Autocomplete
        className="w-full md:w-1/3 sm:w-1/2"
        freeSolo
        renderInput={(params) => (
          <>
            <span className="text-lg font-medium">Search</span>
            <TextField
              {...params}
              variant="standard"
              placeholder="job.number or no.worksheet"
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
          </>
        )}
        options={dummyJobNumber.map(
          (option) => `${option.number} - no.worksheet`
        )}
        value={searchKey}
        onInputChange={(e, v) => setSearchKey(v)}
        onKeyUp={_suggestSearch}
        onChange={_selectedSearch}
      />

      {/* result searched */}

      {/* Project Data */}
      <div className="mt-5 pt-5">
        <span className="text-lg font-medium">Project</span>

        {/* job Number, Client, Order, Description, status */}
        <Card className="max-w-xl mt-4">
          <CardContent>
            <div className="flex flex-col gap-2">
              <span className="block font-bold">Job Number. 389/19/031</span>
              <span className="block text-xl">PT. SMELTING</span>
              <div className="flex items-center">
                <Inventory2Rounded></Inventory2Rounded>
                <span className="ml-2">JAWA SATU, TAMBAK LOROK, MLI PS 10</span>
              </div>
              <div className="flex items-center">
                <Description></Description>
                <span className="ml-2">NDT, WI</span>
              </div>
            </div>
          </CardContent>
          <CardActions className="mx-2">
            <div className="flex items-center">
              <WatchLaterRounded></WatchLaterRounded>
              <span className="ml-2">Open</span>
            </div>
            <IconButton className="ml-auto" color="primary">
              <MoreRounded></MoreRounded>
            </IconButton>
          </CardActions>
        </Card>
        {/* DETAIL WITH MODAL */}
        {/* <div className="flex flex-col gap-2 mt-2">
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
              Order
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
          <div>
            <span className="text-base font-medium text-gray-500 mb-1 block">
              Project Status
            </span>
            <span className="text-base font-normal text-gray-400">...</span>
          </div>
        </div> */}
      </div>

      {/* vertical step, progress data */}
      <div className="mt-5 pt-5">
        <div className="mb-2">
          <span className="text-lg font-medium">Progress</span>
        </div>

        <Stepper activeStep={2} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={index} expanded={index <= 2 ? true : false}>
              <StepLabel
                className={` ${
                  index <= 2 ? "text-indigo-500" : "text-gray-300"
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
      </div>

      {/* submit progress: new/ edit last rejected */}
      <div className="mt-5 pt-5">
        <span className="text-lg font-medium">New Progress</span>
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

          <FormControl margin="dense">
            <Button variant="contained" startIcon={<SendRounded />}>
              Submit
            </Button>
          </FormControl>
        </div>
      </div>
    </Layout>
  );
};

export default Progress;
