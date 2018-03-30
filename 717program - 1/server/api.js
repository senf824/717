const jwt = require("jsonwebtoken");
const fs = require("fs");
const http = require("http");
const querystring = require("querystring");
const _ = require('lodash')

const queryApi = (url,methods,params)=>{
  return new Promise((resolve,reject)=>{
    let data = "";
    const options = {
      hostname: "www.lb717.com",
      post: 80,
      path: url,
      method: methods,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      }
    }

    let request = http.request(options, response => {
      response.setEncoding("utf8");
      response.on("data", chunk => {
        data += chunk;
      });
      response.on("end", () => {
        resolve(JSON.stringify(data));
      });
    });
    if(methods.toLowerCase()==='post'){
      request.write(querystring.stringify(params));
    }
    request.end();
  })
}

// 封装读取文件返回json数据方法
const readFileSyncFn = (file)=>{
  return JSON.parse(fs.readFileSync(__dirname + file, {
      encoding: "utf-8"
    }));
}

// 封装写入文件方法
// const writeFileFn = (file)=>{

// }
module.exports=(app)=>{
  // 商品列表的接口（线上请求）
  app.post("/mall/index/getGoodsChannel",(req,res) => {
    queryApi("/mall/index/getGoodsChannel",'post',req.body)
      .then(data=>{
        res.end(data)
      })
  });

  // 注册的接口
  app.post('/user/register',(req,res) => {
    user = readFileSyncFn("/user.json")
    user.push(req.body)
    fs.writeFile(
      __dirname + '/user.json',
      JSON.stringify(user),
      ()=>{
        res.end(JSON.stringify({
          "success": 1,
          "info": 'register success'
        }))
      }
    )
  })

  // login api
  app.post('/user/login',(req,res)=>{
    user = readFileSyncFn("/user.json")
    let login = req.body
    let resInfo = {
      success:0,
      info:'用户名或密码错误',
      token:''
    }
    user.forEach(usr=>{
      if(usr.username === login.username && usr.password === login.password){
        resInfo.success = 1;
        resInfo.info='login success',
        resInfo.user={
          name:usr.username,
          time:new Date().toLocaleTimeString(),
          nickName:'Senf'
        }
      }
    })
    if(resInfo.success === 1){
      resInfo.token = jwt.sign(login,"1511",{
        expiresIn: 60*60
      })
    }
    res.end(JSON.stringify(resInfo))
  })

  // 添加购物车
  app.post('/user/Cart/addCart',(req,res)=>{
    jwt.verify(req.body.token,'1511',(err, decoded)=>{
      if(err){
        res.end(JSON.stringify({
          info:'登录过期，请重新登录',
        }))
      }else{
        let cartInfo = readFileSyncFn("/cart_info.json")
        if (cartInfo[decoded.username]) {
          // 用户有记录
          let recordList = cartInfo[decoded.username];
          let flag = false; // 新加商品
          recordList.forEach((item,index)=>{
            if(item.goods_id === req.body.goods_info.goods_id){
              ++ item.count;
              flag = true; // 重复商品
            }
          })
          if(!flag){ // 
            let record = req.body.goods_info;
            record.count = 1;
            record.selected = 0;
            cartInfo[decoded.username].push(record);
          }  
        } else {
          // 用户无记录
          let record = req.body.goods_info;
          record.count = 1;
          record.selected = 0;
          cartInfo[decoded.username] = [record];
        }
        fs.writeFile(
          __dirname + "/cart_info.json",
          JSON.stringify(cartInfo),
          () => {
            res.end("1");
          }
        );
      }
    })
  })

  // 分类接口
  app.get('/mobile/Category/categorySon',(req,res)=>{
    const category = fs.readFileSync(__dirname + "/category.json", {
      encoding: "utf-8"
    });
    res.end(category);
  })

  // 用户登录后购物车列表接口
  app.post('/user/Cart/goodsList',(req,res)=>{
    jwt.verify(req.body.token,'1511',(err, decoded)=>{
      if(err){
        res.end(JSON.stringify({
          info:'登录过期，请重新登录',
          error:1
        }))
      }else{
        try{
          let goodsRecord = readFileSyncFn("/cart_info.json")
          let goodsList = goodsRecord[decoded.username] || []
          res.json(goodsList);
        }
        catch(error){
          res.json(error)
        }
      }
    })
  })

  // 删除购物车内指定商品
  app.post('/user/Cart/delGoods',(req,res)=>{
    let cartRecord = readFileSyncFn("/cart_info.json");
    jwt.verify(req.body.token,'1511',(err,decoded)=>{
      if(err){
        res.json(err)
      }else{
        let cartList = cartRecord[decoded.username]
        let delGoods = _.remove(cartList,(item)=>{
          return req.body.selectedID.indexOf(item.goods_id) > -1
        })
        cartRecord[decoded.username] = cartList;
        fs.writeFile(
          __dirname + "/cart_info.json",
          JSON.stringify(cartRecord),
          () => {
            res.json({
              success: 1,
              info: "删除成功",
              delGoods,
              leftGoods: cartList
            });
          }
        );
      }
    })
  })

  // 新增邮寄地址   <没去重>
  app.post('/user/Mail/addNew',(req,res)=>{
    jwt.verify(req.body.token,'1511',(err,decoded)=>{
      if(err){
        res.json(err)
      }else{
        let usr = decoded.username;
        let delivery = readFileSyncFn("/delivery.json");
        delete req.body.token;
        if(delivery[usr]){
          delivery[usr].push(req.body)
        }else{
          delivery[usr] = [req.body];
        }
        fs.writeFile('./delivery.json',JSON.stringify(delivery),(err)=>{
          if(err){
            res.json(err)
          }else{
            res.json({
              success:1,
              info:'地址添加成功'
            })
          }
        })
      }
    })
  })

  // 获取邮寄地址列表
  app.post('/user/Mail/getList',(req,res)=>{
    jwt.verify(req.body.token,'1511',(err,decoded)=>{
      if(err){
        res.json(err)
      }else{
        let usr = decoded.username;
        let delivery = readFileSyncFn("/delivery.json");
        res.json({
          success: 1,
          info: '请求成功',
          data: delivery[usr]
        })
      }
    })
  })

  // 获取地址管理级联菜单数据 省、市、区
  app.get('/user/Mail/pcr',(req,res)=>{
    const pcrData = fs.readFileSync(__dirname + "/pcr.json", {
      encoding: "utf-8"
    });
    // let pcrData = readFileSyncFn("/pcr.json")
    res.end(pcrData)
  })
}