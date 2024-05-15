import React, { useState, useEffect, useRef } from "react";
// import { format } from 'date-fns-tz';
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";
import { Button, TableContainer, Card, ClickAwayListener, CardActions, Stack, Grid, Dialog, DialogTitle, DialogContent, DialogActions,
Box, Select, MenuItem, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
import { deepOrange, green, purple, blue } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SendIcon from '@mui/icons-material/Send';
import dayjs from 'dayjs';
import Cookies from 'js-cookie';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);




const theme = createTheme({
  palette: {
    primary: {
      main: deepOrange[500],
    },
    secondary: {
      main: green[500],
    },
    warning: {
      main: purple[500],
    },
    info: {
      main: blue[500],
    },
  },
});






export default function Payouts() {

  const navigate = useNavigate();
  const user = useSelector((state) => state.brandUser);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [rowCountState, setRowCountState] = React.useState(0);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [openProd, setOpenProd] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [ authorized, setAuthorized] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [accountBalance, setAccountbalance] = useState(0);
  const [amountToSend, setAmountToSend] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('IMPS');
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedBeneficiaryId, setSelectedBeneficiaryId] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newMobile, setNewMobile] = useState('');
  const [newBankAccount, setNewBankAccount] = useState('');
  const [newIfsc, setNewIfsc] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const baseUrl = "http://localhost:8000/api";


  const handleClickAway = () => {
    //this function keeps the dialogue open, even when user clicks outside the dialogue. dont delete this function
  };

  const handleOpenDialog = (rowData) => {

    setNewName(rowData.beneficiaryName);
    setNewMobile(rowData.beneficiaryMobile);
    setNewBankAccount(rowData.bankAccount);
    setNewIfsc(rowData.bankIfsc);
    setSelectedBeneficiaryId(rowData.beneficiaryId);
    setIsDialogOpen(true); // Open the dialog

};

const handleOpenDeleteDialog = (rowData) => {

  setSelectedBeneficiaryId(rowData.beneficiaryId);
  setNewName(rowData.beneficiaryName);
  setIsDeleteDialogOpen(true);

};

const handleChangeMobile = (e) => {
  const inputValue = e.target.value;
  setNewMobile(inputValue);

  if (inputValue.length !== 10) {
    setErrorMessage('Please enter a 10-digit mobile number');
  } else {
    setErrorMessage('');
  }
};


const handleCloseDialog = () => {
  setIsDialogOpen(false); // Close the dialog
};

const handleCloseDeleteDialog = () => {
  setIsDeleteDialogOpen(false); // Close the dialog
};


  function formatNumber(number) {
    return number.toFixed(2); // Display balance with two digits after decimal
  }

  const updateBeneficiaryDetails = () => {
    axios.post(baseUrl + "/brand/update-beneficiaryDetails", {
      brand_id: user.brand_id,
      beneficiary_id: selectedBeneficiaryId,
      beneficiary_name: newName,
      beneficiary_mobile: newMobile,
      beneficiary_bank_account: newBankAccount,
      beneficiary_ifsc: newIfsc,
    })
    .then((ress) => {
      if (ress.data.updated) {
          toast.success("Details Updated");
          fetchData();
          handleCloseDialog();
      } else if (!ress.data.success) {
          toast.success("Update failed");
      }
    })
    .catch((e) => {
      // Handle error
    });
};

const handleDeleteAccept = () => {
  axios.post(baseUrl + "/brand/delete-beneficiary", {
      brand_id: user.brand_id,
      beneficiary_id: selectedBeneficiaryId,

    })
    .then((ress) => {
      if (ress.data.deleted) {
        toast.success("Beneficiary Deleted Successfully");
        fetchData();
        setIsDeleteDialogOpen(false);

      } else if (!ress.data.deleted) {
        toast.warning("Please try again later");
       
      }
    })
    .catch((e) => {
      // Handle error
    });
};



  const calculateSerialNumber = (index) => {
    // Calculate serial number based on current page and page size
    return paginationModel.page * paginationModel.pageSize + index;
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
  };


  const handleChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleChangeAmount = (e) => {
    const inputValue = e.target.value;
    setAmountToSend(inputValue);

    if (inputValue >= 200000) {
      setErrorMessage('Limit: Rs. 1,99,999.00 per transfer');
    }

    else if (inputValue <= 0) {
      setErrorMessage('Enter Valid Amount');
    }

    else {
      setErrorMessage('');
    }
  };





