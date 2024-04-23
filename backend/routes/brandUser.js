const express = require("express");
const cookieParser = require("cookie-parser");
const router = express.Router();
const bcrypt = require("bcryptjs");
const PDFDocument = require('pdfkit');
const fs = require('fs');
const dayjs = require('dayjs');
const pdf = require('html-pdf');
const Brand = require("../models/Brand");
const TempBrand = require("../models/BrandTemp");
const Products = require("../models/Products");
const Invoices = require("../models/Invoices");
const multer = require('multer');
const Razorpay = require('razorpay');
const sendMail = require("../utils/sendMail");
const Queue = require('bull');
const puppeteer = require('puppeteer');
var jwt = require("jsonwebtoken");
const { validatePaymentVerification } = require('razorpay/dist/utils/razorpay-utils');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);



const { createToken } = require("../middleware/jwtToken");
const app = express();
app.use(cookieParser());


const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: 'ap-south-1',
});

const razorpayKey = process.env.RZP_KEY;
const razorpaySecret = process.env.RZP_SECRET;

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
});

const generatePin = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const invoiceQueue = new Queue('invoiceQueue');

const randomInvoiceNumber = () => {
  return Math.floor(10000000 + Math.random() * 90000000).toString().substring(0, 8);
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const { brand_id } = req.body;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token missing' });
  }

  Brand.findById(brand_id).then( async (result)=>{

    if(result && token === result.access_token){
      next();
    }

    else{
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });

    }

  }).catch((err) =>{

    return res.status(500).send({
      error: "Internal server error",
      data: null,
      message: "An error occurred",
    });

  })

};


router.post("/signup-brand", async (req, res, next) => {

  try {
    const { email, password, brand } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const lowerCaseEmail = email.toLowerCase();
    const pin = generatePin();


    const options = {
      to: email,
      subject: "Verify Account - Exotic Corner",
      text: `Your 6-digit PIN: ${pin}`,
  }


    const existingUser = await Brand.findOne({ email: lowerCaseEmail });
    const existingUserInTemp = await TempBrand.findOne({ email : lowerCaseEmail});

   
    if (!lowerCaseEmail || !password || !brand) {
      return res.status(400).send({
         error: "All fields are mandatory",
         data: null,
         message: "Please provide all fields",
       });
     }

    else if (existingUser) {
      return res.status(400).send({
        error: "User already exists",
        data: null,
        message: "User already exists with the same email address. Please login to continue.",
      });
    }

    else if(existingUserInTemp){

      existingUserInTemp.password = hashedPassword;
      existingUserInTemp.brand_name = brand;
      existingUserInTemp.reset_pin = pin;
      existingUserInTemp.save();
      await sendMail(options);
     return res.status(200).send({ success: true });

    }

    else{

    await TempBrand.create({
      email: lowerCaseEmail,
      password: hashedPassword,
      brand_name: brand,
      reset_pin : pin
    });
    await sendMail(options);

    return res.status(200).send({ success: true });
  }
  } catch (error) {
    // return next(new ErrorHandler(error.message, 500));
  }
});



router.post("/brand-login", async (req, res, next) => {


  try {
    const { email, password } = req.body;

    if (!email || !password) {
     return res.status(400).send({
        error: "All fields are mandatory",
        data: null,
        message: "Please provide all fields",
      });
    }

    const user = await Brand.findOne({ email }).select("+hashPassword");

    if (!user) {
      return res.status(400).send({
        error: "User does not exists!",
        data: null,
        message: "User does not exists!",
      });
    }

    bcrypt.compare(password, user.password, function (err1, result) {
      if (result === true) {
      createToken(user, res);
      

      } else {
        return res.status(400).send({
          error: "email, password mismatch",
          data: null,
          message: "Wrong Email or Password",
        });
      }

    });
  } catch (error) {
    return res.status(500).send({
      error: "Internal server error",
      data: null,
      message: "An error occurred",
    });
  }
});


router.post("/check-user-token", async function (req, res) {

  const { brand_id, token } = req.body;
  const pin = generatePin();

  
  Brand.findById(brand_id).then( async (result)=>{

    if(result && token === result.access_token){
    
    res.status(200).send({ tokenMatches : true});
    res.end();

    }

    else{

      res.status(200).send({ tokenMatches: false});
      res.end();


    }

  }).catch((err) =>{

    return res.status(500).send({
      error: "Internal server error",
      data: null,
      message: "An error occurred",
    });

  })


});

