const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "billing/:id", component: () => import("pages/BillingPage.vue") },
      {
        path: "confirmation",
        component: () => import("pages/ConfirmationPage.vue"),
      },
      { path: "menu/:id", component: () => import("pages/MenuPage.vue") },
      {
        path: "merchant/:id",
        component: () => import("pages/MerchantQRPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
