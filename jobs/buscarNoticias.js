var CronJob = require('cron').CronJob;
const notic=require('../controllers/noticias.controller');
const buscar=()=>{
var job = new CronJob('*/10 * * * * *', function() {
  notic.noticasCron().then(()=>{
    console.log('<_________________________________________________________________________________________>');
  });
}, null, true, 'America/Los_Angeles');


job.start(); 
}

module.exports={
  buscar
};