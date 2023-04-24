const { Models } = require('../models/models');

class modelsController {
	async getAll(req, res) {
		const subCategoryId = req.params.id;
		const models = await Models.findAll({
			where: { subCategoryId },
			attributes: {
				exclude: ['createdAt', 'updatedAt', 'subCategoryId'],
			},
		});

		res.json(models);
	}
}

module.exports = new modelsController();
