var CronJob = require('cron').CronJob;
const notic=require('../controllers/noticias.controller');
const buscar=()=>{
var job = new CronJob('*/05 * * * * *', function() {
  notic.noticasCron().then(()=>{
    console.log('You will see this message every second');
  });
}, null, true, 'America/Los_Angeles');


job.start(); 
}

module.exports={
  buscar
};