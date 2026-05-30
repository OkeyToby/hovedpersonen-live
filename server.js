const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

let sharedState = null;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.ico': 'image/x-icon',
};

function getLocalIP() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) return net.address;
    }
  }
  return 'localhost';
}

const server = http.createServer(function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  const url = req.url.split('?')[0];

  if (url === '/state') {
    if (req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, state: sharedState }));
      return;
    }
    if (req.method === 'POST') {
      let body = '';
      req.on('data', function (d) { body += d; });
      req.on('end', function () {
        try {
          const payload = JSON.parse(body);
          if (!sharedState || !payload._ts || payload._ts >= (sharedState._ts || 0)) {
            sharedState = payload;
          }
        } catch (e) {}
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end('{"ok":true}');
      });
      return;
    }
  }

  let filePath = path.join(__dirname, url === '/' ? 'index.html' : url);
  fs.readFile(filePath, function (err, data) {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    const ext = path.extname(filePath);
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      // Always serve fresh files so updated questions/code show on reload
      // instead of a stale cached copy.
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    });
    res.end(data);
  });
});

const PORT = 3333;
server.listen(PORT, '0.0.0.0', function () {
  const ip = getLocalIP();
  console.log('');
  console.log('  Hovedpersonen Live');
  console.log('  ─────────────────────────────────');
  console.log('  Hoved-skærm : http://localhost:' + PORT);
  console.log('  iPad remote : http://' + ip + ':' + PORT + '/remote.html');
  console.log('  ─────────────────────────────────');
  console.log('');
});
