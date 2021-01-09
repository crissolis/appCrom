const db = require('../../db/index');
var natural = require('natural');
var Analyzer = require('natural').SentimentAnalyzer;
var stemmer = require('natural').PorterStemmerEs;

const e = require('express');


const findAllMe= async (medio) => {
  if (medio===undefined) {
    try {
      const response = await db.query(`SELECT * FROM medio WHERE activo=true`);
      if (response.rowCount > 0) {
    console.log('hola');
        return response.rows;
      }
    } catch (error) {
      return error;
    }

  } else {
    try {
     let params=[medio]
      const response = await db.query(`SELECT * FROM medio WHERE activo=true and medio_id=$1`,params);
      if (response.rowCount > 0) {
        return response.rows;
      }
    } catch (error) {
      console.log(error)
      return error;
    }
  }


  
  // try {
  //     // console.log(consul.toLowerCase);
  //  const response=await db.query(`SELECT * FROM ${tabla} WHERE activo=true`);
  // //  const response=await db.query(`SELECT * FROM ${tabla} `);
  //  if (response.rows.length>0) {
  //    res.json({
  //      status:'200',
  //      tabla,
  //      response:response.rows
  //    });
  // }
  // } catch (error) { 
  //     const consul=toString(act);
  //     res.json({ 
  //         status:'400',
  //         tabla,
  //         error,
  //         mesagge:'no found'
  //       })  
  // }
}   
  

const findAllNot= async (medio,paguina) => {

  if (medio===undefined) {
    try {
      var params=[paguina]
      const response = await db.query(`SELECT * FROM noticia n
      LEFT JOIN  medio m ON m.medio_id=n.medio_id 
      WHERE n.activo=true ORDER BY  n.fecha_creacion DESC limit $1`,params);
      if (response.rowCount > 0) {
        return response.rows;
      }
    } catch (error) {
      return error;
    } 

  } else {
    try {
     var params=[medio,paguina]
      const response = await db.query(`SELECT * FROM noticia n
      LEFT JOIN  medio m ON m.medio_id=n.medio_id  WHERE n.activo=true
      AND n.medio_id=$1 ORDER BY n.fecha_creacion DESC limit $2`,params);
      if (response.rowCount > 0) {
        return response.rows;
      }
    } catch (error) {
      return error;
    }
  }
}
const GuardarNot= async (noticias) => {

  var tokenizer = new natural.AggressiveTokenizerEs;
  // AFINN
  var analyzer = new Analyzer("Spanish", stemmer, "senticon"); 
  // if (noticias!==undefined) {

    var id= noticias[0].id;
    const regex = /https:/gi;
    const responseN = await db.query(`SELECT * FROM noticia WHERE 
    activo=true and id=${id}`);

    // console.log(responseN.rowCount)
    if (responseN.rowCount==0) {
     var not=0;
    // Guardo los datos
    var txt="" ;
    var porcentaje=0;    
    var medio_id=noticias[0].user.id; 
    var fechaCreacion=noticias[0].created_at;
    var texto=noticias[0].full_text;
     var url="";

     if (noticias[0].entities.urls[0]!==undefined) {

      if (noticias[0].entities.urls[0].url!==undefined) {
        url=noticias[0].entities.urls[0].url
         }else{
           if (noticias[0].retweeted_status.entities.urls[0].url!==undefined) {
              url=noticias[0].retweeted_status.entities.urls[0].url
           }else{
            url=noticias[0].extended_entities.media[0].url
           }
         }
     }



    if (noticias[0].entities.media!==undefined) {
    var media_url=noticias[0].entities.media[0].media_url || ""; 
    
    }else{
      media_url="";
    }
    
    let l=  texto.search(regex);
    let txf =texto.slice(0,(l-2));
	// console.log(txf)
   txt= tokenizer.tokenize(txf);
    porcentaje=analyzer.getSentiment(txt);
    //  console.log(porcentaje);
    porcentaje=porcentaje.toFixed(4);
    porcentaje=Number(porcentaje);

    //  console.log(id,fechaCreacion,texto,url,media_url,porcentaje,medio_id);
    var params=[id,fechaCreacion,texto,url,media_url,porcentaje,medio_id,true];

  return  db.query(`INSERT INTO noticia(id,fecha_creacion,contenido,noticia_url,media_url,porcentaje,medio_id,activo)
     VALUES($1,$2,$3,$4,$5,$6,$7,$8)`,params);
    //  .then(res=>{
    //   not=not+res.rowCount;
    //   console.log(res.rowCount);
    //  }).catch(err=>{
    //    console.log(err);
    //  });
    // }

  }
return  not;
}



