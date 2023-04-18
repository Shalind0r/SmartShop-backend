require('dotenv').config();

const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);

// Обработка ошибок, последний middleware
app.use(errorHandler);

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
		app.listen(port, () => console.log(`server start on port ${port}`));
	})
	.catch((err) => {
		console.error('Unable to start server:', err);
	});
