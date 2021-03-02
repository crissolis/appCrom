const db = require('../../db/index');
const MedioDB = require("../Utils/Dbmedio");


 // YA ESTA SUS FUNCIONES findUser y findUser1  
const findUser= async (usuario,clave) => {
    if (clave===undefined) {
      if (usuario!==undefined) {
        try {
          let params=[usuario]
          // const response = await db.query(`SELECT * FROM usuario u WHERE activo=true AND u.nick=$1 `,params);
          const response = await db.query(`SELECT *FROM findUser($1); `,params);
          if (response.rowCount > 0) {
            return response.rows;
          }else{
            return [];
          }
        } catch (error) {
          return [];
        }
    
      } else {
        return [];
      }
    }else{
       let params=[usuario,clave]
      // const response = await db.query(`SELECT * FROM usuario u WHERE activo=true 
      // AND u.nick=$1 AND u.password=$2`,params);
      const response = await db.query(`SELECT *FROM findUser1($1,$2); `,params);
      if (response.rowCount > 0) {
        return response.rows;
      }else{
        return [];
      }
    }
  } 
  
  const saveUser= async (usuario) => {
    try {
       let respueta=[];
      let params=[usuario.nombre,usuario.apellido,usuario.correo,usuario.nick,usuario.password,usuario.activo]
      // console.log(params);
      // const response = await db.query(`insert INTO usuario(nombre,apellido,correo,nick,password,activo)
      // VALUES($1,$2,$3,$4,$5,$6) `,params);
      const response = await db.query(` SELECT *FROM saveUser($1,$2,$3,$4,$5,$6)`,params);
      if (response.rowCount > 0) {
          console.log(response)
        return response.rowCount;
      }else{
        return [];
      }
    } catch (error) {
      return error;
    }
  }
  
  const findByUser= async (usuario) => {
      if (usuario!==undefined) {
        try {
          let params=[usuario.nick,usuario.correo]
          // const response = await db.query(`SELECT * FROM usuario u WHERE activo=true
          //  AND u.nick=$1 OR u.correo=$2 `,params);
          const response = await db.query(`SELECT *FROM findByUser($1,$2)`,params);
          if (response.rowCount > 0) {
            return response.rows;
          }else{
            return [];
          }
        } catch (error) {
          return error;
        }
    
      } else {
        return [];
      }
     
  } 

  module.exports={
    findUser,
    saveUser,
    findByUser
}