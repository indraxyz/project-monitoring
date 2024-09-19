import { useState } from "react";
import Layout from "../../components/Layout";
import {
  IconButton,
  Autocomplete,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  FilterAltRounded,
  SearchRounded,
  AddRounded,
  DeleteRounded,
  InfoRounded,
  EditRounded,
  MoreRounded,
  CloseRounded,
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";

import { projectTypes, projectStatus } from "../../config/optionals";

const rows = [
  {
    jobNumber: "x1x/333/9999",
    client: "PT kita bisa",
    desc: "xx xxxxxxx xxxxxxxx",
    start_date: "10/10/2023",
    type: "call",
    status: "open",
  },
  {
    jobNumber: "x2x/333/9999",
    client: "PT kita bisa",
    desc: "xx xxxxxxx xxxxxxxx",
    start_date: "10/10/2023",
    type: "contract",
    status: "finish",
  },
  {
    jobNumber: "x3x/333/9999",
    client: "PT kita bisa",
    desc: "xx xxxxxxx xxxxxxxx",
    start_date: "10/10/2023",
    type: "call",
    status: "close",
  },
  {
    jobNumber: "x4x/333/9999",
    client: "PT kita bisa",
    desc: "xx xxxxxxx xxxxxxxx",
    start_date: "10/10/2023",
    type: "contract",
    status: "finish",
  },
  {
    jobNumber: "x5x/333/9999",
    client: "PT kita bisa",
    desc: "xx xxxxxxx xxxxxxxx",
    start_date: "10/10/2023",
    type: "call",
    status: "open",
  },
];

const Projects = () => {
  const [selectedDatas, setSelectedDatas] = useState([]);
  const [dialogInfo, setDialogInfo] = useState(false);
  const [dialogFilter, setDialogFilter] = useState(false);
  const [dialogSubmit, setDialogSubmit] = useState(false);
  const [dialogDeletes, setDialogDeletes] = useState(false);
  const [dialogDetailProject, setDialogDetailProject] = useState(false);
  const [dialogDelete, setDialogDelete] = useState(false);
  const [submit, setSubmit] = useState(0);

  const columns = [
    {
      field: "jobNumber",
      headerName: "Job Number",
      width: 125,
    },
    {
      field: "client",
      headerName: "Client",
      width: 250,
      sortable: false,
      hideable: false,
    },
    {
      field: "desc",
      headerName: "Project Description",
      width: 200,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
    },
    {
      field: "start_date",
      headerName: "Start Date",
      width: 110,
      filterable: false,
      disableColumnMenu: true,
    },
    {
      field: "type",
      headerName: "Type",
      width: 100,
      sortable: false,
      hideable: false,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      sortable: false,
      hideable: false,
    },
    {
      field: "actions",
      headerName: "Action ⚙️",
      width: 150,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <>
          {/* detail edit delete */}

          <IconButton
            color="primary"
            title="Edit Project"
            onClick={() => {
              // setClientForm(params.row);
              setSubmit(1);
              setDialogSubmit(true);
            }}
          >
            <EditRounded />
          </IconButton>
          <IconButton
            color="primary"
            title="Delete"
            onClick={() => {
              // console.log(params.row);
              // setSelectedData(params.row);
              setDialogDelete(true);
            }}
          >
            <DeleteRounded />
          </IconButton>
          <IconButton
            color="primary"
            title="Detail Project"
            onClick={() => {
              // console.log(row);
              setDialogDetailProject(true);
            }}
          >
            <MoreRounded />
          </IconButton>
        </>
      ),
    },
  ];

  const _closeDialog = (key) => {
    switch (key) {
      case "filter":
        setDialogFilter(false);
        break;
      case "submit":
        setDialogSubmit(false);
        break;
      case "deletes":
        setDialogDeletes(false);
        break;
      case "info":
        setDialogInfo(false);
        break;
      case "detailProject":
        setDialogDetailProject(false);
        break;
      case "edit":
        setDialogEdit(false);
        break;
      default:
        setDialogDelete(false);
        break;
    }
  };

  return (
    <Layout>
      <span className="block text-2xl font-bold">Projects Register</span>

      {/* top menu */}
      <div className="w-full flex flex-col-reverse md:flex-row md:items-center my-8">
        <div className="w-full md:w-2/3 ">
          {/* CARI + FILTER */}
          <div className="flex items-center flex-row w-full sm:w-1/2">
            <IconButton
              color="primary"
              title="Filter Projects"
              onClick={() => setDialogFilter(true)}
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
        {/* CREATE, DELETES */}
        <div className="w-full md:w-1/3 md:flex md:justify-end md:m-0">
          <IconButton
            color="primary"
            title="Add New Project"
            onClick={() => {
              console.log("add");
              setSubmit(0);
              setDialogSubmit(true);
              // resetSubmitForm();
            }}
          >
            <AddRounded />
          </IconButton>
          <IconButton
            color="primary"
            title="Deletes Project"
            onClick={() => {
              console.log("deletes");
              // setKontenModal("deletes");
              // setOpenModal(true);
            }}
            disabled={selectedDatas.length == 0 ? true : false}
          >
            <DeleteRounded />
          </IconButton>
          <IconButton
            color="primary"
            title="Information"
            onClick={() => setDialogInfo(true)}
          >
            <InfoRounded />
          </IconButton>
        </div>
      </div>

      {/* TABLE: ALL, DETAIL, EDIT, DELETE */}
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
        checkboxSelection
      />

      {/* dialog Filter */}
      <Dialog
        open={dialogFilter}
        // onClose={() => _closeDialog("filter")}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle>Projects Filter</DialogTitle>
        <DialogContent>
          <div>
            <FormLabel component="legend">Start Date</FormLabel>
            <TextField
              name="start_date_in"
              // value={""}
              // onChange={""}
              margin="dense"
              type="date"
              variant="standard"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <span className="mx-4">_</span>
            <TextField
              name="start_date_end"
              // value={""}
              // onChange={""}
              margin="dense"
              type="date"
              variant="standard"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => _closeDialog("filter")}>Cancel</Button>
          <Button onClick={() => {}}>Filter</Button>
        </DialogActions>
      </Dialog>

      {/* DIALOG ADD 0/EDIT 1 */}
      <Dialog
        open={dialogSubmit}
        // onClose={() => _closeDialog("add")}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle>
          {submit == 0 ? "New Project" : "Edit Project"}
        </DialogTitle>
        <DialogContent>
          {/* form new/ edit */}
          {/* 
            job_number = autofill
            client = search auto-complete

          */}
          <TextField
            name="job_number"
            // value={""}
            // onChange={""}
            margin="dense"
            label="Job Number"
            type="text"
            fullWidth
            variant="standard"
            disabled
          />
          <TextField
            name="client"
            // value={""}
            // onChange={""}
            margin="dense"
            label="Client"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            name="po"
            // value={""}
            // onChange={""}
            margin="dense"
            label="Project Order"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            name="description"
            // value={""}
            // onChange={""}
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            name="contract_po_so"
            // value={""}
            // onChange={""}
            margin="dense"
            label="Contract PO SO"
            type="text"
            fullWidth
            variant="standard"
          />
          <FormControl margin="dense" variant="standard" fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              name="type"
              defaultValue={"-"}
              // value={profileValue.department}
              // onChange={_changeProfileValue}
            >
              <MenuItem value={"-"}>-</MenuItem>
              <MenuItem value={"1"}>Contract</MenuItem>
              <MenuItem value={"2"}>Call</MenuItem>
            </Select>
          </FormControl>
          {/* PO Date = untuk tipe Call */}
          <TextField
            name="po_date"
            // value={""}
            // onChange={""}
            margin="dense"
            label="PO Date"
            type="date"
            fullWidth
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
            disabled
          />
          <TextField
            name="start"
            // value={""}
            // onChange={""}
            margin="dense"
            label="Start Date"
            type="date"
            fullWidth
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            name="no_pes"
            // value={""}
            // onChange={""}
            margin="dense"
            label="No. PES"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            name="no_reg_contract"
            // value={""}
            // onChange={""}
            margin="dense"
            label="No. Reg. Contract"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            name="remark"
            // value={""}
            // onChange={""}
            margin="dense"
            label="Remark"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => _closeDialog("submit")}>Cancel</Button>
          <Button onClick={() => console.log("submit")}>
            {submit == 0 ? "Submit" : "Update"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* DIALOG DELETES */}
      <Dialog
        open={dialogDeletes}
        onClose={() => _closeDialog("deletes")}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle>Delete Projects</DialogTitle>
        <DialogContent>Delete multiple projects </DialogContent>
        <DialogActions>
          <Button onClick={() => _closeDialog("deletes")}>Close</Button>
          <Button onClick={() => console.log("submit")}>Submit</Button>
        </DialogActions>
      </Dialog>

      {/* DIALOG INFO */}
      <Dialog
        open={dialogInfo}
        onClose={() => _closeDialog("info")}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle>Information</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => _closeDialog("info")}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseRounded />
        </IconButton>

        <DialogContent className="pt-0">
          <List>
            <ListItem disablePadding>
              <ListItemText primary="Project Type" secondary="Call, Contract" />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="Project Status" secondary="Open, Close" />
            </ListItem>
          </List>
        </DialogContent>
      </Dialog>

      {/* dialog DETAIL project */}
      <Dialog
        open={dialogDetailProject}
        onClose={() => _closeDialog("detailProject")}
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

        <DialogContent className="pt-0">
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
                No. Contract/ PO/ SO/ Date
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

      {/* dialog DELETE project */}
      <Dialog
        open={dialogDelete}
        onClose={() => _closeDialog("delete")}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle>Delete Project</DialogTitle>
        <DialogContent>
          Delete this project ?
          <span className="font-bold underline"> Job Number x1x/333/9999 </span>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => _closeDialog("delete")}>Cancel</Button>
          <Button onClick={() => console.log("submit")}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default Projects;
