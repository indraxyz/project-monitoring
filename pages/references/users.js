import Layout from "../../components/Layout";
import { Component } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Autocomplete,
  TextField,
  IconButton,
  InputAdornment,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  AddRounded,
  DeleteRounded,
  RefreshRounded,
  EditRounded,
  SearchRounded,
  InfoRounded,
} from "@mui/icons-material";

let searchTimer;

class Users extends Component {
  state = {
    liveDatas: [],
    suggestDatas: [],
    selectedDatas: [],
    selectedData: "",
    copyDatas: [],
    searchKey: "",
    submit: 0,
    profileValue: {
      username: "",
      email: "",
      fullname: "",
      type: "",
      department: "",
    },
    dialogDeletes: false,
    dialogDelete: false,
    dialogDetail: false,
    dialogSubmit: false,
    dialogInfo: false,
  };

  columns = () => [
    // { field: "id", headerName: "ID", width: 70 },
    // { field: "username", headerName: "Username", width: 150 },
    {
      field: "fullname",
      headerName: "Full Name",
      width: 200,
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "type",
      headerName: "Type",
      width: 100,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
    },
    {
      field: "department",
      headerName: "Department",
      width: 150,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
    },
    {
      field: "actions",
      headerName: "#",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      width: 100,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            title="Edit"
            onClick={(e) => {
              this.setState({
                profileValue: params.row,
                dialogSubmit: true,
                submit: 1,
              });
            }}
          >
            <EditRounded />
          </IconButton>
          <IconButton
            color="primary"
            title="Delete"
            onClick={(e) =>
              this.setState({ selectedData: params.row, dialogDelete: true })
            }
          >
            <DeleteRounded />
          </IconButton>
        </>
      ),
    },
  ];

  _changeProfileValue = (e) => {
    let { profileValue } = this.state;
    this.setState({
      profileValue: { ...profileValue, [e.target.name]: e.target.value },
    });
  };
  _changeAccess = (e) => {
    const { value, checked } = e.target;
    let { profileValue } = this.state;
    let { access } = profileValue;

    if (checked) {
      this.setState({
        profileValue: { ...profileValue, access: [...access, value] },
      });
    } else {
      this.setState({
        profileValue: {
          ...profileValue,
          access: access.filter((v) => v !== value),
        },
      });
    }
  };

  _submit = () => {
    let { liveDatas, profileValue, submit } = this.state;
    let datas = [];
    // new or update
    switch (submit) {
      case 0:
        let pk =
          Math.floor(Math.random() * 1000 + 1) + new Date().getMilliseconds();
        datas = [
          ...liveDatas,
          {
            id: pk,
            username: profileValue.username,
            email: profileValue.email,
            fullname: profileValue.fullname,
            type: profileValue.type,
            department: profileValue.department,
          },
        ];
        break;
      case 1:
        datas = liveDatas.map((row) => {
          if (row.id == profileValue.id) {
            return profileValue;
          } else {
            return row;
          }
        });
        break;
      default:
        break;
    }

    this.setState({
      liveDatas: datas,
      copyDatas: datas,
      dialogSubmit: false,
      profileValue: {
        username: "",
        email: "",
        fullname: "",
        type: "",
        department: "",
      },
    });
  };

  deleteDatas = () => {
    let { liveDatas, selectedDatas } = this.state;
    this.setState({
      liveDatas: liveDatas.filter((row) => !selectedDatas.includes(row.id)),
      dialogDeletes: false,
    });
  };

  deleteData = (id) => {
    console.log("deleted " + id);
    let { liveDatas } = this.state;
    this.setState({
      liveDatas: liveDatas.filter((row) => row.id !== id),
      dialogDelete: false,
    });
  };

  detailData = (row) => {
    this.setState({ selectedData: row, dialogDetail: true });
    console.log(row);
  };

  editData = (row) => {
    console.log(row);
  };

  getSelectedDatas = (keys) => {
    console.log(keys);
    this.setState({ selectedDatas: keys });
  };

  refreshTable = () => {
    let { copyDatas } = this.state;

    this.setState({
      liveDatas: [...copyDatas],
      searchKey: "",
      selectedDatas: [],
    });
  };

  // cari
  localSearch = (key) => {
    let { copyDatas } = this.state;
    console.log("cari " + key);

    // cari
    this.setState({
      liveDatas: copyDatas.filter(
        (row) => row.fullname.toLowerCase().indexOf(key.toLowerCase()) > -1
      ),
    });
  };
  suggestSearch = (e) => {
    if (e.target.value !== "") {
      if (e.key != "Enter") {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => {
          console.log("suggest " + e.target.value);
        }, 1500);
      }
    } else {
      clearTimeout(searchTimer);
    }
  };
  enterSearch = (e) => {
    if (e.key == "Enter") {
      clearTimeout(searchTimer); //clear suggest
      this.localSearch(e.target.value);
    }
  };

  selectedSearch = (e, v, r) => {
    if (v != "") {
      this.localSearch(v);
    }
  };

  _closeDialog = (key) => {
    switch (key) {
      case "deletes":
        this.setState({ dialogDeletes: false });
        break;
      case "delete":
        this.setState({ dialogDelete: false });
        break;
      case "submit":
        this.setState({
          dialogSubmit: false,
          profileValue: {
            username: "",
            email: "",
            fullname: "",
            type: "",
            department: "",
          },
        });
        break;
      case "info":
        this.setState({ dialogInfo: false });
        break;
      default:
        this.setState({ dialogDetail: false });
        break;
    }
  };

  render() {
    let {
      liveDatas,
      selectedDatas,
      searchKey,
      copyDatas,
      dialogDeletes,
      dialogDelete,
      dialogDetail,
      dialogSubmit,
      selectedData,
      profileValue,
      submit,
      dialogInfo,
    } = this.state;

    return (
      <Layout>
        <span className="text-2xl font-bold">Users</span>
        {/* top table properties */}
        <div className="w-full flex flex-col md:flex-row-reverse md:items-center my-8">
          <div className="w-full md:w-1/3 md:flex  md:justify-end md:m-0">
            <IconButton
              color="primary"
              title="Add New"
              onClick={() => this.setState({ dialogSubmit: true, submit: 0 })}
            >
              <AddRounded />
            </IconButton>
            <IconButton
              color="primary"
              title="Delete"
              onClick={() => this.setState({ dialogDeletes: true })}
              disabled={selectedDatas.length == 0 ? true : false}
            >
              <DeleteRounded />
            </IconButton>
            <IconButton
              color="primary"
              title="Information"
              onClick={() => this.setState({ dialogInfo: true })}
            >
              <InfoRounded />
            </IconButton>
            <IconButton
              color="primary"
              title="Refresh"
              onClick={() => this.refreshTable()}
            >
              <RefreshRounded />
            </IconButton>
          </div>
          <div className="w-full md:w-2/3">
            <Autocomplete
              value={searchKey}
              className="w-full sm:w-1/2"
              freeSolo
              id="cari-users"
              disableClearable
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  size="small"
                  placeholder="Name"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchRounded />
                      </InputAdornment>
                    ),
                    type: "search",
                  }}
                />
              )}
              onKeyUp={this.suggestSearch}
              options={copyDatas.map((option) => option.fullname)}
              onKeyDown={this.enterSearch}
              onInputChange={(e, v) => {
                this.setState({ searchKey: v });
              }}
              onChange={this.selectedSearch}
            />
            {/* <div className="pt-4">
              <span>filter properties</span>
            </div> */}
          </div>
        </div>

        {/* table */}
        <div className="bg-white h-[650px]">
          <DataGrid
            rows={Array.from(liveDatas)}
            columns={this.columns()}
            autoPageSize
            // pageSizeOptions={[10, 30, 50, 100]}
            onRowDoubleClick={(params) => this.detailData(params.row)}
            checkboxSelection
            disableRowSelectionOnClick
            rowSelectionModel={selectedDatas}
            onRowSelectionModelChange={this.getSelectedDatas}
          />
        </div>

        {/* DIALOG DELETES */}
        <Dialog
          maxWidth="sm"
          fullWidth
          open={dialogDeletes}
          onClose={() => this._closeDialog("deletes")}
        >
          <DialogTitle>Delete Users ?</DialogTitle>
          <DialogContent>
            Data from{" "}
            <Typography component="span" sx={{ fontWeight: "bold" }}>
              {liveDatas
                .map((row, i) =>
                  selectedDatas.includes(row.id) ? row.fullname : null
                )
                .filter((el) => el != null)
                .join(", ")}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this._closeDialog("deletes")}>Cancel</Button>
            <Button onClick={() => this.deleteDatas()}>Delete</Button>
          </DialogActions>
        </Dialog>

        {/* DIALOG DETAIL */}
        <Dialog
          maxWidth="sm"
          fullWidth
          open={dialogDetail}
          onClose={() => this._closeDialog("detail")}
        >
          <DialogTitle>Detail Data</DialogTitle>
          <DialogContent>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Email
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {selectedData.email}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Full Name
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {selectedData.fullname}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Type
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {selectedData.type}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Department
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {selectedData.department}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this._closeDialog("detail")}>Close</Button>
          </DialogActions>
        </Dialog>

        {/* DIALOG DELETE */}
        <Dialog
          maxWidth="sm"
          fullWidth
          open={dialogDelete}
          onClose={() => this._closeDialog("delete")}
        >
          <DialogTitle>Delete User ?</DialogTitle>
          <DialogContent>
            Data from{" "}
            <Typography component="span" sx={{ fontWeight: "bold" }}>
              {selectedData.fullname}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this._closeDialog("delete")}>Cancel</Button>
            <Button onClick={() => this.deleteData(selectedData.id)}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* DIALOG FORM NEW/ EDIT */}
        <Dialog
          maxWidth="sm"
          fullWidth
          open={dialogSubmit}
          onClose={() => this._closeDialog("submit")}
        >
          <DialogTitle>{submit == 0 ? "Create User" : "Edit User"}</DialogTitle>
          <DialogContent>
            {/* form new/ edit */}
            {/* <TextField
              name="username"
              value={profileValue.username}
              onChange={this._changeProfileValue}
              autoFocus
              margin="dense"
              label="Username"
              type="text"
              fullWidth
              variant="standard"
            /> */}
            <TextField
              name="email"
              value={profileValue.email}
              onChange={this._changeProfileValue}
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              variant="standard"
            />
            <TextField
              name="fullname"
              value={profileValue.fullname}
              onChange={this._changeProfileValue}
              margin="dense"
              label="Full Name"
              type="text"
              fullWidth
              variant="standard"
            />
            <div>
              <FormControl margin="dense">
                <FormLabel>Type</FormLabel>
                <RadioGroup
                  name="type"
                  value={profileValue.type}
                  onChange={this._changeProfileValue}
                >
                  <FormControlLabel
                    value="lead"
                    control={<Radio />}
                    label="Lead"
                  />
                  <FormControlLabel
                    value="user"
                    control={<Radio />}
                    label="User"
                  />
                </RadioGroup>
              </FormControl>
            </div>

            <FormControl margin="dense">
              <FormLabel>Department</FormLabel>
              <RadioGroup
                name="department"
                value={profileValue.department}
                onChange={this._changeProfileValue}
              >
                <FormControlLabel value="hr" control={<Radio />} label="Hr" />
                <FormControlLabel
                  value="marketing"
                  control={<Radio />}
                  label="Marketing"
                />
                <FormControlLabel
                  value="operation"
                  control={<Radio />}
                  label="Operation"
                />
              </RadioGroup>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this._closeDialog("submit")}>Cancel</Button>
            <Button onClick={this._submit}>
              {submit == 0 ? "Submit" : "Update"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* dialog info */}
        <Dialog
          open={dialogInfo}
          onClose={() => this._closeDialog("info")}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Information</DialogTitle>
          <DialogContent>
            <span className="text-lg">Access base on User type</span>
            <List component="nav">
              <ListItem disablePadding>
                <ListItemText
                  primary="Lead"
                  secondary="Menu dashboard, projects, progress, resource, my profile"
                />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText
                  primary="User"
                  secondary="Menu progress, profile"
                />
              </ListItem>
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => _closeDialog("info")}>Close</Button>
          </DialogActions>
        </Dialog>
      </Layout>
    );
  }
}

export default Users;

// validasi form REACT HOOK FORM

// renderCell: (params) => {
//   let res = params.row.access.map((v, i) =>
//     v == "Projects" ? (
//       <Tooltip key={i} placement="top" title={v} arrow>
//         <Folder color="primary" />
//       </Tooltip>
//     ) : (
//       <Tooltip key={i} placement="top" title={v} arrow>
//         <Source color="primary" />
//       </Tooltip>
//     )
//   );
//   return res;
// }

// {selectedData != "" && selectedData.access.join(", ")}

{
  /* <FormGroup>
<FormControlLabel
  control={
    <Checkbox
      onChange={this._changeAccess}
      value="Projects"
      checked={profileValue.access.includes("Projects")}
    />
  }
  label="Projects"
/>
<FormControlLabel
  control={
    <Checkbox
      onChange={this._changeAccess}
      value="Master Data"
      checked={profileValue.access.includes("Master Data")}
    />
  }
  label="Master Data"
/>
</FormGroup> */
}
