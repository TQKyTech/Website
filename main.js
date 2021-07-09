const http = require('http'), path = require('path'), fs = require('fs'), WebSocket = require('ws'), express = require('express'), app = express(), package = require('./package.json'), opn = require('opn');
let rootPath = __dirname, config = { ...package, ...{ port: 22280 } };
process.title = config.name;

app.use(function(req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization');
      res.setHeader('Access-Control-Allow-Credentials', true);
      if (path.extname(req._parsedUrl.pathname) && !req._parsedUrl.pathname.endsWith('config.js')) {
          res.setHeader('Cache-Control', 'private, max-age=604800, stale-while-revalidate=1209600');
      }
      next();
});

/*/ start - webadmin /*/
app.get('/*', function(req, res) {
      if (path.extname(req._parsedUrl.pathname)) {
            let filePath = path.join(rootPath, req._parsedUrl.pathname);
            if (fs.existsSync(filePath)) {
                  res.sendFile(filePath);
            } else {
                  res.end('not found');
            }
      } else {
            res.sendFile(path.join(rootPath, '/admin/index.html'));
      }
});
/*/ end - webadmin /*/

let server = http.createServer({}, app);
let wss = new WebSocket.Server({ server: server }, app);
wss.on('connection', () => {});
server.listen(config.port, () => { 
      console.log(config.name + ' is start at port: ' + config.port); 
      opn(`http://localhost:${config.port}`, {app: ['google chrome']});
});