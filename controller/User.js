const bcrypt = require('bcrypt');

const User = require('../model/User');
const response = require('../util/message/response');
const message = require('../util/message/message');
const fileDelete = require('../util/file/deleteFile');
const config = require('../util/env/config');

exports.fetchAll = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(response.ok(users, message.getAll + 'Users!'));
    } catch (err) {
        res.status(400).json(response.bad(err.message));
    }
}

exports.createUser = async (req, res) => {
    const file = req.file;
    try {
        const url = req.protocol + '://' + req.get('host');
        const { name, email, username, password, phone, role, isVerified } = req.body;
        const has = await bcrypt.hashSync(password, config.saltRounds);
        const user = await User.create({
            name,
            username,
            email,
            password: has,
            phone: phone ? phone : null,
            role: role ? role : 'administrator',
            isVerified: isVerified ? isVerified : 0,
            image: file ? url + '/images/' + file.filename : null,
            imagePath: file ? 'images/' + file.filename : null
        });
        res.status(201).json(response.create(user, 'User ' + message.create));
    } catch (err) {
        const error = err.errors[0].message;
        if (file) {
            await fileDelete.deleteFile('images/' + file.filename);
        }
        res.status(400).json(response.bad(error ? error : err.message));
    }
}

exports.editUser = async (req, res) => {
    const file = req.file;
    try {
        const url = req.protocol + '://' + req.get('host');
        const { id, name, email, username, phone, role, isVerified } = req.body;
        const findUser = await User.findByPk(id);
        if (!findUser) {
            if (file) {
                await fileDelete.deleteFile('images/' + file.filename);
            }
            return res.status(404).json(response.notfound('User' + message.notfound));
        }
        if (file && findUser.imagePath) {
            await fileDelete.deleteFile(findUser.imagePath);
        }
        const updateUser = await findUser.update({
            name: name ? name : findUser.name,
            username: username ? username : findUser.username,
            email: email ? email : findUser.email,
            phone: phone ? phone : findUser.phone,
            role: role ? role : findUser.role,
            isVerified: isVerified ? isVerified : findUser.isVerified,
            image: file ? url + '/images/' + file.filename : findUser.image,
            imagePath: file ? 'images/' + file.filename : findUser.imagePath
        });
        res.status(200).json(response.update(updateUser, 'User ' + message.update));
    } catch (err) {
        const error = err.errors[0].message;
        if (file) {
            await fileDelete.deleteFile('images/' + file.filename);
        }
        res.status(400).json(response.bad(error ? error : err.message));
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const findUser = await User.findByPk(id);
        if (!findUser) {
            return res.status(404).json(response.notfound('User' + message.notfound));
        }
        if (file && findUser.imagePath) {
            await fileDelete.deleteFile(findUser.imagePath);
        }
        await findUser.destroy();
        res.status(200).json(response.delete('User ' + findUser.name + ' ' + message.delete));
    } catch (err) {
        res.status(400).json(response.bad(err.message));
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(200).json(response.bad(message.invalidauth));
        }
        const compare = await bcrypt.compareSync(password, user.password);
        if (!compare) {
            return res.status(200).json(response.bad(message.invalidauth));
        }
        res.status(200).json(response.ok(user, message.auth));
    } catch (err) {
        res.status(400).json(response.ok(err.message));
    }
}