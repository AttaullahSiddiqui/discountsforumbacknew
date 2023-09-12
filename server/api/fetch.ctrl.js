let User = require("../Models/user.model");
let Category = require("../Models/categories.model");
let Store = require("../Models/stores.model");
let Coupon = require("../Models/coupon.model");
let Blog = require("../Models/blog.model");
let Banner = require("../Models/banner.model");
let postImg = require("../Models/postImage.model");
let Product = require("../Models/product.model");
let BlogItem = require("../Models/blogItems.model");
let Settings = require("../Models/settings.model");
let userEmails = require("../Models/userEmails.model");
let blogComments = require("../Models/blogcomments.model");
let resHandler = require("../utils/responseHandler");
const axios = require("axios");
let brandArray = [
  {
    name: "Admitad",
    id: "admitad",
    email: "officialdiscountsforum@gmail.com",
    pwd: "xUWutbiUvXPd@f9",
  },
];

module.exports = {
  fetchCategories: fetchCategories,
  fetchStoresOnlyId: fetchStoresOnlyId,
  fetchBlogsOnlyId: fetchBlogsOnlyId,
  fetchStoreById: fetchStoreById,
  fetchStoreByIdDuplicate: fetchStoreByIdDuplicate,
  fetchStoresWithLimit: fetchStoresWithLimit,
  fetchCouponsById: fetchCouponsById,
  fetchCouponsForSorting: fetchCouponsForSorting,
  fetchBlogs: fetchBlogs,
  fetchBannersById: fetchBannersById,
  fetchPostImagesById: fetchPostImagesById,
  fetchProductsById: fetchProductsById,
  fetchBlogItemsById: fetchBlogItemsById,
  fetchUsers: fetchUsers,
  fetchSettingsData: fetchSettingsData,
  fetchEmails: fetchEmails,
  fetchUnApprovedComments: fetchUnApprovedComments,
  fetchApprovedComments: fetchApprovedComments,
  fetchBrandData: fetchBrandData,
};

function fetchCategories(req, res) {
  Category.find({})
    .skip(Number(req.query.skipNo))
    .limit(Number(req.query.limitNo))
    .exec(function (err, categories) {
      if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
      else {
        if (categories.length)
          res.json(
            resHandler.respondSuccess(
              categories,
              "Categories fetched successfully",
              2
            )
          );
        else
          res.json(resHandler.respondError("Unable to fetch categories", -3));
      }
    });
}

