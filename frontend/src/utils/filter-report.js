import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import MultipleSelectCheckmarks from "./select-checkbox";
import { DatePicker } from "@mui/x-date-pickers";

const FilterPop = ({handleFilterOptionClick,personName,setPersonName,filterValues,cities,setFilterValues,isFilterOpen, setFilterOpen, handleFilterClose }) => {
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilterValues((prevValues) => ({
      ...prevValues,
     
      [name]: value,
    }));

  };
  const resetFilters = () => {

    setPersonName([]);
    setFilterValues({
      city: [],
      whatsappStatus: 'All',
      employeeStatus: 'All',
      whatsappFromDate: null,
      whatsappToDate: null,
      smsStatus: 'All',
      smsFromDate: null,
      smsToDate: null,
      callingStatus: 'All',
      callingFromDate: null,
      callingToDate: null,
      axisBankStatus: 'All',
      sbiBankStatus: 'All',
    });
  };

  const handleDateChange = (label, date) => {
    setFilterValues((prevValues) => ({
      ...prevValues,
      [`${label}FromDate`]: date,
    }));
  };

  const handleToDateChange = (label, date) => {
    setFilterValues((prevValues) => ({
      ...prevValues,
      [`${label}ToDate`]: date,
    }));
  };

  return (
    <Dialog fullWidth maxWidth="md" open={isFilterOpen} onClose={handleFilterClose}>
      <DialogTitle>Filter Options</DialogTitle>
      <DialogContent style={{ scale: "0.9" }}>
        
        <Stack direction="row" spacing={4}>
          <Grid item xs={10} md={2} display={"flex"} alignItems={"center"} gap={"10px"}>
            <InputLabel style={{ fontSize: "12px" }}> City</InputLabel>
            <MultipleSelectCheckmarks
              label="Select City"
              setPersonName={setPersonName}
              personName={personName}
              names={cities}
            />
          </Grid>
          <Grid item xs={10} md={2} display={"flex"} alignItems={"center"} gap={"10px"}>
            <InputLabel> Employment status</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              name="employeeStatus"
              value={filterValues.employeeStatus}
              label="Age"
              onChange={handleChange}
            >
              {" "}
              <MenuItem value={"All"}>All</MenuItem>
              <MenuItem value={"Salaried"}>Salaried</MenuItem>
              <MenuItem value={"Self Employed Business"}>Self Employed Business</MenuItem>
              <MenuItem value={"No Status"}>No Status</MenuItem>
            </Select>
          </Grid>
        </Stack>

        <InputLabel style={{ marginTop: "15px" }}> Select Via Status</InputLabel>
        <Stack direction="row" spacing={4}>
          <Grid item xs={10} md={2} display={"flex"} alignItems={"center"} gap={"10px"}>
            <InputLabel> Whatsapp Status</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              name="whatsappStatus"
              value={filterValues.whatsappStatus}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={"All"}>All</MenuItem>
              <MenuItem value={"Fresh"}>Fresh</MenuItem>
              <MenuItem value={"Used"}>Used</MenuItem>
              <MenuItem value={"No Status"}>No Status</MenuItem>

            </Select>
          </Grid>
          <Grid item xs={10} md={2} display={"flex"} alignItems={"center"} gap={"10px"}>
            <InputLabel> Date</InputLabel>
            <DatePicker
              label="From"
              value={filterValues.whatsappFromDate}
              onChange={(date) => handleDateChange("whatsapp", date)}
            />
          </Grid>
          <Grid item xs={10} md={2} display={"flex"} alignItems={"center"} gap={"10px"}>
            <InputLabel> Date</InputLabel>
            <DatePicker
              label="To"
              value={filterValues.whatsappToDate}
              onChange={(date) => handleToDateChange("whatsapp", date)}
            />
          </Grid>
        </Stack>
        <Stack style={{ marginTop: "15px" }} direction="row" spacing={4}>
          <Grid item xs={10} md={2} display={"flex"} alignItems={"center"} gap={"10px"}>
            <InputLabel> SMS Status</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              name="smsStatus"
              value={filterValues.smsStatus}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={"All"}>All</MenuItem>
              <MenuItem value={"Fresh"}>Fresh</MenuItem>
              <MenuItem value={"Used"}>Used</MenuItem>
              <MenuItem value={"No Status"}>No Status</MenuItem>

            </Select>
          </Grid>
          <Grid item xs={10} md={2} display={"flex"} alignItems={"center"} gap={"10px"}>
            <InputLabel> Date</InputLabel>
            <DatePicker
              label="From"
              value={filterValues.smsFromDate}
              onChange={(date) => handleDateChange("sms", date)}
            />
          </Grid>
          <Grid item xs={10} md={2} display={"flex"} alignItems={"center"} gap={"10px"}>
            <InputLabel> Date</InputLabel>
            <DatePicker
              label="To"
              value={filterValues.smsToDate}
              onChange={(date) => handleToDateChange("sms", date)}
            />
          </Grid>
        </Stack>
        <Stack style={{ marginTop: "15px" }} direction="row" spacing={4}>
          <Grid item xs={10} md={2} display={"flex"} alignItems={"center"} gap={"10px"}>
            <InputLabel> Calling Status</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              name="callingStatus"
              value={filterValues.callingStatus}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={"All"}>All</MenuItem>
              <MenuItem value={"Fresh"}>Fresh</MenuItem>
              <MenuItem value={"Used"}>Used</MenuItem>
              <MenuItem value={"No Status"}>No Status</MenuItem>

            </Select>
          </Grid>
          <Grid item xs={10} md={2} display={"flex"} alignItems={"center"} gap={"10px"}>
            <InputLabel> Date</InputLabel>
            <DatePicker
              label="From"
              value={filterValues.callingFromDate}
              onChange={(date) => handleDateChange("calling", date)}
            />
          </Grid>
          <Grid item xs={10} md={2} display={"flex"} alignItems={"center"} gap={"10px"}>
            <InputLabel> Date</InputLabel>
            <DatePicker
              label="To"
              value={filterValues.callingToDate}
              onChange={(date) => handleToDateChange("calling", date)}
            />
          </Grid>
        </Stack>

        <InputLabel style={{ marginTop: "15px" }}> Select Via Bank Status</InputLabel>
        <Stack direction="row" spacing={4}>
          <Grid item xs={10} md={2} display={"flex"} alignItems={"center"} gap={"10px"}>
            <InputLabel> Axis Bank Status</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              name="axisBankStatus"
              value={filterValues.axisBankStatus}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={"All"}>All</MenuItem>
              <MenuItem value={"APPROVED"}>Approved</MenuItem>
              <MenuItem value={"DECLINED"}>Declined</MenuItem>
              <MenuItem value={"No Status"}>No Status</MenuItem>

            </Select>
          </Grid>
          <Grid item xs={10} md={2} display={"flex"} alignItems={"center"} gap={"10px"}>
            <InputLabel> SBI Bank Status</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              name="sbiBankStatus"
              value={filterValues.sbiBankStatus}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={"All"}>All</MenuItem>
              <MenuItem value={"APPROVED"}>Approved</MenuItem>
              <MenuItem value={"DECLINED"}>Declined</MenuItem>
              <MenuItem value={"No Status"}>No Status</MenuItem>

            </Select>
          </Grid>
         
        </Stack>
        
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => {
            resetFilters();
          }}
          color="primary"
        >
          Reset
        </Button>
        <Button
          onClick={() => {
            setFilterOpen(false);
          }}
          color="primary"
        >
          Cancel
        </Button>
        <Button onClick={handleFilterOptionClick} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterPop;
