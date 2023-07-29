let Coupon = require('../Models/coupon.model');
let Blog = require('../Models/blog.model');
let Store = require('../Models/stores.model');
let User = require('../Models/user.model');
let Product = require('../Models/product.model');
let resHandler = require('../utils/responseHandler');

module.exports = {
    sortCoupons: sortCoupons,
    countCoupons: countCoupons,
    countBlogs: countBlogs,
    countStores: countStores,
    countProducts: countProducts,
    countUsers: countUsers,
    reArrangeCoupons: reArrangeCoupons
};

function sortCoupons(req, res) {
    req.body.forEach(elm => {
        Coupon.updateOne({ _id: elm._id }, elm, function (err, data) {})
    });
    res.json(resHandler.respondSuccess({ success: true }, "Coupons updated successfully", 2));
}
function reArrangeCoupons(req, res) {
    Coupon.
        find({ storeId: req.body.storeId }).
        sort({ sortNo: 1 }).
        exec(function (err, coupons) {
            if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
            else {
                if (coupons) {
                    reArrangeCallback(coupons);
                    setTimeout(function () {
                        res.json(resHandler.respondSuccess(coupons, "Coupons re Arranged successfully", 2))
                    }, 1000);
                }
                else res.json(resHandler.respondError("Unable to re Arrange Coupons", -3));
            }
        });
}
function reArrangeCallback(coupons) {
    var counter = 1;
    coupons.forEach(elm => {
        Coupon.updateOne({ _id: elm._id }, { sortNo: counter }, function (err, data) {
            if (err) console.log(err)
            else console.log("Success")
        });
        counter++;
    });
}
function countCoupons(req, res) {
    Coupon.estimatedDocumentCount(function (err, coupon) {
        if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
        else if (!coupon) res.json(resHandler.respondError("Coupon", -3));
        else res.json(resHandler.respondSuccess(coupon, "Coupons fetched successfully", 2));
    })
}
function countBlogs(req, res) {
    Blog.estimatedDocumentCount(function (err, blogs) {
        if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
        else if (!blogs) res.json(resHandler.respondError("Blog", -3));
        else res.json(resHandler.respondSuccess(blogs, "Blogs fetched successfully", 2));
    })
}
function countStores(req, res) {
    Store.estimatedDocumentCount(function (err, stores) {
        if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
        else if (!stores) res.json(resHandler.respondError("Store", -3));
        else res.json(resHandler.respondSuccess(stores, "Stores fetched successfully", 2));
    })
}
function countProducts(req, res) {
    Product.estimatedDocumentCount(function (err, products) {
        if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
        else if (!products) res.json(resHandler.respondError("Product", -3));
        else res.json(resHandler.respondSuccess(products, "Products fetched successfully", 2));
    })
}
function countUsers(req, res) {
    User.estimatedDocumentCount(function (err, users) {
        if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
        else if (!users) res.json(resHandler.respondError("User", -3));
        else res.json(resHandler.respondSuccess(users, "Users fetched successfully", 2));
    })
}