/////////////////////////////////////
const GuardarNoN= async (noticias) => {
  var tokenizer = new natural.AggressiveTokenizerEs;
  // AFINN  senticon
  var analyzer = new Analyzer("Spanish", stemmer, "afinn"); 

  
  
    var id= noticias[0].id;
    const regex = /https:/gi;
    const responseN = await db.query(`SELECT * FROM noticia WHERE 
    activo=true and id=${id}`);

    // console.log(responseN.rowCount)
    if (responseN.rowCount==0) {
     var not=0;
    // Guardo los datos
    var txt="" ;
    var porcentaje=0;    
    var medio_id=noticias[0].user.id; 
    var fechaCreacion=noticias[0].created_at;
    var texto=noticias[0].full_text;
     var url="";

     if (noticias[0].entities.urls[0]!==undefined) {

      if (noticias[0].entities.urls[0].url!==undefined) {
        url=noticias[0].entities.urls[0].url
         }else{
           if (noticias[0].retweeted_status.entities.urls[0].url!==undefined) {
              url=noticias[0].retweeted_status.entities.urls[0].url
           }else{
            url=noticias[0].extended_entities.media[0].url
           }
         }
     }



    if (noticias[0].entities.media!==undefined) {
    var media_url=noticias[0].entities.media[0].media_url || ""; 
    
    }else{
      media_url="";
    }
    
    let l=  texto.search(regex);
    let txf =texto.slice(0,(l-2));
	  console.log(txf)
   txt= tokenizer.tokenize(txf);
    porcentaje=analyzer.getSentiment(txt);
    //  console.log(porcentaje);
    porcentaje=porcentaje.toFixed(4);
    porcentaje=Number(porcentaje);

    //  console.log(id,fechaCreacion,texto,url,media_url,porcentaje,medio_id);
    var params=[id,fechaCreacion,texto,url,media_url,porcentaje,medio_id,true];

  return  db.query(`INSERT INTO noticia(id,fecha_creacion,contenido,noticia_url,media_url,porcentaje,medio_id,activo)
     VALUES($1,$2,$3,$4,$5,$6,$7,$8)`,params);
    //  .then(res=>{
    //   not=not+res.rowCount;
    //   console.log(res.rowCount);
    //  }).catch(err=>{
    //    console.log(err);
    //  });
    // }

  }
  
   
}








const GuardarMed= async (params) => {
var res;
  db.query(`INSERT INTO medio(medio_id,medio_name,nombre,url,location,description,imagen_url,banner_url,activo)
  VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)`,params).then(resp=>{
     res=resp.rows;
    console.log(resp);
  }).catch(err=>{
    res= err});

    console.log(res)
    return res;
}

const findAllMedio= async () => {
  const response= await db.query(`SELECT * FROM medio where activo=true`); 
  if (response.rowCount>0) {
   return response.rows;
  }else{
    return [];
  }
}


 const  findUltimoId= async (medio) =>{
  let id=medio ;
  let params=[id];
  const response= await db.query(`SELECT * from noticia n WHERE n.medio_id=$1
   ORDER BY n.fecha_creacion DESC   limit 1`,params); 
  if (response.rowCount>0) {
    return response.rows[0];
  }else{
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
 
const  findNoticiasFecha= async (fechaInicio,fechaFin,medio,tipo) =>{
  let params=[];
  console.log(tipo);
  
  let i=new Date(fechaInicio);
  let f=new Date(fechaFin);
  console.log(medio)
  if (tipo===undefined) {
    if (medio!==undefined) {
      params=[medio,fechaInicio,fechaFin];
      const response= await db.query(`SELECT * from noticia n
      LEFT JOIN  medio m ON m.medio_id=n.medio_id  WHERE n.activo=true AND 
      n.medio_id=$1 AND
      n.fecha_creacion  BETWEEN $2 AND $3
      ORDER BY n.fecha_creacion ASC `,params); 
     if (response.rowCount>0) {
       console.log(response.rows)
       return response;
     }else{
       return [];
     }
  
    }else{
      params=[i,f];
      const response= await db.query(`SELECT * from noticia n 
      LEFT JOIN  medio m ON m.medio_id=n.medio_id  WHERE n.activo=true AND 
       n.fecha_creacion  BETWEEN  $1 AND $2
      ORDER BY n.fecha_creacion ASC `,params);
     if (response.rowCount>0) {
      return response;
     }else{
       return [];
     }
    }
  }else{
    if (medio!==undefined) {
      console.log(tipo);
      params=[medio,fechaInicio,fechaFin];
      const response= await db.query(`SELECT * from noticia n
      LEFT JOIN  medio m ON m.medio_id=n.medio_id  WHERE n.activo=true AND 
      n.medio_id=$1 AND
      n.fecha_creacion 
       BETWEEN $2 AND $3
      ORDER BY n.porcentaje ${tipo} LIMIT 3`,params); 
     if (response.rowCount>0) {
       console.log(response.rows)
       return response;
     }else{
       return [];   
     }
  
    }
    // else{
    //   params=[i,f];
    //   const response= await db.query(`SELECT * from noticia n WHERE 
    //    n.fecha_creacion  BETWEEN  $1 AND $2
    //   ORDER BY n.fecha_creacion ASC `,params);
    //  if (response.rowCount>0) {
    //   return response;
    //  }else{
    //    return [];
    //  }
    // }
  }
  
}

module.exports={
    findAllMe,
    findAllNot,
    findAllMedio,
    GuardarNot,
    GuardarMed,
    findUltimoId,
    findPrimerId,
    findNoticiasFecha,

    GuardarNoN
}