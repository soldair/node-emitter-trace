




module.exports = function et(server,prefix){
  prefix = prefix||'';
  var em = server.emit;
  server.emit = function(ev){
    var found = [];
    for(var i = 0;i<arguments.length;++i){
      if(arguments[i] && arguments[i].emit && typeof arguments[i].emit == 'function'){
        var n;
        if(arguments[i].constructor) n = ':'+arguments[i].constructor.name;
        
        found.push(i+' '+n)

        et(arguments[i],prefix+'->'+ev+'['+i+''+n+']')
      }
    }

    module.exports.log(prefix+">",ev,found.length?found:'');
    return em.apply(this,arguments)  
  }
}

module.exports.log = console.log.bind(console)




