var express = require('express');
var router = express.Router();

const { getNoticias, getReporte } = require('../controllers/noticias.controller');
const { buscarMedio,guardarMedio,getMedios } = require('../controllers/medio.controller');
// const {  findAll } =require('../controllers/Utils/findAll');
  
router.get('/',(req,res)=>res.send('Estamos en linea') );
router.get('/noticias',getNoticias);
router.get('/noticias/reporte',getReporte); 
 
router.get('/medio/buscar',buscarMedio); 

 router.get('/medio/guardar',guardarMedio); 
 router.get('/medio/medios',getMedios); 





module.exports=router;