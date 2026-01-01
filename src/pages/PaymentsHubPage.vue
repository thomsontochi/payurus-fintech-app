<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import {
  ArrowRight,
  BadgePercent,
  BusFront,
  ChevronRight,
  Droplet,
  Flame,
  Gamepad2,
  Gift,
  HeartHandshake,
  Phone,
  Plane,
  Search,
  ShieldCheck,
  Sparkles,
  Ticket,
  Wifi,
  Zap,
} from 'lucide-vue-next'
import MainLayout from '@/components/layout/MainLayout.vue'
import TransferOptionsSheet from '@/components/ui/TransferOptionsSheet.vue'
import QrActionSheet from '@/components/ui/QrActionSheet.vue'
import PaymentsSummaryModal, {
  type PaymentsSummaryData,
} from '@/components/payments/PaymentsSummaryModal.vue'
import { useTransferSheet } from '@/composables/useTransferSheet'

type BottomNavId = 'home' | 'qr' | 'transfer' | 'payments' | 'card'

type PaymentCategory = {
  id: string
  labelKey: string
  icon: any
  iconBg: string
  iconColor: string
  badge?: string
}

const { t } = useI18n()
const router = useRouter()
const searchQuery = ref('')
const { transferSheetOpen, openTransferSheet, closeTransferSheet, handleTransferSelect } =
  useTransferSheet()
const qrSheetOpen = ref(false)
const summaryOpen = ref(false)

const summaryData = computed<PaymentsSummaryData>(() => ({
  titleKey: 'paymentsHub.summaryModal.title',
  descriptionKey: 'paymentsHub.summaryModal.description',
  totalLabelKey: 'paymentsHub.summaryModal.totalLabel',
  totalValue: '₺3,417.50',
  categories: [
    {
      id: 'telecom',
      labelKey: 'paymentsHub.summaryModal.categories.telecom',
      value: 28,
      color: '#f7931a',
    },
    {
      id: 'gaming',
      labelKey: 'paymentsHub.summaryModal.categories.gaming',
      value: 18,
      color: '#7f5bff',
    },
    {
      id: 'donation',
      labelKey: 'paymentsHub.summaryModal.categories.donation',
      value: 14,
      color: '#f54d6b',
    },
    {
      id: 'findeks',
      labelKey: 'paymentsHub.summaryModal.categories.findeks',
      value: 12,
      color: '#2ec4b6',
    },
    {
      id: 'airport',
      labelKey: 'paymentsHub.summaryModal.categories.airport',
      value: 10,
      color: '#ff9f43',
    },
    {
      id: 'transit',
      labelKey: 'paymentsHub.summaryModal.categories.transit',
      value: 18,
      color: '#1dd3b0',
    },
  ],
}))

const openSummary = () => {
  summaryOpen.value = true
}

const closeSummary = () => {
  summaryOpen.value = false
}

const navRoutes: Partial<Record<BottomNavId, string>> = {
  home: '/',
  payments: '/payments',
  card: '/card',
}

const handleNavNavigate = (itemId: string) => {
  if (itemId === 'transfer') {
    openTransferSheet()
    return
  }
  if (itemId === 'qr') {
    qrSheetOpen.value = true
    return
  }
  const target = navRoutes[itemId as BottomNavId]
  if (target) {
    router.push(target)
  }
}

const categories: PaymentCategory[] = [
  {
    id: 'gsm',
    labelKey: 'paymentsHub.categories.gsm',
    icon: BadgePercent,
    iconBg: 'bg-[#2d2013]',
    iconColor: 'text-[#f9a24c]',
  },
  {
    id: 'transit',
    labelKey: 'paymentsHub.categories.transit',
    icon: BusFront,
    iconBg: 'bg-[#0d211f]',
    iconColor: 'text-[#4de0ac]',
  },
  {
    id: 'gaming',
    labelKey: 'paymentsHub.categories.gaming',
    icon: Gamepad2,
    iconBg: 'bg-[#14112c]',
    iconColor: 'text-[#8e8bff]',
  },
  {
    id: 'lottery',
    labelKey: 'paymentsHub.categories.lottery',
    icon: Sparkles,
    iconBg: 'bg-[#211323]',
    iconColor: 'text-[#e96ad2]',
  },
  {
    id: 'donation',
    labelKey: 'paymentsHub.categories.donation',
    icon: HeartHandshake,
    iconBg: 'bg-[#1b1b2c]',
    iconColor: 'text-[#7fc0ff]',
  },
  {
    id: 'findeks',
    labelKey: 'paymentsHub.categories.findeks',
    icon: ShieldCheck,
    iconBg: 'bg-[#1b2331]',
    iconColor: 'text-[#7eb6ff]',
    badge: 'paymentsHub.badges.new',
  },
  {
    id: 'airport',
    labelKey: 'paymentsHub.categories.airport',
    icon: Plane,
    iconBg: 'bg-[#20161f]',
    iconColor: 'text-[#ff8ab5]',
  },
  {
    id: 'water',
    labelKey: 'paymentsHub.categories.water',
    icon: Droplet,
    iconBg: 'bg-[#0d141f]',
    iconColor: 'text-[#6eb9ff]',
  },
  {
    id: 'phone',
    labelKey: 'paymentsHub.categories.phone',
    icon: Phone,
    iconBg: 'bg-[#1d1116]',
    iconColor: 'text-[#ff7a96]',
  },
  {
    id: 'electricity',
    labelKey: 'paymentsHub.categories.electricity',
    icon: Zap,
    iconBg: 'bg-[#201a0f]',
    iconColor: 'text-[#ffcb4b]',
  },
  {
    id: 'internet',
    labelKey: 'paymentsHub.categories.internet',
    icon: Wifi,
    iconBg: 'bg-[#10191f]',
    iconColor: 'text-[#5ed5ff]',
  },
  {
    id: 'gas',
    labelKey: 'paymentsHub.categories.gas',
    icon: Flame,
    iconBg: 'bg-[#1f140f]',
    iconColor: 'text-[#ff8a4a]',
  },
  {
    id: 'gift',
    labelKey: 'paymentsHub.categories.gift',
    icon: Gift,
    iconBg: 'bg-[#201020]',
    iconColor: 'text-[#ff7ac3]',
  },
]
</script>

