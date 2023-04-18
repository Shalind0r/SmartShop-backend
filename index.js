require('dotenv').config();

const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');

const port = process.env.PORT || 3000;
const app = express();
app.use(cors);
app.use(express.json());

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
