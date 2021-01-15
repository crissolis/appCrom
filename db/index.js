const { Pool } = require('pg')
var pool;
if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
});
}else{
  pool = new Pool({
    host:'localhost',
    user:'postgres',
    password:'Desarrollo2019',
    database:'noticiasApp',
    port:'5432'
    //   host:'ec2-3-211-149-196.compute-1.amazonaws.com',
    // user:'cmqpktrlklypkw',
    // password:'ec7bba11de2aadfd426ac864541cac8ca1f4d27bbb0a6ac849d3d979cf834fe4',
    // database:'db8ghi8tnvpv3d',
    // port:'5432'
});
}


module.exports = {
  query: (text, params) => pool.query(text, params),
}