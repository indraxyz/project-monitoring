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
} from "@mui/material";
import {
  FilterAltRounded,
  SearchRounded,
  AddRounded,
  DeleteRounded,
  InfoRounded,
  EditRounded,
  MoreRounded,
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";

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
  const [dialogAdd, setDialogAdd] = useState(false);
  const [dialogDeletes, setDialogDeletes] = useState(false);
  const [dialogDetailProject, setDialogDetailProject] = useState(false);
  const [dialogEdit, setDialogEdit] = useState(false);
  const [dialogDelete, setDialogDelete] = useState(false);

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
    },
    {
      field: "desc",
      headerName: "Project Description",
      width: 200,
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
      width: 90,
      filterable: false,
      disableColumnMenu: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 70,
      sortable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true,
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
            title="Detail Project"
            onClick={() => {
              // console.log(row);
              setDialogDetailProject(true);
            }}
          >
            <MoreRounded />
          </IconButton>
          <IconButton
            color="primary"
            title="Edit Project"
            onClick={() => {
              // setClientForm(params.row);
              // setSubmit(1);
              setDialogEdit(true);
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
        </>
      ),
    },
  ];

  const _closeDialog = (key) => {
    switch (key) {
      case "filter":
        setDialogFilter(false);
        break;
      case "add":
        setDialogAdd(false);
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

      {/* CARI + FILTER */}
      <div className="w-full flex flex-col-reverse md:flex-row md:items-center my-8">
        <div className="w-full md:w-2/3 ">
          <div className="flex items-center flex-row w-full sm:w-1/2">
            <IconButton
              color="primary"
              title="Filter Projects"
              onClick={() => setDialogFilter(true)}
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
        {/* CREATE, DELETES */}
        <div className="w-full md:w-1/3 md:flex md:justify-end md:m-0">
          <IconButton
            color="primary"
            title="Add New Project"
            onClick={() => {
              console.log("add");
              // setSubmit(0);
              setDialogAdd(true);
              // resetSubmitForm();
            }}
          >
            <AddRounded />
          </IconButton>
          <IconButton
            color="primary"
            title="Delete"
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
        onClose={() => _closeDialog("filter")}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle>Filter Data</DialogTitle>
        <DialogContent>Form Filter projects ...</DialogContent>
        <DialogActions>
          <Button onClick={() => _closeDialog("filter")}>Close</Button>
          <Button onClick={() => console.log(rangeMonths)}>Submit</Button>
        </DialogActions>
      </Dialog>

      {/* DIALOG ADD */}
      <Dialog
        open={dialogAdd}
        onClose={() => _closeDialog("add")}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle>Add New Project</DialogTitle>
        <DialogContent>Form Add New project ...</DialogContent>
        <DialogActions>
          <Button onClick={() => _closeDialog("add")}>Close</Button>
          <Button onClick={() => console.log("submit")}>Submit</Button>
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
        <DialogTitle>Project Information</DialogTitle>
        <DialogContent>List of additionals Information ...</DialogContent>
        <DialogActions>
          <Button onClick={() => _closeDialog("info")}>Close</Button>
          <Button onClick={() => console.log("submit")}>Submit</Button>
        </DialogActions>
      </Dialog>

      {/* dialog DETAIL project */}
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
          <Button onClick={() => console.log("submit")}>Submit</Button>
        </DialogActions>
      </Dialog>

      {/* dialog EDIT project */}
      <Dialog
        open={dialogEdit}
        onClose={() => _closeDialog("edit")}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle>Edit Project</DialogTitle>
        <DialogContent>Form Edit project ...</DialogContent>
        <DialogActions>
          <Button onClick={() => _closeDialog("edit")}>Close</Button>
          <Button onClick={() => console.log("submit")}>Submit</Button>
        </DialogActions>
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
          Delete this project ? With
          <span className="font-bold"> Job Number x1x/333/9999 </span>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => _closeDialog("delete")}>Close</Button>
          <Button onClick={() => console.log("submit")}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default Projects;
//list(table), detail, crud, cari + filter
