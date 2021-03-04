const med = require("./Utils/Dbnoticias");
const MedioDB = require("./Utils/Dbmedio");
const config = require("../config/config");
 mediosL=[];
// ?para natural


const noticasCron=async ()=>{
  const promesas = [];
  const primerid = [];
  let params={};
  var dato = {
    noticias: [],
    estado: Boolean,
    sentimiento: Number,
  };

  if (mediosL.length===0) {
    await MedioDB.findAllMedio(undefined,undefined).then(async (resp) => {
      mediosL=resp;
      // console.log(mediosL);
    }); 
  }else{

    
     await mediosL.forEach(async (element) => {
        let r=await MedioDB.findUltimoId(element["medio_id"]);
        if (r.length>0) {
          primerid.push(r);
        } 
      });
  


     console.log(primerid)
     await mediosL.forEach((element) => {
     
      if (primerid.length!==0) {
        primerid.forEach((ele) => {
          if (ele.medio_id === element["medio_id"]) {
            id = ele.id;
            params = {
              screen_name: newLocal,
              count: 20, // numero de noticias a retornar
              tweet_mode: "extended",
              since_id: Number(id),
            };
          } 
        });
      }else{
        const newLocal = element["medio_name"];
         params = { screen_name:newLocal, count:10, tweet_mode: 'extended' };
        console.log(element["medio_name"]);
      }

    promesas.push(
      config.apliClient.get("statuses/user_timeline", params)
    );
  });

  await Promise.all(promesas)
    .then( (datos) => {
      datos.forEach((element) => {
        // console.log(element.data)
        element.data.forEach(ele=>{
          dato.noticias.push(ele);
        });
        
      });
    })
    .catch((err) => {
      console.log(err)
    });

for await (d of dato.noticias) {
  console.log( await med.GuardarNot(d));
   console.log(d);
}

 }
    
}



const getNoticias = async (req, res) => {
 
  var dato = {
    noticias: [],
    estado: Boolean,
    sentimiento: Number,
  };
  const promesas = [];
  const npg = 5;
  not = [];
  const primerid = [];
  const ultimoid = req.query.ultimoid;
  const medio = req.query.medio;
  const usuario=req.query.usuario;
  let pag = req.query.pag;
  const conslt = req.query.consultar;

  // console.log(usuario);
  // console.log(pag)
  // console.log(medio)
  // console.log(conslt)

  pag = Number(pag) * npg;

  //?ULTIMOS IDES GENERADOS

  await MedioDB.findAllMe(medio,usuario).then((resp) => {
    if (res.length>0) {
      resp.forEach(async (element) => {
        let r=await MedioDB.findUltimoId(element["medio_id"]);
        if (r) {
          primerid.push(r);
        } 
      });
    }  
  });

  
  //?CONSULTA PARA NUEVOS  Y EL HOME
  await MedioDB
    .findAllMe(medio,usuario)
    .then(async (resp) => {
      //  console.length(resp)
      if (conslt == "true" && resp.length>0) {
        console.log("-----------------------------------cosnult");
        if (ultimoid === undefined) {
          console.log("-----------------------------------ultimo");
          var id = 0;
          await resp.forEach((element) => {
            var params = {};
            const newLocal = element["medio_name"];
            // console.log(element["medio_name"]);
            // console.log(ultimoid)
            if (primerid.length!==0) {
              primerid.forEach((ele) => {
                if (ele.medio_id === element["medio_id"]) {
                  id = ele.id;
                  params = {
                    screen_name: newLocal,
                    count: 10, // numero de noticias a retornar
                    tweet_mode: "extended",
                    since_id: Number(id),
                  };
                } 
              });
            }else {
              params = {
                screen_name: newLocal,
                count: 5, // numero de noticias a retornar
                tweet_mode: "extended",
              };
            }
          

            //   let params = { screen_name:newLocal, count:1, tweet_mode: 'extended' };
            //  let params = { screen_name:newLocal, count:1, tweet_mode: 'extended',since_id:id};
            // console.log("parametros"+params)
            promesas.push(
              config.apliClient.get("statuses/user_timeline", params)
            );
          });

          await Promise.all(promesas)
            .then((datos) => {
              datos.forEach((element) => {
                // console.log(element.data)
                element.data.forEach((ele) => {
                  dato.noticias.push(ele);
                });
              });
            })
            .catch((err) => {
              console.log(err);
              res.json({
                err,
              });
            });

          if (dato.noticias.length > 0) {
            for await (d of dato.noticias) {
              console.log("linw"+await med.GuardarNot(d));
              // console.log(d);
            }
          } else {
            res.json({
              status: "200",
              mesagge: "No hay noticias nuevas",
            });
          }

          res.json({
            status: "200",
            mesagge: "Consulta realizada correctamente x",
          });
        } else {
          console.log(" ey--------------------------------------------------else");
          // console.log(resp)
          await resp.forEach((element) => {
            var params = {};
            const newLocal = element["medio_name"];
            //   let params = { screen_name:newLocal, count:1, tweet_mode: 'extended' };
            params = {
              screen_name: newLocal,
              count: 5,
              tweet_mode: "extended",
              max_id: ultimoid,
            };
            //    console.log(params)
            promesas.push(
              config.apliClient.get("statuses/user_timeline", params)
            );
          });

          await Promise.all(promesas)
            .then((datos) => {
              datos.forEach((element) => {
                // console.log(element.data)
                element.data.forEach((ele) => {
                  dato.noticias.push(ele);
                });
              });
            })
            .catch((err) => {
              console.log(err);
              res.json({
                err,
              });
            });

            if (dato.noticias.length > 0) {
              for await (d of dato.noticias) {
                 med.GuardarNot(d);
                // console.log(d);
              }
            } else {
              res.json({
                status: "200",
                mesagge: "No hay noticias nuevas",
              });
            }
  
            res.json({
              status: "200",
              mesagge: "Consulta realizada correctamente",
            });


        }
      } else { 
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        med 
          .findAllNot(medio, pag,usuario)
          .then((not) => {
        // console.log(not)
            res.json({ status: "200", noticias: not });
          })
          .catch((err) => res.json(err));
      }
    })
    
    .catch((err) => {
      res.json(err);
    });
};