router.post("/check-email-exists-sendMail", async function (req, res) {

  const { email } = req.body;
  const pin = generatePin();

  
  Brand.findOne({ email : email}).then( async (result)=>{

    if(result){

      const options = {
        to: email,
        subject: "Password Reset PIN - Exotic Corner",
        text: `Your 6-digit PIN: ${pin}`,
    }

    await Brand.findByIdAndUpdate(result._id, { reset_pin: pin });
    await sendMail(options);

    res.status(200).send({ exists : true, emailSent: true});
    res.end();


    }

    else{

      res.status(200).send({ exists: false});
      res.end();


    }

  }).catch((err) =>{

    return res.status(500).send({
      error: "Internal server error",
      data: null,
      message: "An error occurred",
    });

  })


});

router.post("/check-resetPin-withDb-brandTemps", async function (req, res) {

  const { email, pin } = req.body;
  const lowerCaseEmail = email.toLowerCase();
  const pinAsInt = parseInt(pin);
  
  TempBrand.findOne({ email : lowerCaseEmail}).then(async (result)=>{

    if(result.reset_pin === pinAsInt){

      await Brand.create({
        email: lowerCaseEmail,
        password: result.password,
        brand_name: result.brand_name,
        reset_pin : pin,
        balance : 0,
        purchased_plan : '',
        brand_logo : ''
      });

      await TempBrand.deleteOne({ email: lowerCaseEmail  });


  res.status(200).send({ matching: true, email: email});
  res.end();

    }

    else{

      res.status(200).send({ matching: false});
      res.end();

    }

  }).catch((err) =>{

    return res.status(502).send({
      error: "Internal Server Error",
      data: null,
      message: "Internal Server Error",
    });

  })

});


router.post("/check-resetPin-withDb", async function (req, res) {

  const { email, pin } = req.body;
  const pinAsInt = parseInt(pin);
  
  Brand.findOne({ email : email}).then(async (result)=>{

    if(result.reset_pin === pinAsInt){

  res.status(200).send({ matching: true, email: email});
  res.end();

    }

    else{

      res.status(200).send({ matching: false});
      res.end();

    }

  }).catch((err) =>{

  })

});

// router.post("/update-password", async function (req, res) {

//   const { userId, password } = req.body;
//   const hashedPassword = bcrypt.hashSync(password, 10);

  
//   Brand.findById(userId).then(async (result)=>{

//     if(result){

//       await Brand.findByIdAndUpdate(result._id, { password: hashedPassword });
 
//   res.status(200).send({ success: true});
//   res.end();


//     }

//     else{

//       res.status(200).send({ success: false});
//       res.end();


//     }

//   }).catch((err) =>{

//   })

// });

