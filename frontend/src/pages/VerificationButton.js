import React from 'react';
import Button from '@mui/material/Button';
import { useDataContext } from 'src/contexts/data-context';
import axios from 'axios';

const VerificationButton = () => {
  const { data } = useDataContext();

  const handleVerifyButtonClick = async () => {
    try {
      await axios.post('http://jsram.aifuturevision.in:5000/storeData', data);
      console.log('Data posted to server for verification');
    } catch (error) {
      console.error('Error posting data for verification:', error);
    }
  };

  return (
    <Button onClick={handleVerifyButtonClick} variant="contained" color="secondary">
      Verify Data
    </Button>
  );
};

export default VerificationButton;