const getReporte= async (req,res)=>{

  const medio = req.query.medio;
  const  fechaInicio = req.query.inicio;
  const fechaFin = req.query.fin;
   const tipo=req.query.tipo;

  console.log(fechaInicio,fechaFin)
  console.log(tipo)
  if (tipo==='undefined') {
    med.findNoticiasFecha(fechaInicio,fechaFin,medio).then(resp=>{
      if (resp.rows.length>0) {
        res.json({
          mesagge:'consulta correcta',
          status:'200',
          cantidad:resp.rowCount,
          noticias:resp.rows,
        });
      }else{
        res.json({
          mesagge:'no existen datos con el rango de fechas indicado',
          status:'200',
          resp
        });
      }
    });
  }else{
    console.log('el eslse  perrp',tipo);

    med.findNoticiasFecha(fechaInicio,fechaFin,medio,tipo).then(resp=>{
      console.log(fechaInicio,fechaFin)
      if (resp.rowCount>0) {
        res.json({
          mesagge:'consulta correcta',
          status:'200',
          cantidad:resp.rowCount,
          noticias:resp.rows,
        });
      }else{
        res.json({
          mesagge:'no existen datos con el rango de fechas indicado',
          status:'200',
          resp
        });
      }
    });
  }

}


const getNoticiaFav= async (req,res)=>{
  let usuario=req.query.usuario;
  console.log(usuario)
  med.getFavoritos(usuario).then(resp=>{
    res.json({
      status:'200',
      mesagge:'noticias recuperados correctamente',
      noticias:resp
    });
  });
}

const deleteNoticiaFav= async (req,res)=>{
  let usuario=req.query.usuario;
  let noticia=req.query.noticia;
  console.log(usuario,noticia)
  med.borrarFavorito(noticia,usuario).then(resp=>{
    res.json({
      status:'200',
      mesagge:'noticia eliminada de favoritos',
      noticias:resp
    });
  });
}

const saveNoticiaFav= async (req,res)=>{
  let usuario=req.query.usuario;
  let noticia=req.query.noticia;
  med.saveFavorito(noticia,usuario).then(resp=>{
    res.json({
      status:'200',
      mesagge:'noticia agregada a favoritos',
      noticias:resp
    });
  });
}


const getPrueba= async (req,res)=>{
  med.retornarFucion().then(r=>{

  })
}




module.exports = {
  getNoticias,
  getReporte,
  noticasCron,
  getPrueba,
  getNoticiaFav,
  deleteNoticiaFav,
  saveNoticiaFav
};
