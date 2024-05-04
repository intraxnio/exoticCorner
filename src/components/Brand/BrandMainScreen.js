import React, { useEffect, useState} from "react";
import { Grid, Button, Tooltip } from "@mui/material";
import TotalTransactions from "./TotalTransactions";
import TotalTransactionsAmount from "./TotalTransactionAmount";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';








function BrandMainScreen() {



  const user = useSelector(state => state.brandUser);
  const [ balance, setBalance] = useState('');
  const [ authorized, setAuthorized] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  // const baseUrl = "http://localhost:8000/api";




  const fetchData = async () => {
    try {

      const token = Cookies.get('billsBookToken'); // Retrieve the token from cookies

      if(user.brand_id && token){

        await axios.post("/api/brand/get-account-balance",
          { brand_id: user.brand_id },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        ).then((fetchBalance) =>{
          setBalance(fetchBalance.data.balance);
          setAuthorized(true);
          setLoading(false);
  
  
        }).catch((err)=>{
          if (err.response && err.response.status === 401) {
            // Handle 401 error (Unauthorized)
            setAuthorized(false);
            toast.error('Session expired. Please login again.'); // Display toast notification
            setTimeout(() => {
              navigate('/login/brand');
                
              }, 2000);
          } else {
  
            toast.error('Server Error. Please login again.'); // Display toast notification
            navigate('/login/brand');
          }
        })

      }

      else{
        setLoading(false);
        toast.error('Session expired. Please login again.'); // Display toast notification
            setTimeout(() => {
              navigate('/login/brand');
                
              }, 2000);


      }
  
     

    
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle 401 error (Unauthorized)
        console.log('check-3');
        toast.error('Session expired. Please login again.'); // Display toast notification
        // navigate('/login/brand');
      } 
    }
  };

  useEffect(() => {

    fetchData();

  }, []);

  return (
    <>

{loading ? (<CircularProgress />) : (<>

         <div
         style={{
           display: "flex",
           flexDirection: "column",
           flexGrow: 1,
           overflow: "hidden",
         }}
       >
         <div
           style={{
             display: "flex",
             justifyContent: "flex-start",
             marginBottom: "10px",
           }}
         >
          
           <Button
             variant="outlined"
             style={{
               
               textDecoration: "none",
               textTransform: "none",
             }}
             sx={{ paddingX: "20px"}}

           >
             Balance: &nbsp;Rs {balance}
           </Button>
         </div>
 
 
         
       </div>
  
    </>)}
 

      {authorized ? (
        <>
         <Grid
         container
         spacing={1}
         direction="row"
         alignItems="center"
       >
         <Grid
           item
           xs={12}
           sm={12}
           md={4}
           spacing={0}
           direction="column"
           alignItems="center"
           justifyContent="center"
         >
           <TotalTransactions />
         </Grid>
 
         <Grid
           item
           xs={12}
           sm={12}
           md={4}
           spacing={0}
           direction="column"
           alignItems="center"
           justifyContent="center"
         >
         <TotalTransactionsAmount />
         </Grid>
 
         <Grid
           item
           xs={6}
           sm={6}
           md={4}
           container
           spacing={0}
           direction="column"
           alignItems="center"
           justifyContent="center"
         >
         {/* <TotalCompletedCampaigns /> */}
         </Grid>

         </Grid>

         


        </>
       
      ) : (
        <CircularProgress />
      )}

<ToastContainer autoClose= {2000}/>

     
{/* 
        <Grid
          item
          xs={6}
          sm={6}
          md={3}
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <BoxImpressions />
        </Grid> */}
    


      {/* second level components  */}
      {/* <Grid
        container
        spacing={1}
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ marginTop: "64px" }}
      >
        <Grid item xs={12} sm={6} md={5}>
          <Stack
            sx={{
              color: "primary.main",
              height: "500px",
            }}
          >
            <Typography sx={{ marginBottom: "40px" }}>
              Top Followers by Country
            </Typography>
            <ChartsCountry />
          </Stack>
        </Grid>

        <Grid item xs={12} sm={6} md={5}>
          <Stack
            sx={{
              backgroundColor: "#eeeee",
              color: "white",
              height: "500px",
            }}
          >
            <Typography sx={{ color: "primary.main" }}>
              Followers by Gender
            </Typography>
            <GenderChart />
          </Stack>
        </Grid>
      </Grid> */}

      {/* third-level components  */}

      {/* <Grid
        container
        spacing={1}
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ marginTop: "64px" }}
      >
        <Grid item xs={12} sm={6} md={5}>
          <Stack
            sx={{
              color: "primary.main",
              height: "500px",
            }}
          >
            <Typography sx={{ marginBottom: "40px" }}>
              Top Followers by Cities
            </Typography>
            <ChartsCity />
          </Stack>
        </Grid>
        <Grid item xs={6} sm={5} md={5}>
          <Stack
            sx={{
              backgroundColor: "#eeeee",
              color: "white",
              height: "500px",
            }}
          >
            <Typography sx={{ color: "primary.main" }}>
              Followers by Age
            </Typography>
            <AgeChart />
          </Stack>
        </Grid>
      </Grid> */}
    

    </>
  );
}

export default BrandMainScreen;
