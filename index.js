const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware para añadir cabeceras de seguridad
app.use((req, res, next) => {
  /*res.setHeader(
    'Content-Security-Policy',
    `
default-src 'self';
base-uri 'self' www.bbvapivot.com www.bbvaglobalnetcash.com;
connect-src 'self' https:;
font-src 'self' data: https:;
form-action 'self';
frame-ancestors 'self' *.igrupobbva www.bbvapivot.com www.bbvaglobalnetcash.com *.cloudfront.net file: data: gap: https://ssl.gstatic.com applewebdata: ionic: capacitor: http://localhost:* http://127.0.0.1:* about: null;
frame-src 'self' www.bbvapivot.com www.bbvaglobalnetcash.com *.cloudfront.net;
img-src 'self' data: https: blob:;
object-src 'none';
script-src 'self' 'unsafe-inline' 'unsafe-eval' *.adobedtm.com *.omtrdc.net *.bbvapivot.com www.bbvapivot.com www.bbvaglobalnetcash.com *.cloudfront.net *.demdex.net;
style-src 'self' 'unsafe-inline' *.cloudfront.net;
upgrade-insecure-requests;
`
      .replace(/\n/g, ' ')
      .trim()
  );*/

  res.setHeader(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );

  res.setHeader(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), fullscreen=(self), payment=(self)'
  );

  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  res.setHeader('X-Content-Type-Options', 'nosniff');

  res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');

  next();
});


// Ruta a tus certificados (ajusta nombres según mkcert/openssl)
const options = {
  key: fs.readFileSync(path.join(__dirname, 'localhost+2-key.pem')),   // o key.pem
  cert: fs.readFileSync(path.join(__dirname, 'localhost+2.pem')),      // o cert.pem
};

app.get('/', (req, res) => {
  res.send('Servidor con cabeceras de seguridad configuradas 🚀');
});

https.createServer(options, app).listen(PORT, () => {
  console.log(`Servidor HTTPS escuchando en https://localhost:${PORT}`);
});
