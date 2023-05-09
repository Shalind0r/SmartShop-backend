const ApiError = require('../error/ApiError');
const { User, Basket } = require('../models/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateJwt = (id, email) => {
	return jwt.sign(
		{
			id: user.id,
			email,
		},
		process.env.SECRET_KEY,
	);
};

class UserController {
	async registration(req, res, next) {
		const { email, password } = req.body;
		if (!email || !password) {
			return next(ApiError.badRequest('Некорекний email або пароль'));
		}
		const candidate = await User.findOne({ where: { email } });
		if (candidate) {
			return next(ApiError.badRequest('Користувач с таким email вже зареєстрований'));
		}
		const hashPassword = await bcrypt.hash(password, 5);
		const user = await User.create({
			email,
			password: hashPassword,
		});
		const basket = await Basket.create({ userId: user.id });
		const token = generateJwt(user.id, user.email);
		return res.json({ token });
	}

	async login(req, res, next) {
		const { email, password } = req.body;
		const user = await User.findOne({ where: { email } });
		if (!user) {
			return next(ApiError.internal('Користувач с таким email не знайдений'));
		}
		let comparePassword = bcrypt.compareSync(password, user.password);

		if (!comparePassword) {
			return next(ApiError.internal('Вказаний не вірний пароль'));
		}
		const token = generateJwt(user.id, user.email);
		res.json({ token });
	}

	async check(req, res, next) {
		res.json({ message: 'Користувач  авторизований' });
	}
}

module.exports = new UserController();
