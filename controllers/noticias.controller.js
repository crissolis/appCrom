const med = require("./Utils/findAll");
const config = require("../config/config");
 mediosL=[];
// ?para natural

// var natural = require('natural');
// var Analyzer = require('natural').SentimentAnalyzer;
// var stemmer = require('natural').PorterStemmerEs;

// var dato={
//     noticias:[],
//     estado:Boolean,
//     sentimiento:Number
// }

const noticasCron=async ()=>{
  const promesas = [];
  var dato = {
    noticias: [],
    estado: Boolean,
    sentimiento: Number,
  };

  if (mediosL.length===0) {
    await med.findAllMe().then(async (resp) => {
      mediosL=resp;
      console.log(mediosL);
    }); 
  }else{

    console.log("wwwwwwwwwwwwwwwwwwwwwwwwww",mediosL)
     await mediosL.forEach((element) => {
    const newLocal = element["medio_name"];
    let params = { screen_name:newLocal, count:10, tweet_mode: 'extended' };
    console.log(element["medio_name"]);

    promesas.push(
      config.apliClient.get("statuses/user_timeline", params)
    );
  });

  Promise.all(promesas)
    .then(async (datos) => {
      datos.forEach(async(element) => {
        dato.noticias.push(element.data);
         await med .GuardarNoN(element.data)
        .then((notcias) => {
          console.log("XXXXXXXXXXXXXXXXXXXXXXXXX");
          // not.push(notcias);
        })
      });

      // dato.noticias.forEach(async(element) => {
      //   console.log(element);
      //    await med .GuardarNoN(element)
      //     .then((notcias) => {
      //       console.log("XXXXXXXXXXXXXXXXXXXXXXXXX");
      //       // not.push(notcias);
      //     })
      //     .catch((err) => console.log(err));
      // });
    
 

    })
    .catch((err) => {
      console.log(err)
    });
 }
    
}



