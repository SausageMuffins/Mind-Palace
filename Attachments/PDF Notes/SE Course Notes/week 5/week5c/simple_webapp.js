// import http from 'http' // won't work, not in a npm project
const http = require('http');

const webAppServer = http.createServer((req,res) => {
  if(req.url === "/") {
    res.write(`
        <html>
            <head><title>Welcome</title></head>
            <body>Welcome to 50.003!</body>
        </html>`);
    res.end();
  }
  else {
    res.write(`
        <html>
            <head><title>Error</title></head>
            <body>Page not found</body>
        </html>`);
    res.end();
  }
})

webAppServer.listen(3000);