const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

const connection = require('./db');
const User = require('./model/User');
const Product = require('./model/Product');
const Category = require('./model/Category');
const Image = require('./model/Image');
const Cart = require('./model/Cart');
const Order = require('./model/Order');
const ImageProduct = require('./model/ImageProduct');
const CartItem = require('./model/CartItem');
const OrderItem = require('./model/OrderItem');

//router
const routerCategory = require('./routes/category');
const userController = require('./routes/user');
const productController = require('./routes/product');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//config upload
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, Date.now() + '-' + name);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

app.use(multer({
    storage: fileStorage,
    fileFilter: fileFilter
}).single('image'));

app.use('/store/category', routerCategory);
app.use('/store/user', userController);
app.use('/store/product', productController);

//relation
Product.belongsTo(User, { onDelete: 'SET NULL', onUpdate: 'CASCADE' });
User.hasMany(Product);

Product.belongsTo(Category, { onDelete: 'SET NULL', onUpdate: 'CASCADE' });
Category.hasOne(Product);

Cart.belongsTo(User);
User.hasOne(Cart);

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

Product.belongsToMany(Image, { through: ImageProduct });
Image.belongsToMany(Product, { through: ImageProduct });

const port = process.env.port || 1000;
app.listen(port, async () => {
    try {
        await connection.authenticate();
        await connection.sync({ force: false });
        console.log('Connection has been connect in database and server port: ' + port);
    } catch (error) {
        console.error('Unable to connect to the database: ', error.message);
    }
});
