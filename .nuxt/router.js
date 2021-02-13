import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _49ac980e = () => interopDefault(import('../pages/about-us/index.vue' /* webpackChunkName: "pages/about-us/index" */))
const _5e59165a = () => interopDefault(import('../pages/account/index.vue' /* webpackChunkName: "pages/account/index" */))
const _21efd977 = () => interopDefault(import('../pages/blogs/index.vue' /* webpackChunkName: "pages/blogs/index" */))
const _53e17b06 = () => interopDefault(import('../pages/contact/index.vue' /* webpackChunkName: "pages/contact/index" */))
const _1da00c8c = () => interopDefault(import('../pages/dashboard/index.vue' /* webpackChunkName: "pages/dashboard/index" */))
const _11f8f1a6 = () => interopDefault(import('../pages/how-it-works/index.vue' /* webpackChunkName: "pages/how-it-works/index" */))
const _10309afc = () => interopDefault(import('../pages/messages/index.vue' /* webpackChunkName: "pages/messages/index" */))
const _75110ebc = () => interopDefault(import('../pages/policy/index.vue' /* webpackChunkName: "pages/policy/index" */))
const _2bcbe370 = () => interopDefault(import('../pages/providers/index.vue' /* webpackChunkName: "pages/providers/index" */))
const _3fffc26d = () => interopDefault(import('../pages/terms/index.vue' /* webpackChunkName: "pages/terms/index" */))
const _144a61d7 = () => interopDefault(import('../pages/testchat.vue' /* webpackChunkName: "pages/testchat" */))
const _06b002d0 = () => interopDefault(import('../pages/account/confirm-email.vue' /* webpackChunkName: "pages/account/confirm-email" */))
const _096b5b28 = () => interopDefault(import('../pages/account/reset-password.vue' /* webpackChunkName: "pages/account/reset-password" */))
const _547f0b16 = () => interopDefault(import('../pages/blogs/search/index.vue' /* webpackChunkName: "pages/blogs/search/index" */))
const _d8db220c = () => interopDefault(import('../pages/dashboard/admin/index.vue' /* webpackChunkName: "pages/dashboard/admin/index" */))
const _8299e51e = () => interopDefault(import('../pages/dashboard/baits.vue' /* webpackChunkName: "pages/dashboard/baits" */))
const _6a3c0998 = () => interopDefault(import('../pages/dashboard/baits/index.vue' /* webpackChunkName: "pages/dashboard/baits/index" */))
const _01f25232 = () => interopDefault(import('../pages/dashboard/baits/_id/closed/index.vue' /* webpackChunkName: "pages/dashboard/baits/_id/closed/index" */))
const _45802392 = () => interopDefault(import('../pages/dashboard/baits/_id/details/index.vue' /* webpackChunkName: "pages/dashboard/baits/_id/details/index" */))
const _e3f66f60 = () => interopDefault(import('../pages/dashboard/baits/_id/open/index.vue' /* webpackChunkName: "pages/dashboard/baits/_id/open/index" */))
const _a6d356b2 = () => interopDefault(import('../pages/dashboard/baits/_id/pending/index.vue' /* webpackChunkName: "pages/dashboard/baits/_id/pending/index" */))
const _2a084ee3 = () => interopDefault(import('../pages/dashboard/bites.vue' /* webpackChunkName: "pages/dashboard/bites" */))
const _b3ee41b4 = () => interopDefault(import('../pages/dashboard/bites/index.vue' /* webpackChunkName: "pages/dashboard/bites/index" */))
const _7b6aa94b = () => interopDefault(import('../pages/dashboard/bites/closed/index.vue' /* webpackChunkName: "pages/dashboard/bites/closed/index" */))
const _48abdcae = () => interopDefault(import('../pages/dashboard/bites/open/index.vue' /* webpackChunkName: "pages/dashboard/bites/open/index" */))
const _6228e0ae = () => interopDefault(import('../pages/dashboard/bites/pending/index.vue' /* webpackChunkName: "pages/dashboard/bites/pending/index" */))
const _1ba8360a = () => interopDefault(import('../pages/dashboard/bites/pool/index.vue' /* webpackChunkName: "pages/dashboard/bites/pool/index" */))
const _e1833256 = () => interopDefault(import('../pages/dashboard/logout/index.vue' /* webpackChunkName: "pages/dashboard/logout/index" */))
const _71b13f56 = () => interopDefault(import('../pages/dashboard/plans/index.vue' /* webpackChunkName: "pages/dashboard/plans/index" */))
const _cc0e8e58 = () => interopDefault(import('../pages/dashboard/profile/index.vue' /* webpackChunkName: "pages/dashboard/profile/index" */))
const _f15a9ee6 = () => interopDefault(import('../pages/dashboard/providers/index.vue' /* webpackChunkName: "pages/dashboard/providers/index" */))
const _24a7762e = () => interopDefault(import('../pages/dashboard/settings/index.vue' /* webpackChunkName: "pages/dashboard/settings/index" */))
const _3ab8ffc4 = () => interopDefault(import('../pages/messages/BbChat.vue' /* webpackChunkName: "pages/messages/BbChat" */))
const _33f9378a = () => interopDefault(import('../pages/messages/MsgCard.vue' /* webpackChunkName: "pages/messages/MsgCard" */))
const _1f0842f7 = () => interopDefault(import('../pages/payment/fail/index.vue' /* webpackChunkName: "pages/payment/fail/index" */))
const _2e3bdc60 = () => interopDefault(import('../pages/payment/success/index.vue' /* webpackChunkName: "pages/payment/success/index" */))
const _136e30e0 = () => interopDefault(import('../pages/profile/edit/index.vue' /* webpackChunkName: "pages/profile/edit/index" */))
const _5b9f37bb = () => interopDefault(import('../pages/profile/view/index.vue' /* webpackChunkName: "pages/profile/view/index" */))
const _9d85feea = () => interopDefault(import('../pages/services/banking-&-finance/index.vue' /* webpackChunkName: "pages/services/banking-&-finance/index" */))
const _018b8199 = () => interopDefault(import('../pages/services/insurance/index.vue' /* webpackChunkName: "pages/services/insurance/index" */))
const _1f85ee0c = () => interopDefault(import('../pages/services/property/index.vue' /* webpackChunkName: "pages/services/property/index" */))
const _d6912496 = () => interopDefault(import('../pages/dashboard/admin/bait/index.vue' /* webpackChunkName: "pages/dashboard/admin/bait/index" */))
const _72e581ad = () => interopDefault(import('../pages/dashboard/admin/blog/index.vue' /* webpackChunkName: "pages/dashboard/admin/blog/index" */))
const _3e8c57ee = () => interopDefault(import('../pages/dashboard/admin/category/index.vue' /* webpackChunkName: "pages/dashboard/admin/category/index" */))
const _9e0fb030 = () => interopDefault(import('../pages/dashboard/admin/company/index.vue' /* webpackChunkName: "pages/dashboard/admin/company/index" */))
const _4918e6e4 = () => interopDefault(import('../pages/dashboard/admin/promotion/index.vue' /* webpackChunkName: "pages/dashboard/admin/promotion/index" */))
const _565842d4 = () => interopDefault(import('../pages/dashboard/admin/user/index.vue' /* webpackChunkName: "pages/dashboard/admin/user/index" */))
const _5587d54e = () => interopDefault(import('../pages/dashboard/blogs/add/index.vue' /* webpackChunkName: "pages/dashboard/blogs/add/index" */))
const _ae72c31e = () => interopDefault(import('../pages/dashboard/blogs/listing/index.vue' /* webpackChunkName: "pages/dashboard/blogs/listing/index" */))
const _1f9020b5 = () => interopDefault(import('../pages/dashboard/blogs/my/index.vue' /* webpackChunkName: "pages/dashboard/blogs/my/index" */))
const _9ab50b26 = () => interopDefault(import('../pages/dashboard/profile/general/index.vue' /* webpackChunkName: "pages/dashboard/profile/general/index" */))
const _cdc616bc = () => interopDefault(import('../pages/dashboard/profile/provider/index.vue' /* webpackChunkName: "pages/dashboard/profile/provider/index" */))
const _126f8330 = () => interopDefault(import('../pages/dashboard/promotions/listing/index.vue' /* webpackChunkName: "pages/dashboard/promotions/listing/index" */))
const _2c0d0096 = () => interopDefault(import('../pages/dashboard/promotions/my/index.vue' /* webpackChunkName: "pages/dashboard/promotions/my/index" */))
const _6dac5f82 = () => interopDefault(import('../pages/dashboard/admin/blog/add/index.vue' /* webpackChunkName: "pages/dashboard/admin/blog/add/index" */))
const _568e3e0c = () => interopDefault(import('../pages/dashboard/admin/company/add/index.vue' /* webpackChunkName: "pages/dashboard/admin/company/add/index" */))
const _57f4fac0 = () => interopDefault(import('../pages/dashboard/admin/promotion/add/index.vue' /* webpackChunkName: "pages/dashboard/admin/promotion/add/index" */))
const _bd44deb0 = () => interopDefault(import('../pages/dashboard/admin/user/add/index.vue' /* webpackChunkName: "pages/dashboard/admin/user/add/index" */))
const _738ad9f2 = () => interopDefault(import('../pages/dashboard/admin/user/UserCard.vue' /* webpackChunkName: "pages/dashboard/admin/user/UserCard" */))
const _c866d432 = () => interopDefault(import('../pages/dashboard/admin/user/UserTable.vue' /* webpackChunkName: "pages/dashboard/admin/user/UserTable" */))
const _5c44a972 = () => interopDefault(import('../pages/dashboard/blogs/my/add/index.vue' /* webpackChunkName: "pages/dashboard/blogs/my/add/index" */))
const _d9949ab0 = () => interopDefault(import('../pages/dashboard/promotions/my/add/index.vue' /* webpackChunkName: "pages/dashboard/promotions/my/add/index" */))
const _fcb6439e = () => interopDefault(import('../pages/dashboard/admin/blog/detail/_id.vue' /* webpackChunkName: "pages/dashboard/admin/blog/detail/_id" */))
const _dd6123ac = () => interopDefault(import('../pages/dashboard/admin/blog/edit/_id.vue' /* webpackChunkName: "pages/dashboard/admin/blog/edit/_id" */))
const _0d8dda0f = () => interopDefault(import('../pages/dashboard/admin/company/edit/_id.vue' /* webpackChunkName: "pages/dashboard/admin/company/edit/_id" */))
const _5b811020 = () => interopDefault(import('../pages/dashboard/admin/promotion/detail/_id.vue' /* webpackChunkName: "pages/dashboard/admin/promotion/detail/_id" */))
const _8a1928ae = () => interopDefault(import('../pages/dashboard/admin/promotion/edit/_id.vue' /* webpackChunkName: "pages/dashboard/admin/promotion/edit/_id" */))
const _2a4506be = () => interopDefault(import('../pages/dashboard/admin/user/edit/_id.vue' /* webpackChunkName: "pages/dashboard/admin/user/edit/_id" */))
const _fdf109fc = () => interopDefault(import('../pages/dashboard/blogs/detail/_id.vue' /* webpackChunkName: "pages/dashboard/blogs/detail/_id" */))
const _60b5e98a = () => interopDefault(import('../pages/dashboard/blogs/edit/_id.vue' /* webpackChunkName: "pages/dashboard/blogs/edit/_id" */))
const _055918dc = () => interopDefault(import('../pages/dashboard/blogs/listing/_id/index.vue' /* webpackChunkName: "pages/dashboard/blogs/listing/_id/index" */))
const _1b4fd920 = () => interopDefault(import('../pages/dashboard/blogs/my/_id/index.vue' /* webpackChunkName: "pages/dashboard/blogs/my/_id/index" */))
const _61cbe6a3 = () => interopDefault(import('../pages/dashboard/promotions/detail/_id.vue' /* webpackChunkName: "pages/dashboard/promotions/detail/_id" */))
const _1b18f3ca = () => interopDefault(import('../pages/dashboard/promotions/listing/_id/index.vue' /* webpackChunkName: "pages/dashboard/promotions/listing/_id/index" */))
const _46b03efe = () => interopDefault(import('../pages/dashboard/promotions/my/_id/index.vue' /* webpackChunkName: "pages/dashboard/promotions/my/_id/index" */))
const _779c8300 = () => interopDefault(import('../pages/blogs/article/_title/index.vue' /* webpackChunkName: "pages/blogs/article/_title/index" */))
const _85d28610 = () => interopDefault(import('../pages/dashboard/providers/_id/index.vue' /* webpackChunkName: "pages/dashboard/providers/_id/index" */))
const _3cb695a7 = () => interopDefault(import('../pages/messages/chat/__userId.vue' /* webpackChunkName: "pages/messages/chat/__userId" */))
const _13598c12 = () => interopDefault(import('../pages/dashboard/plans/_id/payment/index.vue' /* webpackChunkName: "pages/dashboard/plans/_id/payment/index" */))
const _710e58fb = () => interopDefault(import('../pages/promotions/_title.vue' /* webpackChunkName: "pages/promotions/_title" */))
const _e59a759a = () => interopDefault(import('../pages/providers/_id/index.vue' /* webpackChunkName: "pages/providers/_id/index" */))
const _eeb99596 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about-us",
    component: _49ac980e,
    name: "about-us"
  }, {
    path: "/account",
    component: _5e59165a,
    name: "account"
  }, {
    path: "/blogs",
    component: _21efd977,
    name: "blogs"
  }, {
    path: "/contact",
    component: _53e17b06,
    name: "contact"
  }, {
    path: "/dashboard",
    component: _1da00c8c,
    name: "dashboard"
  }, {
    path: "/how-it-works",
    component: _11f8f1a6,
    name: "how-it-works"
  }, {
    path: "/messages",
    component: _10309afc,
    name: "messages"
  }, {
    path: "/policy",
    component: _75110ebc,
    name: "policy"
  }, {
    path: "/providers",
    component: _2bcbe370,
    name: "providers"
  }, {
    path: "/terms",
    component: _3fffc26d,
    name: "terms"
  }, {
    path: "/testchat",
    component: _144a61d7,
    name: "testchat"
  }, {
    path: "/account/confirm-email",
    component: _06b002d0,
    name: "account-confirm-email"
  }, {
    path: "/account/reset-password",
    component: _096b5b28,
    name: "account-reset-password"
  }, {
    path: "/blogs/search",
    component: _547f0b16,
    name: "blogs-search"
  }, {
    path: "/dashboard/admin",
    component: _d8db220c,
    name: "dashboard-admin"
  }, {
    path: "/dashboard/baits",
    component: _8299e51e,
    children: [{
      path: "",
      component: _6a3c0998,
      name: "dashboard-baits"
    }, {
      path: ":id/closed",
      component: _01f25232,
      name: "dashboard-baits-id-closed"
    }, {
      path: ":id/details",
      component: _45802392,
      name: "dashboard-baits-id-details"
    }, {
      path: ":id/open",
      component: _e3f66f60,
      name: "dashboard-baits-id-open"
    }, {
      path: ":id/pending",
      component: _a6d356b2,
      name: "dashboard-baits-id-pending"
    }]
  }, {
    path: "/dashboard/bites",
    component: _2a084ee3,
    children: [{
      path: "",
      component: _b3ee41b4,
      name: "dashboard-bites"
    }, {
      path: "closed",
      component: _7b6aa94b,
      name: "dashboard-bites-closed"
    }, {
      path: "open",
      component: _48abdcae,
      name: "dashboard-bites-open"
    }, {
      path: "pending",
      component: _6228e0ae,
      name: "dashboard-bites-pending"
    }, {
      path: "pool",
      component: _1ba8360a,
      name: "dashboard-bites-pool"
    }]
  }, {
    path: "/dashboard/logout",
    component: _e1833256,
    name: "dashboard-logout"
  }, {
    path: "/dashboard/plans",
    component: _71b13f56,
    name: "dashboard-plans"
  }, {
    path: "/dashboard/profile",
    component: _cc0e8e58,
    name: "dashboard-profile"
  }, {
    path: "/dashboard/providers",
    component: _f15a9ee6,
    name: "dashboard-providers"
  }, {
    path: "/dashboard/settings",
    component: _24a7762e,
    name: "dashboard-settings"
  }, {
    path: "/messages/BbChat",
    component: _3ab8ffc4,
    name: "messages-BbChat"
  }, {
    path: "/messages/MsgCard",
    component: _33f9378a,
    name: "messages-MsgCard"
  }, {
    path: "/payment/fail",
    component: _1f0842f7,
    name: "payment-fail"
  }, {
    path: "/payment/success",
    component: _2e3bdc60,
    name: "payment-success"
  }, {
    path: "/profile/edit",
    component: _136e30e0,
    name: "profile-edit"
  }, {
    path: "/profile/view",
    component: _5b9f37bb,
    name: "profile-view"
  }, {
    path: "/services/banking-&-finance",
    component: _9d85feea,
    name: "services-banking-&-finance"
  }, {
    path: "/services/insurance",
    component: _018b8199,
    name: "services-insurance"
  }, {
    path: "/services/property",
    component: _1f85ee0c,
    name: "services-property"
  }, {
    path: "/dashboard/admin/bait",
    component: _d6912496,
    name: "dashboard-admin-bait"
  }, {
    path: "/dashboard/admin/blog",
    component: _72e581ad,
    name: "dashboard-admin-blog"
  }, {
    path: "/dashboard/admin/category",
    component: _3e8c57ee,
    name: "dashboard-admin-category"
  }, {
    path: "/dashboard/admin/company",
    component: _9e0fb030,
    name: "dashboard-admin-company"
  }, {
    path: "/dashboard/admin/promotion",
    component: _4918e6e4,
    name: "dashboard-admin-promotion"
  }, {
    path: "/dashboard/admin/user",
    component: _565842d4,
    name: "dashboard-admin-user"
  }, {
    path: "/dashboard/blogs/add",
    component: _5587d54e,
    name: "dashboard-blogs-add"
  }, {
    path: "/dashboard/blogs/listing",
    component: _ae72c31e,
    name: "dashboard-blogs-listing"
  }, {
    path: "/dashboard/blogs/my",
    component: _1f9020b5,
    name: "dashboard-blogs-my"
  }, {
    path: "/dashboard/profile/general",
    component: _9ab50b26,
    name: "dashboard-profile-general"
  }, {
    path: "/dashboard/profile/provider",
    component: _cdc616bc,
    name: "dashboard-profile-provider"
  }, {
    path: "/dashboard/promotions/listing",
    component: _126f8330,
    name: "dashboard-promotions-listing"
  }, {
    path: "/dashboard/promotions/my",
    component: _2c0d0096,
    name: "dashboard-promotions-my"
  }, {
    path: "/dashboard/admin/blog/add",
    component: _6dac5f82,
    name: "dashboard-admin-blog-add"
  }, {
    path: "/dashboard/admin/company/add",
    component: _568e3e0c,
    name: "dashboard-admin-company-add"
  }, {
    path: "/dashboard/admin/promotion/add",
    component: _57f4fac0,
    name: "dashboard-admin-promotion-add"
  }, {
    path: "/dashboard/admin/user/add",
    component: _bd44deb0,
    name: "dashboard-admin-user-add"
  }, {
    path: "/dashboard/admin/user/UserCard",
    component: _738ad9f2,
    name: "dashboard-admin-user-UserCard"
  }, {
    path: "/dashboard/admin/user/UserTable",
    component: _c866d432,
    name: "dashboard-admin-user-UserTable"
  }, {
    path: "/dashboard/blogs/my/add",
    component: _5c44a972,
    name: "dashboard-blogs-my-add"
  }, {
    path: "/dashboard/promotions/my/add",
    component: _d9949ab0,
    name: "dashboard-promotions-my-add"
  }, {
    path: "/dashboard/admin/blog/detail/:id?",
    component: _fcb6439e,
    name: "dashboard-admin-blog-detail-id"
  }, {
    path: "/dashboard/admin/blog/edit/:id?",
    component: _dd6123ac,
    name: "dashboard-admin-blog-edit-id"
  }, {
    path: "/dashboard/admin/company/edit/:id?",
    component: _0d8dda0f,
    name: "dashboard-admin-company-edit-id"
  }, {
    path: "/dashboard/admin/promotion/detail/:id?",
    component: _5b811020,
    name: "dashboard-admin-promotion-detail-id"
  }, {
    path: "/dashboard/admin/promotion/edit/:id?",
    component: _8a1928ae,
    name: "dashboard-admin-promotion-edit-id"
  }, {
    path: "/dashboard/admin/user/edit/:id?",
    component: _2a4506be,
    name: "dashboard-admin-user-edit-id"
  }, {
    path: "/dashboard/blogs/detail/:id?",
    component: _fdf109fc,
    name: "dashboard-blogs-detail-id"
  }, {
    path: "/dashboard/blogs/edit/:id?",
    component: _60b5e98a,
    name: "dashboard-blogs-edit-id"
  }, {
    path: "/dashboard/blogs/listing/:id",
    component: _055918dc,
    name: "dashboard-blogs-listing-id"
  }, {
    path: "/dashboard/blogs/my/:id",
    component: _1b4fd920,
    name: "dashboard-blogs-my-id"
  }, {
    path: "/dashboard/promotions/detail/:id?",
    component: _61cbe6a3,
    name: "dashboard-promotions-detail-id"
  }, {
    path: "/dashboard/promotions/listing/:id",
    component: _1b18f3ca,
    name: "dashboard-promotions-listing-id"
  }, {
    path: "/dashboard/promotions/my/:id",
    component: _46b03efe,
    name: "dashboard-promotions-my-id"
  }, {
    path: "/blogs/article/:title?",
    component: _779c8300,
    name: "blogs-article-title"
  }, {
    path: "/dashboard/providers/:id",
    component: _85d28610,
    name: "dashboard-providers-id"
  }, {
    path: "/messages/chat/:_userId?",
    component: _3cb695a7,
    name: "messages-chat-_userId"
  }, {
    path: "/dashboard/plans/:id/payment",
    component: _13598c12,
    name: "dashboard-plans-id-payment"
  }, {
    path: "/promotions/:title?",
    component: _710e58fb,
    name: "promotions-title"
  }, {
    path: "/providers/:id",
    component: _e59a759a,
    name: "providers-id"
  }, {
    path: "/",
    component: _eeb99596,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
