const NodeHelper = require("node_helper");
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = NodeHelper.create({

	start() {
		console.log("Dynamic proxy with header injection starting");
		this.startProxy();
	},
	startProxy() {

		console.log("Starting proxy middleware...");

		this.expressApp.use("/proxy", (req, res, next) => {
			const target = req.query.target;
			console.log(target);
			if (!target) {
				return res.status(400).send("Missing target URL");
			}

			const proxy = createProxyMiddleware({
				target,
				changeOrigin: true,
				selfHandleResponse: false, // Let it stream directly
				onProxyRes: (proxyRes, req, res) => {
					proxyRes.headers["Access-Control-Allow-Origin"] = "*";
					proxyRes.headers["Access-Control-Allow-Headers"] = "*";
					proxyRes.headers["X-Proxied-By"] = "MagicMirror";
				},
				pathRewrite: (path, req) => {
					// Optional: strip /proxy if needed
					return req.url.replace(/^\/proxy/, "");
				},
				router: (req) => {
					// Optional: override target dynamically
					return req.query.target;
				}
			});
			proxy(req, res, next);
		});

	},

	resolveHeaders(origin) {
		const rules = this.config.proxyHeaders || {};
		return rules[origin] || rules["*"] || {};
	}
});
