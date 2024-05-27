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
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  VerifiedRounded,
  BusinessCenterRounded,
  TimelineRounded,
  FilterAltRounded,
  SearchRounded,
  CloseRounded,
} from "@mui/icons-material";

const rows = [
  {
    jobNumber: "x1x/333/9999",
    client: "PT kita bisa",
    reporter: "xxx xxx xxxx",
    time: "dd/mm/yyy hh:mm",
    progress: "registered",
  },
];

const Approvals = () => {
  // state
  const [dialogApproval, setDialogApproval] = useState(false);
  const [dialogDetailProject, setDialogDetailProject] = useState(false);
  const [dialogDetailProgress, setDialogDetailProgress] = useState(false);

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
            onClick={() => console.log("dialog filter")}
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

        {/* chip */}
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
        onRowDoubleClick={(p, e, d) =>
          console.log("detail project + detail progress")
        }
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
          <span>Approval</span>
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
          <span>Detail Projwct</span>
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
          <span>Detail Progress</span>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => _closeDialog("detailProgress")}>Close</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default Approvals;
