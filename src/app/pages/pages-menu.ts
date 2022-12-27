import { NbMenuItem } from "@nebular/theme";

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: "Dashboard",
    icon: "home-outline",
    link: "dashboard",
  },
  {
    title: "Users",
    icon: "people-outline",
    children: [
      {
        title: "Add User",
        link: "/pages/adduser",
      },
      {
        title: "All User",
        link: "/pages/alluser",
      },
    ],
  },
  {
    title: "Settings",
    icon: "settings-outline",
    link: "/pages/settings",
  },
  {
    title: "Data Entry",
    group: true,
  },
  {
    title: "Categories",
    icon: "layout-outline",
    children: [
      {
        title: "Add Category",
        link: "/pages/addcategory",
      },
      {
        title: "All Categories",
        link: "/pages/allcategories",
      },
    ],
  },
  {
    title: "Stores",
    icon: "shopping-bag-outline",
    children: [
      {
        title: "Add Store",
        link: "/pages/addstore",
      },
      {
        title: "Edit Store",
        link: "/pages/editstore",
      },
      {
        title: "Sort Top Stores",
        link: "/pages/sorttopstores",
      },
    ],
  },
  {
    title: "Coupons",
    icon: "gift-outline",
    children: [
      {
        title: "Add Coupon",
        link: "/pages/addcoupon",
      },
      {
        title: "All Coupons",
        link: "/pages/allcoupons",
      },
      {
        title: "Sort Coupons",
        link: "/pages/sortcoupons",
      },
    ],
  },
  {
    title: "Banners",
    icon: "image-outline",
    children: [
      {
        title: "Add Banner",
        link: "/pages/layout/stepper",
      },
      {
        title: "Add Post Image",
        link: "/pages/layout/list",
      },
    ],
  },
  {
    title: "Extras",
    group: true,
  },
  {
    title: "Blog Post",
    icon: "clipboard-outline",
    children: [
      {
        title: "Add Blog",
        link: "/pages/layout/stepper",
      },
      {
        title: "All Blogs",
        link: "/pages/layout/list",
      },
    ],
  },
  {
    title: "Slider",
    icon: "toggle-right-outline",
    link: "/pages/iot-dashboard",
  },
  {
    title: "Emails",
    icon: "email-outline",
    link: "/pages/iot-dashboard",
  },
];
