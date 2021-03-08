const db = require('../../db/index');
// var natural = require('natural');
// var Analyzer = require('natural').SentimentAnalyzer;
// var stemmer = require('natural').PorterStemmerEs;

const e = require('express');


const findAllMedio= async (medio,usuario) => {
  console.log("entraaqui ")
  if (medio===undefined) {
    try {
      let params=[usuario];
      const response = await db.query(`SELECT * FROM medio  m 
      LEFT  JOIN usuario_medio u
     ON m.medio_id = u.medio_id
     WHERE  m.activo=true and u.activo=true `);
    //  console.log(response);
      if (response.rowCount > 0) {
        return response.rows;
      }else{
        return [];
      }
    } catch (error) {
      return error;
    }

  } else {
    try {
     let params=[usuario,medio]
      const response = await db.query(`SELECT * FROM medio  m 
   LEFT  JOIN usuario_medio u
  ON m.medio_id = u.medio_id
  WHERE u.usuario_id=$1 and m.activo=true AND m.medio_id=$2 and u.activo=true`,params);
      if (response.rowCount > 0) {
        return response.rows;
      }else{
        return [];
      }
    } catch (error) {
      console.log(error)
      return error;
    }
  }



  // let params=[usuario];
  // console.log(usuario)
  // const response= await db.query(`SELECT * FROM medio  m 
  //  LEFT  JOIN usuario_medio u
  // ON m.medio_id = u.medio_id
  // WHERE u.usuario_id=$1 and m.activo=true and u.activo=true and m.defecto=false`,params); 
  //  console.log(response)
  // if (response.rowCount>0) {
  //  return response.rows;
  // }else{
  //   return [];
  // }
}

// YA ESTA SUS FUNCIONES findultimoidmedio
 const  findUltimoId= async (medio) =>{
  let id=medio ;
  let params=[id];
  // console.log(params)
  // const response= await db.query(`SELECT * from noticia n WHERE n.medio_id=$1
  //  ORDER BY n.fecha_creacion DESC   limit 1`,params); 
  const response = await db.query(`SELECT * FROM findultimoidmedio($1)`,params);
  if (response.rowCount>0) {
    // console.log("etro aq")
    // console.log(response.rows[0])
    return response.rows[0];
  }else{
    console.log("nell")
    return [];
  }
}

  
module.exports={
    findAllMedio,
    findUltimoId,
   
}



// if(analysis > -0.05 && analysis < 0.05) {
//   console.log( "😐");
// }else if(analysis > 0.07){
//   console.log("😃")
// }else if(analysis > 0){
//   console.log("🙂")
// }else if(analysis < 0){
//   console.log("😕")
// }