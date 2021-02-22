const db = require('../../db/index');
var natural = require('natural');
var Analyzer = require('natural').SentimentAnalyzer;
var stemmer = require('natural').PorterStemmerEs;
const { json } = require('body-parser');


const findAllNot= async (medio,pagina,usuario) => {
    if (medio===undefined) {
      try {
        var params=[pagina,usuario]
        const response = await db.query(`SELECT * FROM noticia n LEFT  JOIN usuario_medio u
        JOIN medio m ON m.medio_id = u.medio_id 
        ON n.medio_id = u.medio_id WHERE u.usuario_id=$2 and m.activo=true and u.activo=true
         ORDER BY  n.fecha_creacion DESC limit $1`,params);
        if (response.rowCount > 0) {
          return response.rows;
        }
      } catch (error) {
        return error;
      } 
  
    } else {
      try {
       var params=[medio,pagina,usuario]
       console.log(params)
        const response = await db.query(`SELECT * FROM noticia n LEFT JOIN usuario_medio u
        JOIN medio m ON m.medio_id = u.medio_id 
        ON n.medio_id = u.medio_id WHERE u.usuario_id=$3 AND n.medio_id=$1
         ORDER BY n.fecha_creacion DESC limit $2`,params);
        //  console.log(response)
        if (response.rowCount > 0) {
          return response.rows;
        }
      } catch (error) {
        return error;
      }
    }
  }
  const GuardarNot= async (noticias) => {
  
    console.log("ENTRO AQUI")
  
    var tokenizer = new natural.AggressiveTokenizerEs;
    // AFINN
    var analyzer = new Analyzer("Spanish", stemmer, "senticon"); 
    // if (noticias!==undefined) {
  
      var id= noticias.id;
      const regex = /https:/gi;
      const responseN = await db.query(`SELECT * FROM noticia WHERE 
      activo=true and id=${id}`);
  
      // console.log(responseN.rowCount)
      if (responseN.rowCount==0) {
       var not=0;
      // Guardo los datos
      var txt="" ;
      var porcentaje=0;    
      var medio_id=noticias.user.id; 
      var fechaCreacion=noticias.created_at;
      var texto=noticias.full_text;
       var url="";
        
       console.log(texto)
       if (noticias.entities.urls[0]!==undefined) {
  
        if (noticias.entities.urls[0].url!==undefined) {
          url=noticias.entities.urls[0].url
           }else{
             if (noticias.retweeted_status.entities.urls[0].url!==undefined) {
                url=noticias.retweeted_status.entities.urls[0].url
             }else{
              url=noticias.extended_entities.media[0].url
             }
           }
       }
  
  
  
      if (noticias.entities.media!==undefined) {
      var media_url=noticias.entities.media[0].media_url || ""; 
      
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
  
      try {
         resp= await  db.query(`INSERT INTO noticia(id,fecha_creacion,contenido,noticia_url,media_url,porcentaje,medio_id,activo)
        VALUES($1,$2,$3,$4,$5,$6,$7,$8)`,params); 
        console.log(resp)
        if (resp.rowCount>0) {
          return resp.rowCount;
        }else{
          return []
        }
      } catch (error) {
        // console.log(error)
        return error;
      }
      //  .then(res=>{
      //   not=not+res.rowCount;
      //   console.log(res.rowCount);
      //  }).catch(err=>{
      //    console.log(err);
      //  });
      // }
  
    }else{
      return []
    }
  }

  const GuardarNoN= async (noticias) => {
    var tokenizer = new natural.AggressiveTokenizerEs;
    // AFINN  senticon afinn
    var analyzer = new Analyzer("Spanish", stemmer, "senticon"); 
  
    
    
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
      // porcentaje=porcentaje.toFixed(4);
      porcentaje= Math.round(porcentaje * 100) / 100;
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
    
    }
    
  }

  const retornarFucion= async () => {
    const response= await db.query(`SELECT * FROM findmedios()`);
    console.log(response)
    return response
  }


  module.exports={
    
    findAllNot,
    GuardarNot,
    findNoticiasFecha,
    GuardarNoN,
    retornarFucion
}