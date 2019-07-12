//Lo que se debe de instalar para comenzar el proyecto 
// 1- npm init --yes
// 2- npm i express ejs multer
// 3- npm i nodemon -D
// 4- npm i uuid // para generar ids unicos
const express=require('express');
const path=require('path');
const multer=require('multer');  
const uuid=require('uuid/v4');
//Inicializando 
const app=express();

//Configuracion
app.set('port',3000);
app.set('views',path.join(__dirname,'views')); // Para que sepa donde esta la carperta views
app.set('view engine','ejs'); //Para saber el motor de las vistas

//Middlewares
const storage= multer.diskStorage({
    destination:path.join(__dirname,'public/uploads'),
    filename:(req,file,cb)=>{ //cb = callback
        cb(null,uuid() + path.extname(file.originalname).toLowerCase());
    }
})

app.use(multer({
    storage,
    dest:path.join(__dirname,'public/uploads'),
    limits:{fileSize:5000000},
    fileFilter:(req,file,cb)=>{
        const filtetypes=/jpeg|jpg|png|gif/;
        const mimetype= filtetypes.test(file.mimetype);
        const extname=filtetypes.test(path.extname(file.originalname));
        if (mimetype && extname) {
            return cb(null,true);
        }
        cb("Error:Archivo debe ser una imagen valida!!!");
    }
}).single('image'));

//Routes
app.use(require('./routes/index.routes'));

//Static files
app.use(express.static(path.join(__dirname,'public')));

//Iniciar el servidor
app.listen(app.get('port'),()=>{
    console.log(`server on port ${app.get('port')}`);
})
