const { Pool } = require('pg')

const pool = new Pool({
    // host:'localhost',
    // user:'postgres',
    // password:'Desarrollo2019',
    // database:'noticiasApp',
    // port:'5432'
});

module.exports = {
  query: (text, params) => pool.query(text, params),
}