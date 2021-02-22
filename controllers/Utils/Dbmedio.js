const db = require('../../db/index');
// var natural = require('natural');
// var Analyzer = require('natural').SentimentAnalyzer;
// var stemmer = require('natural').PorterStemmerEs;

const e = require('express');


const findAllMe= async (medio,usuario) => {
  if (medio===undefined) {
    try {
      let params=[usuario];
      const response = await db.query(`SELECT * FROM medio  m 
      LEFT  JOIN usuario_medio u
     ON m.medio_id = u.medio_id
     WHERE u.usuario_id=$1 and m.activo=true and u.activo=true`,params);
     console.log(response);
      if (response.rowCount > 0) {
      
        return response.rows;
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
      }
    } catch (error) {
      console.log(error)
      return error;
    }
  }


}   
  
// TODO FLATA EN FUNCION
const DeleteMed= async (medio,usuario) => {
  if (medio) {
    try {
      let params=[false,medio,usuario]
      const response = await db.query(`UPDATE usuario_medio  set activo=$1 where 
      medio_id=$2 and usuario_id=$3 `,params);
      if (response.rowCount > 0) {
        console.log(response.rowCount)
        return response.command;
      }
    } catch (error) {
      console.log(error)
      return error;
    }
}
}
//TODO FLATA EN FUNCION
const GuardarMed= async (params) => {
var res;
  db.query(`INSERT INTO medio(medio_id,medio_name,nombre,url,location,description,imagen_url,banner_url,activo,defecto)
  VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,params).then(resp=>{
     res=resp.rows;
    console.log(resp);
  }).catch(err=>{
    res= err
  });

    console.log("wwwwwwwwwwwwwwwwwwwwwwwww "+res)
    return res;
} 

const findAllMedio= async (medio,usuario) => {


  if (medio===undefined) {
    try {
      let params=[usuario];
      const response = await db.query(`SELECT * FROM medio  m 
      LEFT  JOIN usuario_medio u
     ON m.medio_id = u.medio_id
     WHERE u.usuario_id=$1 and m.activo=true and u.activo=true and  m.defecto=false`,params);
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


 const  findUltimoId= async (medio) =>{
  let id=medio ;
  let params=[id];
  console.log(params)
  const response= await db.query(`SELECT * from noticia n WHERE n.medio_id=$1
   ORDER BY n.fecha_creacion DESC   limit 1`,params); 

  if (response.rowCount>0) {
    console.log("etro aq")
    return response.rows[0];
  }else{
    console.log("nell")
    return [];
  }
}


const  findPrimerId= async (medio) =>{
  let id=medio ;
  let params=[id];

  const response= await db.query(`SELECT * from noticia n
   WHERE n.medio_id=$1
   ORDER BY n.fecha_creacion ASC  limit 1`,params); 
  if (response.rowCount>0) {
    console.log(response.rows)
    return response.rows[0];
  }else{
    return [];
  }
}


const findAllMedioDefect= async () => {
  // let params=[];
  const response= await db.query(`SELECT * FROM medio where activo=true and defecto=true`); 
  if (response.rowCount>0) {
   return response.rows;
  }else{
    return [];
  }
}

// todo FALTA EN FUNCION
const GuardarUsuaMedio= async (usuario,medio) => {
  var res;
  params=[usuario,medio,true]
  console.log(params)
    db.query(`INSERT INTO usuario_medio(usuario_id,medio_id,activo)
    VALUES($1,$2,$3)`,params).then(resp=>{
       res=resp.rows;
    }).catch(err=>{
      res= err
    });
  
      console.log(res)
      return res;
  } 
  

  const getMedioId= async (medio) => {
    let params=[medio];
    console.log(params)
    const response= await db.query(`SELECT * FROM medio m 
    WHERE   m.medio_id=$1`,params); 
    if (response.rowCount>0) {
     return response.rows;
    }else{
      return [];
    }
  }

  const getUsuarioMedio= async (medio,usuario) => {
    let params=[medio,usuario];
    console.log(params)
    const response= await db.query(`SELECT * FROM usuario_medio m 
    WHERE   m.medio_id=$1 and m.usuario_id=$2`,params); 
    if (response.rowCount>0) {
     return response.rows;
    }else{
      return [];
    }
  }

  const updateUsuarioMedio= async (medio,usuario) => {
    let params=[true,medio,usuario];
    console.log(params)
    const response= await db.query(`UPDATE usuario_medio  set activo=$1 where 
    medio_id=$2 and usuario_id=$3`,params); 
    if (response.rowCount>0) {
     return response.rows;
    }else{
      return [];
    }
  }

  
module.exports={
    findAllMe,
    findAllMedio,
    GuardarMed,
    findUltimoId,
    findPrimerId,
    DeleteMed,
    findAllMedioDefect,
    GuardarUsuaMedio,
    getMedioId,
    getUsuarioMedio,
    updateUsuarioMedio
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