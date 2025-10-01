const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const target = process.env.DLNA_TARGET || 'http://your-dlna-server-ip:port';

app.use('/proxy', createProxyMiddleware({
  target,
  changeOrigin: true,
  pathRewrite: { '^/proxy': '' },
  onProxyRes: (proxyRes) => {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Access-Control-Allow-Headers'] = '*';
  }
}));

app.listen(3001, () => {
  console.log('Audio CORS proxy running on port 3001');
});