const getNoticias = async (req, res) => {
  console.log("eeee")
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
  let pag = req.query.pag;
  const conslt = req.query.consultar;

  // console.log(pag)
  // console.log(medio)
  // console.log(conslt)

  pag = Number(pag) * npg;

  //?ULTIMOS IDES GENERADOS

  await med.findAllMe(medio).then((resp) => {
    resp.forEach(async (element) => {
      primerid.push(await med.findUltimoId(element["medio_id"]));
    });
  });

  //?CONSULTA PARA NUEVOS  Y EL HOME
  await med.findAllMe(medio).then(async (resp) => {
      if (conslt == "true") {
        console.log("-----------------------------------cosnult");
        if (ultimoid === undefined) {
          console.log("-----------------------------------ultimo");
          // console.log("--------------------------------"+ultimoid)
          var id = 0;

          await resp.forEach((element) => {
            var params = {};
            //   ultimoid.forEach(ele=>{
            //      if ((ele.medio_id===element["medio_id"])) {
            //        id=ele.id;
            //      }
            //   });
            const newLocal = element["medio_name"];
            console.log(element["medio_name"]);

            primerid.forEach((ele) => {
              if (ele.medio_id === element["medio_id"]) {
                id = ele.id;
                params = {
                  screen_name: newLocal,
                  count: 10,// numero de noticias a retornar
                  tweet_mode: "extended",
                  since_id: Number(id),
                };
              } else {
                params = {
                  screen_name: newLocal,
                  count: 10,// numero de noticias a retornar
                  tweet_mode: "extended",
                };
              }
            });

            //   let params = { screen_name:newLocal, count:1, tweet_mode: 'extended' };
            //  let params = { screen_name:newLocal, count:1, tweet_mode: 'extended',since_id:id};
              //console.log(params)
            promesas.push(
              config.apliClient.get("statuses/user_timeline", params)
            );
          });

          Promise.all(promesas)
            .then(async (datos) => {
               console.log(datos)
              datos.forEach((element) => {
                dato.noticias.push(element.data);
              });

              if (dato.noticias[0].length > 0) {
                //  console.log(dato.noticias);
                  dato.noticias.forEach((element) => {
                    console.log(element);
                    med.GuardarNot(element) 
                      .then((notcias) => {
                        console.log("eyyyyyyyyyyy");
                        // not.push(notcias);
                      })
                      .catch((err) => console.log(err));
                  });
                }
                else{
                    res.json({
                      status:'200',
                      mesagge:'No hay noticias nuevas' 
                    });
                }

              res.json({
               status:'200',
             mesagge:'Consulta realizada correctamente' 
              })
              //    console.log(dato.noticias)

           



            })
            .catch((err) => {
              res.json({
                  err
                });
            });
        } else {
            console.log("--------------------------------------------------else");
          await resp.forEach((element) => {
            var params = {};
            const newLocal = element["medio_name"];
            //   let params = { screen_name:newLocal, count:1, tweet_mode: 'extended' };
            params = {
              screen_name: newLocal,
              count: 30,
              tweet_mode: "extended",
              max_id: ultimoid,
            };
            //    console.log(params)
            promesas.push(
              config.apliClient.get("statuses/user_timeline", params)
            );
          });

          Promise.all(promesas)
            .then(async (datos) => {
              //  console.log(datos)
              datos.forEach((element) => {
                dato.noticias.push(element.data);
              });

              //    console.log(dato.noticias)

              if (dato.noticias[0].length > 0) {
                console.log(dato.noticias);
                dato.noticias.forEach((element) => {
                  console.log(element);
                  med
                    .GuardarNot(element)
                    .then((notcias) => {
                      console.log("444444444444444444444444444");
                      // not.push(notcias);
                    })
                    .catch((err) => console.log(err));
                });
              }
              res.json({
                status:'200',
            mesagge:'Consulta realizada correctamente' 
            })

            })
            .catch((err) => {
              res.json({
                err,
              });
            });

          
        }
      } else {
        med
          .findAllNot(medio, pag)
          .then((not) => {
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
  if (tipo===undefined) {
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
  }

}

// const getNoticias= async (req,res)=>{
//     var dato={
//         noticias:[],
//         estado:Boolean,
//         sentimiento:Number
//     }
//     const promesas = [];
//     const npg=20;
//     not=[];
//     const ultimoid=[];
//     const medio=req.query.medio;
//     let pag=req.query.pag;
//     const conslt=req.query.consultar;

//     // console.log(pag)
//     // console.log(medio)
//     // console.log(conslt)

//       pag=Number(pag)*npg;

//         //?ULTIMOS IDES GENERADOS
//     if (conslt=="true") {
//         console.log("entro")
//         await  med.findAllMe(medio).then((resp)=>{
//             resp.forEach( async element => {
//                 ultimoid.push(await med.findUltimoId(element["medio_id"]))
//           });
//         });

//         med.findAllMe(medio).then((resp)=>{
//             var id=0;
//             resp.forEach(  element => {

//           ultimoid.forEach(ele=>{
//              if ((ele.medio_id===element["medio_id"])) {
//                id=ele.id;
//              }
//           });

//             // let id=await med.findUltimoId(element["medio_id"]);
//                console.log(id)
//                 const newLocal = element["medio_name"];
//              //   let params = { screen_name:newLocal, count:1, tweet_mode: 'extended' };
//              let params = { screen_name:newLocal, count:1, tweet_mode: 'extended',since_id:id};
//             //   console.log(params)
//              promesas.push(config.apliClient.get('statuses/user_timeline', params));
//             });

//                   Promise.all(promesas).then(async datos=>{
//                     //  console.log(datos)
//                     datos.forEach(element=>{

//                         dato.noticias.push(element.data)

//                     });

//                         //    console.log(dato.noticias)

//                   if (dato.noticias[0].length>0) {
//                      console.log(dato.noticias)
//                    dato.noticias.forEach(element=>{
//                         console.log(element)
//                         med.GuardarNot(element).then(notcias=>{
//                             console.log("eyyyyyyyyyyy");
//                             // not.push(notcias);
//                         }).catch(err=>console.log(err));
//                     });
//                   }

//                   await  med.findAllNot(medio,pag).then(not=>{
//                        console.log("cdcccdcdcdcd")

//                         res.json(
//                          {status:"200",
//                         noticias:not}
//                         )
//                     }).catch(err=>res.json(err));
//                 //   }
//                             //     // Mandar a guardar

//                             //     //  var txt=String(element[0].full_text);
//                             //     //  txt=txt.replace(/<a\b[^>]*>(.*?)<\/a>/i,"");
//                             //     //  console.log(txt)
//                             //     //  txt=tokenizer.tokenize(element[0].full_text);

//                             //     // console.log (analyzer.getSentiment(txt))

//                     //  res.json(
//                     //    {
//                     //     dato,
//                     //     not
//                     //    });

//                 }).catch(err=>{
//                     res.json(err)
//                   });

//         }).catch(err=>{
//             res.json(err)
//         });

//     }else{

//         med.findAllNot(medio,pag).then(not=>{
//             res.json(
//              {status:"200",
// 	     noticias:not}
//             )
//         }).catch(err=>res.json(err));
//     }
//     // var tokenizer = new natural.AggressiveTokenizerEs;
//     // var analyzer = new Analyzer("Spanish", stemmer, "senticon");

// }

module.exports = {
  getNoticias,
  getReporte,
  noticasCron
};
