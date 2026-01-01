import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('@/pages/DashboardPage.vue'),
    },
    {
      path: '/auth',
      name: 'auth-landing',
      component: () => import('@/pages/AuthLandingPage.vue'),
    },
    {
      path: '/transfer/send',
      name: 'transfer-send',
      component: () => import('@/pages/transfers/SendMoneyPage.vue'),
    },
    {
      path: '/transfer/request',
      name: 'transfer-request',
      component: () => import('@/pages/transfers/RequestMoneyPage.vue'),
    },
    {
      path: '/transfer/international',
      name: 'transfer-international',
      component: () => import('@/pages/transfers/InternationalTransferPage.vue'),
    },
    {
      path: '/transfer/secure',
      name: 'transfer-secure',
      component: () => import('@/pages/transfers/SecurePaymentPage.vue'),
    },
    {
      path: '/transfer/scheduled',
      name: 'transfer-scheduled',
      component: () => import('@/pages/transfers/ScheduledTransferPage.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/pages/SettingsPage.vue'),
    },
    {
      path: '/account/details',
      name: 'account-details',
      component: () => import('@/pages/AccountDetailsPage.vue'),
    },
    {
      path: '/account/banks',
      name: 'account-banks',
      component: () => import('@/pages/account/BankAccountsPage.vue'),
    },
    {
      path: '/account/limits',
      name: 'account-limits',
      component: () => import('@/pages/account/FeesLimitsPage.vue'),
    },
    {
      path: '/account/summary',
      name: 'account-summary',
      component: () => import('@/pages/account/MonthlySummaryPage.vue'),
    },
    {
      path: '/payments',
      name: 'payments',
      component: () => import('@/pages/PaymentsHubPage.vue'),
    },
    {
      path: '/payments/deposit',
      name: 'payments-deposit',
      component: () => import('@/pages/payments/WithdrawDepositHubPage.vue'),
    },
    {
      path: '/payments/deposit/options',
      name: 'payments-deposit-options',
      component: () => import('@/pages/payments/DepositOptionsPage.vue'),
    },
    {
      path: '/payments/bank-transfer',
      name: 'payments-bank-transfer',
      component: () => import('@/pages/payments/BankTransferSelectPage.vue'),
    },
    {
      path: '/payments/own-iban',
      name: 'payments-own-iban',
      component: () => import('@/pages/payments/OwnIbanDepositPage.vue'),
    },
    {
      path: '/card',
      name: 'card-hub',
      component: () => import('@/pages/CardHubPage.vue'),
    },
    {
      path: '/card/virtual',
      name: 'card-virtual',
      component: () => import('@/pages/card/VirtualCardPage.vue'),
    },
    {
      path: '/card/apply',
      name: 'card-apply',
      component: () => import('@/pages/card/CardPromoPage.vue'),
    },
  ],
})

export default router
