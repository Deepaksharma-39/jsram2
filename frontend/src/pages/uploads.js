import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import {
  Box,
  Checkbox,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  Stack,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CustomersTable } from "src/sections/customer/customers-table";
import { CustomersSearch } from "src/sections/customer/customers-search";
import { Button, Col, FormGroup, Input, Row } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { compareDataArrays, updateInDB } from "src/utils/upload-data";
import { read, utils } from "xlsx";
import { useDataContext } from "src/contexts/data-context";
import { height } from "@mui/system";
import axios from "axios";

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [count, setCount] = useState(0);
  const [value, setValue] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadData, setUploadData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { data } = useDataContext();
  const [fileName,setFilename]=useState("");
  const [progress, setProgress] = useState(0);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const readUploadFile = (e) => {
    e.preventDefault();
    setUploadData([]);
    setPage(0);
    setRowsPerPage(5);
    setValue([]);
  
    if (e.target.files) {
      setLoading(true); // Setting loading state when file reading process starts
      const file = e.target.files[0];
      setSelectedFile(file);
      setFilename(file.name)
      setLoading(false);
    } else {
      alert("Failed to upload file");
      setLoading(false); // Setting loading state in case of failure
    }
  };


// Inside your file processing function
const fetchExcelDataFromServer = async (fileName) => {
  try {
    const encodedFileName = encodeURIComponent(fileName).replace(/ /g, '*');
    const response = await axios.get(`http://localhost:5000/excel/download/${encodedFileName}`, { responseType: 'blob' });

    console.log('Response type:', response.headers['content-type']);
    console.log('File name:', fileName);
    console.log('File size:', response.data.size);
    console.log('Fetched successfully');
    return response.data;
  } catch (error) {
    console.error('Error fetching file:', error);
    throw new Error('Failed to fetch file from server');
  }
};

const formatExcelData = async (blob) => {
  try {
    const fileData = [];
    let isFirstChunk = true; // Flag to track if it's the first chunk
    let keys = [];

    const totalSize = blob.size;
    let processedSize = 0;
    const chunkSize = 1024 * 1024; // 1MB chunk size
    let offset = 0;

    while (offset < blob.size) {
      const chunk = blob.slice(offset, offset + chunkSize);
      const arrayBuffer = await new Response(chunk).arrayBuffer();

      try {
        const workbook = read(new Uint8Array(arrayBuffer), { type: 'array' });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const rows = utils.sheet_to_json(worksheet, { header: 1, raw: true }); // Parse headers as the first row

        if (isFirstChunk) {
          keys = rows[0]; // Take keys from the first row of the first chunk
          isFirstChunk = false;
        }

        // Skip the first row (headers) and loop through the rest of the rows
        for (let i = 1; i < rows.length; i++) {
          const rowData = {};
          const row = rows[i];
          for (let j = 0; j < keys.length; j++) {
            rowData[keys[j]] = row[j]; // Assign each value to its corresponding key
          }
          fileData.push(rowData); // Push the row data to fileData array
        }
      } catch (error) {
        console.error('Error reading workbook:', error);
      }

      processedSize += chunk.size;
      const currentProgress = (processedSize / totalSize) * 100;
      setProgress(currentProgress);
      offset += chunkSize;
    }

    return fileData;
  } catch (error) {
    console.error('Error formatting Excel data:', error);
    throw new Error('Failed to format Excel data');
  }
};


const readUploadFileFromServer = async () => {
  try {
    setLoading(true); // Set loading state when fetching file starts
    const blob = await fetchExcelDataFromServer(fileName);
   

    try {
      const formattedData = await formatExcelData(blob);
      console.log(formattedData);
      setUploadData(formattedData);
      setValue(formattedData);
      setCount(formattedData.length);
      setProgress(100); // File processing complete
      // Do something with formatted data
    } catch (error) {
      console.error('Error formatting Excel data:', error);
      // Handle error
    }
    


  } catch (error) {
    console.error('Error fetching file:', error);
    alert("Failed to upload file");
  } finally {
    setLoading(false);
  }
};
  
  const removeFile = () => {
    setSelectedFile(null);
    setValue([]);
    window.location.reload();
  };

  const handleDBUpload = async () => {
    setLoading(true);
    // console.log(data.length,value.length)
    // const result = compareDataArrays(data, value);
    try {
      const res = await updateInDB(value);
      setLoading(false);
      // window.location.href = '/';
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };


  const testUpload = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', selectedFile);
  
      const response = await axios.post(`http://localhost:5000/excel/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('File uploaded successfully:', response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error posting data for verification:', error);
    }
    finally{
      setLoading(false);
    }
  };

  const uploadAndCompare= async ()=>{

      await testUpload();
      await readUploadFileFromServer();
  }

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
        {loading ? (
          <Box
            sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Container maxWidth="xl">
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between" spacing={4}>
                <Stack spacing={1}>
                  <Typography variant="h4">Upload Data</Typography>
                  <Stack alignItems="center" direction="row" spacing={1}>
                    <Row>
                      <Col
                        md="16 text-left"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "flex-start",
                          gap: "10px",
                        }}
                      >
                        <FormGroup>
                          <Input
                            id="inputEmpGroupFile"
                            name="file"
                            type="file"
                            onChange={readUploadFile}
                            accept=".csv"
                          />
                        </FormGroup>
                        {(
                         <>
                          <Button
                            disabled={loading}
                            color="success"
                            onClick={ () => {
                              uploadAndCompare();
                            }}
                          >
                            {"Upload"}
                          </Button>
                          <Button
                            disabled={loading}
                            color="success"
                            onClick={ () => {
                              handleDBUpload();
                            }}
                          >
                            {"Save"}
                          </Button>
                         </>
                        )}
                      </Col>
                      <Col md="6 text-left">
                        {" "}
                        {selectedFile?.name && (
                          <Button disabled={loading} color="warning" onClick={removeFile}>
                            {"Reset"}
                          </Button>
                        )}{" "}
                      </Col>
                    </Row>
                  </Stack>
                </Stack>
              </Stack>

              {
                <CustomersTable
                  count={count}
                  items={value}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  page={page}
                  rowsPerPage={rowsPerPage}
                />
              }
            </Stack>
          </Container>
        )}
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
