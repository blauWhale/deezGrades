// outsourcing-control-frontend node app.
 var http = require("http"),
 url = require("url"),
 path = require("path"),
 fs = require("fs")
 port = process.argv[2] || 8080;

 http.createServer(function(request, response) {

   var uri = url.parse(request.url).pathname
     , filename = path.join(process.cwd(), uri);

   if (uri === "/log") {
     var body = "";
     request.on('data', function (chunk) {
       body += chunk;
     });
     request.on('end', function () {
       if (request.method === 'POST') {
         try {
           console.log("%s %s: Message: %s", new Date(Date.now()).toLocaleString(), JSON.parse(body).level, JSON.parse(body).msg);
           response.end();
         } catch (ex) {
           console.log("%s Error: log processing failed request: %s", new Date(Date.now()).toLocaleString(), ex);
           response.writeHead(400);
           response.end();
         } 
       } else {
         console.log("%s Error: unsupported request http-method '%s' received for '%s' - Server Action: 405 response despatch", new Date(Date.now()).toLocaleString(),request.method ,uri);
         response.writeHead(405);
         response.end();
       }
     })
     return;
   }    

   if (request.method !== 'GET') {
     console.log("%s Error: unsupported request http-method '%s' received for '%s' - Server Action: 405 response despatch", new Date(Date.now()).toLocaleString(),request.method ,uri);
     response.writeHead(405);
     response.end();
     return;
   }

   if(uri==="/env") {
    
       response.writeHead(200, { "Content-Type": "text/plain" });
       res = { env: process.env.STAGE || 8080 };
       response.end(JSON.stringify(res));
     return;
   }

   var contentTypesByExtension = {
     '.html': "text/html",
     '.css':  "text/css",
     '.js':   "text/javascript"
   };

   fs.exists(filename, function(exists) {

     var dloc="", floc=""; fname="";
     floc= filename;
     dloc = path.resolve(__dirname);
     fname = path.resolve(__filename);
     if(!exists) {
       response.writeHead(404, {"Content-Type": "text/plain"});
       response.write("404 Not Found\n");
       response.end();
       return;
     } else if (!floc.startsWith(dloc) || floc === fname ) {
       console.log("%s WARN: Http access to file or directory denied: %s detected as a suspicous access activity to container filesystem", new Date(Date.now()).toLocaleString(), floc );
       response.writeHead(404, {"Content-Type": "text/plain"});
       response.write("404 Not Found\n");
       response.end();
       return;
     }

     if (fs.statSync(filename).isDirectory()) filename += '/index.html';

     fs.readFile(filename, "binary", function(err, file) {
       if(err) {
         response.writeHead(500, {"Content-Type": "text/plain"});
         response.write(err + "\n");
         response.end();
         return;
       }

       var headers = {};
       var contentType = contentTypesByExtension[path.extname(filename)];
       if (contentType) headers["Content-Type"] = contentType;
       response.writeHead(200, headers);
       response.write(file, "binary");
       response.end();
    
     });
   });
 }).listen(parseInt(port, 10));    
 console.log("Static file server running at\n  => http:localhost:" + port + "/\nCTRL + C to shutdown");