router.post("/update-password", async function (req, res) {

  const { email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  
  Brand.findOne({email : email}).then(async (result)=>{

    if(result){

      await Brand.findByIdAndUpdate(result._id, { password: hashedPassword });
 
  res.status(200).send({ success: true});
  res.end();


    }

    else{

      res.status(200).send({ success: false});
      res.end();


    }

  }).catch((err) =>{

  })

});

router.post("/check-kyc-status", async function (req, res) {

  const { userId } = req.body;
  
  Brand.findById(userId).then(async (result)=>{

    if(result && result.is_approved){

 
  res.status(200).send({ approved: true});
  res.end();


    }

    else{

      res.status(200).send({ approved: false});
      res.end();


    }

  }).catch((err) =>{

  })

});


//below code is for updating password from profile settings page

router.post("/change-password", async function (req, res) {

  const { userId, password, newPassword } = req.body;
  const hashedPassword = bcrypt.hashSync(newPassword, 10);

  Brand.findById(userId).select("+hashPassword").then((result)=>{

    if(result){

      bcrypt.compare(password, result.password, async function (err1, ress) {
        if (ress === true) {

          console.log('Correct Password');

          await Brand.findByIdAndUpdate(result._id, { password: hashedPassword });
          res.status(200).send({ success: true});
          res.end();
        
  
        } else {
          console.log('Wrong Password');
          return res.status(400).send({
            error: "Wrong current password",
            data: null,
            message: "Wrong current password",
          });
        }
  
      });

    }

    else{

      res.status(200).send({ success: false});
      res.end();


    }

  }).catch((err) =>{

  })

});

router.post('/settings-brand-details', async function (req, res){

  const user_id = req.body.userId;
  Brand.findById(user_id).then((result)=>{
    if(result){
      res.status(200).send({ brandDetails: result});
      res.end();
    }
    else{
      console.log('Fetching Brand Details Error');
    }

  }).catch((e)=>{
    console.log('Error:',e );
  });
});

router.post('/update-brand-logo', upload.single('image'), async function (req, res){

  const user_id = req.body.brand_id;

  const uploadFileAndUpdateBrandLogo = (file, index) => {
    const params = {
      Bucket: 'billsbookbucket', 
      Key: `brandLogos/${Date.now()}_${file.originalname}`, 
      Body: file.buffer,
      ContentType: file.mimetype,
      ServerSideEncryption: 'AES256',
    };
  
    return s3.send(new PutObjectCommand(params))
      .then(() => {
        // Construct and return the S3 URL
        const s3Url = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;

        return Brand.findByIdAndUpdate(user_id, { brand_logo: s3Url })
        .then((updatedBrand) => {
          if (!updatedBrand) {
            return Promise.reject({ error: 'Brand not found' });
          }
          return s3Url;
        });

      })
      .catch((error) => {
        // Handle errors here if needed
        console.error(`Error uploading image ${index + 1} to S3:`, error);
        return Promise.reject(error);
      });
  };

      uploadFileAndUpdateBrandLogo(req.file, user_id)
        .then(() => {
          // File uploaded and brand logo updated successfully
          res.status(200).send({ updated: true });
        })
        .catch((error) => {
          // Handle any errors that occurred during file upload and brand logo update
          console.error('Error uploading file and updating brand logo:', error);
          res.status(500).json({ error: 'Error uploading image and updating brand logo' });
        });

});


router.get('/get-brand-products', async function (req, res){


  Products.find({'is_del' : false}).then((result)=>{

    if(result){

    res.status(200).send({ data: result});
    res.end();

    }

    else{
    res.status(200).send({ data: null });
    res.end();

    }

  }).catch(e2=>{

    console.log('Error2', e2);

  })
});

router.post('/get-brand-details', async function (req, res){

  const { brand_id} = req.body;

  Brand.findById(brand_id).then((result)=>{

    if(result){

    res.status(200).send({ data: result});
    res.end();

    }

    else{
    res.status(200).send({ data: null });
    res.end();

    }

  }).catch(e2=>{

    console.log('Error2', e2);

  })
});

router.post("/add-new-product", async function (req, res) {

  const { brand_id, productName, unitPrice, unitType } = req.body;
  const unitPriceInt = parseInt(unitPrice);
  
  Brand.findById(brand_id).then(async (result)=>{

    if(result){

      await Products.create({
        brandUser_id: brand_id,
        product_name: productName,
        unit_price: unitPriceInt,
        unit_type : unitType
      });


  res.status(200).send({ productAdded: true});
  res.end();

    }

    else{

      res.status(200).send({ productAdded: false});
      res.end();

    }

  }).catch((err) =>{

  })

});

router.post('/delete-product', (req, res) => {
  const { brand_id, product_id } = req.body;


  Products.findByIdAndUpdate(product_id, { is_del: true })
  .then((deletedProduct) => {
    if (deletedProduct) {
      // Campaign was found and deleted
      res.status(200).send({ deleted: true });
    } else {
      // Campaign not found
      res.status(200).send({ deleted: false });
      
    }
  })
  .catch((err) => {
    console.error('Error:', err);
    res.status(500).send({
      error: 'Deleting Product failed',
      data: null,
      message: 'Oops! Please try again',
    });
  });

});

router.post("/create-new-invoice", async function (req, res) {

  const { brand_id, payeeName, payeeMobile, totalAmount, selectedProducts} = req.body;

  const totalAmountInt = parseInt(totalAmount);

  console.log('totalAmount:', totalAmountInt);
  
  Brand.findById(brand_id).then(async (result)=>{

    if(result){

      const invoiceNumber = randomInvoiceNumber();
      var instance = new Razorpay({ key_id: razorpayKey, key_secret: razorpaySecret })

      try {
        // Create payment link
        const paymentResult = await instance.paymentLink.create({
          amount: totalAmount * 100,
          currency: "INR",
          accept_partial: false,
          description: "fruits invoice",
          customer: {
            name: payeeName,
            contact: "+91" + payeeMobile
          },
          notify: {
            sms: true,
            email: false
          },
          reminder_enable: true,
          // callback_url: "https://localhost:4700/verifyPayment",
          // callback_method: "get"
        });
    
        await Invoices.create({
          invoice_number: invoiceNumber,
          brandUser_id: brand_id,
          invoice_amount: totalAmountInt,
          buyer_name: payeeName,
          buyer_mobile_number: payeeMobile,
          products_details: selectedProducts,
          invoice_pdf_file: '',
          shortUrl: paymentResult.short_url,
          payment_link_id: paymentResult.id,
          payment_status: 'created',


        });

        await invoiceQueue.add({ payment_link_id: paymentResult.id });
    
        res.status(200).send({ invoiceCreated: true});
        res.end();
      
    
      } catch (error) {
        console.error("Error generating PDF or saving record:", error.error.description);
        return res.status(400).send({
          error: error.error.code,
          data: null,
          message: error.error.description,
        });
      }

    }

    else{

      res.status(200).send({ invoiceCreated: false});
      res.end();

    }

  }).catch((err) =>{

  })

});

router.post('/all-invoices', verifyToken, async (req, res) => {

  const user_id = req.body.brand_id;
  let { page, pageSize } = req.body;


  try {

    const result = await Invoices.find({ 'brandUser_id' : user_id});
    let invoices;
    if (page === 0) {
      invoices = await Invoices.find({ brandUser_id: user_id })
        .sort({ created_at: -1 }) // Sort by created_at in descending order
        .limit(pageSize).populate('brandUser_id');

    } else {
      page = page + 1;
      invoices = await Invoices.find({ brandUser_id: user_id })
        .sort({ created_at: -1 }) // Sort by created_at in descending order
        .skip((page - 1) * pageSize)
        .limit(pageSize).populate('brandUser_id');
    }

  const tableData = await Promise.all(invoices.map(async (data, index) => {

    var instance = new Razorpay({ key_id: razorpayKey, key_secret: razorpaySecret, headers: { 'Content-Type': 'application/json' } });

    if (data.payment_status === 'created' && data.route_enabled && !data.is_route_done) {


        return instance.paymentLink.fetch(data.payment_link_id)
            .then(async (payment_status_response) => {

              if (payment_status_response.status === 'paid' && payment_status_response.payments.length !== 0) {

                const charges = data.brandUser_id.charges;
                  const totVal = (data.invoice_amount*charges)/100;
                  const balanceAmount = data.invoice_amount - totVal;

                try {

                  await instance.payments.transfer(payment_status_response.payments[0].payment_id, {
                    "transfers": [
                      {
                        "account": data.linked_account_id,
                        "amount": balanceAmount*100,
                        "currency": "INR",
                        "notes": {
                          "name": "Bhaskar Sriram",
                          "roll_no": "IEC2011025"
                        },
                        "linked_account_notes": [
                          "name"
                        ],
                        "on_hold": 0,
                      }
                    ]
                  }).then(async (routeResponse)=>{

              
                    await Invoices.findOneAndUpdate(
                      { payment_link_id: data.payment_link_id },
                      { $set: { 
                        payment_status: payment_status_response.status, 
                        is_route_done: true, 
                        route_settlement_status : routeResponse.items[0].status,
                        route_source : routeResponse.items[0].source,
                        transfer_id : routeResponse.items[0].id } },
                      { new: true }
                    );

                    await Brand.findByIdAndUpdate(
                      data.brandUser_id._id,
                      { $inc: { balance: balanceAmount } },
                      { new: true }
                    );
              
                  }).catch(err => {
              
                    console.log('Route Error:::', err);
              
              
                  });

                 
              
              
                  return {
                    id: index + 1,
                    invoiceId: data._id,
                    payeeName: data.buyer_name,
                    payeeMobile: data.buyer_mobile_number,
                    invoice: data._id,
                    invoiceAmount: data.invoice_amount,
                    paymentStatus: payment_status_response.status,
                    createdDate: data.created_at,
                  };
              
                } catch (error) {
                  console.error('Error occurred:', error);
              
                  return {
                    id: index + 1,
                    invoiceId: data._id,
                    payeeName: data.buyer_name,
                    payeeMobile: data.buyer_mobile_number,
                    invoice: data._id,
                    invoiceAmount: data.invoice_amount,
                    paymentStatus: "Error",
                    createdDate: data.created_at,
                  };
                }
              }

else {

  return Invoices.findOneAndUpdate(
    { payment_link_id: data.payment_link_id },
    { $set: { payment_status: payment_status_response.status } },
    { new: true }
).then(() => {

    return {
        id: index + 1,
        invoiceId: data._id,
        payeeName: data.buyer_name,
        payeeMobile: data.buyer_mobile_number,
        invoice: data._id,
        invoiceAmount: data.invoice_amount,
        paymentStatus: payment_status_response.status,
        createdDate: data.created_at,
    };

})
.catch(error => {
// Handle errors if any
return {
    id: index + 1,
    invoiceId: data._id,
    payeeName: data.buyer_name,
    payeeMobile: data.buyer_mobile_number,
    invoice: data._id,
    invoiceAmount: data.invoice_amount,
    paymentStatus: "Error",
    createdDate: data.created_at,
};
});

}

            }) .catch(error => {
              // Handle errors if any
              return {
                  id: index + 1,
                  invoiceId: data._id,
                  payeeName: data.buyer_name,
                  payeeMobile: data.buyer_mobile_number,
                  invoice: data._id,
                  invoiceAmount: data.invoice_amount,
                  paymentStatus: "Error",
                  createdDate: data.created_at,
              };
              });
           
    } 

    else if (data.payment_status === 'created' && !data.route_enabled) {

      return instance.paymentLink.fetch(data.payment_link_id)
          .then(async (payment_status_response) => {

              return Invoices.findOneAndUpdate(
                  { payment_link_id: data.payment_link_id },
                  { $set: { payment_status: payment_status_response.status } },
                  { new: true }
              ).then(async () => {

                if(payment_status_response.status === 'paid'){

                  const charges = data.brandUser_id.charges;
                  const totVal = (data.invoice_amount*charges)/100;
                  const balanceAmount = data.invoice_amount - totVal;

                  await Brand.findByIdAndUpdate(
                    data.brandUser_id._id,
                    { $inc: { balance: balanceAmount } },
                    { new: true }
                  );

                  return {
                    id: index + 1,
                    invoiceId: data._id,
                    payeeName: data.buyer_name,
                    payeeMobile: data.buyer_mobile_number,
                    invoice: data._id,
                    invoiceAmount: data.invoice_amount,
                    paymentStatus: payment_status_response.status,
                    createdDate: data.created_at,
                };

                }

                  return {
                      id: index + 1,
                      invoiceId: data._id,
                      payeeName: data.buyer_name,
                      payeeMobile: data.buyer_mobile_number,
                      invoice: data._id,
                      invoiceAmount: data.invoice_amount,
                      paymentStatus: payment_status_response.status,
                      createdDate: data.created_at,
                  };
              });
          })
          .catch(error => {
              // Handle errors if any
              return {
                  id: index + 1,
                  invoiceId: data._id,
                  payeeName: data.buyer_name,
                  payeeMobile: data.buyer_mobile_number,
                  invoice: data._id,
                  invoiceAmount: data.invoice_amount,
                  paymentStatus: "Error",
                  createdDate: data.created_at,
              };
          });

  } 
    
    else {

        // No need for an asynchronous operation, return immediately
        return Promise.resolve({
            id: index + 1,
            invoiceId: data._id,
            payeeName: data.buyer_name,
            payeeMobile: data.buyer_mobile_number,
            invoice: data._id,
            invoiceAmount: data.invoice_amount,
            paymentStatus: data.payment_status,
            createdDate: data.created_at,
        });
    }
}));

  res.status(200).send({ data: tableData, totalRowCount : result.length });
  res.end();

} catch (error) {
   
  return res.status(500).send({
    error: "Internal server error",
    data: null,
    message: "An error occurred",
  });
  
}

  
});

router.post('/get-total-transactions', async function (req, res){

  const user_id = req.body.userId;

  Invoices.find({'brandUser_id': user_id, 'payment_status': 'paid'}).then((result)=>{

    if(result){
    res.status(200).send({ data: result.length});
    res.end();

    }

    else{
    res.status(200).send({ data: 0});
    res.end();

    }

  }).catch(e2=>{

    console.log('Error2', e2);

  })
});


router.post('/get-total-transactions-amount', async function (req, res){

  const user_id = req.body.userId;
  let totalAmount = 0;

  Invoices.find({'brandUser_id': user_id, 'payment_status': 'paid'}).then((result)=>{

    if(result){

      result.map((details =>{

        totalAmount+= details.invoice_amount;

      }))

    res.status(200).send({ data: totalAmount});
    res.end();

    }

    else{
    res.status(200).send({ data: 0});
    res.end();

    }

  }).catch(e2=>{

    console.log('Error2', e2);

  })
});

router.post('/get-account-balance', verifyToken, async function (req, res){

  const brand_id = req.body.brand_id;

  await Brand.findById(brand_id).then((result)=>{
  
    res.status(200).send({ balance: result.balance});
    res.end();


  }).catch(e2=>{

    console.log('Error2', e2);

  })
});




router.post('/verifyPayment', async (req, res) => {

  const razorpay_payment_id = req.body.razorpay_payment_id;
  const razorpay_payment_link_id = req.body.razorpay_payment_link_id;
  const razorpay_payment_link_reference_id = req.body.razorpay_payment_link_reference_id;
  const razorpay_payment_link_status = req.body.razorpay_payment_link_status;
  const razorpay_signature = req.body.razorpay_signature;

  const validationResp = validatePaymentVerification({
    "payment_link_id": razorpay_payment_link_id,
    "payment_id": razorpay_payment_id,
    "payment_link_reference_id": razorpay_payment_link_reference_id,
    "payment_link_status": razorpay_payment_link_status,
  }, razorpay_signature , razorpaySecret);


  if(validationResp){

    try {
      const resppp = await Invoices.findOneAndUpdate(
        { payment_link_id: razorpay_payment_link_id },
        { $set: { is_payment_captured: true } },
        { new: true }
      );

      await Brand.findByIdAndUpdate(
        resppp.brandUser_id,
        { $inc: { balance: resppp.invoice_amount } },
        { new: true }
      );

      await Invoices.findOne({ payment_link_id : razorpay_payment_link_id}).then( forResp => {

        res.status(200).send({ data: forResp});
        res.end();

      }).catch(e2=>{

        console.log('Error2', e2);
    
      })



    } catch (error) {
      console.error('Error updating invoice:', error);
    }


  }

  else{

    console.log('else block');
  }

});


router.post('/is-pdf-link-available', async (req, res) => {
  try {
    const invoiceId = req.body.invoiceId;
    const result = await Invoices.findById(invoiceId).populate('brandUser_id');

    if (!result) {
      return res.status(404).send({ error: `Invoice with ID ${invoiceId} not found` });
    }

    if (result.invoice_pdf_file !== '') {
      return res.status(200).send({ filePdf: result.invoice_pdf_file });
    }

  const dateString = dayjs(result.created_at).tz('Asia/Kolkata').format('DD-MM-YYYY');

    const invoiceHTML = await generateInvoice({
      date: dateString,
      invoiceNumber: result.invoice_number,
      payeeName: result.buyer_name,
      payeeMobile: '+91 ' + result.buyer_mobile_number,
      companyName: result.brandUser_id.brand_name,
      companyAddress: result.brandUser_id.address,
      companyGSTIN: result.brandUser_id.gstin,
      productDetails: result.products_details,
      amountToPay: result.invoice_amount
    });

    const browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    })
    const page = await browser.newPage();
    await page.setContent(invoiceHTML);
    const pdfBuffer = await page.pdf({ format: 'A4' });

    const params = {
      Bucket: "billsbookbucket",
      Key: `invoices/${Date.now()}_${result.invoice_number}`,
      Body: pdfBuffer,
      ContentType: 'application/pdf',
      ServerSideEncryption: "AES256",
    };

    await s3.send(new PutObjectCommand(params));
    const s3Url = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;

    await Invoices.updateOne({ _id: result._id }, { invoice_pdf_file: s3Url });

    await browser.close();

    res.status(200).send({ filePdf: s3Url });
    res.end();

  } catch (error) {
   
    return res.status(500).send({
      error: "Internal server error",
      data: null,
      message: "An error occurred",
    });

  }
});


