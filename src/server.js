const express =  require('express')
const app = express()
const bodyParser = require('body-parser'); 
const cron =require('../jobs/buscarNoticias');

cron.buscar();
//   Middlewares
app.use(express.json());   
app.use(express.urlencoded({extended:false}));
// Configura r cabeceras y cors
 app.use(require('../Middlewares/cors'));
                 
// Rutas 
  app.use(require('../routes/index'));
   

                   
app.listen(process.env.PORT || '3000', () => {
  console.log('Escuchando puerto: ', process.env.PORT);
});         