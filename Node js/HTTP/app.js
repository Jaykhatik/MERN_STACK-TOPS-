var http = require('http');
http.createServer((req,res)=>{
    res.writeHead(200,{'content-type' :'text/html'});
    res.write(JSON.stringify({name:"jay"}));
    res.end();
}).listen(5000);