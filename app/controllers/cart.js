'use strict';

var Product = require('../models/product'),
     config = require('../../config');

exports.add = function(res, req){
  Product.findById(req.body.productId, function(err, product){
    req.session.cart = req.session.cart || [];
    req.session.cart.push(product);
    req.session.save(function(){
      res.redirect('/cart');
    });
  });
};

exports.index = function(req, res){
  var products = {},
      subtotal = 0,
      tax = 0,
      total = 0;

  (req.session.cart || []).forEach(function(p){
    subtotal += p.price;
    var id = p._id.toString();
    products[id] = products[id] || {p:p, c:0};
    products[id].c++;
  });

  tax = subtotal * 0.075;
  total = subtotal + tax;

  req.session.totalCents = Math.round(total * 100);
  req.session.save(function(){
    res.render('cart/index', {key:config.stripe.apiKey, ids:Object.keys(products), products:products, subtotal:subtotal, tax:tax, total:total});
  });
};

exports.destroy = function(req, res){
  req.session.cart = [];
  req.session.save(function(){
    res.redirect('/cart');
  });
};

exports.purchase = function(req, res){
  console.log(req.body);
  var stripe      = require('stripe')(config.stripe.apiSecret),
      stripeToken = req.body.stripeToken;

  stripe.charges.create({
    amount: req.session.totalCents,
    currency: 'usd',
    card: stripeToken,
    description: req.user.email || 'anonymous'
  }, function(err, charge){
    req.session.cart = [];
    req.session.save(function(){
      req.flash('success', 'Thank you for your purchase');
      res.redirect('/profile');
    });
  });
};
