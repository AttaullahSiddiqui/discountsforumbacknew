const express = require("express");
const router = express.Router();
let upload = require("../utils/multer.service");
let cloudinaryStore = require("../utils/cloudinary.service");
let apiCtrl = require("../api/api.ctrl");
let fetchCtrl = require("../api/fetch.ctrl");
let dltCtrl = require("../api/delete.ctrl");
let putCtrl = require("../api/put.ctrl");
let sortCtrl = require("../api/sort.ctrl");

router.post("/login", apiCtrl.authUser);
router.post("/verifyUserToken", apiCtrl.verifyUserToken);
router.post("/register", apiCtrl.registerUser);
router.post("/isAdmin", apiCtrl.isAdmin);

router.get("/countCoupons", sortCtrl.countCoupons);
router.get("/countBlogs", sortCtrl.countBlogs);
router.get("/countStores", sortCtrl.countStores);
router.get("/countProducts", sortCtrl.countProducts);
router.get("/countUsers", sortCtrl.countUsers);

router.post("/createCategory", apiCtrl.createCategory);
router.post(
  "/addStore",
  upload.single("uploadFile"),
  cloudinaryStore,
  apiCtrl.addStore
);
router.post("/addCoupon", apiCtrl.addCoupon);
router.post("/addDeal", apiCtrl.addDeal);
router.post("/addBlog", apiCtrl.addBlog);
router.post(
  "/addSlide",
  upload.single("uploadFile"),
  cloudinaryStore,
  apiCtrl.addSlide
);
router.post("/addBanner", apiCtrl.addBanner);
router.post("/addPostImage", apiCtrl.addPostImage);
router.post("/addProduct", apiCtrl.addProduct);
router.post("/addBlogItem", apiCtrl.addBlogItem);

router.get("/fetchUsers", fetchCtrl.fetchUsers);
router.get("/fetchCategories", fetchCtrl.fetchCategories);
router.get("/fetchBlogs", fetchCtrl.fetchBlogs);
router.get("/fetchStoresOnlyId", fetchCtrl.fetchStoresOnlyId);
router.get("/fetchBlogsOnlyId", fetchCtrl.fetchBlogsOnlyId);
router.get("/fetchStoreById", fetchCtrl.fetchStoreById);
router.get("/fetchStoreByIdDuplicate", fetchCtrl.fetchStoreByIdDuplicate);
router.get("/fetchStoresWithLimit", fetchCtrl.fetchStoresWithLimit);
router.get("/fetchCouponsById", fetchCtrl.fetchCouponsById);
router.get("/fetchCouponsForSorting", fetchCtrl.fetchCouponsForSorting);
router.get("/fetchEmails", fetchCtrl.fetchEmails);
router.get("/fetchBannersById", fetchCtrl.fetchBannersById);
router.get("/fetchPostImagesById", fetchCtrl.fetchPostImagesById);
router.get("/fetchProductsById", fetchCtrl.fetchProductsById);
router.get("/fetchBlogItemsById", fetchCtrl.fetchBlogItemsById);
router.get("/fetchSettingsData", fetchCtrl.fetchSettingsData);
router.get("/fetchUnApprovedComments", fetchCtrl.fetchUnApprovedComments);
router.get("/fetchApprovedComments", fetchCtrl.fetchApprovedComments);
router.get("/fetchBrandData", fetchCtrl.fetchBrandData);

router.post("/editUser", putCtrl.editUser);
router.post("/editCategory", putCtrl.editCategory);
router.post(
  "/editStore",
  upload.single("uploadFile"),
  cloudinaryStore,
  putCtrl.editStore
);
router.post("/editCoupon", putCtrl.editCoupon);
router.post(
  "/editBlog",
  upload.single("uploadFile"),
  cloudinaryStore,
  putCtrl.editBlog
);
router.post("/updateBanner", putCtrl.updateBanner);
router.post("/updatePostImage", putCtrl.updatePostImage);
router.post("/updateProduct", putCtrl.updateProduct);
router.post("/updateBlogItem", putCtrl.updateBlogItem);
router.post("/changeallCouponsDate", putCtrl.changeallCouponsDate);
router.post("/updateSettings", putCtrl.updateSettings);
router.post("/approveBlogComment", putCtrl.approveBlogComment);

router.post("/deleteCategory", dltCtrl.deleteCategory);
router.post("/deleteStore", dltCtrl.deleteStore);
router.post("/deleteCoupon", dltCtrl.deleteCoupon);
router.post("/deleteBlog", dltCtrl.deleteBlog);
router.post("/deleteUser", dltCtrl.deleteUser);
router.post("/deleteBanner", dltCtrl.deleteBanner);
router.post("/deletePostImage", dltCtrl.deletePostImage);
router.post("/deleteProduct", dltCtrl.deleteProduct);
router.post("/deleteBlogItem", dltCtrl.deleteBlogItem);
router.post("/deleteBlogComment", dltCtrl.deleteBlogComment);

router.post("/sortCoupons", sortCtrl.sortCoupons);
router.post("/reArrangeCoupons", sortCtrl.reArrangeCoupons);

module.exports = router;
