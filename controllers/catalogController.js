const { Categories, CategoriesGroup, SubCategories } = require('../models/models');

class CatalogController {
	async getAllCategories(req, res) {
		const categories = await Categories.findAll({
			attributes: {
				exclude: ['createdAt', 'updatedAt'],
			},
		});
		return res.json(categories);
	}

	async getCategory(req, res) {
		const id = req.params.id;
		const category = await Categories.findAll({
			where: { id },
			attributes: {
				exclude: ['createdAt', 'updatedAt'],
			},
			include: {
				model: CategoriesGroup,
				attributes: {
					exclude: ['createdAt', 'updatedAt', 'categoryId'],
				},
				include: {
					model: SubCategories,
					attributes: {
						exclude: ['createdAt', 'updatedAt', 'categoriesGroupId'],
					},
				},
			},
		});
		return res.json(category);
	}
}

module.exports = new CatalogController();
