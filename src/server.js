const express =  require('express')
const app = express()
const bodyParser = require('body-parser'); 
const cron =require('../jobs/buscarNoticias');

cron.buscar();
//   Middlewares
// app.use(express.json());   
// app.use(bodyParser.urlencoded({extended:true}));

// Configura r cabeceras y cors
app.use(require('../Middlewares/cors'));

// Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


                 
// Rutas 
  app.use(require('../routes/index'));
   

                   
app.listen(process.env.PORT || '3000', () => {
  console.log('Escuchando puerto: ', process.env.PORT);
});         