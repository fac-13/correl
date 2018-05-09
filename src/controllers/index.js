const express = require('express');

const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');

const home = require('/');
const register = require('./register');
const signIn = require('./signIn');
const addData = require('./addData');
const seeData = require('./seeData');
const symptoms = require('./symptoms');
const factors = require('./factors');
const error = require('./error');
const logOut = require('./logOut');

router.use(bodyParser.urlencoded({ extended: false }));

// get routes

router.get('/');
router.get('/register');
router.get('/signIn');
router.get('/addData');
router.get('/seeData');
router.get('/symptoms');
router.get('/factors');
router.get('/error');
router.get('/logOut');

// post routes

router.post('/register');
router.post('/addData');
router.post('/symptoms');
router.post('/factors');
