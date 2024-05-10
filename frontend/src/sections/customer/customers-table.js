import PropTypes from "prop-types";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";

export const CustomersTable = (props) => {
  const {
    loading,
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
  } = props;

  let keys;
  if (items?.length > 0) {
    keys = Object.keys(items[0]);
  } else {
    keys = [];
  }

  if (items?.length > 0) {
    let paginatedData;
    if (items.length > 5) {
      paginatedData = items.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
    } else {
      paginatedData = items;
    }

    return (
      <Card>
        <Scrollbar>
          <Box sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  {items.length > 0
                    ? keys.map((key) => {
                        // Exclude keys "_id", 3, and 4
                        if (
                          key === "_id" ||
                          key === "__v" ||
                          key === "createdAt" ||
                          key === "updatedAt"
                        ) {
                          return null;
                        }
                        return <TableCell key={key}>{key}</TableCell>;
                      })
                    : ""}
                </TableRow>
              </TableHead>
              <TableBody sx={{ fontSize: "10px" }}>
                {items.map((item, id) => (
                  <TableRow key={id}>
                    {keys.map(
                      (key, index) =>
                        // Exclude keys "_id", 3, and 4
                        key !== "_id" &&
                        key !== "__v" &&
                        key !== "createdAt" &&
                        key !== "updatedAt" && (
                          <TableCell
                            key={index}
                            sx={{
                              maxHeight: "30px",
                              maxWidth: "320px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              "&:hover": {
                                whiteSpace: "normal",
                                overflow: "visible",
                                textOverflow: "inherit",
                                zIndex: 9999,
                                position: "relative",
                                backgroundColor: "#fff", // Add background color for better visibility
                                // Optionally, you can add more styling here for better hover display
                              },
                            }}
                          >
                            {item[key]}
                          </TableCell>
                        )
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Scrollbar>
        <TablePagination
          component="div"
          count={count}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 50, 100]}
        />
      </Card>
    );
  } else {
    return (
      <Card>
        <Scrollbar>
          <Box sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell key={null}>{""}</TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </Box>
        </Scrollbar>
      </Card>
    );
  }
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
