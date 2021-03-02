var express = require('express');
var router = express.Router();

const { getNoticias, getReporte, getPrueba,getNoticiaFav ,deleteNoticiaFav, saveNoticiaFav} = require('../controllers/noticias.controller');
const { buscarMedio,guardarMedio,getMedios, Eliminiarmedio ,updateMedios} = require('../controllers/medio.controller');
const { getLogin,register} = require('../controllers/usuario.controller');

// const {  findAll } =require('../controllers/Utils/findAll');
  
router.get('/',(req,res)=>res.send('Estamos en linea') );
router.get('/noticias',getNoticias);
router.get('/noticias/reporte',getReporte); 
router.get('/noticias/prueba',getPrueba); 

router.get('/noticias/favoritos',getNoticiaFav); 
router.get('/noticias/favoritos/guardar',saveNoticiaFav); 
router.get('/noticias/favoritos/eliminar',deleteNoticiaFav); 

 
router.get('/medio/buscar',buscarMedio); 
 router.get('/medio/guardar',guardarMedio); 
 router.get('/medio/medios',getMedios); 
 router.get('/medio/update',updateMedios); 


 router.get('/medio/eliminar',Eliminiarmedio); 
 router.post('/users/login',getLogin); 
 router.post('/users/register',register); 



module.exports=router;