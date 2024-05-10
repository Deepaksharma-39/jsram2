import { useCallback, useEffect, useRef, useState } from "react";
import Head from "next/head";
import { Box, CircularProgress, Container, Stack, Typography } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CustomersTable } from "src/sections/customer/customers-table";
import { CustomersSearch } from "src/sections/customer/customers-search";
import { Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDataContext } from "src/contexts/data-context";
import { handleDownload } from "src/utils/download-data";
import FilterPop from "src/utils/filter-report";
import axios from "axios";
import { domain } from "src/config";
import {
  getPaginatedResult,
  getPaginatedfilterData,
  getUniqueCities,
  searchAndPaginate,
} from "src/api/api";

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");
  const [personName, setPersonName] = useState([]);
  const [uniqueCity, setUniqueCity] = useState([]);
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [data, setData] = useState(null);
  const [filterValues, setFilterValues] = useState({
    city: uniqueCity,
    whatsappStatus: "All",
    employeeStatus: "All",
    whatsappFromDate: null,
    whatsappToDate: null,
    smsStatus: "All",
    smsFromDate: null,
    smsToDate: null,
    callingStatus: "All",
    callingFromDate: null,
    callingToDate: null,
    axisBankStatus: "All",
    sbiBankStatus: "All",
  });
  const [loading, setLoading] = useState(true);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const handleFilterClose = () => {
    setFilterOpen(false);
  };

  const handleFilterOptionClick = async () => {
    // Use filterValues state to filter your main data

    setPage(1);
    setRowsPerPage(5);
    await getPaginatedfilterData(page, rowsPerPage, filterValues);
  };
  const handleFilterClick = () => {
    setFilterOpen(true);
  };

  const timeoutIdRef = useRef(null);

  const handleSearchChange = async (event) => {
    setSearchTerm(event.target.value);

    // Clear any existing timeout
    clearTimeout(timeoutIdRef.current);

    // Set a new timeout
    timeoutIdRef.current = setTimeout(async () => {
      setPage(0);
      setRowsPerPage(5);
      await searchData(event.target.value);
    }, 2000);
  };

  const searchData = async (query) => {
    try {
      setLoading(true);
      const response = await searchAndPaginate(page, rowsPerPage, query);
      console.log(response.articles);
      setData(response.articles.data);
      setCount(response.articles.metadata.totalCount);
      setLoading(false);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const fetchUniqueCities = async () => {
    const array = [];
    const fetchedData = await getUniqueCities();

    fetchedData.forEach((element) => {
      array.push(element["CITY"]);
      console.log(array);
      setUniqueCity(array);
    });
  };


  useEffect(() => {
    const fetchData = async () => {
      const response = await getPaginatedResult(page + 1, rowsPerPage);
      console.log(response);
      console.log(response.articles.metadata.totalCount);
      setCount(response.articles.metadata.totalCount);
      setData(response.articles.data);
      setLoading(false);
    };

    fetchData();
  }, [page, rowsPerPage]);

  return (
    <>
      <Head>
        <title>Customers | Devias Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 1,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Typography variant="h4">Data Reports</Typography>
              <Stack alignItems="center" direction="row" spacing={1}>
                <CustomersSearch
                  searchTerm={searchTerm}
                  handleSearchChange={handleSearchChange}
                  setData={setData}
                />
                <Button onClick={async()=>{
                  handleFilterClick();
                  await fetchUniqueCities()
                }}>Filter</Button>
              </Stack>
            </Stack>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              {/* <Button
                color="danger"
                disabled={!data}
                onClick={() => {
                  handleDownload(value, "Data");
                }}
              >
                Download
              </Button> */}
            </Stack>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            ) : (
              <CustomersTable
                count={count}
                items={data}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                loading={loading}
              />
            )}
          </Stack>
        </Container>
      </Box>
      <FilterPop
        personName={personName}
        setPersonName={setPersonName}
        filterValues={filterValues}
        setFilterValues={setFilterValues}
        cities={uniqueCity}
        isFilterOpen={isFilterOpen}
        setFilterOpen={setFilterOpen}
        handleFilterClose={handleFilterClose}
        handleFilterOptionClick={handleFilterOptionClick}
      />
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
