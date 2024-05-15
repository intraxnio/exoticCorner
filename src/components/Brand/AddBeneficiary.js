import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Stack,
  Box,
  Grid,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Accordion,
  AccordionSummary,
  FormControl,
InputLabel,
Select,
MenuItem,
  Paper, AccordionDetails, DialogActions, DialogContent, Typography, Alert, AlertTitle, RadioGroup,
  FormControlLabel,
  Radio
} from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import axios from "axios";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import CircularProgress from '@mui/material/CircularProgress';
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useTheme from '@mui/system/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery';



// import dayjs from 'dayjs';
// import samplePost from '../../images/IMG_2533.jpg'


function AddBeneficiary() {


  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [beneficiaryMobile, setBeneficiaryMobile] = useState("");
  const [bankAccountNo, setBankAccountNo] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const user = useSelector((state) => state.brandUser);
  const [showAlert, setShowAlert] = useState(false);
  const baseUrl = "http://localhost:8000/api";
  const [errorMessage, setErrorMessage] = useState("");
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));





  const getBrandProducts = (async () => {

    try {
      axios.post(baseUrl + "/brand/get-brand-products", { userId : user.brand_id}).then(catResult => {
  
        setProducts(catResult.data.data);
  
      }).catch(er => {
        // Handle error
      });
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
   
    getBrandProducts();
 
  }, []);

  useEffect(() => {
    // Calculate total amount whenever selectedProducts change
    const total = selectedProducts.reduce((acc, product) => {
      return acc + product.unit_price * product.quantity;
    }, 0);
    setTotalAmount(total);
  }, [selectedProducts]);

  

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setBeneficiaryMobile(inputValue);

    if (inputValue.length !== 10) {
      setErrorMessage('Please enter a 10-digit mobile number');
    } else {
      setErrorMessage('');
    }
  };


  const handleBackClick = () => {
    navigate(`/brand/payouts`);

  };


  const createInvoice = async (e) => {
    e.preventDefault();

    const mobileRegex = /^\d{1,10}$/;


    if(!beneficiaryName || !beneficiaryMobile || !bankAccountNo || !ifscCode){
        toast.warning("Enter All Details");
      }

      else if(!mobileRegex.test(beneficiaryMobile)){
        toast.warning("Invalid Mobile Number");
      }

      else {

        setLoading(true);

        await axios.post(baseUrl + "/brand/create-new-beneficiary",
        { brand_id : user.brand_id, beneficiaryName: beneficiaryName, beneficiaryMobile : beneficiaryMobile, bankAccountNo : bankAccountNo, ifscCode : ifscCode })
      .then((res) => {

            if(!res.data.beneficiaryCreated){
                setLoading(false);
                toast.error("Error! Please try again.");

            }
            else if(res.data.beneficiaryCreated){
                
                setLoading(false);
                toast.success("Beneficiary Added");
                setTimeout(() => {
                navigate(`/brand/payouts`);

                    
                }, 1500);

                  }

      })
      .catch((err) => {

        setLoading(false);
        if (err.response && err.response.data.message === "Recurring digits in customer contact are disallowed") {
          toast.warning("Invalid Mobile Number");
        } 
        
        else {
          toast.error("An error occurred. Please try again later.");
        }
      });

    }

    
  };


  return (
    <>
   <Button startIcon={<KeyboardBackspaceIcon />} onClick={handleBackClick}>Back</Button>

        <Grid container sx={{ paddingBottom : '60px', overflowY: 'auto'}}>

                <Grid item xs={12} sm={10} md={8}>
                    <Box
                      display="flex"
                      flexDirection={"column"}
                      maxWidth={600}
                      margin="auto"
                      padding={1}
                    >

                      <TextField
                        sx={{ background : '#FFFFFF', borderColor : '#FFFFFF'}}
                        type="text"
                        id="beneficiaryName"
                        onChange={(e) => {
                          setBeneficiaryName(e.target.value);
                        }}
                        margin="normal"
                        variant="outlined"
                        label="Beneficiary Name"
                       
                         placeholder="Beneficiary Name"
                      ></TextField>

                    <TextField
                        sx={{ background : '#FFFFFF', borderColor : '#FFFFFF'}}
                        type="text"
                        id="beneficiaryMobile"
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        label="Beneficiary Mobile"
                         placeholder="Beneficiary Mobile"
                         inputProps={{ inputMode: 'numeric' }}
                      ></TextField>

                      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                      <TextField
                        sx={{ background : '#FFFFFF', borderColor : '#FFFFFF'}}
                        type="text"
                        id="bankAccount"
                        onChange={(e) => {
                          setBankAccountNo(e.target.value);
                        }}
                        margin="normal"
                        variant="outlined"
                        label="Bank Account Number"
                         placeholder="Bank Account Number"
                         inputProps={{ inputMode: 'numeric' }}
                      ></TextField>

                      <TextField
                        sx={{ background : '#FFFFFF', borderColor : '#FFFFFF', marginBottom : '16px'}}
                        type="text"
                        id="ifscCode"
                        onChange={(e) => {
                          setIfscCode(e.target.value);
                        }}
                        margin="normal"
                        variant="outlined"
                        label="IFSC Code"
                         placeholder="IFSC Code"
                      ></TextField>

                    
                    <ToastContainer autoClose={3000}/>
                    

                      <Button
                        variant="contained"
                        label="Next"
                        size="large"
                        endIcon={<ArrowRightAltIcon />}
                        sx={{
                          marginTop: "30px",
                          maxWidth: "250px",
                        }}
                        onClick={createInvoice}
                      >
                        Add Beneficiary
                        {loading && (
                <CircularProgress
                  size={24}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: -12, // Center the CircularProgress
                    marginLeft: -12, // Center the CircularProgress
                  }}
                />
              )}
                      </Button>

                      {/* {loading && (
          <CircularProgress size={24} sx={{ marginLeft: '10px' }} /> // Include a material icon here
        )} */}
                    </Box>
                </Grid>

                <Grid item xs={4}>
              </Grid>

        </Grid>



{showAlert && (
  <Alert
    severity="error"
    style={{
      position: "fixed",
      top: "5%",
      left: "50%",
      transform: "translateX(-50%)",
    }}
    onClose={()=>{setShowAlert(false)}}
  >
    <AlertTitle>Error</AlertTitle>
    {errorMessage}
  </Alert>
)}

    
    </>
  );

  
}

export default AddBeneficiary;
