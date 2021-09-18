var express = require('express');
var router = express.Router();
// khai bao ket noi co so du lieu postgree
const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sanpham',
  password: '123456',
  port: 5432,
})

/* GET home page. */
router.get('/', function(req, res, next) {
  
});
// api get data postgresql
router.get('/getdata01', function(req, res, next) {
    // Website you wish to allow to connect
 //   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
  //  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
  //  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
  //  res.setHeader('Access-Control-Allow-Credentials', true);
       
  // get data from database
  pool.query("SELECT * FROM public.product_info",(error,response) => {
    if(error){
      console.log(error);      
    }else{
      res.send(response.rows); 
    }
   //  pool.end();
  })
 // res.render('getData01', { title: 'Getdata API' });
 // them du lieu 

});
router.get('/add',function(req,res,next){
  res.render('add', { title: 'Thêm sản phẩm'});
});
router.post('/add',function(req,res,next){
  var product_name = req.body.product_name;
  product_price = req.body.product_price;
  image = req.body.image;
  //console.log('du lieu nhap duoc : ' + product_name+', gia :'+product_price + ', anh:'+image);
  pool.query("INSERT INTO public.product_info (product_name, product_price, image )VALUES ($1,$2,$3)",[product_name,product_price,image],(err,response) => {
    if(err) {
      res.send(0);
    }
    else{
      res.send(1);
    }
  } );
});
module.exports = router;
