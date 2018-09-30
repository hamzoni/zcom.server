const fs = require('fs')
const express = require('express')
const vhost = require('vhost')
const dotenv = require('dotenv')
dotenv.load()

const app = express()
	.use(vhost(process.env.SUB_DOMAIN_1, require(process.env.SOURCE_1).app))
	.use(vhost(process.env.SUB_DOMAIN_2, require(process.env.SOURCE_2).app))
	.listen(process.env.PORT)


// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/zcom.io/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/zcom.io/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/zcom.io/chain.pem', 'utf8');
const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

const httpServer = http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
});
const httpsServer = https.createServer(credentials, app);


httpServer.listen(80, () => {
	console.log('HTTP Server running on port 80');
});