const {Router}= require('express');
const router=Router();
const path=require('path');

//Rutas
router.get('/',(req,res)=>{
    res.render('index'); //cuando inicie la pagina , que muestre index.ejs
})

router.post('/upload',(req,res)=>{ //subir la imagen
    console.log(req.file);
    res.send('Subido');
})

module.exports=router;