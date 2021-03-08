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



module.exports = {
  noticasCron,
  
};
