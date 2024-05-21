import Layout from "../../components/Layout";
import { useState } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import {
  Autocomplete,
  TextField,
  IconButton,
  InputAdornment,
  Snackbar,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogContent,
  Chip,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import {
  AddRounded,
  DeleteRounded,
  RefreshRounded,
  FilterAltRounded,
  EditRounded,
  SearchRounded,
  Circle,
  InfoRounded,
  PaymentRounded,
} from "@mui/icons-material";
import { red, green, yellow, orange, grey } from "@mui/material/colors";
let searchTimer;

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
    </GridToolbarContainer>
  );
}

// KONTEN MODAL
const KontenModalDeletes = (props) => {
  let { selectedDatas, liveDatas } = props;
  return (
    <>
      <DialogTitle>Delete Clients ? </DialogTitle>
      <DialogContent>
        Data from{" "}
        <Typography component="span" sx={{ fontWeight: "bold" }}>
          {liveDatas
            .map((row, i) => (selectedDatas.includes(row.id) ? row.name : null))
            .filter((el) => el != null)
            .join(", ")}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onTidak}>Cancel</Button>
        <Button onClick={props.onYa}>Delete</Button>
      </DialogActions>
    </>
  );
};

const KontenInfo = () => (
  <>
    <DialogTitle>Payment Flow</DialogTitle>
    <DialogContent>
      <List>
        <ListItem disablePadding>
          <ListItemIcon>
            <Circle sx={{ color: green[200] }} />
          </ListItemIcon>
          <ListItemText
            primary="Lancar"
            secondary="tidak perlu penagihan hanya perlu di pantau"
          />
        </ListItem>
        <ListItem disablePadding>
          <ListItemIcon>
            <Circle sx={{ color: yellow[600] }} />
          </ListItemIcon>
          <ListItemText
            primary="Jatuh tempo"
            secondary="ditagih setelah jatuh tempo"
          />
        </ListItem>
        <ListItem disablePadding>
          <ListItemIcon>
            <Circle sx={{ color: orange[600] }} />
          </ListItemIcon>
          <ListItemText
            primary="Penagihan"
            secondary="call & email setiap bulan"
          />
        </ListItem>
        <ListItem disablePadding>
          <ListItemIcon>
            <Circle sx={{ color: red[600] }} />
          </ListItemIcon>
          <ListItemText
            primary="Macet"
            secondary="call, email & Surat setiap bulan"
          />
        </ListItem>
        <ListItem disablePadding>
          <ListItemIcon>
            <Circle sx={{ color: grey[900] }} />
          </ListItemIcon>
          <ListItemText primary="Blacklist" secondary="Tidak dapat tertagih" />
        </ListItem>
      </List>
    </DialogContent>
  </>
);

const IconKelancaran = (props) => {
  switch (props.value) {
    case "Lancar":
      return <Circle sx={{ color: green[200] }} />;
    case "Jatuh Tempo":
      return <Circle sx={{ color: yellow[600] }} />;
    case "Penagihan":
      return <Circle sx={{ color: orange[600] }} />;
    case "Macet":
      return <Circle sx={{ color: red[600] }} />;
    case "Blacklist":
      return <Circle sx={{ color: grey[900] }} />;
    default:
      return <span>-</span>;
  }
};