invoiceQueue.process(async (job) => {

  const { payment_link_id } = job.data;
  
  const invoice = await Invoices.findOne({ payment_link_id: payment_link_id }).populate('brandUser_id');

  if (!invoice) {
    throw new Error(`Invoice with ID ${payment_link_id} not found.`);
  }

  const dateString = dayjs(invoice.created_at).tz('Asia/Kolkata').locale('en').format('DD-MM-YYYY');

  const invoiceHTML = await generateInvoice({
    date: dateString,
    invoiceNumber: invoice.invoice_number,
    payeeName: invoice.buyer_name,
    payeeMobile: '+91 '+ invoice.buyer_mobile_number,
    companyName: invoice.brandUser_id.brand_name,
    companyAddress: invoice.brandUser_id.outlet_address,
    productDetails: invoice.products_details,
    amountToPay : invoice.invoice_amount
  });

  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu'
    ]
  })
  const page = await browser.newPage();
  await page.setContent(invoiceHTML);
  const pdfBuffer = await page.pdf({ format: 'A4' });


try {

    const params = {
        Bucket: "billsbookbucket",
        Key: `invoices/${Date.now()}_${invoice.invoice_number}`,
        Body: pdfBuffer,
        ContentType: 'application/pdf',
        ServerSideEncryption: "AES256",
    };


    await s3.send(new PutObjectCommand(params));
    const s3Url = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;

    console.log('s3Url:', s3Url);

    await Invoices.updateOne({ _id: invoice._id }, { invoice_pdf_file: s3Url });

 
} catch (error) {
    console.error('Error creating or uploading PDF:', error);
    res.status(500).send('Error creating or uploading PDF');
}



});

















  async function generateInvoice({ date, invoiceNumber, payeeName, payeeMobile, companyName, companyAddress, companyGSTIN, productDetails, amountToPay }) {

      console.log('generateInvoice hit');
      return (
        `
        <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice V1</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">

    <link rel="stylesheet" type="text/css" href="styles.css">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>

<body>

    <section id="invoice">
        <div class="container my-5 py-5">
            <div class="text-center">
                <img src="images/logo_dark.png" alt="">
            </div>
            <div class="text-center border-top border-bottom my-5 py-3">
                <h2 class="display-5 fw-bold">Invoice </h2>
                <p class="m-0">Invoice No: ${invoiceNumber}</p>
                <p class="m-0">Invoice Date: ${date}</p>
            </div>

            <div class="d-md-flex justify-content-between">
                <div>
                    <p class="text-primary">Invoice To</p>
                    <h4>${payeeName}</h4>
                    <ul class="list-unstyled">
                        <li>${payeeMobile}</li>
                    </ul>
                </div>
                <div class="mt-5 mt-md-0">
                    <p class="text-primary">Invoice From</p>
                    <h4>${companyName}</h4>
                    <ul class="list-unstyled">
                        <li>${companyAddress}</li>
                        <li>${companyGSTIN}</li>
                    </ul>
                </div>
            </div>

            <table class="table border my-5">
                <thead>
                    <tr class="bg-primary-subtle">
                        <th scope="col">S.No</th>
                        <th scope="col">Item</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody>

                ${productDetails.map((product, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${product.product_name}</td>
                  <td>${product.quantity}</td>
                  <td>Rs. ${product.unit_price}/${product.unit_type}</td>
                  <td>Rs. ${product.quantity * product.unit_price}</td>
                </tr>
              `).join('')}

                  
                    <tr>
                        <th></th>
                        <td></td>
                        <td></td>
                        <td class="text-primary fw-bold">Grand-Total</td>
                        <td class="text-primary fw-bold">Rs.${amountToPay}</td>
                    </tr>
                </tbody>
            </table>

           
            <div class="text-center my-5">
                <p class="text-muted"><span class="fw-semibold">NOTE: </span> This is computer generated invoice, hence signature is not required.</p>
            </div>

          

        </div>
    </section>



    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe"
        crossorigin="anonymous"></script>
    <script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>

</body>

</html>
        `
      );
      
  }
    

    




module.exports = router;
