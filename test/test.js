var http = require('http');
var test = require('tape')
var et = require('../')



test("can",function(t){
  var s = "";
  et.log = function(){
    console.log.apply(console,arguments)
    s += [].slice.call(arguments).map(function(v){
      return v+' ';
    })
    s += "\n"
  }

  var server = http.createServer(function(req,res){
    res.end('hi!')
  })

  et(server,'server')
  
  server.listen(0,function(){
    var port = this.address().port
    var c = http.get('http://localhost:'+port,function(res){
      res.socket.on('close',function(){
        server.close()
      })
    }).on('error',function(){
      t.fail()
      server.close()
    })
    et(c,'client')
  })


  server.on('close',function(){
    t.ok(s.indexOf('server->request[2:ServerResponse]>') > -1,'should have server server response log');
    t.end();
  })
})


