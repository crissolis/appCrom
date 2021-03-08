var express = require('express');
var router = express.Router();


// const {  findAll } =require('../controllers/Utils/findAll');
  
router.get('/',(req,res)=>res.send('Estamos en linea') );




module.exports=router;