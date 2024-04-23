import React, { useState, useEffect } from "react";
import { Typography, Box, Grid, Stack, Button} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { deepOrange, green, purple, blue } from '@mui/material/colors';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";





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


function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const baseUrl = "http://localhost:8000/api";
  const user = useSelector((state) => state.brandUser);
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState({});
  const cart = useSelector((state) => state.cart);
  const [totalCartValue, setTotalCartValue] = useState(0);



  useEffect(() => {
    getBrandProducts();
    calculateTotalCartValue();

  }, [cart, products]);

  const getBrandProducts = (async () => {

    try {
      axios.get("/api/brand/get-brand-products").then(catResult => {
  
        setProducts(catResult.data.data);
  
      }).catch(er => {
        // Handle error
      });
    } catch (error) {
      console.error(error);
    }
  });

  const handleAddToCart = (fruitsData) => {
    dispatch(addToCart({
      product_id: fruitsData._id,
      name: fruitsData.product_name,
      price: fruitsData.price,
      image: fruitsData.product_image,
      units: fruitsData.units,
      min_order : fruitsData.min_order,
      quantity: 1 // Assuming initial quantity is 1
    }));

    setAddedToCart(prevState => ({
      ...prevState,
      [fruitsData._id]: true
    }));
    toast.success('Added to cart');
  };

  const calculateTotalCartValue = () => {
    let totalValue = 0;
    cart.forEach(item => {
      const fruit = products.find(fruit => fruit._id === item.product_id);
      if (fruit) {
        totalValue += parseFloat(fruit.price) * item.quantity;
      }
    });
    setTotalCartValue(totalValue.toFixed(2));
  };






  return (

    <ThemeProvider theme={theme}>
    



      <Button
      startIcon = { < ShoppingCartOutlinedIcon />}
      variant="outlined"
      color="primary"
      onClick={''}
      sx={{ color: deepOrange[500], marginBottom : '12px'}}
      style={{
        cursor: 'pointer',
        textDecoration: 'none',
        textTransform: 'none',

      }} 
      >
     Rs. {totalCartValue}
      </Button>


      <Box style={{ height: 'calc(100vh - 200px)', overflowY: 'auto' }}>
<Grid container spacing={2}>
{products.map((fruitsData, index) => (
  <Grid item key={index} xs={12} sm={6} md={4} lg={3} marginTop={1}>
    <Box
      width={250}
      height={400}
      border="1px solid #ccc"
      borderRadius={1}
      textAlign="center"
    >
      <img
        src={fruitsData.product_image}
        alt={fruitsData.product_name}
        style={{ maxWidth: '100%', maxHeight: '100%', marginBottom: '8px' }}
      />
      <Stack sx={{ display : 'flex', flexDirection : 'row', marginLeft : '12px' }}>
      <Typography sx={{fontSize : '18px', paddingRight : '6px'}}>{fruitsData.product_name}</Typography>
      <Typography sx={{fontSize : '18px'}}> - {fruitsData.min_order}{fruitsData.units}</Typography>
      </Stack>

      <Typography sx={{fontSize : '18px', display : 'flex', justifyContent : 'flex-start', marginTop : '6px', marginLeft : '12px'}}>Rs. {fruitsData.price}</Typography>


{cart.find(item => item.product_id === fruitsData._id) ? (
              <Stack sx={{display : 'flex', flexDirection : 'row', alignItems : 'center'}}>
                <Box 
                border="1px solid orange"
                borderRadius={1} 
                sx={{ 
                  paddingX: '16px',
                  paddingY: '4px', 
                  marginTop: '16px', 
                  marginLeft : '12px', 
                  marginRight : '12px',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  textTransform: 'none',
                  color : 'orange'
                 }} 
                onClick={() => handleAddToCart(fruitsData)}>
                  -
                </Box>
                <div style={{ marginTop: '8px', marginRight : '12px', fontWeight : '500'}}variant="outlined">{cart[index].quantity}</div>
                
                <Box 
                border="1px solid orange"
                borderRadius={1} 
                sx={{ 
                  paddingX: '14px',
                  paddingY: '4px', 
                  marginTop: '16px', 
                  cursor: 'pointer',
                  textDecoration: 'none',
                  textTransform: 'none',
                  color : 'orange' }} 
                onClick={() => handleAddToCart(fruitsData)}>
                  +
                </Box>
              </Stack>
            ) : (
              <Button variant="outlined" color="primary" size="medium" style={{ marginTop: '16px' }} onClick={() => handleAddToCart(fruitsData)}>Add to Cart</Button>
            )}
    </Box>
  </Grid>
))}
</Grid>

</Box>


<ToastContainer autoClose= {2000}/>


</ThemeProvider>
  );
}

export default ProductList;
