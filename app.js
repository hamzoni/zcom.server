const express = require('express')
const vhost = require('vhost')
const dotenv = require('dotenv')
dotenv.load()

express()
	.use(vhost(process.env.SUB_DOMAIN_1, require(process.env.SOURCE_1).app))
	.use(vhost(process.env.SUB_DOMAIN_2, require(process.env.SOURCE_2).app))
	.listen(process.env.PORT)