function fetchStoresOnlyId(req, res) {
  Store.find({}, "name storeURL", { sort: ["name"] }, function (err, stores) {
    if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
    else if (!stores)
      res.json(resHandler.respondError("No Stores at the moment", -3));
    else
      res.json(
        resHandler.respondSuccess(stores, "Stores fetched successfully", 2)
      );
  });
  // Store.find({}, 'name storeURL', function (err, stores) {
  //     if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
  //     else if (!stores) res.json(resHandler.respondError("No Stores at the moment", -3));
  //     else res.json(resHandler.respondSuccess(stores, "Stores fetched successfully", 2));
  // })
}
function fetchBlogsOnlyId(req, res) {
  Blog.find({}, "title blogURL", { sort: ["title"] }, function (err, blogs) {
    if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
    else if (!blogs)
      res.json(resHandler.respondError("No Blogs at the moment", -3));
    else
      res.json(
        resHandler.respondSuccess(blogs, "Blogs fetched successfully", 2)
      );
  });
}
function fetchStoresWithLimit(req, res) {
  Store.find({}, "name _id")
    .skip(Number(req.query.skipNo))
    .limit(Number(req.query.limitNo))
    .exec(function (err, stores) {
      if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
      else {
        if (stores.length)
          res.json(
            resHandler.respondSuccess(stores, "Stores fetched successfully", 2)
          );
        else
          res.json(
            resHandler.respondError("Unable to fetch Stores at the moment", -3)
          );
      }
    });
}
function fetchStoreById(req, res) {
  Store.findOne({ storeURL: req.query._id }, function (err, store) {
    if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
    else if (store) res.json(resHandler.respondSuccess(store, "", 2));
    else res.json(resHandler.respondError("Unable to fetch tracking link", -3));
  });
}
function fetchStoreByIdDuplicate(req, res) {
  Store.findOne({ _id: req.query._id }, function (err, store) {
    if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
    else if (store) res.json(resHandler.respondSuccess(store, "", 2));
    else
      res.json(resHandler.respondError("Unable to fetch selected store", -3));
  });
}
function fetchCouponsById(req, res) {
  Coupon.find({ storeId: req.query._id })
    // skip(Number(req.query.skipNo)).
    // limit(Number(req.query.limitNo)).
    .sort({ sortNo: -1 })
    .exec(function (err, coupons) {
      if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
      else {
        if (coupons)
          res.json(
            resHandler.respondSuccess(
              coupons,
              "Coupons fetched successfully",
              2
            )
          );
        else res.json(resHandler.respondError("No coupons in this Store", -3));
      }
    });
}
function fetchCouponsForSorting(req, res) {
  Coupon.find({ storeId: req.query._id }, "sortNo offerBox")
    .skip(Number(req.query.skipNo))
    .limit(Number(req.query.limitNo))
    .sort({ sortNo: 1 })
    .exec(function (err, coupons) {
      if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
      else {
        if (coupons)
          res.json(
            resHandler.respondSuccess(
              coupons,
              "Coupons fetched successfully",
              2
            )
          );
        else res.json(resHandler.respondError("No coupons in this Store", -3));
      }
    });
}
function fetchBlogs(req, res) {
  Blog.find({})
    .sort({ CreatedAt: -1 })
    .skip(Number(req.query.skipNo))
    .limit(Number(req.query.limitNo))
    .exec(function (err, blogs) {
      if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
      else {
        if (blogs.length)
          res.json(
            resHandler.respondSuccess(blogs, "Blogs fetched successfully", 2)
          );
        else res.json(resHandler.respondError("Unbale to fetch blogs", -3));
      }
    });
}
function fetchBannersById(req, res) {
  Banner.find({ storeId: req.query._id })
    .sort({ CreatedAt: -1 })
    .exec(function (err, banners) {
      if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
      else {
        if (banners.length)
          res.json(
            resHandler.respondSuccess(
              banners,
              "Banners fetched successfully",
              2
            )
          );
        else
          res.json(
            resHandler.respondError("No Banner found in this Store", -3)
          );
      }
    });
}
function fetchPostImagesById(req, res) {
  postImg
    .find({ storeId: req.query._id })
    .sort({ CreatedAt: -1 })
    .exec(function (err, postImgs) {
      if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
      else {
        if (postImgs.length)
          res.json(
            resHandler.respondSuccess(
              postImgs,
              "Post Images fetched successfully",
              2
            )
          );
        else
          res.json(
            resHandler.respondError("No Post Image found in this Store", -3)
          );
      }
    });
}
function fetchProductsById(req, res) {
  Product.find({ storeId: req.query._id })
    .sort({ CreatedAt: -1 })
    .exec(function (err, products) {
      if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
      else {
        if (products.length)
          res.json(
            resHandler.respondSuccess(
              products,
              "Products fetched successfully",
              2
            )
          );
        else
          res.json(
            resHandler.respondError("No Product found in this Store", -3)
          );
      }
    });
}
function fetchBlogItemsById(req, res) {
  BlogItem.find({ blogId: req.query._id })
    .sort({ CreatedAt: -1 })
    .exec(function (err, items) {
      if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
      else {
        if (items.length)
          res.json(
            resHandler.respondSuccess(
              items,
              "Blog Items fetched successfully",
              2
            )
          );
        else
          res.json(resHandler.respondError("No Item found in this Blog", -3));
      }
    });
}
function fetchUsers(req, res) {
  User.find({}, function (err, users) {
    if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
    else if (!users)
      res.json(
        resHandler.respondError("Unable to fetch Users at the moment", -3)
      );
    else
      res.json(
        resHandler.respondSuccess(users, "Users fetched successfully", 2)
      );
  });
}
function fetchSettingsData(req, res) {
  Settings.findOne(
    { _id: "60efd3f2fba2a17903aa5643" },
    function (err, settings) {
      if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
      else if (!settings)
        res.json(
          resHandler.respondError("Unable to fetch Settings at the moment", -3)
        );
      else
        res.json(
          resHandler.respondSuccess(
            settings,
            "Settings Data fetched successfully",
            2
          )
        );
    }
  );
}
function fetchEmails(req, res) {
  userEmails.find({}, function (err, emails) {
    if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
    else if (!emails)
      res.json(
        resHandler.respondError("Unable to fetch Emails at the moment", -3)
      );
    else
      res.json(
        resHandler.respondSuccess(emails, "Emails fetched successfully", 2)
      );
  });
}
function fetchUnApprovedComments(req, res) {
  blogComments
    .find({ active: false })
    .populate("blogId", "title")
    .exec(function (err, comments) {
      if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
      else if (!comments)
        res.json(
          resHandler.respondError("Unable to fetch Un approved comments", -3)
        );
      else
        res.json(
          resHandler.respondSuccess(
            comments,
            "Un approved comments fetched successfully",
            2
          )
        );
    });
}
function fetchApprovedComments(req, res) {
  blogComments
    .find({ active: true })
    .populate("blogId", "title")
    .exec(function (err, comments) {
      if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
      else if (!comments)
        res.json(
          resHandler.respondError("Unable to fetch Approved comments", -3)
        );
      else
        res.json(
          resHandler.respondSuccess(
            comments,
            "Approved comments fetched successfully",
            2
          )
        );
    });
}
function fetchBrandData(req, res) {
  console.log(req.query._id);
  let options = {
    method: "GET",
    url: "https://export.admitad.com/en/webmaster/websites/2462850/products/export_adv_products/?user=simtiaz&code=hh9kh78idr&format=xml&currency=&feed_id=23774&last_import=",
  };
  // for (var i = 0; i < brandArray.length; i++) {
  //   if (brandArray[i].id == req.query._id) {
  //     options.url = brandArray[i].url;
  //     break;
  //   }
  // }
  axios(options).then((response) => {
    console.log(response.data);
  });
}
