import Layout from "../components/Layout";
import Image from "next/image";
import xImage from "../public/image.jpg";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  Checkbox,
  Input,
  InputLabel,
  InputAdornment,
  IconButton,
  FormGroup,
  Stack,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  PasswordRounded,
  PersonRounded,
  EditRounded,
  FaceRounded,
} from "@mui/icons-material";
import { MuiFileInput } from "mui-file-input";
import { qualifications, certifications } from "../config/optionals";

const Profile = () => {
  const [dialogEdit, setDialogEdit] = useState(false);
  const [dialogPassword, setDialogPassword] = useState(false);
  const [dialogPhoto, setDialogPhoto] = useState(false);
  const [dialogDetail, setDialogDetail] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
  });
  // form
  const [profileValue, setProfileValue] = useState({
    username: "",
    email: "",
    fullname: "",
    department: "",
    photo: null,
    nik: "",
  });
  const [profile, setProfile] = useState({
    username: "johndoe",
    email: "john@gm.co",
    fullname: "John Doe",
    department: "",
    photo: null,
    nik: "1234",
  });

  const _changeProfileValue = (e) => {
    setProfileValue({ ...profileValue, [e.target.name]: e.target.value });
  };
  const _changePhoto = (newFile) => {
    setProfileValue({
      ...profileValue,
      photo: newFile,
    });
  };

  const _showNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };
  const _showCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const _changePassword = () => {
    console.log(password);
    // check kesamaan password dengan server
    setDialogPassword(false);
  };

  const _updateProfile = () => {
    console.log(profileValue);
    // validasi
    setProfile({ ...profileValue });
    setDialogEdit(false);
  };

  // const _changeAccess = (e) => {
  //   const { value, checked } = e.target;
  //   let { access } = profileValue;

  //   if (checked) {
  //     setProfileValue({
  //       ...profileValue,
  //       access: [...access, value],
  //     });
  //   } else {
  //     setProfileValue({
  //       ...profileValue,
  //       access: access.filter((v) => v !== value),
  //     });
  //   }
  // };
  const _closeDialog = (key) => {
    switch (key) {
      case "editProfile":
        setDialogEdit(false);
        break;
      case "editPhoto":
        setDialogPhoto(false);
        break;
      case "detail":
        setDialogDetail(false);
        break;
      default:
        setDialogPassword(false);
        break;
    }
  };
  const _openDialog = (key) => {
    switch (key) {
      case "editProfile":
        setDialogEdit(true);
        break;
      case "editPhoto":
        setDialogPhoto(true);
        break;
      case "detail":
        setDialogDetail(true);
        break;
      default:
        setDialogPassword(true);
        break;
    }
  };

  return (
    <Layout>
      <div>
        <span className="text-2xl font-bold">My Profile</span>

        {/* preview */}
        <div className="mt-8 w-full flex flex-col md:flex-row md:space-x-2 ">
          <Image
            className="object-cover h-48 w-48 my-8 rounded-full md:h-60 md:w-60"
            src={xImage}
            alt="avatar"
            priority
          ></Image>

          <div className="md:px-8">
            <div className="mt-4">
              <span className="text-lg font-medium text-gray-900 block mb-2">
                Username
              </span>
              <span className=" text-md text-gray-500">{profile.username}</span>
            </div>

            <div className="mt-4">
              <span className="text-lg font-medium text-gray-900 block mb-2">
                Full name
              </span>
              <span className="text-md text-gray-500">{profile.fullname}</span>
            </div>
            <div className="mt-4">
              <span className="text-lg font-medium text-gray-900 block mb-2">
                NIK
              </span>
              <span className="text-md text-gray-500">{profile.nik}</span>
            </div>
            {/* actions */}
            <div className="mt-6">
              <Stack direction="row" spacing={1}>
                <IconButton
                  title="Detail Profile"
                  color="primary"
                  onClick={() => {
                    _openDialog("detail");
                  }}
                >
                  <PersonRounded />
                </IconButton>
                <IconButton
                  title="Edit Profile"
                  color="primary"
                  onClick={() => {
                    setProfileValue(profile);
                    _openDialog("editProfile");
                  }}
                >
                  <EditRounded />
                </IconButton>
                <IconButton
                  title="Edit Photo"
                  color="primary"
                  onClick={() => {
                    _openDialog("editPhoto");
                  }}
                >
                  <FaceRounded />
                </IconButton>
                <IconButton
                  title="Edit Password"
                  color="primary"
                  onClick={() => _openDialog("changePassword")}
                >
                  <PasswordRounded />
                </IconButton>
              </Stack>
            </div>
          </div>
        </div>
      </div>

      {/* Dialog Detail Profile */}
      <Dialog
        open={dialogDetail}
        onClose={() => _closeDialog("detail")}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle>Detail Profile</DialogTitle>
        <DialogContent>
          <div className="mb-4">
            <span className="text-lg font-medium text-gray block mb-2">
              User Information
            </span>
            <div className="flex flex-col gap-2">
              <div>
                <span className="text-base font-medium text-gray-500 mb-1 block">
                  Username
                </span>
                <span className="text-base text-gray-500">
                  {profile.username}
                </span>
              </div>
              <div>
                <span className="text-base font-medium text-gray-500 mb-1 block">
                  Email
                </span>
                <span className="text-base font-normal text-gray-400">
                  {profile.email}
                </span>
              </div>
            </div>
          </div>
          <div>
            <span className="text-lg font-medium text-gray-900 block mb-2">
              Personnel Information
            </span>
            <div className="flex flex-col gap-2">
              <div>
                <span className="text-base font-medium text-gray-500 mb-1 block">
                  NIK
                </span>
                <span className="text-base font-normal text-gray-400">
                  {profile.nik}
                </span>
              </div>
              <div>
                <span className="text-base font-medium text-gray-500 mb-1 block">
                  Full Name
                </span>
                <span className="text-base font-normal text-gray-400">
                  {profile.fullname}
                </span>
              </div>
              <div>
                <span className="text-base font-medium text-gray-500 mb-1 block">
                  Department
                </span>
                <span className="text-base font-normal text-gray-400">
                  {profile.department}
                </span>
              </div>
              <div>
                <span className="text-base font-medium text-gray-500 mb-1 block">
                  KTP
                </span>
                <span className="text-base font-normal text-gray-400">
                  {profile.ktp}
                </span>
              </div>
              <div>
                <span className="text-base font-medium text-gray-500 mb-1 block">
                  NPWP
                </span>
                <span className="text-base font-normal text-gray-400">
                  {profile.npwp}
                </span>
              </div>
              <div>
                <span className="text-base font-medium text-gray-500 mb-1 block">
                  Birth Date
                </span>
                <span className="text-base font-normal text-gray-400">
                  {profile.birth}
                </span>
              </div>
              <div>
                <span className="text-base font-medium text-gray-500 mb-1 block">
                  Phone
                </span>
                <span className="text-base font-normal text-gray-400">
                  {profile.phone}
                </span>
              </div>
              <div>
                <span className="text-base font-medium text-gray-500 mb-1 block">
                  Address
                </span>
                <span className="text-base font-normal text-gray-400">
                  {profile.address}
                </span>
              </div>
              <div>
                <span className="text-base font-medium text-gray-500 mb-1 block">
                  BPJS Kesehatan
                </span>
                <span className="text-base font-normal text-gray-400">
                  {profile.bpjsks}
                </span>
              </div>
              <div>
                <span className="text-base font-medium text-gray-500 mb-1 block">
                  BPJS Ketenagakerjaan
                </span>
                <span className="text-base font-normal text-gray-400">
                  {profile.bpjstk}
                </span>
              </div>
              <div>
                <span className="text-base font-medium text-gray-500 mb-1 block">
                  Experience
                </span>
                <span className="text-base font-normal text-gray-400">
                  {profile.experience}
                </span>
              </div>
              <div>
                <span className="text-base font-medium text-gray-500 mb-1 block">
                  Education
                </span>
                <span className="text-base font-normal text-gray-400">
                  {profile.education}
                </span>
              </div>
              <div>
                <span className="text-base font-medium text-gray-500 mb-1 block">
                  Position
                </span>
                <span className="text-base font-normal text-gray-400">
                  {profile.position}
                </span>
              </div>
              <div>
                <span className="text-base font-medium text-gray-500 mb-1 block">
                  Qualification
                </span>
                <span className="text-base font-normal text-gray-400">
                  {profile.qualification}
                </span>
              </div>
              <div>
                <span className="text-base font-medium text-gray-500 mb-1 block">
                  Certification/ Training
                </span>
                <span className="text-base font-normal text-gray-400">
                  {profile.certification}
                </span>
              </div>
              <div>
                <span className="text-base font-medium text-gray-500 mb-1 block">
                  Join date
                </span>
                <span className="text-base font-normal text-gray-400">
                  {profile.join}
                </span>
              </div>
              <div>
                <span className="text-base font-medium text-gray-500 mb-1 block">
                  Issued date
                </span>
                <span className="text-base font-normal text-gray-400">
                  {profile.issued}
                </span>
              </div>
              <div>
                <span className="text-base font-medium text-gray-500 mb-1 block">
                  Expired Date
                </span>
                <span className="text-base font-normal text-gray-400">
                  {profile.expired}
                </span>
              </div>
              <div>
                <span className="text-base font-medium text-gray-500 mb-1 block">
                  Service
                </span>
                <span className="text-base font-normal text-gray-400">
                  {profile.service}
                </span>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => _closeDialog("detail")}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Edit Photo */}
      <Dialog
        open={dialogPhoto}
        onClose={() => _closeDialog("editPhoto")}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle>Photo Profile</DialogTitle>
        <DialogContent>
          <FormControl margin="dense" fullWidth>
            <FormLabel>Photo</FormLabel>
            <MuiFileInput
              margin="dense"
              fullWidth
              variant="standard"
              value={profileValue.photo}
              onChange={_changePhoto}
              InputProps={{
                inputProps: {
                  accept: "image/*",
                },
                startAdornment: <FaceRounded className="m-2" />,
              }}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => _closeDialog("editPhoto")}>Update</Button>
        </DialogActions>
      </Dialog>

      {/* dialog edit profile*/}
      <Dialog
        open={dialogEdit}
        onClose={() => _closeDialog("editProfile")}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <div className="space-y-4">
            {/* user information */}
            <div>
              <span className="text-lg font-medium">User Information</span>
              <TextField
                name="username"
                value={profileValue.username}
                onChange={_changeProfileValue}
                autoFocus
                margin="dense"
                label="Username"
                type="text"
                fullWidth
                variant="standard"
                autoComplete="on"
              />
              <TextField
                name="email"
                value={profileValue.email}
                onChange={_changeProfileValue}
                margin="dense"
                label="Email"
                type="email"
                fullWidth
                variant="standard"
                autoComplete="on"
              />
            </div>
            {/* personnel information */}
            <div className="py-6">
              <span className="text-lg font-medium">Personnel Information</span>

              <TextField
                name="nik"
                value={profileValue.nik}
                onChange={_changeProfileValue}
                margin="dense"
                label="NIK"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                name="fullname"
                value={profileValue.fullname}
                onChange={_changeProfileValue}
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
                  value={profileValue.department}
                  onChange={_changeProfileValue}
                >
                  <MenuItem value={""}></MenuItem>
                  <MenuItem value={"Hr"}>HR</MenuItem>
                  <MenuItem value={"marketing"}>Marketing</MenuItem>
                  <MenuItem value={"finance"}>Finance</MenuItem>
                  <MenuItem value={"operation"}>Operation</MenuItem>
                </Select>
              </FormControl>
              <TextField
                name="birthdate"
                value={profileValue.birthdate}
                onChange={_changeProfileValue}
                margin="dense"
                label="Birth date"
                type="date"
                fullWidth
                variant="standard"
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                name="phone"
                value={profileValue.phone}
                onChange={_changeProfileValue}
                margin="dense"
                label="Phone"
                type="number"
                fullWidth
                variant="standard"
                autoComplete="on"
              />
              <TextField
                name="address"
                value={profileValue.address}
                onChange={_changeProfileValue}
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
                value={profileValue.ktp}
                onChange={_changeProfileValue}
                margin="dense"
                label="KTP"
                type="number"
                fullWidth
                variant="standard"
              />
              <TextField
                name="npwp"
                value={profileValue.npwp}
                onChange={_changeProfileValue}
                margin="dense"
                label="NPWP"
                type="number"
                fullWidth
                variant="standard"
              />
              <TextField
                name="bpjsks"
                value={profileValue.bpjsks}
                onChange={_changeProfileValue}
                margin="dense"
                label="BPJS Kesehatan"
                type="number"
                fullWidth
                variant="standard"
              />
              <TextField
                name="bpjstk"
                value={profileValue.bpjstk}
                onChange={_changeProfileValue}
                margin="dense"
                label="BPJS Ketenagakerjaan"
                type="number"
                fullWidth
                variant="standard"
              />
              <TextField
                name="experience"
                value={profileValue.experience}
                onChange={_changeProfileValue}
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
                  {qualifications.map((item, i) => (
                    <FormControlLabel
                      key={i}
                      control={<Checkbox />}
                      name="qualification"
                      onChange={() => {}}
                      checked={false}
                      value={item.value}
                      label={item.label}
                    />
                  ))}
                </FormGroup>
              </FormControl>
              <FormControl margin="dense" variant="standard" fullWidth>
                <FormLabel>Certification/ Training</FormLabel>
                <FormGroup>
                  {certifications.map((item, i) => (
                    <FormControlLabel
                      key={i}
                      control={<Checkbox />}
                      name="certification"
                      onChange={() => {}}
                      checked={false}
                      value={item.value}
                      label={item.label}
                    />
                  ))}
                </FormGroup>
              </FormControl>
              <TextField
                name="join"
                value={profileValue.join}
                onChange={_changeProfileValue}
                margin="dense"
                label="Join date"
                type="date"
                fullWidth
                variant="standard"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                name="issued"
                value={profileValue.issued}
                onChange={_changeProfileValue}
                margin="dense"
                label="Issued date"
                type="date"
                fullWidth
                variant="standard"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                name="expired"
                value={profileValue.expired}
                onChange={_changeProfileValue}
                margin="dense"
                label="Expired date"
                type="date"
                fullWidth
                variant="standard"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                name="service"
                value={profileValue.service}
                onChange={_changeProfileValue}
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
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => _closeDialog("editProfile")}>Cancel</Button>
          <Button onClick={_updateProfile}>Update</Button>
        </DialogActions>
      </Dialog>

      {/* dialog password */}
      <Dialog
        open={dialogPassword}
        onClose={() => _closeDialog("changePassword")}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <FormControl variant="standard" margin="dense" fullWidth>
            <InputLabel>Current Password</InputLabel>
            <Input
              name="currentPassword"
              value={password.currentPassword}
              onChange={(e) =>
                setPassword({
                  ...password,
                  [e.target.name]: e.target.value,
                })
              }
              type={showCurrentPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton disableRipple onClick={_showCurrentPassword}>
                    {showCurrentPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl variant="standard" margin="dense" fullWidth>
            <InputLabel>New Password</InputLabel>
            <Input
              name="newPassword"
              value={password.newPassword}
              onChange={(e) =>
                setPassword({
                  ...password,
                  [e.target.name]: e.target.value,
                })
              }
              type={showNewPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton disableRipple onClick={_showNewPassword}>
                    {showNewPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => _closeDialog("changePassword")}>Cancel</Button>
          <Button onClick={_changePassword}>Update</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default Profile;

// ui responsive: dekstop 2 kolom antara foto dan data profile
// logic
// backend
// validasi form profile using react hook form

// checked={profileValue.access.includes("References")}
