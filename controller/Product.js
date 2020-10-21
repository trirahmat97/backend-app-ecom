const Product = require('../model/Product');
const User = require('../model/User');
const Category = require('../model/Category');

const response = require('../util/message/response');
const message = require('../util/message/message');
const fileDelete = require('../util/file/deleteFile');

exports.fetchAll = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(response.ok(products, message.getAll + 'Products!'));
    } catch (err) {
        res.status(400).json(response.bad(err.message));
    }
}

exports.create = async (req, res) => {
    const file = req.file;
    try {
        const url = req.protocol + '://' + req.get('host');
        const { userId, title, price, weight, description, diskon, stock, categoryId } = req.body;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json(response.notfound('User ' + message.notfound));
        }
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).json(response.notfound('Category ' + message.notfound));
        }
        const product = await Product.create({
            userId: user.id,
            categoryId: category.id,
            title,
            price,
            weight: weight ? weight : 0,
            description: description ? description : null,
            diskon: diskon ? diskon : 0,
            stock: stock ? stock : 0,
            thumbnail: file ? url + '/images/' + file.filename : null,
            thumbnailPath: file ? 'images/' + file.filename : null
        });
        res.status(200).json(response.create(product, 'User ' + message.create));
    } catch (err) {
        const error = err.errors[0].message;
        if (file) {
            await fileDelete.deleteFile('images/' + file.filename);
        }
        res.status(400).json(response.bad(error ? error : err.message));
    }
}