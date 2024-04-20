const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'billing', component: () => import('pages/BillingPage.vue') },
      { path: 'balance', component: () => import('pages/BalancePage.vue') },
      { path: 'cart', component: () => import('pages/CartPage.vue') },
      { path: 'confirmation', component: () => import('pages/ConfirmationPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
