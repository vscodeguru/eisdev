import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grow from "@mui/material/Grow";
import "./MuiTableComponent.css";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

const MUITable = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState({});

  const tabledata = {
    columns: [
      { label: "S. No", name: "sno" },
      { label: "Name", name: "name" },
      { label: "Record", name: "record" },
      {
        label: "Fix Recommendation",
        name: "fixrecommendation",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <button
                class="badge text-bg-primary border border-0 p-2"
                onClick={() => console.log(value, tableMeta)}
              >
                Fix Recommendation
              </button>
            );
          },
        },
      },
    ],
    data: [
      {
        sno: 1,
        name: "SPF Record Missing",
        record: "A",
        fixrecommendation: "Recommendation 1",
        recomdesc: "Recommendation Description 1",
      },
      {
        sno: 2,
        name: "SPF Record Missing",
        record: "SPF",
        fixrecommendation: "Recommendation 2",
        recomdesc: "Recommendation Description 2",
      },
      {
        sno: 3,
        name: "SPF Record Missing",
        record: "SPF",
        fixrecommendation: "Recommendation 3",
        recomdesc: "Recommendation Description 3",
      },
      {
        sno: 4,
        name: "SPF Record Missing",
        record: "MX",
        fixrecommendation: "Recommendation 4",
        recomdesc: "Recommendation Description 4",
      },
      {
        sno: 5,
        name: "SPF Record Missing",
        record: "MX",
        fixrecommendation: "Recommendation 5",
        recomdesc: "Recommendation Description 5",
      },
      {
        sno: 6,
        name: "SPF Record Missing",
        record: "AA",
        fixrecommendation: "Recommendation 6",
        recomdesc: "Recommendation Description 6",
      },
      {
        sno: 7,
        name: "SPF Record Missing",
        record: "MX",
        fixrecommendation: "Recommendation 7",
        recomdesc: "Recommendation Description 7",
      },
    ],
  };

  const dashboardCount = {};

  const columns = tabledata.columns;
  const data = tabledata.data;

  const getMuiTheme = () =>
    createTheme({
      components: {
        // Changed from `overrides` to `components` for MUI v5
        MUIDataTableBodyCell: {
          styleOverrides: {
            root: {
              // padding: '16px', // Updated padding here
            },
          },
        },
      },
    });

  const options = {
    filterType: "checkbox",
    responsive: "standard",
    selectableRows: "none",
    customSearch: (searchQuery, currentRow, columns) => {
      const columnIndex = 1; // Index of 'Name' column, assuming it's the second column
      if (
        currentRow[columnIndex]
          .toString()
          .toLowerCase()
          .indexOf(searchQuery.toLowerCase()) !== -1
      ) {
        return true;
      }
      return false;
    },
    onRowClick: (rowData) => {
      // console.log(data[rowData[0] - 1].recomdesc);
      setSelectedRowData({
        recomdesc: data[rowData[0] - 1].recomdesc,
      });
      setDialogOpen(true); // Open the dialog when a row is clicked
    },
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={getMuiTheme()}>
        <div className="my-custom-datatable">
          <MUIDataTable
            columns={columns}
            data={data}
            title="DNS Vulnerability"
          />
        </div>
        {/* Dialog component to show selected row data */}
        <Dialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          TransitionComponent={Transition} // Use Grow transition component
          // Add the sx prop to style the Dialog component
          sx={{
            "& .MuiDialog-paper": {
              // Target the paper element inside the dialog
              width: "500px", // Set the width of the dialog
              maxWidth: "700px", // Ensure it doesn't exceed the width
              // minHeight: '300px',
              // height:'fit-content' // Set the height of the dialog
            },
          }}
        >
          <DialogTitle>Fix Recommendation</DialogTitle>
          <DialogContent>
            <Card class="popup-card">
              <CardContent>
                {/* {console.log(selectedRowData)} */}
                <Typography variant="body1" marginLeft="-13px">
                  {selectedRowData.recomdesc}
                </Typography>
              </CardContent>
            </Card>
          </DialogContent>
        </Dialog>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default MUITable;
