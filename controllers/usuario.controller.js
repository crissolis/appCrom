// const config = require('../config/config')

// let lugares=['ecuavisa','teleamazonasec','@EcuavisaInforma','eluniversocom','Expresoec','elcomerciocom'];
// not=[];

// function devolnoticias() {
 
//   for (const key in lugares) {
//     let params = { screen_name: 'ecuavisa', count: 1, tweet_mode: 'extended' };

//    config.apliClient.get('statuses/user_timeline', params)
//   }

// }


//?para IBM
 
// const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
// const { IamAuthenticator } = require('ibm-watson/auth');

// const toneAnalyzer = new ToneAnalyzerV3({
//   version: '2017-09-21',
//   authenticator: new IamAuthenticator({
//     apikey: 'eFYGp388wIuEBbLqZtwqUuJL7WBc_MHBvNZmago8-jF-',
//   }),
//   serviceUrl: 'https://api.us-south.tone-analyzer.watson.cloud.ibm.com',
//   headers: {
//     'X-Watson-Learning-Opt-Out': 'true'
//   }
  
// });

// ?para natural


var natural = require('natural');
var Analyzer = require('natural').SentimentAnalyzer;
var stemmer = require('natural').PorterStemmerEs;
 const getUsers= async (req,res)=>{
 
  var tokenizer = new natural.AggressiveTokenizerEs;
  var analyzer = new Analyzer("Spanish", stemmer, "afinn");

  var txt=tokenizer.tokenize("Corte Constitucional desestima una acción de protección, en medio de una demanda por daño moral");

  res.json(
    analyzer.getSentiment(txt)
  )
  
// Buscar contenido por diarios
  // const params={screen_name:'ecuavisa',count:5,tweet_mode:'extended'};
  // config.apliClient.get('statuses/user_timeline',params).then(resp=>{
  //   res.json({
  //     status:'200',
  //     response:resp
  //   });
  // }).catch(err=>{
  //   res.json({
  //     status:'400',
  //     mesagge:err 
  //   })
  // });

// Buscar contenido por diarios
// const promesas = [];
//    for (const key in lugares) {
//      const newLocal = lugares[key];
//     let params = { screen_name:newLocal, count:1, tweet_mode: 'extended' };
//    promesas.push(config.apliClient.get('statuses/user_timeline', params));
//   }
//   Promise.all(promesas).then(datos=>{
//     console.log('-------')
//     not.push(datos);
//     res.json(not)
//   }).catch(err=>{
//     res.json(err)
//   });
// }


  // ------------------BUSQUEDA POR CIUDAD
// guayaquil 375733
// quito 375732
  // const params={count:5,tweet_mode:'extended',id:375732};
  // config.apliClient.get('trends/place',params).then(resp=>{
  //   res.json({
  //     status:'200',
  //     response:resp
  //   });
  // }).catch(err=>{
  //   res.json({
  //     status:'400',
  //     mesagge:err 
  //   })
  // });


//   const params={count:100,tweet_mode:'extended',q:'quito'};
//   config.apliClient.get('search/tweets',params).then(resp=>{

    // data.forEach(twitter => {
    //  if (twitter.user.screen_name==="WilsonGSalazar");
    //  console.log(twitter);
    // });
//     let tws=[];
//     let lugares=["ecuavisa","teleamazonas","eluniversocom","Expresoec,elcomerciocom"];

//     try {   
// for (const t in resp.data.statuses) {
//   let user;
//   let tw;
//  user=resp.data.statuses[t].user;
//  tw=resp.data.statuses[t];
//  console.log(typeof(user.screen_name));
 
//  lugares.find(lugar=>{
//    console.log(user.screen_name);
//    if (lugar===user.screen_name) {
//     tws.push(tw);
//     console.log("---------------entro--------------------")
//    }
//  });
 
// }
   // res.json(tws);
 // res.json(resp.data.statuses);

//     } catch (error) {
//       console.log(error)
//     }
 

//   }).catch(err=>{
//     res.json({
//       status:'400',
//       mesagge:err 
//     })
//   });


 }



  // const createUser= async (req,res)=>{
  //     const {nombre, apellido,super_administrador,avatar,correo,perfil_id}=req.body;
  //     const response= await  db.query('INSERT INTO usuario(nombre,apellido,super_administrador,activo,avatar,'
  //     +'correo,perfil_id) VALUES($1,$2,$3,$4,$5,$6,$7)',[nombre, apellido,super_administrador,true,avatar,correo,perfil_id]);
  //     console.log(response);
  //     res.json({
  //         message:"guardado",
  //         body:{
  //             user:{
  //                 nombre, apellido,super_administrador,avatar,correo,perfil_id 
  //                 }
  //         }
  //     });
    
  //   };

  // const getUserById= async (req,res)=>{
  //   try {
  //     const id=req.params.id;
  //     const response= await db.query('SELECT * FROM usuario WHERE usuario_id=$1',[id]);
  //     console.log(response.rows);
  //     res.status(200).json(response.rows);
  //   } catch (err) {
  //     res.json({
  //       status:"400",
  //       ...err
  //     })
  //   }
 
  
  // }

  // const getDelete= async (req,res)=>{
  //   try {
  //     const id =req.params.id;
  //   const response=await db.query('UPDATE usuario SET activo=false WHERE usuario_id=$1',[id]) ;
  //   res.json({
  //     message:"Boarrado",
  //     status:"200"   
  //   });
  //   } catch (err) {
  //     res.json({
  //       status:"400",
  //       ...err
  //     }) ;
  //   }
    
  // };

  
  // const uptateUser= async (req,res)=>{
  //   const {nombre, apellido,super_administrador,avatar,correo,perfil_id}=req.body;
  //   const id =req.params.id;
  //   const response= await  db.query('UPDATE usuario SET nombre=$2,apellido=$3,super_administrador=$4,avatar=$5,correo=$6,perfil_id=$7 WHERE usuario_id=$1',
  //   [id,nombre, apellido,super_administrador,avatar,correo,perfil_id]);
  //   console.log(response);
  //   res.json({
  //       message:"actulizado",
  //       body:{
  //           user:{
  //               nombre, apellido,super_administrador,avatar,correo,perfil_id 
  //               }
  //       }
  //   });
  
  // };



    module.exports={
        getUsers,
        // createUser  ,
        // getUserById,
        // getDelete,
        // uptateUser
    };