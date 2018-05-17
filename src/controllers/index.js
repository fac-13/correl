const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');
const home = require('./home');
const profile = require('./profile');
const register = require('./register');
const logIn = require('./logIn');
const addData = require('./addData');
const seeData = require('./seeData');
const symptoms = require('./symptoms');
const factors = require('./factors');
const error = require('./error');
const logOut = require('./logOut');
const instruction = require('./instruction');

router.use(bodyParser.urlencoded({ extended: false }));

// get routes

router.get('/', home.get);
router.get('/register', register.get);
// instruction pages
router.get('/instruction', instruction.get);

router.get('/logIn', logIn.get);
router.get('/logOut', logOut.get);
router.get('/profile', profile.get);
router.get('/addData', addData.get);
router.get('/getGraphData', seeData.getData);
router.get('/seeData', seeData.getPage);
router.get('/symptoms/home', symptoms.getHome);
router.get('/symptoms/add', symptoms.getAdd);
router.get('/symptoms/scaleInfo', symptoms.getScaleInfo);
router.get('/symptoms/scaleSetup', symptoms.getScaleSetup);

router.get('/factors/home', factors.getHome);
router.get('/factors/add', factors.getAdd);
router.get('/factors/scaleInfo', factors.getScaleInfo);
router.get('/factors/scaleSetup', factors.getScaleSetup);

// post routes
router.post('/logIn', logIn.post);
router.post('/register', register.post);
router.post('/factors/add', factors.postAdd);
router.post('/factors/scaleSetup', factors.postScaleSetup);
router.post('/symptoms/add', symptoms.postAdd);
router.post('/symptoms/scaleSetup', symptoms.postScaleSetup);
router.post('/addData', addData.post);
// router.post('/addData');
router.delete('/deleteSymptom/:symptom', symptoms.delete);
router.delete('/deleteFactor/:factor', factors.delete);


router.use(error.client);
router.use(error.server);


module.exports = router;
