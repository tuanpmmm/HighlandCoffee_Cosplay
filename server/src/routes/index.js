const CategoriesRoutes = require('./categories.routes');
const ProductsRoutes = require('./products.routes')
const CustomerRoutes = require('./customers.routes');
const CartsRoutes = require('./carts.routes');
const OrdersRoutes = require('./orders.routes');
const CommentsRoutes = require('./comments.routes');
const NotificationsRoutes = require('./notifications.routes');

function routes(app) {
    app.use('/categories', CategoriesRoutes);
    app.use('/products', ProductsRoutes);
    app.use('/customers', CustomerRoutes)
    app.use('/carts', CartsRoutes);
    app.use('/orders', OrdersRoutes);
    app.use('/comments', CommentsRoutes);
    app.use('/notifications', NotificationsRoutes);
}

module.exports = routes;