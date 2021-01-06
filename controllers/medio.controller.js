const med = require('./Utils/findAll')
const config = require('../config/config');



const guardarMedio= async (req,res)=>{

    const id=req.query.medio_id;
    const medio_name=req.query.medio_name;
    const nombre=req.query.nombre;
    const location=req.query.location;
    const description=req.query.description;
    const url=req.query.url;
    const imgUrl=req.query.imagen_url;
    const banner=req.query.banner_url;


 
    var params=[id,medio_name,nombre,url,location,description,imgUrl,banner,true];
    console.log(params);

    med.GuardarMed(params).then(resp=>{
        res.json({
            status:'200',
            message:'medio Guardado',
            resp
        })
    }).catch(err=>{console.log(err)
        res.json(err)});
    // db.query(`INSERT INTO medio(medio_id,medio_name,nombre,url,location,description,activo)
    //  VALUES($1,$2,$3,$4,$5,$6,$7,$8)`,params).then(resp=>{
    //     res.json(resp);
    //  });
   
   

// console.log(req.query);



}


 
const buscarMedio= async (req,res)=>{

const medio=req.query.medio;
var datos=[];

console.log(medio);
let params = { q:medio,count:4};
config.apliClient.get('users/search', params).then(data=>{

   
    data.data.forEach(element => {
        var dato=new Medio(
            element.id,
            element.screen_name,
            false,
            element.name,
            element.location,
            element.description,
            element.url,
            element.profile_image_url,
            element.profile_banner_url); 
            console.log(element.url)
        // dato.id=element.id,
        // dato.medio_name=element.screen_name;
        // dato.nombre=element.name;
        // dato.description=element.description;
        // dato.location=element.location;
        // dato.url=element.url ;
        // dato.banner=element.profile_banner_url;
        datos.push(dato);
    });

    res.json(
            datos  
        )
});



}

const getMedios= async (req,res)=>{
    med.findAllMedio().then(resp=>{
        res.json({
            status:'200',
            message:'Se recuperaron todos los medio',
            resp
        });
    }).catch(err=>{
        res.json({
            status:'400',
            message:'Error al recuperar los medios',
            err
        });
    });
}

// modelo de medios
function Medio(
    medio_id,
    medio_name,
    activo,
    nombre,
    location,
    description,
    url,
    imagen_url,
    banner_url)
     {
      
       
        this.medio_id=medio_id;
        this.medio_name=medio_name;
        this.activo=activo;
        this.nombre=nombre;
        this.location=location;
        this.description=description;
        this.url=url;
        this.imagen_url=imagen_url;
        this.banner_url=banner_url;
  }



module.exports={
    buscarMedio,
    guardarMedio,
    getMedios
};