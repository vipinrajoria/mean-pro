var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Book = require('../models/Book.js');
var User=require('../models/User.js');
var bcrypt = require('bcryptjs');
var token_obj=require('../config/Tokenverify')
let jwt = require('jsonwebtoken')
var config=require('../config/config')
router.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.post('/register', function(req, res){
	var hashedPassword = bcrypt.hashSync(req.body.password, 8);
	User.create({
		username : req.body.username,
		email : req.body.email,
		password : hashedPassword
	},
	function (err, user){
		if (err) return res.status(500).json("There was a problem registering the user.")
		// create a token
		var token = jwt.sign({ id: user._id },config.secret,{
		  expiresIn: 86400 // expires in 24 hours
		});
		//var x={ auth: true, token: token,username:req.body.username};console.log(x);
		res.status(200).json({ auth: true, token: token,username:req.body.username});
		});
});

/* GET ALL BOOKS */

router.get('/',token_obj.ensureToken,function(req, res, next) {
	Book.find(function (err, products){
		if (err) return next(err);
			res.json(products);
	});
});

/* GET SINGLE BOOK BY ID */
router.get('/:id',token_obj.ensureToken,function(req, res, next){  
	Book.findById(req.params.id, function (err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

/* SAVE BOOK */
router.post('/',token_obj.ensureToken,function(req, res, next) {
    Book.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE BOOK */
router.put('/:id',token_obj.ensureToken,function(req, res, next) {
  Book.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE BOOK */
router.delete('/:id',token_obj.ensureToken,function(req, res, next){
	Book.findByIdAndRemove(req.params.id, req.body, function (err, post) {
		if (err) return next(err);
		res.json(post);
  });
});

module.exports = router;
