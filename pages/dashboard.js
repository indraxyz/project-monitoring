import Layout from "../components/Layout";
import {
  Card,
  CardContent,
  CardActionArea,
  IconButton,
  Paper,
  Link,
  Button,
} from "@mui/material";
import {
  EventRepeatRounded,
  VerifiedRounded,
  ReceiptLongRounded,
  DateRangeRounded,
  CheckCircleRounded,
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";

//kolom: Job Number, Client, (ongoing 0 - finished 1 - invoicing 2 - paid 3), status
const columns = [
  { field: "jobNumber", headerName: "Job Number", width: 170 },
  { field: "worksheet", headerName: "Worksheet", width: 170 },
  { field: "client", headerName: "Client", width: 250 },
  {
    field: "ongoing",
    headerName: "Ongoing",
    width: 70,
    renderCell: ({ row }) => row.progress == 0 && <CheckCircleRounded />,
  },
  {
    field: "finished",
    headerName: "Finished",
    width: 70,
    renderCell: ({ row }) =>
      row.progress == 1 && <CheckCircleRounded className="text-blue-700" />,
  },
  {
    field: "invoicing",
    headerName: "Invoicing",
    width: 70,
    renderCell: ({ row }) =>
      row.progress == 2 && <CheckCircleRounded className="text-red-700" />,
  },
  {
    field: "paid",
    headerName: "Paid",
    width: 70,
    renderCell: ({ row }) =>
      row.progress == 3 && <CheckCircleRounded className="text-green-700" />,
  },
  // {
  //   field: "projectStatus",
  //   headerName: "Status",
  //   width: 100,
  // },
];

const rows = [
  {
    jobNumber: "x1",
    worksheet: "w1",
    client: "PT kita bisa",
    progress: 0,
    projectStatus: "-",
  },
  {
    jobNumber: "x2",
    worksheet: "w2",
    client: "PT kita bisa",
    progress: 3,
    projectStatus: "-",
  },
  {
    jobNumber: "x3",
    worksheet: "w3",
    client: "PT kita bisa",
    progress: 1,
    projectStatus: "-",
  },
  {
    jobNumber: "x4",
    worksheet: "w4",
    client: "PT kita bisa",
    progress: 2,
    projectStatus: "-",
  },
  {
    jobNumber: "x5",
    worksheet: "w5",
    client: "PT kita bisa",
    progress: 1,
    projectStatus: "-",
  },
  {
    jobNumber: "x6",
    worksheet: "w6",
    client: "PT kita bisa",
    progress: 2,
    projectStatus: "-",
  },
  {
    jobNumber: "x7",
    worksheet: "w7",
    client: "PT kita bisa",
    process: 3,
    projectStatus: "-",
  },
];

const Dashboard = () => {
  return (
    <Layout>
      <span className="block text-3xl font-bold my-8">Project Monitoring</span>
      <span className="text-base text-gray-500 block mb-6 underline">
        hi Username 😊, have a nice day 🌈
      </span>

      {/* <div className="flex justify-end mb-2">
        <IconButton className="mr-1" title="data setting">
          <SettingsRounded className="text-gray-500" />
        </IconButton>
      </div> */}

      {/* hightlight information */}
      <div className=" flex flex-col space-y-6 sm:space-y-0 sm:flex-row sm:space-x-6">
        <Card
          variant="outlined"
          className="w-full sm:w-1/4 rounded-xl"
          sx={{
            ":hover": {
              boxShadow: 3,
              borderColor: "black",
            },
          }}
        >
          <CardActionArea onClick={() => console.log("edit range")}>
            <CardContent className="flex flex-row items-center ">
              <DateRangeRounded className=" text-6xl" />
              <div className="ml-4">
                <span className="text-xl font-bold block">06-12 2022</span>
                <span className="text-base">Months</span>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card variant="outlined" className="w-full sm:w-1/4 rounded-xl">
          <CardContent className="flex flex-row items-center p-4">
            <EventRepeatRounded className="text-6xl " />
            <div className="ml-4">
              <span className="text-3xl font-bold block">99</span>
              <span className="text-base">Ongoing</span>
            </div>
          </CardContent>
        </Card>
        <Card variant="outlined" className="w-full sm:w-1/4 rounded-xl">
          <CardContent className="flex flex-row items-center p-4">
            <VerifiedRounded className="text-6xl " />
            <div className="ml-4">
              <span className="text-3xl font-bold block">99</span>
              <span className="text-base">Finished</span>
            </div>
          </CardContent>
        </Card>
        <Card variant="outlined" className="w-full sm:w-1/4 rounded-xl">
          <CardContent className="flex flex-row items-center p-4">
            <ReceiptLongRounded className="text-6xl " />
            <div className="ml-4">
              <span className="text-3xl font-bold block">99</span>
              <span className="text-base">Paid</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* projects, /10 data */}
      {/* <span className="block text-xl font-medium text-gray-500 mt-8">
        Progress
      </span> */}
      <DataGrid
        className="rounded-xl bg-white my-6 h-[633px]"
        getRowId={(row) => row.jobNumber}
        rows={rows}
        columns={columns}
        autoPageSize
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
        onRowDoubleClick={(p, e, d) => console.log(p)}
      />
    </Layout>
  );
};

export default Dashboard;
