import React, { useState, useEffect } from "react";
import { Typography, Box, Grid, Stack, Button} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { removeFromCart } from "../../store/cartSlice";
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

  const handleRemoveFromCart = (productId) => {
    const productIndex = cart.findIndex(item => item.product_id === productId);
    if (productIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[productIndex] = {
        ...updatedCart[productIndex],
        quantity: updatedCart[productIndex].quantity - 1
      };
      if (updatedCart[productIndex].quantity <= 0) {
        updatedCart.splice(productIndex, 1); // Remove the product if quantity is 0 or less
      }
      dispatch(removeFromCart({ productId }));
      setAddedToCart(updatedCart.reduce((acc, item) => {
        acc[productId] = true;
        return acc;
      }, {}));
      toast.success('Removed from cart');
    }
  };
  
  const goToCartScreen = ()=> {
    navigate('/brand/cart');
  }
  

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
      onClick={()=>{ goToCartScreen()}}
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
<Grid container spacing={2} sx={{ marginBottom : '46px'}}>
{products.map((fruitsData, index) => (
  <Grid item key={index} xs={6} sm={6} md={3} lg={2} marginTop={1}>
    <Box
      width="100%"
      height="100%"
      border="1px solid #ccc"
      borderRadius={1}
      textAlign="center"
    >
    <img
      src={fruitsData.product_image}
      alt={fruitsData.product_name}
      style={{ maxWidth: '100%', maxHeight: '100%' }}
    />

    <Stack sx={{ display : 'flex', flexDirection : 'row', justifyContent: 'space-between', alignItems: 'center', margin: '0 6px' }}>
      <Typography sx={{ fontSize: '16px' }}>{fruitsData.product_name}</Typography>
      <Typography sx={{ fontSize: '16px' }}>{fruitsData.min_order}{fruitsData.units}</Typography>
    </Stack>
    <Typography sx={{ fontSize: '18px', marginTop: '6px' }}>Rs. {fruitsData.price}</Typography>

{cart.find(item => item.product_id === fruitsData._id) ? (

              <Stack sx={{display : 'flex', flexDirection : 'row', alignItems : 'center', marginBottom : '16px'}}>
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
                onClick={() => handleRemoveFromCart(fruitsData._id)}>
                  -
                </Box>
                <div style={{ marginTop: '8px', marginRight : '12px', fontWeight : '500'}}variant="outlined">{cart.find(item => item.product_id === fruitsData._id).quantity}</div>
                
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
              <Button variant="outlined" color="primary" size="medium" style={{ marginTop: '16px', marginBottom : '16px' }} onClick={() => handleAddToCart(fruitsData)}>Add to Cart</Button>
            )}
    </Box>
  </Grid>
))}
</Grid>

</Box>


<ToastContainer autoClose= {1000}/>


</ThemeProvider>
  );
}

export default ProductList;