const fetchDataFromServer = async (page, pageSize) => {

  try {


    const token = Cookies.get('billsBookToken');
    const response = await axios.post(baseUrl + "/brand/all-beneficiaries", 
    { brand_id: user.brand_id, page: page, pageSize: pageSize },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if(response.data){

    const { data, totalRowCount } = response.data;
    setRowCountState(totalRowCount || 0);
    setHasMore(data.length > 0);
    setAuthorized(true);
    setIsLoading(false);
    return { rows: data, pageInfo: { totalRowCount } };

    }

    else{
      
      setAuthorized(false);
      setIsLoading(false);
      toast.error('Session expired. Please login again.'); // Display toast notification
      setTimeout(() => {
        navigate('/login/brand');
          
        }, 1500);
      return { rows: [], pageInfo: { totalRowCount: 0 } };

    }
    

  } catch (error) {

    setAuthorized(false);
    setIsLoading(false);
    toast.error('Session expired. Please login again.'); // Display toast notification
    setTimeout(() => {
      navigate('/login/brand');
        
      }, 1500);
    return { rows: [], pageInfo: { totalRowCount: 0 } };
  }
};


const fetchData = async () => {
  setIsLoading(true);
  try {

    if(isSmallScreen){

      const { rows: fetchedRows, pageInfo } = await fetchDataFromServer(page, pageSize);
      setRows(fetchedRows);
      setRowCountState(pageInfo.totalRowCount || 0);

    }
    
    else{
    const { rows: fetchedRows, pageInfo } = await fetchDataFromServer(paginationModel.page, paginationModel.pageSize);
    setRows(fetchedRows);
    setRowCountState(pageInfo.totalRowCount || 0);
    }

  } catch (error) {
    console.log('error:::', error);
    setRows([]);
    setRowCountState(0);
    setIsLoading(false);
    toast.warning("Server is busy, try again later.");
  } finally {
    setIsLoading(false);
  }
};


const loadMoreData = async () => {
  setIsLoading(true);
  try {

      const nextPage = page + 1;
      const { rows: fetchedRows } = await fetchDataFromServer(nextPage, pageSize);
      setRows(prevRows => [...prevRows, ...fetchedRows]);
      

  } catch (error) {
    
    setRows([]);
    setRowCountState(0);
    setIsLoading(false);
    toast.warning("Server is busy, try again later.");
  } finally {
    setIsLoading(false);
  }
};
  

  
  useEffect(() => {

      fetchData();

  }, [paginationModel]);



  const addBeneficiary = async (e) => {
    e.preventDefault();

          navigate("/brand/addBeneficiary");

  };

  const sendMoney = async (beneficiary_id) => {

    try {

        setLoading(true);

          axios.post(baseUrl + "/brand/check-balance", {
          userId: user.brand_id,
        }).then((ress) => {

          if(ress.data.balance){

            setAccountbalance(formatNumber(ress.data.balance));
            setSelectedBeneficiaryId(beneficiary_id);
            setLoading(false);
            handleClickOpen();

          }

          else{
            setLoading(false);
            setAccountbalance(0);
            
          }
        })
        .catch((e) => {
          toast.error("Server Error. Please try again later.");
         
        });
  
  
      } catch (error) {
        toast.error("Server Error. Please try again later.");
       
      }



  };



  

  const columns = [
    { 
      field: 'id', 
      headerName: 'S.No', 
      width: 60,
      renderCell: (params) => calculateSerialNumber(params.value),
    },

  
    { 
      field: 'beneficiaryName', 
      headerName: 'Name', 
      width: 140,
      renderCell: (params) => (
        <div>
          <div style={{ whiteSpace: 'pre-wrap' }}>
            {params.value.length > 45
              ? params.value.substr(0, 45) + '...'
              : params.value}
          </div>
        </div>
      ),
    },

    { 
      field: 'beneficiaryMobile', 
      headerName: 'Mobile Number', 
      width: 140,
      renderCell: (params) => (
        <div>
          <div style={{ whiteSpace: 'pre-wrap' }}>
            {params.value.length > 45
              ? params.value.substr(0, 45) + '...'
              : params.value}
          </div>
        </div>
      ),
    },
  

    { 
      field: 'bankAccount', 
      headerName: 'Bank Account', 
      width: 180,
      renderCell: (params) => (
        <div>
          <div style={{ whiteSpace: 'pre-wrap' }}>
            {params.value}
          </div>
        </div>
      ),
    },

    { 
      field: 'bankIfsc', 
      headerName: 'IFSC', 
      width: 130,
      renderCell: (params) => (
        <div>
          <div style={{ whiteSpace: 'pre-wrap' }}>
            {params.value}
          </div>
        </div>
      ),
    },


    {
      field: "beneficiaryId",
      headerName: "Send Money",
      width: 160,
      renderCell: (params) => (
       
<span style={{ display : 'flex', justifyContent : 'center', alignItems : 'center'}}>
<Button
  endIcon = { < SendIcon />}
  variant="outlined"
  color="secondary"
  onClick={ ()=> sendMoney(params.value)}
  sx={{  color: green[500], cursor: 'pointer', textDecoration: 'none', textTransform: 'none'}}
  >
  Send Money
  </Button>

</span>



      ),
    },


    {
      field: "beneficiaryEdit",
      headerName: "Edit",
      width: 80,
      renderCell: (params) => (
       
<span style={{ display : 'flex', justifyContent : 'center', alignItems : 'center'}}>
<Button
  variant="outlined"
  color="primary"
  onClick={ ()=> handleOpenDialog(params.row)}
  sx={{  color: deepOrange[500], cursor: 'pointer', textDecoration: 'none', textTransform: 'none'}}
  >
  Edit
  </Button>

</span>

      ),
    },
   

    {
      field: "beneficiaryDelete",
      headerName: "Delete",
      width: 100,
      renderCell: (params) => (
       
<span style={{ display : 'flex', justifyContent : 'center', alignItems : 'center'}}>
<Button
  variant="outlined"
  color="secondary"
  onClick={ ()=> handleOpenDeleteDialog(params.row)}
  sx={{  color: deepOrange[500], cursor: 'pointer', textDecoration: 'none', textTransform: 'none'}}
  >
  Delete
  </Button>

</span>

      ),
    },
   

   
  
  
  ];


  return (
<>
<ThemeProvider theme={theme}>


{isSmallScreen ? 

( <Grid sx={{ paddingX : '6px', paddingBottom : '22px'}}>

  <Button
  startIcon = { < PersonAddIcon />}
  variant="outlined"
  color="primary"
  onClick={addBeneficiary}
  sx={{ marginTop: "14px", marginBottom : '16px', color: deepOrange[500], cursor: 'pointer', textDecoration: 'none', textTransform: 'none'}}
  >
  Add Beneficiary
  </Button>

  {isLoading ? ( <CircularProgress
                  size={24}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: -12, // Center the CircularProgress
                    marginLeft: -12, // Center the CircularProgress
                  }}
                />) : (
                  <>


{rows !== null && rows.length !== 0  ? ( 
<>

      {rows.map((invoice, index) => (

<>
        <Card key={index} sx={{ marginBottom : '16px', paddingX : '16px'}}>
          
    <Box sx={{ display : 'flex', flexDirection : 'row', justifyContent: 'space-between', alignItems : 'flex-start', marginBottom : '12px', marginTop : '16px'}}>
  
      <Stack sx={{ display: 'flex', flexDirection : 'column'}}>
      <div className ="card-headings" >Name</div>
      <div className ="card-headings-content" >{invoice.beneficiaryName}</div>
      </Stack>

      <Stack sx={{ display: 'flex', flexDirection : 'column'}}>
      <div className ="card-headings" >Mobile</div>
      <div className ="card-headings-content" >{invoice.beneficiaryMobile}</div>
      </Stack>

    </Box>

    <Box sx={{ display : 'flex', flexDirection : 'row', justifyContent: 'space-between', marginBottom : '16px'}}>

    <Stack sx={{ display: 'flex', flexDirection : 'column'}}>
      <div className ="card-headings" >Bank Account</div>
      <div className ="card-headings-content" >{invoice.bankAccount}</div>
      </Stack>
      
       <Stack sx={{ display: 'flex', flexDirection : 'column'}}>
      <div className ="card-headings">IFSC</div>
      <div className ="card-headings-content" >{invoice.bankIfsc}</div>
      </Stack>


    </Box>

    <Box sx={{ display : 'flex', flexDirection : 'row', justifyContent: 'space-between'}}>

     

  <Button
  variant="outlined"
  color="primary"
  onClick={ ()=> handleOpenDialog(invoice)}
  sx={{ marginBottom : '16px', color: deepOrange[500], cursor: 'pointer', textDecoration: 'none', textTransform: 'none'}}
  >
  Edit
  </Button>


  <Button
  variant="outlined"
  color="primary"
  onClick={ ()=> handleOpenDeleteDialog(invoice)}
  sx={{marginBottom : '16px', color: deepOrange[500], cursor: 'pointer', textDecoration: 'none', textTransform: 'none'}}
  >
  Delete
  </Button>

  <Button
  endIcon = { < SendIcon />}
  variant="outlined"
  color="secondary"
  onClick={sendMoney}
  sx={{ marginBottom : '16px', color: green[500], cursor: 'pointer', textDecoration: 'none', textTransform: 'none'}}
  >
  Send Money
  </Button>


    </Box>

    <CardActions>
     
    </CardActions>
  </Card>

  
      </>
  
      ))}

{ (rows.length < rowCountState) ? ( 
      <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      
      }}
    >
      <Button
      variant="outlined"
      color="info"
      onClick={()=> loadMoreData(true)}
      sx={{ marginTop: "14px", marginBottom: '46px', color: blue[500], width: '80%'}}
      style={{
        cursor: 'pointer',
        textDecoration: 'none',
        textTransform: 'none',
      }} 
      >
      Load More
      </Button>
      </div>) :
      (
       <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      
      }}
    >
      <Button
      variant="outlined"
      color="primary"
      sx={{ marginTop: "14px", marginBottom: '46px', color: deepOrange[500], width: '80%'}}
      style={{
        cursor: 'pointer',
        textDecoration: 'none',
        textTransform: 'none',
      }} 
      >
      End of the list
      </Button>
      </div>
      ) }
      </>
      ) : (
      <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "50vh", // Adjust the height as needed
    }}
  >
    <PersonAddIcon style={{ fontSize: '60px', marginBottom: '20px', color: '#5D12D2'}}/>
    <div> Add New Beneficiary</div>
  </div>
      )}
      </>)}

     

    </Grid>) :(

    <>

<Button
startIcon = { < PersonAddIcon />}
variant="outlined"
color="primary"
onClick={ addBeneficiary}
sx={{ marginBottom: "14px", color: deepOrange[500],  cursor: 'pointer',
textDecoration: 'none',
textTransform: 'none' }}
>
Add Beneficiary
</Button>

<TableContainer sx={{ width : '90%', height : '100vh'}}>

{isLoading ? ( <CircularProgress
                  size={24}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: -12, // Center the CircularProgress
                    marginLeft: -12, // Center the CircularProgress
                  }}
                />) : (
                  <>
                 
                  {rows !== null && rows.length !== 0  ? ( 


<DataGrid
 autoHeight
  rows={rows}
  columns={columns}
  loading={isLoading}
  rowCount={rowCountState}
  paginationModel={paginationModel}
  paginationMode="server"
  pageSizeOptions={[5]}
  onPaginationModelChange={setPaginationModel}
/>) : (
 <div
style={{
display: "flex",
flexDirection: "column",
alignItems: "center",
justifyContent: "center",
height: "50vh", // Adjust the height as needed
}}
>
<PersonAddIcon style={{ fontSize: '60px', marginBottom: '20px', color: '#5D12D2'}}/>
<div> Add New Beneficiary</div>
</div>)
}
</>
             
                )
              } 




    </TableContainer>
    </>
     ) }

         {/* Send Money Dialogue  */}
         <ClickAwayListener onClickAway={handleClickAway}>
         <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" sx={{ marginBottom : '4px'}}>
        Balance: {accountBalance}
      </DialogTitle>
      <DialogContent>
        
        <Select
          labelId="payment-method-label"
          id="payment-method"
          value={paymentMethod}
          onChange={handleChange}
          sx={{ marginRight : '6px', marginBottom : '12px'}}
        >
          <MenuItem value="IMPS">IMPS</MenuItem>
          <MenuItem value="NEFT">NEFT</MenuItem>
          <MenuItem value="RTGS">RTGS</MenuItem>
        </Select>

        <TextField
                        type="text"
                        id="amountSend"
                        onChange={handleChangeAmount}
                        variant="outlined"
                         placeholder="Enter Amount"
                         inputProps={{ inputMode: 'numeric', maxLength: 10 }}
                      ></TextField>
                      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </DialogContent>
      <DialogActions>

        <Button
        variant="outlined"
        color="primary"
        onClick={handleClose}
        sx={{  color: deepOrange[500], cursor: 'pointer', textDecoration: 'none', textTransform: 'none'}}
        >
        Cancel
        </Button>

              <Button
        endIcon = { < SendIcon />}
        variant="outlined"
        color="secondary"
        onClick={ ()=> sendMoney()}
        sx={{  color: green[500], cursor: 'pointer', textDecoration: 'none', textTransform: 'none'}}
        >
        Send
        </Button>
      </DialogActions>
    </Dialog>
    </ClickAwayListener>


   
        <ClickAwayListener onClickAway={handleClickAway}>
          <Dialog
            open={isDialogOpen}
            onClose={handleCloseDialog}
            disableEscapeKeyDown
            keepMounted
          >
            <DialogContent style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft : '32px', paddingRight : '32px' }}>

            <TextField type='text' id="beneficiaryName" onChange={(e)=>{setNewName(e.target.value)}} value= {newName} margin='normal' variant='outlined' label='Beneficiary Name'  InputLabelProps={{
        shrink: true
      }}></TextField>

                    <TextField
                        type="text"
                        id="businessMobile"
                        onChange={handleChangeMobile}
                        variant="outlined"
                        label="Mobile Number"
                        value={newMobile}
                         placeholder="Mobile Number"
                         inputProps={{ inputMode: 'numeric', maxLength: 10 }}
                         InputLabelProps={{
                          shrink: true
                        }}
                      ></TextField>
                      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}


                      <TextField
                        type="text"
                        id="bankAccount"
                        onChange={(e)=>{setNewBankAccount(e.target.value)}}
                        variant="outlined"
                        label="Bank Account"
                        value={newBankAccount}
                         placeholder="Bank Account"
                         inputProps={{ inputMode: 'numeric'}}
                         InputLabelProps={{
                          shrink: true
                        }}
                      ></TextField>

