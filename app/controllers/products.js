'use strict';

var Product = require('../models/product');

exports.new = function(req, res){
  res.render('products/new');
};

exports.index = function(req, res){
  Product.all(function(err, products){
    res.render('products/index', {products:products});
  });
};


