const { Product, Models, Specification } = require('../models/models');
const { Sequelize } = require('sequelize');

class productController {
	async getAll(req, res) {
		const { subCategoryId, models, specifications, minPrice, maxPrice } = req.query;
		if (!subCategoryId) {
			return res.status(400).json({ error: 'subCategoryId is required' });
		}
		const modelCondition = models ? { model: { [Sequelize.Op.in]: models.split(',') } } : {};
		const specificationCondition = specifications
			? { specification: { [Sequelize.Op.in]: specifications.split(',') } }
			: {};
		const priceCondition = {};
		if (minPrice && maxPrice) {
			priceCondition.price = {
				[Sequelize.Op.and]: [
					{ [Sequelize.Op.gte]: minPrice },
					{ [Sequelize.Op.lte]: maxPrice },
				],
			};
		} else if (minPrice) {
			priceCondition.price = { [Sequelize.Op.gte]: minPrice };
		} else if (maxPrice) {
			priceCondition.price = { [Sequelize.Op.lte]: maxPrice };
		}

		try {
			const products = await Product.findAll({
				where: { ...priceCondition },
				include: [
					{
						model: Models,
						where: { subCategoryId, ...modelCondition },
						attributes: {
							exclude: ['updatedAt', 'createdAt', 'img', 'subCategoryId'],
						},
					},
					{
						model: Specification,
						where: { ...specificationCondition },
						attributes: {
							exclude: [
								'updatedAt',
								'createdAt',
								'productId',
								'specificationGroupId',
							],
						},
					},
				],
				attributes: {
					exclude: ['updatedAt', 'createdAt'],
				},
			});
			res.json(products);
		} catch (error) {
			console.error('Error fetching products by subcategory ID:', error);
			res.status(500).json({ error: 'An error occurred while fetching products' });
		}
	}

	async getOne(req, res) {}
}

module.exports = new productController();
