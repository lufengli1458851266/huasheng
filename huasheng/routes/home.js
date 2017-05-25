var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var formidable = require('formidable'); 
var PrivateInfoModel = require('../models/PrivateInfoModel');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.locals.loginbean=req.session.loginbean;
  res.render('home/home',{});
});

router.post('/privateAuth', function(req, res, next) {

 var form = new formidable.IncomingForm();   //创建上传表单 
    form.encoding = 'utf-8';        //设置编辑 
    form.uploadDir = './public/images/privateauth/';     //设置上传目录 文件会自动保存在这里 
    form.keepExtensions = true;     //保留后缀 
    form.maxFieldsSize = 5 * 1024 * 1024 ;   //文件大小5M 
    form.parse(req, function (err, fields, files) { 
        if(err){ 
            console.log(err); 
            return;
        } 
        // res.send('rname='+fields.rname);
//-----------入库-------------------//
  loginbean = req.session.loginbean;
       fields.id = req.session.loginbean.id;
       fields.idphoto=files.idphoto.path;
        fields.realname=req.session.loginbean.realname;
       fields.userphoto=files.userphoto.path;
       fields.updtime=new Date();
       PrivateInfoModel.create(fields).then(function(rs){
        res.send('身份认证已提交,请耐心等待审核');
      }).catch(function(err){
        console.log(err);
        if(err.errors[0].path=='PRIMARY'){
          res.send('你已经申请过');
        }else if(err.errors[0].path=='idcodeuniq')
        {
          res.send('身份证号已用过');
        }else if(err.errors[0].path=='prphoneuniq'){
          res.send('电话号码已用过');
        }else if(err.errors[0].path=='premailuniq'){
          res.send('此email已用过');
        }else{
          res.send('数据库错误,稍后再试');
        }
        
      })
       //console.log( fields)//这里就是post的XXX 的数据 
       // console.log( files.idphoto)//这里就是上传的文件,注意,客户端file框必须有name属性 
       // console.log('上传的文件名:'+files.idphoto.name);//与客户端file同名 
       // console.log('文件路径:'+files.idphoto.path); 
       // //this.body='realname:'; 
      
    });

     });
module.exports = router;