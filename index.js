require('dotenv').config();

const express = require('express');
const sequelize = require('./db');

const app = express();
const port = process.env.PORT || 3000;

const start = async () => {
	try {
		await sequelize.authenticate();
		await sequelize.sync();
	} catch (e) {
		console.log(e);
	}
};

start()
	.then(() => {
		console.log(`server start on port ${port}`);
	})
	.catch((err) => {
		console.error('Unable to start server:', err);
	});
