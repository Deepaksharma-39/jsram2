import PropTypes from "prop-types";
import ChatBubbleLeftRightIcon from "@heroicons/react/24/solid/ChatBubbleLeftRightIcon";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowRightIcon } from "@mui/x-date-pickers";
import { useState } from "react";
import { filterDataByStatus } from "src/utils/filter-data";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import { handleDownload } from "src/utils/download-data";

export const OverviewWhatsAppData = (props) => {
  const { sx, data } = props;
  const [text,setText]=useState("Used");
  let callingData = filterDataByStatus(data, "WHATS APP", text.toUpperCase());
  const [open, setOpen] = useState(false);
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(100);
  
  const toggle=(text)=>{
    let newText=text==="Used"? "Fresh" :"Used";
    setText(newText);
  }


  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleDownloadWithRange = () => {
    const start = parseInt(from, 10);
    const end = parseInt(to, 10);
    
    if (!isNaN(start) && !isNaN(end) && start <= end) {
      const slicedData = callingData.slice(start - 1, end); // Adjust the index if needed
      handleDownload(slicedData,text);
      handleDialogClose();
    } else {
      alert("Enter Valid Range")
    }
  };
 
  return (
   <>
    <Card sx={sx}>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
            {`whatsapp ${text} Data`}
            </Typography>
            <Typography variant="h4">{callingData?.length}</Typography>
          
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "success.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <ChatBubbleLeftRightIcon />
            </SvgIcon>
          </Avatar>
        </Stack>

        <CardActions sx={{ justifyContent: "space-between" }} style={{ "marginBottom": "-25px" }}>
        <Button
            color="text.secondary"
            endIcon={
              <SvgIcon fontSize="small">
              <ArrowDownOnSquareIcon />
            </SvgIcon>
            }
            size="small"
            variant="caption"
            onClick={handleDialogOpen}
            >
            Download
          </Button>
        <Button
            color="inherit"
            endIcon={
              <SvgIcon fontSize="small">
                <ArrowRightIcon />
              </SvgIcon>
            }
            size="small"
            variant="text"
            onClick={()=>{
              toggle(text);
            }}
          >
               {`View ${text==="Used"?"Fresh":"Used"}`}
          </Button>
        
        </CardActions>
      </CardContent>
    </Card>
    <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle>Enter Range</DialogTitle>
        <DialogContent>
        <DialogContentText>
            Enter the range for downloading data (from and to).
          </DialogContentText>
        <Grid container spacing={2}>

        <Grid item xs={12} md={6}>
              <TextField
                label="From"
                name="from"
                type="number"
                defaultValue={from}
                onChange={(e) => setFrom(e.target.value)}
                fullWidth
              />
            </Grid>
        <Grid item xs={12} md={6}>
              <TextField
                label="To"
                name="to"
                defaultValue={to}
                type="number"
                onChange={(e) => setTo(e.target.value)}
                fullWidth
              />
            </Grid>
        </Grid>
       
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleDownloadWithRange}>Download</Button>
        </DialogActions>
      </Dialog>
   </>
  );
};

OverviewWhatsAppData.propTypes = {
  data: PropTypes.array,
  sx: PropTypes.object,
};
