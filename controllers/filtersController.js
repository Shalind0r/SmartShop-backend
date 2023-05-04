const { SpecificationGroup, Specification, Models } = require('../models/models');

class FiltersController {
	async getAll(req, res) {
		const { subCategoryId } = req.query;
		try {
			const specification = await SpecificationGroup.findAll({
				where: { subCategoryId },
				attributes: ['id', 'name'],
				include: [
					{
						model: Specification,
						attributes: ['id', 'specification', 'value'],
					},
				],
			});

			const uniqueSpecifications = specification.map((group) => {
				const uniqueSpecs = group.specifications.reduce((acc, spec) => {
					const exists = acc.some((item) => item.specification === spec.specification);
					if (!exists) {
						acc.push(spec);
					}
					return acc;
				}, []);

				const plainGroup = group.get({ plain: true }); // Получаем "плоскую" версию объекта
				return {
					...plainGroup,
					specifications: uniqueSpecs,
				};
			});
			const model = await Models.findAll({
				where: { subCategoryId },
				attributes: ['id', 'model', 'img'],
			});

			res.json({
				specification: uniqueSpecifications,
				models: model,
			});
		} catch (error) {
			console.error('Error fetching products by subcategory ID:', error);
			res.status(500).json({ error: 'An error occurred while fetching products' });
		}
	}
}

module.exports = new FiltersController();
