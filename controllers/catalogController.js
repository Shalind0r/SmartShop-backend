const { Categories, CategoriesGroup, SubCategories } = require('../models/models');

class CatalogController {
	async getAll(req, res) {
		const categories = await Categories.findAll({
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
		return res.json(categories);
	}
}

module.exports = new CatalogController();
