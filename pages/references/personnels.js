import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Autocomplete,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Checkbox,
  FormGroup,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  AddRounded,
  DeleteRounded,
  RefreshRounded,
  EditRounded,
  SearchRounded,
} from "@mui/icons-material";
let searchTimer;
import { qualifications, certifications } from "../../config/optionals";

const Personnels = () => {
  // state
  const [suggestDatas, setSuggestDatas] = useState([]);
  const [liveDatas, setLiveDatas] = useState([]);
  const [selectedDatas, setSelectedDatas] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const [copyDatas, setCopyDatas] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [dialogDetail, setDialogDetail] = useState(false);
  const [dialogDelete, setDialogDelete] = useState(false);
  const [dialogDeletes, setDialogDeletes] = useState(false);
  const [dialogSubmit, setDialogSubmit] = useState(false);
  const [submit, setSubmit] = useState(0);
  const [personnelsForm, setPersonnelsForm] = useState({
    contract: "",
    fullname: "",
    nik: "",
    ktp: "",
    position: "",
    stanby: "",
    status: "",

    tanggal_lahir: "",
    phone: "",
    address: "",
    photo: "",
    bpjs_kesehatan: "",
    bpjs_ketenagakerjaan: "",
    npwp: "",
    education: "",
    join: "",
    issued: "",
    expired: "",
    experience: "",
    service: "",
    note: "",
    qualification: "",
    certification: "",
    department: "",
  });

  // run on didMount & didUpdate
  useEffect(() => {
    // console.log(qualifications);
  }, []);

  // kolom
  const columns = [
    { field: "fullname", headerName: "Name", width: 200 },
    { field: "nik", headerName: "NIK", width: 180 },
    { field: "contract", headerName: "Contract", width: 100 },
    { field: "position", headerName: "Position", width: 130 },
    { field: "standby", headerName: "Standby", width: 100 },
    { field: "status", headerName: "Status", width: 100 },
    {
      field: "actions",
      headerName: "#",
      sortable: false,
      filterable: false,
      disableExport: true,
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            title="Edit"
            onClick={() => {
              setPersonnelsForm(params.row);
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
              setSelectedData(params.row);
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
      case "deletes":
        setDialogDeletes(false);
        break;
      case "delete":
        setDialogDelete(false);
        break;
      case "submit":
        setDialogSubmit(false);
        _resetSubmitForm();
        break;
      default:
        setDialogDetail(false);
        break;
    }
  };

  const _deleteDatas = () => {
    setLiveDatas(liveDatas.filter((row) => !selectedDatas.includes(row.id)));
    setDialogDeletes(false);
  };

  const _deleteData = (id) => {
    setLiveDatas(liveDatas.filter((row) => row.id != id));
    setDialogDelete(false);
  };

  const _refreshTable = () => {
    setSearchKey("");
    setSelectedDatas([]);
    setLiveDatas([...copyDatas]);
  };

  const _changeSubmitForm = (e) => {
    setPersonnelsForm({
      ...personnelsForm,
      [e.target.name]: e.target.value,
    });
  };

  const _submit = () => {
    let datas = [];

    // new or update
    switch (submit) {
      case 0:
        let pk =
          Math.floor(Math.random() * 1000 + 1) + new Date().getMilliseconds();
        datas = [...liveDatas, { ...personnelsForm, id: pk }];
        break;
      case 1:
        datas = liveDatas.map((row) => {
          if (row.id == personnelsForm.id) {
            return personnelsForm;
          } else {
            return row;
          }
        });
        break;
    }

    setLiveDatas([...datas]);
    setCopyDatas([...datas]);
    setDialogSubmit(false);
    _resetSubmitForm();
  };

  const _resetSubmitForm = () => {
    setPersonnelsForm({
      contract: "",
      fullname: "",
      nik: "",
      ktp: "",
      position: "",
      stanby: "",
      status: "",

      tanggal_lahir: "",
      phone: "",
      address: "",
      photo: "",
      bpjs_kesehatan: "",
      bpjs_ketenagakerjaan: "",
      npwp: "",
      education: "",
      join: "",
      issued: "",
      expired: "",
      experience: "",
      service: "",
      note: "",
      qualification: "",
      certification: "",
      department: "",
    });
  };

  const _detailData = (params) => {
    setSelectedData(params.row);
    setDialogDetail(true);
  };

  const _suggestSearch = (e) => {
    if (e.target.value !== "") {
      if (e.key != "Enter") {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => {
          console.log("suggest " + e.target.value);
        }, 1000);
      }
    } else {
      clearTimeout(searchTimer);
    }
  };
  const _enterSearch = (e) => {
    if (e.key == "Enter") {
      clearTimeout(searchTimer); //clear suggest
      _SearchFilter(e.target.value);
    }
  };
  const _selectedSearch = (e, v, r) => {
    if (v != "") {
      _SearchFilter(v);
    }
  };
  const _SearchFilter = (key) => {
    let result = [];

    // CARI
    result = copyDatas.filter(
      (row) => row.fullname.toLowerCase().indexOf(key.toLowerCase()) > -1
    );

    setLiveDatas([...result]);
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-8">Personnels</h1>
      {/* top table management */}
      <div className="w-full flex flex-col md:flex-row-reverse md:items-center">
        <div className="w-full mb-4 md:w-1/3 md:flex  md:justify-end md:m-0">
          <IconButton
            color="primary"
            title="Add New"
            onClick={() => {
              setSubmit(0);
              setDialogSubmit(true);
            }}
          >
            <AddRounded />
          </IconButton>
          <IconButton
            color="primary"
            title="Deletes"
            onClick={() => {
              setDialogDeletes(true);
            }}
            disabled={selectedDatas.length == 0 ? true : false}
          >
            <DeleteRounded />
          </IconButton>

          <IconButton color="primary" title="Refresh" onClick={_refreshTable}>
            <RefreshRounded />
          </IconButton>
        </div>
        <div className="w-full md:w-2/3">
          <Autocomplete
            className="w-full sm:w-1/2"
            freeSolo
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                placeholder="search name"
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
            options={copyDatas.map((option) => `${option.fullname}`)}
            value={searchKey}
            onInputChange={(e, v) => setSearchKey(v)}
            onKeyUp={_suggestSearch}
            onKeyDown={_enterSearch}
            onChange={_selectedSearch}
          />
        </div>
      </div>

      {/* table */}
      <div style={{ height: 650, width: "100%" }} className="mt-8">
        <DataGrid
          rows={liveDatas}
          columns={columns}
          autoPageSize
          onRowDoubleClick={_detailData}
          onRowSelectionModelChange={(ids) => setSelectedDatas(ids)}
          rowSelectionModel={selectedDatas}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>

      {/* Dialog deletes*/}
      <Dialog
        maxWidth="sm"
        fullWidth
        open={dialogDeletes}
        onClose={() => _closeDialog("deletes")}
      >
        <DialogTitle>Delete Personnels ?</DialogTitle>
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
          <Button onClick={() => _closeDialog("deletes")}>Cancel</Button>
          <Button onClick={() => _deleteDatas()}>Delete</Button>
        </DialogActions>
      </Dialog>
      {/* dialog delete */}
      <Dialog
        maxWidth="sm"
        fullWidth
        open={dialogDelete}
        onClose={() => _closeDialog("delete")}
      >
        <DialogTitle>Delete ?</DialogTitle>
        <DialogContent>
          Data from{" "}
          <Typography component="span" sx={{ fontWeight: "bold" }}>
            {selectedData.fullname}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => _closeDialog("delete")}>Cancel</Button>
          <Button onClick={() => _deleteData(selectedData.id)}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* dialog submit/ edit */}
      <Dialog
        open={dialogSubmit}
        onClose={() => _closeDialog("submit")}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle>{submit == 0 ? "Submit " : "Edit "} Personnel</DialogTitle>
        <DialogContent>
          {/* personnel information */}
          <TextField
            name="nik"
            value={personnelsForm.nik}
            onChange={_changeSubmitForm}
            margin="dense"
            label="NIK"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            name="fullname"
            value={personnelsForm.fullname}
            onChange={_changeSubmitForm}
            margin="dense"
            label="Full Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <FormControl margin="dense" variant="standard" fullWidth>
            <InputLabel>Department</InputLabel>
            <Select
              name="department"
              value={personnelsForm.department}
              onChange={_changeSubmitForm}
            >
              <MenuItem value={""}></MenuItem>
              <MenuItem value={"Hr"}>HR</MenuItem>
              <MenuItem value={"marketing"}>Marketing</MenuItem>
              <MenuItem value={"finance"}>Finance</MenuItem>
              <MenuItem value={"operation"}>Operation</MenuItem>
            </Select>
          </FormControl>
          <TextField
            name="birth"
            value={personnelsForm.birth}
            onChange={_changeSubmitForm}
            margin="dense"
            label="Birth date"
            type="date"
            fullWidth
            variant="standard"
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            name="phone"
            value={personnelsForm.phone}
            onChange={_changeSubmitForm}
            margin="dense"
            label="Phone"
            type="number"
            fullWidth
            variant="standard"
            autoComplete="on"
          />
          <TextField
            name="address"
            value={personnelsForm.address}
            onChange={_changeSubmitForm}
            margin="dense"
            label="Address"
            type="text"
            fullWidth
            variant="standard"
            rows={2}
            multiline
            autoComplete="on"
          />
          <TextField
            name="ktp"
            value={personnelsForm.ktp}
            onChange={_changeSubmitForm}
            margin="dense"
            label="KTP"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            name="npwp"
            value={personnelsForm.npwp}
            onChange={_changeSubmitForm}
            margin="dense"
            label="NPWP"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            name="bpjsks"
            value={personnelsForm.bpjsks}
            onChange={_changeSubmitForm}
            margin="dense"
            label="BPJS Kesehatan"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            name="bpjstk"
            value={personnelsForm.bpjstk}
            onChange={_changeSubmitForm}
            margin="dense"
            label="BPJS Ketenagakerjaan"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            name="experience"
            value={personnelsForm.experience}
            onChange={_changeSubmitForm}
            margin="dense"
            label="Experience"
            type="number"
            fullWidth
            variant="standard"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">years</InputAdornment>
              ),
            }}
          />
          <FormControl margin="dense" variant="standard" fullWidth>
            <InputLabel>Education</InputLabel>
            <Select value={""} onChange={() => {}} name="education">
              <MenuItem value={""}>-</MenuItem>
              <MenuItem value={0}>SMP</MenuItem>
              <MenuItem value={1}>SMA</MenuItem>
              <MenuItem value={2}>S1</MenuItem>
              <MenuItem value={3}>S2</MenuItem>
            </Select>
          </FormControl>
          <FormControl margin="dense" variant="standard" fullWidth>
            <InputLabel>Position</InputLabel>
            <Select value={""} onChange={() => {}} name="position">
              <MenuItem value={""}>-</MenuItem>
              <MenuItem value={10}>Pimpinan</MenuItem>
              <MenuItem value={20}>Staff</MenuItem>
            </Select>
          </FormControl>
          <FormControl margin="dense" variant="standard" fullWidth>
            <FormLabel>Qualification</FormLabel>
            <FormGroup>
              {Object.keys(qualifications).map((key, i) => (
                <FormControlLabel
                  key={key}
                  control={<Checkbox />}
                  name="qualification"
                  onChange={() => {}}
                  checked={false}
                  value={qualifications[i].value}
                  label={qualifications[i].label}
                />
              ))}
            </FormGroup>
          </FormControl>
          <FormControl margin="dense" variant="standard" fullWidth>
            <FormLabel>Certification/ Training</FormLabel>
            <FormGroup>
              {Object.keys(certifications).map((key, i) => (
                <FormControlLabel
                  key={key}
                  control={<Checkbox />}
                  name="certification"
                  onChange={() => {}}
                  checked={false}
                  value={certifications[i].value}
                  label={certifications[i].label}
                />
              ))}
            </FormGroup>
          </FormControl>
          <TextField
            name="join"
            value={personnelsForm.join}
            onChange={_changeSubmitForm}
            margin="dense"
            label="Join date"
            type="date"
            fullWidth
            variant="standard"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            name="issued"
            value={personnelsForm.issued}
            onChange={_changeSubmitForm}
            margin="dense"
            label="Issued date"
            type="date"
            fullWidth
            variant="standard"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            name="expired"
            value={personnelsForm.expired}
            onChange={_changeSubmitForm}
            margin="dense"
            label="Expired date"
            type="date"
            fullWidth
            variant="standard"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            name="service"
            value={personnelsForm.service}
            onChange={_changeSubmitForm}
            margin="dense"
            label="Service"
            type="number"
            fullWidth
            variant="standard"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">years</InputAdornment>
              ),
            }}
          />
          <FormControl margin="dense" variant="standard" fullWidth>
            <InputLabel>Status</InputLabel>
            <Select value={""} onChange={() => {}} name="status">
              <MenuItem value={""}>-</MenuItem>
              <MenuItem value={0}>inactive</MenuItem>
              <MenuItem value={1}>active</MenuItem>
            </Select>
          </FormControl>
          <FormControl margin="dense" variant="standard" fullWidth>
            <InputLabel>Contract</InputLabel>
            <Select value={""} onChange={() => {}} name="contract">
              <MenuItem value={""}>-</MenuItem>
              <MenuItem value={0}>Permanent</MenuItem>
              <MenuItem value={1}>Annual</MenuItem>
              <MenuItem value={1}>Project</MenuItem>
              <MenuItem value={1}>Call</MenuItem>
            </Select>
          </FormControl>
          <FormControl margin="dense" variant="standard" fullWidth>
            <InputLabel>Standby</InputLabel>
            <Select value={""} onChange={() => {}} name="standby">
              <MenuItem value={""}>-</MenuItem>
              <MenuItem value={0}>in</MenuItem>
              <MenuItem value={1}>out</MenuItem>
            </Select>
          </FormControl>
          <TextField
            name="note"
            value={personnelsForm.note}
            onChange={_changeSubmitForm}
            margin="dense"
            label="Note"
            type="text"
            fullWidth
            variant="standard"
            multiline
            rows={2}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => _closeDialog("submit")}>Cancel</Button>
          <Button onClick={_submit}>{submit == 0 ? "Submit" : "Update"}</Button>
        </DialogActions>
      </Dialog>

      {/* dialog detail */}
      <Dialog
        maxWidth="sm"
        fullWidth
        open={dialogDetail}
        onClose={() => _closeDialog("detail")}
      >
        <DialogTitle>Detail Personnel</DialogTitle>
        <DialogContent>
          <div>
            <span className="text-lg font-medium text-gray-900 block mb-2">
              Personnel Information
            </span>
            <div className="flex flex-col gap-2">
              <div>
                <span className="text-base font-medium text-gray-500 mb-2 block">
                  NIK
                </span>
                <span className="text-base text-gray-500">
                  {selectedData.nik}
                </span>
              </div>
              <div>
                <span className="text-base font-medium text-gray-500 mb-2 block">
                  Full Name
                </span>
                <span className="text-base text-gray-500">
                  {selectedData.fullname}
                </span>
              </div>
              <div>
                <span className="text-base font-medium text-gray-500 mb-2 block">
                  Department
                </span>
                <span className="text-base text-gray-500">
                  {selectedData.department}
                </span>
              </div>
              <div>
                <span className="text-base font-medium text-gray-500 mb-2 block">
                  KTP
                </span>
                <span className="text-base text-gray-500">
                  {selectedData.ktp}
                </span>
              </div>
              <div>
                <span className="text-base font-medium text-gray-500 mb-2 block">
                  NPWP
                </span>
                <span className="text-base text-gray-500">
                  {selectedData.npwp}
                </span>
              </div>
              <div>
                <span className="text-base font-medium text-gray-500 mb-2 block">
                  Birth Date
                </span>
                <span className="text-base text-gray-500">
                  {selectedData.birth}
                </span>
              </div>
              <div>
                <span className="text-base font-medium text-gray-500 mb-2 block">
                  Age
                </span>
                <span className="text-base text-gray-500">{""}</span>
              </div>
              <div>
                <span className="text-base font-medium text-gray-500 mb-2 block">
                  Phone
                </span>
                <span className="text-base text-gray-500">
                  {selectedData.phone}
                </span>
              </div>
              <div>
                <span className="text-base font-medium text-gray-500 mb-2 block">
                  Address
                </span>
                <span className="text-base text-gray-500">
                  {selectedData.address}
                </span>
              </div>
              <div>
                <span className="text-base font-medium text-gray-500 mb-2 block">
                  BPJS Kesehatan
                </span>
                <span className="text-base text-gray-500">
                  {selectedData.bpjsks}
                </span>
              </div>
              <div>
                <span className="text-base font-medium text-gray-500 mb-2 block">
                  BPJS Ketenagakerjaan
                </span>
                <span className="text-base text-gray-500">
                  {selectedData.bpjstk}
                </span>
              </div>
              <div>
                <span className="text-base font-medium text-gray-500 mb-2 block">
                  Experience
                </span>
                <span className="text-base text-gray-500">
                  {selectedData.experience}
                </span>
              </div>
              <div>
                <span className="text-base font-medium text-gray-500 mb-2 block">
                  Education
                </span>
                <span className="text-base text-gray-500">
                  {selectedData.education}
                </span>
              </div>
              <div>
                <span className="text-base font-medium text-gray-500 mb-2 block">
                  Position
                </span>
                <span className="text-base text-gray-500">
                  {selectedData.position}
                </span>
              </div>
              <div>
                <span className="text-base font-medium text-gray-500 mb-2 block">
                  Qualification
                </span>
                <span className="text-base text-gray-500">
                  {selectedData.qualification}
                </span>
              </div>
              <div>
                <span className="text-base font-medium text-gray-500 mb-2 block">
                  Certification/ Training
                </span>
                <span className="text-base text-gray-500">
                  {selectedData.certification}
                </span>
              </div>
              <div>
                <span className="text-base font-medium text-gray-500 mb-2 block">
                  Join date
                </span>
                <span className="text-base text-gray-500">
                  {selectedData.join}
                </span>
              </div>
              <div>
                <span className="text-base font-medium text-gray-500 mb-2 block">
                  Issued date
                </span>
                <span className="text-base text-gray-500">
                  {selectedData.issued}
                </span>
              </div>
              <div>
                <span className="text-base font-medium text-gray-500 mb-2 block">
                  Expired Date
                </span>
                <span className="text-base text-gray-500">
                  {selectedData.expired}
                </span>
              </div>
              <div>
                <span className="text-base font-medium text-gray-500 mb-2 block">
                  Service
                </span>
                <span className="text-base text-gray-500">
                  {selectedData.service}
                </span>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => _closeDialog("detail")}>Close</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default Personnels;

// info umur auto
