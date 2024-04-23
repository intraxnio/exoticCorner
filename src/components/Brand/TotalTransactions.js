import React, { useState, useEffect} from 'react'
import axios from 'axios';
import { Box, Typography, Stack } from '@mui/material';
import { useSelector } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';




function TotalTransactions() {

  const [loading, setLoading] = useState(false);
  const [totalCampaigns, setTotalCampaigns] = useState('');
  const user = useSelector((state) => state.brandUser);
  const baseUrl = "http://localhost:8000/api";





  function formatNumber(number) {
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + "M";
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + "K";
    } else {
      return number.toString();
    }
  }




  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {

        axios.post(baseUrl + "/brand/get-total-transactions", {
          userId: user.brand_id,
        }).then(ress=>{
    
            setTotalCampaigns(formatNumber(ress.data.data));
            setLoading(false);

    
        }).catch(e=>{
    
        })
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
   <>
     <Box sx={{
        backgroundColor: '#3E54AC',
        color: 'white',
        height: '140px',
        width: '300px',
        padding: '10px',
        borderRadius:'10px',
    }}
    > 
        <Typography sx={{ fontSize: '16px'}}>Total Payments</Typography>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {loading ? (
          <CircularProgress size={25} color="warning" />
        ) : (
          <Typography sx={{
            fontSize: '36px',
            textAlign: 'center',
            padding: '20px',
            color: 'orange'
          }}>{totalCampaigns}</Typography>
        )}
      </div>

    </Box>
   </>
  )
}

export default TotalTransactions