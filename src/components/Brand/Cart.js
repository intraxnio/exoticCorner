import React, { useEffect, useState } from 'react';
import { Grid, Box, Stack, Button, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearCart } from "../../store/cartSlice";
import { useDispatch } from "react-redux";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';









export default function CartPage() {
  const user = useSelector(state => state.brandUser);
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const [userDetails, setUserDetails] = useState({});
  // const baseUrl = "http://localhost:8000/api";
  const [errorMessage, setErrorMessage] = useState("");
  const [payeeMobile, setPayeeMobile] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();







  const getBrandAddress = (async () => {

    try {
      axios.post("/api/brand/get-brand-details", {brand_id : user.brand_id}).then(catResult => {
  
        setUserDetails(catResult.data.data);
  
      }).catch(er => {
        // Handle error
      });
    } catch (error) {
      console.error(error);
    }
  });

  const getTotalValue = () => {
    const total = cart.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
    setTotalAmount(total);
  };

  useEffect(() => {
    if (!user.brand_id) {
      navigate("/");
    }

    getBrandAddress();
    getTotalValue();
    

  }, [cart]);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setPayeeMobile(inputValue);

    if (inputValue.length !== 10) {
      setErrorMessage('Please enter a 10-digit mobile number');
    } else {
      setErrorMessage('');
    }
  };

  const createInvoice = async (e) => {
    e.preventDefault();

    const mobileRegex = /^\d{1,10}$/;


if(!mobileRegex.test(payeeMobile)){
        toast.warning("Invalid Mobile Number");
      }

      else {

        setLoading(true);

       await getTotalValue();

        await axios.post("/api/brand/create-new-invoice",
        { brand_id : user.brand_id, payeeName : userDetails.brand_name, payeeMobile : payeeMobile, totalAmount : totalAmount, selectedProducts : cart })
      .then((res) => {

            if(!res.data.invoiceCreated){
                setLoading(false);
                toast.error("Error! Please try again.");

            }
            else if(res.data.invoiceCreated){

                setLoading(false);
                dispatch(clearCart());
                toast.success("Payment Link Sent");
                setTimeout(() => {
                navigate(`/brand/invoices`);

                  
                }, 3000);

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
    <Grid container justifyContent="center" sx={{ marginTop: 5 }}>
      <Grid item xs={12} sm={12} md={10}>
        {cart.length ==0 ? (
           <div
           style={{
             display: "flex",
             flexDirection: "column",
             alignItems: "center",
             justifyContent: "center",
             height: "50vh", // Adjust the height as needed
           }}
         >
           <ShoppingCartOutlinedIcon style={{ fontSize: '60px', marginBottom: '20px', color: '#5D12D2'}}/>
           <div> Cart is empty</div>
         </div>
        ) : (
          <>
                <Box border="1px solid #ccc" borderRadius={1} width={680} marginBottom={2}>
        <Stack sx={{display : 'flex', flexDirection : 'column', paddingY : '12px', paddingLeft : '12px'}}>
        <Typography>Delivery Address :</Typography>
        <Typography>{userDetails.outlet_address}</Typography>
        </Stack>
      </Box>
        <Box border="1px solid #ccc" borderRadius={1} width={680}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>S.No</TableCell>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Weight</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{data.name}</TableCell>
                    <TableCell>{data.min_order} {data.units}</TableCell>
                    <TableCell>{data.quantity}</TableCell>
                    <TableCell>Rs. {data.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box borderTop="1px solid #ccc" padding={2} display="flex" justifyContent="flex-end">
            <Typography>Total: Rs. {cart.reduce((total, data) => total + data.price * data.quantity, 0)}</Typography>
          </Box>

          {userDetails.is_approved ? (
            <Stack>

            <TextField
            sx={{ background : '#FFFFFF', borderColor : '#FFFFFF', width : '200px'}}
            type="text"
            id="payeeMobile"
            // onChange={(e) => {
            //   setPayeeMobile(e.target.value);
            // }}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            label="Buyer Mobile"
            InputLabelProps={{
              shrink: true, // Always show the label above the input
            }}
             placeholder="Buyer Mobile"
             inputProps={{ inputMode: 'numeric' }}
          ></TextField>

                  <Button
                        variant="contained"
                        label="Next"
                        size="medium"
                        endIcon={<ArrowRightAltIcon />}
                        sx={{
                          marginTop: "16px",
                          marginBottom : '16px',
                          maxWidth: "200px",
                        }}
                        onClick={createInvoice}
                      >
                        Send Link
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
          </Stack>


          ) : (
            <Box display="flex" justifyContent="flex-end" p={2}>
            <Button variant="outlined" color="primary" size="medium" onClick={''}>Make Payment</Button>
          </Box>
          )}
          
       
        </Box>
          </>

        )}

      </Grid>
      <ToastContainer autoClose={3000}/>

    </Grid>
  );
}
