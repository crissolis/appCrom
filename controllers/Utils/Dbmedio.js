const db = require('../../db/index');
// var natural = require('natural');
// var Analyzer = require('natural').SentimentAnalyzer;
// var stemmer = require('natural').PorterStemmerEs;

const e = require('express');

// YA ESTA SUS FUNCIONES findmediousuario and findmediousuario2
const findAllMe= async (medio,usuario) => {
  if (medio===undefined) {
    try {
      let params=[usuario];
    //   const response = await db.query(`SELECT * FROM medio  m 
    //   LEFT  JOIN usuario_medio u
    //  ON m.medio_id = u.medio_id
    //  WHERE u.usuario_id=$1 and m.activo=true and u.activo=true`,params);
    const response = await db.query(`SELECT * FROM findmediousuario($1)`,params);
    //  console.log(response);
      if (response.rowCount > 0) {
      
        return response.rows;
      }
    } catch (error) {
      return error;
    }

  } else {
    try {
     let params=[usuario,medio]
  //     const response = await db.query(`SELECT * FROM medio  m 
  //  LEFT  JOIN usuario_medio u
  // ON m.medio_id = u.medio_id
  // WHERE u.usuario_id=$1 and m.activo=true AND m.medio_id=$2 and u.activo=true`,params);
  const response = await db.query(`SELECT * FROM findmediousuario2($1,$2)`,params);
      if (response.rowCount > 0) {
        return response.rows;
      }
    } catch (error) {
      // console.log(error)
      return error;
    }
  }


}   
  
// YA ESTA SUS FUNCIONES DeleteMed
const DeleteMed= async (medio,usuario) => {
  if (medio) {
    try {
      // let params=[false,medio,usuario]
      let params=[medio,usuario]
      // const response = await db.query(`UPDATE usuario_medio  set activo=$1 where 
      // medio_id=$2 and usuario_id=$3 `,params);
      const response = await db.query(`SELECT * FROM DeleteMed($1,$2)`,params);
 
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
// YA ESTA SUS FUNCIONES GuardarMed
const GuardarMed= async (params) => {
var res;
  db.query(`SELECT * FROM GuardarMed($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,params).then(resp=>{
     res=resp.rows;
    console.log(resp);
  }).catch(err=>{
    res= err
  });

    console.log("wwwwwwwwwwwwwwwwwwwwwwwww "+res)
    return res;
} 

const findAllMedio= async (medio,usuario) => {
  console.log("entraaqui ")
  if (medio===undefined) {
    try {
      let params=[usuario];
      const response = await db.query(`SELECT * FROM medio  m 
      LEFT  JOIN usuario_medio u
     ON m.medio_id = u.medio_id
     WHERE u.usuario_id=$1 and m.activo=true and u.activo=true `,params);
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

// YA ESTA SUS FUNCIONES findprimeridmedio  
const  findPrimerId= async (medio) =>{
  let id=medio ;
  let params=[id];

  // const response= await db.query(`SELECT * from noticia n
  //  WHERE n.medio_id=$1
  //  ORDER BY n.fecha_creacion ASC  limit 1`,params); 
  const response = await db.query(`SELECT * FROM findprimeridmedio($1)`,params);
  if (response.rowCount>0) {
    console.log(response.rows)
    return response.rows[0];
  }else{
    return [];
  }
}

// YA ESTA SUS FUNCIONES findallmediodefecto  
const findAllMedioDefect= async () => {
  // let params=[];
  // const response= await db.query(`SELECT * FROM medio where activo=true and defecto=true`); 
  const response = await db.query(`SELECT * FROM findallmediodefecto()`);
  if (response.rowCount>0) {
   return response.rows;
  }else{
    return [];
  }
}

// YA ESTA SUS FUNCIONES GuardarUsuaMedio 
const GuardarUsuaMedio= async (usuario,medio) => {
  var res;
  params=[usuario,medio]
  console.log(params) 
    await db.query(`SELECT * FROM GuardarUsuaMedio($1,$2)`,params).then(resp=>{
       res=resp.rows;
    }).catch(err=>{
      res= err
    });
  
      console.log(res)
      return res;
  } 
  
// YA ESTA SUS FUNCIONES findmedioid  
  const getMedioId= async (medio) => {
    let params=[medio];
    console.log(params)
    // const response= await db.query(`SELECT * FROM medio m 
    // WHERE   m.medio_id=$1`,params); 
  const response = await db.query(`SELECT * FROM findmedioid($1)`,params);
    if (response.rowCount>0) {
     return response.rows;
    }else{
      return [];
    }
  }

  // YA ESTA SUS FUNCIONES getUsuarioMedio  
  const getUsuarioMedio= async (medio,usuario) => {
    let params=[medio,usuario];
    console.log(params)
    // const response= await db.query(`SELECT * FROM usuario_medio m 
    // WHERE   m.medio_id=$1 and m.usuario_id=$2`,params); 
    const response = await db.query(`SELECT * FROM getUsuarioMedio($1,$2)`);
    if (response.rowCount>0) {
     return response.rows;
    }else{
      return [];
    }
  }

  // YA ESTA SUS FUNCIONES updateUsuarioMedio  
  const updateUsuarioMedio= async (medio,usuario) => {
    let params=[true,medio,usuario];
    console.log(params)
    // const response= await db.query(`UPDATE usuario_medio  set activo=$1 where 
    // medio_id=$2 and usuario_id=$3`,params); 
    const response = await db.query(`SELECT * FROM updateUsuarioMedio($2,$1)`,params);
    if (response.rowCount>0) {
     return response.rows;
    }else{
      return [];
    }
  }


  const ActualizarMedios=async (medio)=>{
    let params=[
      medio.location,
      medio.description,
      medio.url,
      medio.profile_image_url,
      medio.profile_banner_url,
      medio.id
    ];
    const response= await db.query(`UPDATE medio  set
    location=$1,
    description=$2,
     url=$3,
     imagen_url=$4,
     banner_url=$5
     where 
    medio_id=$6`,params); 
    // const response = await db.query(`SELECT * FROM updateUsuarioMedio($2,$1)`,params);
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
    updateUsuarioMedio,
    ActualizarMedios
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