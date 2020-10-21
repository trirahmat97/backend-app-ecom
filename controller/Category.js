const Category = require('../model/Category');
const response = require('../util/message/response');
const message = require('../util/message/message');
const fileDelete = require('../util/file/deleteFile');

exports.getCategory = async (req, res) => {
    try {
        const category = await Category.findAll({
            where: { parent_id: null },
            include: [{
                model: Category,
                as: 'items',
                include: [{
                    model: Category,
                    as: 'items',
                }]
            }]
        });
        res.status(200).json(response.ok(category, message.getAll + ' category'));
    } catch (err) {
        res.status(400).json(response.bad(err.message));
    }
}

exports.createCategory = async (req, res) => {
    try {
        const { name, description, parent_id, label, icon } = req.body;
        const category = await Category.create({ name, description, parent_id: parent_id !== '' ? parent_id : null, icon, label });
        res.status(200).json(response.create(category, 'Category ' + message.create));
    } catch (err) {
        const error = err.errors[0].message;
        res.status(400).json(response.bad(error ? error : err.message));
    }
}

exports.editCategory = async (req, res) => {
    const file = req.file;
    try {
        const url = req.protocol + '://' + req.get('host');
        const { id, name, description, parent_id } = req.body;
        const findCategory = await Category.findByPk(id);
        if (!findCategory) {
            if (file) {
                await fileDelete.deleteFile('images/' + file.filename);
            }
            return res.status(404).json(response.notfound('Category ' + message.notfound));
        }
        if (file && findCategory.pathIcon) {
            await fileDelete.deleteFile(findCategory.pathIcon);
        }
        const updateCategory = await findCategory.update({ name, description, parent_id: parent_id !== '' ? parent_id : null, icon: file ? url + '/images/' + file.filename : null, pathIcon: file ? 'images/' + file.filename : null });
        res.status(200).json(response.create(updateCategory, 'Category ' + message.create));
    } catch (err) {
        const error = err.errors[0].message;
        if (file) {
            await fileDelete.deleteFile('images/' + file.filename);
        }
        res.status(400).json(response.bad(error ? error : err.message));
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const findCategory = await Category.findByPk(id);
        if (!findCategory) {
            return res.status(404).json(response.notfound('Category ' + message.notfound));
        }
        if (findCategory.pathIcon) {
            await fileDelete.deleteFile(findCategory.pathIcon);
        }
        await findCategory.destroy();
        res.status(200).json(response.delete('Category ' + findCategory.name + ' ' + message.delete));
    } catch (err) {
        res.status(400).json(response.bad(err.message));
    }
}