<template>
  <MainLayout
    active-nav="payments"
    :show-shortcuts="false"
    content-class="flex flex-1 flex-col gap-4 px-0 pt-0"
    @navigate="handleNavNavigate"
    @open-transfer="openTransferSheet"
    @open-qr="qrSheetOpen = true"
  >
    <template #header>
      <div class="flex w-full items-center justify-between px-4 pt-5 pb-3">
        <div class="h-10 w-10" />
        <h1 class="text-lg font-semibold">{{ t('paymentsHub.title') }}</h1>
        <button
          type="button"
          class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#ffb347] via-[#ff6699] to-[#6e55ff]"
          aria-label="Summary"
          @click="openSummary"
        >
          <span class="text-[11px] font-semibold text-white">
            {{ t('paymentsHub.summaryLabel') }}
          </span>
        </button>
      </div>
    </template>

    <div class="space-y-4 px-4">
      <label class="sr-only" for="payments-search">{{ t('paymentsHub.searchPlaceholder') }}</label>
      <div class="relative rounded-2xl border border-white/10 bg-[#0d0d0f]/80">
        <Search
          class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35"
        />
        <input
          id="payments-search"
          v-model="searchQuery"
          type="search"
          class="w-full rounded-2xl bg-transparent py-4 pl-12 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none"
          :placeholder="t('paymentsHub.searchPlaceholder')"
        />
      </div>

      <section
        class="rounded-[28px] border border-white/10 bg-gradient-to-br from-[#101015] via-[#0f1014] to-[#0a0a0c] p-5 shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
      >
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-4">
            <div class="rounded-2xl bg-[#131f2c] p-3">
              <ShieldCheck class="h-6 w-6 text-[#78b8ff]" />
            </div>
            <div>
              <p class="text-base font-semibold text-white">
                {{ t('paymentsHub.promo.title') }}
              </p>
              <p class="text-sm text-white/60">
                {{ t('paymentsHub.promo.description') }}
              </p>
            </div>
          </div>
          <span class="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white">
            {{ t('paymentsHub.promo.badge') }}
          </span>
        </div>
        <button
          type="button"
          class="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white"
        >
          <span>{{ t('paymentsHub.promo.cta') }}</span>
          <ArrowRight class="h-4 w-4" />
        </button>
      </section>
    </div>

    <section class="flex flex-1 flex-col bg-[#050505]">
      <ul class="flex flex-1 flex-col divide-y divide-white/5 px-2">
        <li
          v-for="category in categories"
          :key="category.id"
          class="flex items-center justify-between px-4 py-4"
        >
          <div class="flex items-center gap-3">
            <span
              class="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/5"
              :class="category.iconBg"
            >
              <component :is="category.icon" class="h-5 w-5" :class="category.iconColor" />
            </span>
            <div class="flex flex-col gap-1">
              <span class="text-sm font-medium text-white">
                {{ t(category.labelKey) }}
              </span>
              <span
                v-if="category.badge"
                class="inline-flex w-fit rounded-full bg-[#ff4f64] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white"
              >
                {{ t(category.badge) }}
              </span>
            </div>
          </div>
          <ChevronRight class="h-4 w-4 text-white/40" />
        </li>
      </ul>
    </section>
  </MainLayout>
  <TransferOptionsSheet
    :open="transferSheetOpen"
    @close="closeTransferSheet()"
    @select="handleTransferSelect"
  />
  <QrActionSheet :open="qrSheetOpen" @close="qrSheetOpen = false" @select="() => {}" />
  <PaymentsSummaryModal :open="summaryOpen" :summary="summaryData" @close="closeSummary" />
</template>
