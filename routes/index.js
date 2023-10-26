var express = require('express');
var router = express.Router();
const path = require('path')
const sgMail = require('@sendgrid/mail');
let products = require('../data/products.json')
const toSeoUrl = require('../utils/seoUrl')
require('dotenv').config()
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


/* GET home page. */
router.get('/', function (req, res, next) {

  res.render('index', { products: products });
});
router.get('/privacy', function (req, res, next) {
  res.render('privacy');
});


router.get('/product/:name', function (req, res, next) {

  let product = products.filter((p) => p.displayUrl === req.params.name)
  res.render('singleProduct', { product: product[0], products: products });
});

router.get('/contact', function (req, res, next) {
  res.render('contactUs', { products: products });
});




router.post('/email', function (req, res, next) {
  // console.log(process.env.SENDGRID_API_KEY)
  console.log(req.body)
  let name = req.body.name
  let email = req.body.email
  let compoundName = req.body.validationCustom03;
  let quantity = req.body.validationCustom04;
  let address = req.body.validationCustom05;

  let message = `Name: ${name}\nEmail: ${email}\nCompound Name: ${compoundName}\nQuantity: ${quantity}\nAddress: ${address}`;

  const msg = {
    to: 'rajulapudip@gmail.com',
    cc: 'techpranee@gmail.com',
    from: 'techpranee@gmail.com',
    subject: `TECH PRANEE SERVICES REQUIRED FOR ${name} with email :${email}`,
    text: message,
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };

  sgMail.send(msg).then(() => {
    res.status(200).send('OK');
  }).catch((err) => {
    console.log(err.response.body.errors)
    res.status(400).send('Msg was not sent Please contact +91-7032160008');
  })

});

module.exports = router;
