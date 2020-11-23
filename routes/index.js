var express = require('express');
var router = express.Router();
const path = require('path')
const sgMail = require('@sendgrid/mail');
let products = require('../data/products.json')
require('dotenv').config()
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/* GET home page. */
router.get('/', function (req, res, next) {

  res.render('index');
});
router.get('/privacy', function (req, res, next) {
  res.render('privacy');
});


router.get('/products', function (req, res, next) {
  res.render('singleProduct', { product: products[0] });
});

router.get('/contact', function (req, res, next) {
  res.render('contactUs');
});




router.post('/email', function (req, res, next) {
  // console.log(process.env.SENDGRID_API_KEY)
  // console.log(req.body)
  let name = req.body.name
  let email = req.body.email
  let message = req.body.message
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