<TextField type='text' id="bankIfsc" onChange={(e)=>{setNewIfsc(e.target.value)}} value= {newIfsc} margin='normal' variant='outlined' label='IFSC'  InputLabelProps={{
        shrink: true
      }}></TextField>



            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  updateBeneficiaryDetails();
                  
                }}
                color="success"
              >
                Update
              </Button>
            </DialogActions>
          </Dialog>
        </ClickAwayListener>


    
        <ClickAwayListener onClickAway={handleClickAway}>
          <Dialog
            open={isDeleteDialogOpen}
            onClose={handleCloseDeleteDialog}
            disableEscapeKeyDown
            keepMounted
          >
            <DialogTitle>Confirmation</DialogTitle>
            <DialogContent>
              Are you sure you want to DELETE beneficiary: <span style={{ fontWeight : 500}}>{newName}</span> ?
            </DialogContent>
            <DialogActions>
              <Button onClick={()=> setIsDeleteDialogOpen(false)} color="primary">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  handleDeleteAccept();
                }}
                color="success"
              >
                YES
              </Button>
            </DialogActions>
          </Dialog>
        </ClickAwayListener>
   
{/* {name dialogue ends} */}

      

      </ThemeProvider>



<ToastContainer autoClose= {2000}/>
    
    </>
  );
}
