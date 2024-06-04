import { useState } from "react";
import Layout from "../../components/Layout";
import {
  IconButton,
  Autocomplete,
  TextField,
  InputAdornment,
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
  const [openInfo, setOpenInfo] = useState(false);

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
              // setDialogApproval(true);
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
              // setDialogSubmit(true);
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
              // setDialogDelete(true);
            }}
          >
            <DeleteRounded />
          </IconButton>
        </>
      ),
    },
  ];

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
        {/* CREATE, DELETES */}
        <div className="w-full md:w-1/3 md:flex md:justify-end md:m-0">
          <IconButton
            color="primary"
            title="Add New Project"
            onClick={() => {
              console.log("add");
              // setSubmit(0);
              // setDialogSubmit(true);
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
            // onClick={}
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
      />

      {/* dialog DETAIL project */}
    </Layout>
  );
};

export default Projects;
//list(table), detail, crud, cari + filter
