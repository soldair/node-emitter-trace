# node-emitter-trace
log all events from this emitter and emitters it emits

pass your server to et.

```js
var et = require('emitter-trace')

var server = require('http').createServer(function(req,res){
  res.end('hi')
}).listen(8080)

et(server,'server')
```

will print something like this for every request


```
$ node example.js 
server> listening 
server> connection [ '1 :Socket' ]
server->connection[1:Socket]> resume 
server->connection[1:Socket]> data 
server> request [ '1 :IncomingMessage', '2 :ServerResponse' ]
server->request[2:ServerResponse]> prefinish 
server->request[2:ServerResponse]> finish 
server->request[1:IncomingMessage]> resume 
server->request[1:IncomingMessage]> readable 
server->request[1:IncomingMessage]> end 
server->connection[1:Socket]> readable 
server->connection[1:Socket]> _socketEnd 
server->connection[1:Socket]> end 
server->connection[1:Socket]> prefinish 
server->connection[1:Socket]> finish 
server->connection[1:Socket]> close
```