const columns = [
  // { field: "id", headerName: "ID", width: 100 },
  { field: "cardID", headerName: "CardID", width: 100 },
  { field: "name", headerName: "Name", width: 250 },
  { field: "phone", headerName: "Phone", width: 200 },
  { field: "address", headerName: "Address", width: 200 },
  {
    field: "pembayaran",
    headerName: "Flow",
    width: 70,
    renderCell: (params) => <IconKelancaran value={params.row.pembayaran} />,
  },
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
            setClientForm(params.row);
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
            console.log(params.row);
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

const Clients = () => {
  const [suggestDatas, setSuggestDatas] = useState([]);
  const [liveDatas, setLiveDatas] = useState([]);
  const [selectedDatas, setSelectedDatas] = useState([]);
  const [copyDatas, setCopyDatas] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [kontenModal, setKontenModal] = useState("");
  const [dialogDetail, setDialogDetail] = useState(false);
  const [dialogDelete, setDialogDelete] = useState(false);
  const [dialogSubmit, setDialogSubmit] = useState(false);
  const [dialogFilter, setDialogFilter] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [submit, setSubmit] = useState(0);
  const [clientForm, setClientForm] = useState({
    cardID: "",
    name: "",
    phone: "",
    cp_name: "",
    cp_phone: "",
    city: "",
    address: "",
    pembayaran: "",
    tagihan_macet: "",
    preventif: "",
    note: "",
  });
  const [filterForm, setFilterForm] = useState({
    pembayaran: "",
  });

  // run on didMount & didUpdate
  // useEffect(() => {
  //   //
  // }, []);

  const resetDatas = () => {
    setLiveDatas([...copyDatas]);
    setSearchKey("");
    setFilterForm({ pembayaran: "" });
    setSelectedDatas([]);
  };

  const _changeClientForm = (e) => {
    setClientForm({
      ...clientForm,
      [e.target.name]: e.target.value,
    });
  };

  const _submit = () => {
    console.log(clientForm);
    let datas = [];

    // new or update
    switch (submit) {
      case 0:
        let pk =
          Math.floor(Math.random() * 1000 + 1) + new Date().getMilliseconds();
        datas = [...liveDatas, { ...clientForm, id: pk }];
        break;
      case 1:
        datas = liveDatas.map((row) => {
          if (row.id == clientForm.id) {
            return clientForm;
          } else {
            return row;
          }
        });
        break;
      default:
        break;
    }

    setLiveDatas(datas);
    setCopyDatas(datas);
    setDialogSubmit(false);
    resetSubmitForm();
  };

  const resetSubmitForm = () => {
    setClientForm({
      cardID: "",
      name: "",
      phone: "",
      cp_name: "",
      cp_phone: "",
      city: "",
      address: "",
      pembayaran: "",
      tagihan_macet: "",
      preventif: "",
      note: "",
    });
  };

  const detailData = (params) => {
    setSelectedData(params.row);
    setDialogDetail(true);
  };

  const deleteData = (id) => {
    setLiveDatas(liveDatas.filter((row) => row.id != id));
    setDialogDelete(false);

    setSnackbarMessage("Deleted of " + id);
    setSnackbar(true);
  };
  const deleteDatas = () => {
    setLiveDatas(liveDatas.filter((row) => !selectedDatas.includes(row.id)));
    setOpenModal(false);
  };
  const suggestSearch = (e) => {
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
  const enterSearch = (e) => {
    if (e.key == "Enter") {
      clearTimeout(searchTimer); //clear suggest
      SearchFilter(e.target.value);
    }
  };
  const selectedSearch = (e, v, r) => {
    if (v != "") {
      SearchFilter(v);
    }
  };

  const SearchFilter = (key) => {
    let result = [];

    // CARI
    result = copyDatas.filter(
      (row) => row.name.toLowerCase().indexOf(key.toLowerCase()) > -1
    );
    // FILTER, loop
    Object.keys(filterForm).map(
      (key, index) =>
        filterForm[key] != "" &&
        (result = result.filter(
          (row) => row[key].toLowerCase() == filterForm[key].toLowerCase()
        ))
    );

    setLiveDatas([...result]);
    setOpenModal(false);
    setDialogFilter(false);
  };
  const openInfo = () => {
    setKontenModal("info");
    setOpenModal(true);
  };

  const _selectedDatas = (ids) => {
    setSelectedDatas(ids);
  };
  const snackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar(false);
  };
  const renderKontenModal = (key) => {
    switch (key) {
      case "deletes":
        return (
          <KontenModalDeletes
            onYa={deleteDatas}
            onTidak={() => setOpenModal(false)}
            liveDatas={liveDatas}
            selectedDatas={selectedDatas}
          />
        );
      case "info":
        return <KontenInfo onYa={() => setOpenModal(false)} />;
      default:
    }
  };
  const _closeDialog = (key) => {
    switch (key) {
      case "delete":
        setDialogDelete(false);
        break;
      case "submit":
        setDialogSubmit(false);
        resetSubmitForm();
        break;
      case "filter":
        setDialogFilter(false);
        // setFilterForm({ pembayaran: "" });
        break;
      default:
        setDialogDetail(false);
        break;
    }
  };

  const _changeFilterForm = (e) => {
    setFilterForm({
      ...filterForm,
      [e.target.name]: e.target.value,
    });
  };
  // render ICON FILTER
  const renderIconFilter = (key) => {
    let icon = <></>;
    switch (key) {
      case "pembayaran":
        icon = <PaymentRounded color="primary" />;
        break;
      default:
        break;
    }
    return icon;
  };

  return (
    <Layout>
      <div>
        <span className="text-2xl font-bold mb-8">Clients</span>
        {/* top table properties */}
        <div className="w-full flex flex-col md:flex-row-reverse md:items-center">
          <div className="w-full md:w-1/3 md:flex md:justify-end md:m-0">
            <IconButton
              color="primary"
              title="Add New"
              onClick={() => {
                setSubmit(0);
                setDialogSubmit(true);
                resetSubmitForm();
              }}
            >
              <AddRounded />
            </IconButton>
            <IconButton
              color="primary"
              title="Delete"
              onClick={() => {
                setKontenModal("deletes");
                setOpenModal(true);
              }}
              disabled={selectedDatas.length == 0 ? true : false}
            >
              <DeleteRounded />
            </IconButton>
            <IconButton
              color="primary"
              title="Filter"
              onClick={() => setDialogFilter(true)}
            >
              <FilterAltRounded />
            </IconButton>
            <IconButton color="primary" title="Information" onClick={openInfo}>
              <InfoRounded />
            </IconButton>
            <IconButton color="primary" title="Refresh" onClick={resetDatas}>
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
              value={searchKey}
              options={copyDatas.map((option) => option.name)}
              onKeyUp={suggestSearch}
              onKeyDown={enterSearch}
              onInputChange={(e, v) => setSearchKey(v)}
              onChange={selectedSearch}
            />
            {/* chip */}
            {filterForm.pembayaran != "" && (
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
            )}
          </div>
        </div>

        {/* table */}
        <div className="mt-8 w-full h-[690px]">
          <DataGrid
            rows={liveDatas}
            columns={columns}
            // pageSize={10}
            autoPageSize
            onRowDoubleClick={detailData}
            rowSelectionModel={selectedDatas}
            onRowSelectionModelChange={_selectedDatas}
            checkboxSelection
            disableRowSelectionOnClick
            slots={{
              toolbar: CustomToolbar,
            }}
          />
        </div>

        {/*notif*/}
        <Snackbar
          open={snackbar}
          autoHideDuration={3000}
          onClose={snackbarClose}
          message={snackbarMessage}
          // action={action}
        />

        {/* dialog deletes, info */}
        <Dialog
          open={openModal}
          onClose={() => setOpenModal(false)}
          fullWidth
          maxWidth="sm"
        >
          {renderKontenModal(kontenModal)}
        </Dialog>

        {/* dialog filter */}
        <Dialog
          maxWidth="sm"
          fullWidth
          open={dialogFilter}
          onClose={() => _closeDialog("filter")}
        >
          <DialogTitle>Filter Data</DialogTitle>
          <DialogContent>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Payment Flow
              </FormLabel>
              <RadioGroup
                aria-label="demo-radio-buttons-group-label"
                name="pembayaran"
                value={filterForm.pembayaran}
                onChange={_changeFilterForm}
              >
                <FormControlLabel
                  value="Lancar"
                  control={<Radio />}
                  label="Lancar"
                />
                <FormControlLabel
                  value="Jatuh Tempo"
                  control={<Radio />}
                  label="Jatuh Tempo"
                />
                <FormControlLabel
                  value="Penagihan"
                  control={<Radio />}
                  label="Penagihan"
                />
                <FormControlLabel
                  value="Macet"
                  control={<Radio />}
                  label="Macet"
                />
                <FormControlLabel
                  value="Blacklist"
                  control={<Radio />}
                  label="Blacklist"
                />
              </RadioGroup>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => _closeDialog("filter")}>Close</Button>
            <Button onClick={() => SearchFilter(searchKey)}>Filter</Button>
          </DialogActions>
        </Dialog>

        {/* dialog Delete */}
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
              {selectedData.name}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => _closeDialog("delete")}>Cancel</Button>
            <Button onClick={() => deleteData(selectedData.id)}>Delete</Button>
          </DialogActions>
        </Dialog>

        {/* dialog detail */}
        <Dialog
          maxWidth="sm"
          fullWidth
          open={dialogDetail}
          onClose={() => _closeDialog("detail")}
        >
          <DialogTitle>Detail Data</DialogTitle>
          <DialogContent>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              ID
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {selectedData.id}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              CardID
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {selectedData.cardID}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Name
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {selectedData.name}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Phone
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {selectedData.phone}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              City
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {selectedData.city}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Address
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {selectedData.address}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Contact Person Name
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {selectedData.cp_name}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Contact Person Phone
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {selectedData.cp_phone}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Payment Flow
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {selectedData.pembayaran}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Tagihan Macet
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {selectedData.tagihan_macet}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Tindakan Preventif
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {selectedData.preventif}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Note
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {selectedData.note}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => _closeDialog("detail")}>Close</Button>
          </DialogActions>
        </Dialog>

        {/* dialog submit new/ edit */}
        <Dialog
          maxWidth="sm"
          fullWidth
          open={dialogSubmit}
          onClose={() => _closeDialog("submit")}
        >
          <DialogTitle>
            {submit == 0 ? "New Client" : "Edit Client"}
          </DialogTitle>
          <DialogContent>
            {/* form new/ edit */}
            <TextField
              name="cardID"
              value={clientForm.cardID}
              onChange={_changeClientForm}
              autoFocus
              margin="dense"
              label="CardID"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              name="name"
              value={clientForm.name}
              onChange={_changeClientForm}
              margin="dense"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              name="phone"
              value={clientForm.phone}
              onChange={_changeClientForm}
              margin="dense"
              label="Phone"
              type="number"
              fullWidth
              variant="standard"
            />
            {/* auto complete */}
            <TextField
              name="city"
              value={clientForm.city}
              onChange={_changeClientForm}
              margin="dense"
              label="City"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              name="address"
              value={clientForm.address}
              onChange={_changeClientForm}
              margin="dense"
              label="Address"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              name="cp_name"
              value={clientForm.cp_name}
              onChange={_changeClientForm}
              margin="dense"
              label="Contact Person Name"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              name="cp_phone"
              value={clientForm.cp_phone}
              onChange={_changeClientForm}
              margin="dense"
              label="Contact Person Phone"
              type="number"
              fullWidth
              variant="standard"
            />
            <FormControl margin="dense">
              <FormLabel>Payment Flow</FormLabel>
              <RadioGroup
                name="pembayaran"
                value={clientForm.pembayaran}
                onChange={_changeClientForm}
              >
                <FormControlLabel
                  value="Lancar"
                  control={<Radio />}
                  label="Lancar"
                />
                <FormControlLabel
                  value="Jatuh Tempo"
                  control={<Radio />}
                  label="Jatuh Tempo"
                />
                <FormControlLabel
                  value="Penagihan"
                  control={<Radio />}
                  label="Penagihan"
                />
                <FormControlLabel
                  value="Macet"
                  control={<Radio />}
                  label="Macet"
                />
                <FormControlLabel
                  value="Blacklist"
                  control={<Radio />}
                  label="Blacklist"
                />
              </RadioGroup>
            </FormControl>
            <TextField
              name="tagihan_macet"
              value={clientForm.tagihan_macet}
              onChange={_changeClientForm}
              label="Tagihan Macet"
              margin="dense"
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              name="preventif"
              value={clientForm.preventif}
              onChange={_changeClientForm}
              margin="dense"
              label="Tindakan Prefentif"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              name="note"
              value={clientForm.note}
              onChange={_changeClientForm}
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
            <Button onClick={_submit}>
              {submit == 0 ? "Submit" : "Update"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Clients;

// filter tidak tampil dulu sebelum submit
// auto complete City
// validasi form REACT HOOK FORM
