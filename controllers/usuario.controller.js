const userDB = require("./Utils/Dbusuario");
const MedioDB = require("./Utils/Dbmedio");
const bcrypt = require("bcrypt");

const getLogin = async (req, res) => {
  const usuario = req.body.usuario;
  const clave = req.body.clave;
let respuesta=[];
  // console.log(usuario,clave)
  if (usuario !== undefined) {
    let user = await userDB.findUser(usuario);
    if (user.length === 0) {
      res.json({
        status: "400",
        message: "no existe usuario con el nick ingresado",
      });
    } else {
      // guardamos
      if (clave !== undefined) {
        let user = await userDB.findUser(usuario);
        if (user.length === 0) {
          res.json({
            status: "400",
            message: "contraseña ingresada incorrecta",
          });
        } else {
          if (!bcrypt.compareSync(clave, user[0].password)) {
            return res.json({
              status: "400",
              message: "Credenciales incorrectas - password",
            });
          } else {

              // * AGREGAR LA RELACION CON LOS MEDIOS
         let respmex=await MedioDB.findAllMedio(user[0].usuario_id);
         if (respmex.length===0) {
           respm= await MedioDB.findAllMedioDefect();
       if (respm.length>0) {
           respm.forEach(async medio => {
             respuesta.push(await MedioDB.GuardarUsuaMedio(user[0].usuario_id,medio.medio_id));
           });

           user[0].password="";
           res.json({
             status: "200",
             message: "login correcto",
             user,
           });
         }
        }else{
          user[0].password="";
          res.json({
            status: "200",
            message: "login correcto",
            user,
          });
        }
         
          }
        }
      } else {
        res.json({
          status: "400",
          message: "ingrese una contraseña",
        });
      }
    }
  } else {
    res.json({
      status: "500",
      message: "Ingrese un Usuario valido",
    });
  }
};

const register = async (req, res) => {
  var body = req.body;
  var usuario = {
    nombre: body.nombre,
    apellido: body.apellido,
    correo: body.correo,
    nick: body.nick,
    password: bcrypt.hashSync(body.password, 10),
    activo: true,
  };
console.log(usuario)
  user = await userDB.findByUser(usuario);
  if (user.length === 0) {
    resp = userDB.saveUser(usuario).then(async(re) => {
      if (re > 0) {
       
        res.json({
          status: "200",
          message: "Registro exitoso",
          re,
        });
      } else {
        res.json({
          status: "400",
          message: "error al guardar",
          re,
        });
      }  
    });
  } else {
    user[0].password="";
    res.json({
      status: "400",
      message: "no se pudo guardar datos ya existentes correo/nick",
      user,
    });
  }
};
module.exports = {
  getLogin,
  register,
};
