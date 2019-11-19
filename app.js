const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// router of products and products api
const productsRouter = require('./routes/products/product.route');
const productsRouterApi = require('./api/routes/products/product.route.api');
// router of categories and categories api
//const categoriesRouter = require('./routes/categories/category.route');
//const categoriesRouterApi = require('./api/routes/categories/category.route.api');
// router of brands and brands api
//const brandsRouter = require('./routes/brands/brand.route');
//const brandsRouterApi = require('./api/routes/brands/brand.route.api');

const app = express();
var port = process.env.PORT || 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// products
app.use('/products', productsRouter);
// categories
//app.use('/categories', categoriesRouter);
// brands
//app.use('/brands', brandsRouter);

// api
app.use('/api/products', productsRouterApi);
//app.use('/api/categories', categoriesRouterApi);
//app.use('/api/brands', brandsRouterApi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
// module.exports = app;
