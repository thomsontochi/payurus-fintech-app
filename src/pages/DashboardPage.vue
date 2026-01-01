<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  ArrowRight,
  ArrowUpDown,
  Award,
  Building2,
  CalendarDays,
  Car,
  CreditCard,
  Info,
  Lock,
  SendHorizontal,
  ShoppingBag,
  Target,
  UserRound,
} from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import MainLayout from '@/components/layout/MainLayout.vue'
import AccountCard from '@/components/ui/AccountCard.vue'
import TransferOptionsSheet from '@/components/ui/TransferOptionsSheet.vue'
import QrActionSheet from '@/components/ui/QrActionSheet.vue'
import MenuActionSheet from '@/components/ui/MenuActionSheet.vue'
import ProfileActionSheet from '@/components/ui/ProfileActionSheet.vue'
import { useTransferSheet } from '@/composables/useTransferSheet'

type TransferOption = 'send' | 'request' | 'international' | 'secure' | 'scheduled'
type QrAction = 'pay' | 'receive' | 'withdraw' | 'deposit' | 'scan'
type BottomNavId = 'home' | 'qr' | 'transfer' | 'payments' | 'card'

const { t } = useI18n()
const router = useRouter()
const { transferSheetOpen, openTransferSheet, closeTransferSheet, handleTransferSelect } =
  useTransferSheet()
const qrSheetOpen = ref(false)
const menuSheetOpen = ref(false)
const profileSheetOpen = ref(false)

const mainNavRoutes: Partial<Record<BottomNavId, string>> = {
  home: '/',
  payments: '/payments',
  card: '/card',
}

const openQrSheet = () => {
  qrSheetOpen.value = true
}

const openMenuSheet = () => {
  menuSheetOpen.value = true
}

const openProfileSheet = () => {
  profileSheetOpen.value = true
}

const handleQrSelect = (action: QrAction) => {
  qrSheetOpen.value = false
  // TODO: Implement QR action handling once flows are defined
  console.info('QR action selected:', action)
}

const handleMenuSelect = (option: string) => {
  menuSheetOpen.value = false
  if (option === 'fees') {
    router.push('/account/limits')
    return
  }
  if (option === 'monthlySummary') {
    router.push('/account/summary')
    return
  }
  if (option === 'withdrawDeposit') {
    router.push('/payments/deposit')
    return
  }
  console.info('Menu option selected:', option)
}

const handleProfileSelect = (option: string) => {
  profileSheetOpen.value = false
  if (option === 'settings') {
    router.push('/settings')
    return
  }
  if (option === 'details') {
    router.push('/account/details')
    return
  }
  if (option === 'bankAccounts') {
    router.push('/account/banks')
    return
  }
  console.info('Profile option selected:', option)
}

const handleMainNavigate = (itemId: string) => {
  if (itemId === 'transfer' || itemId === 'qr') return
  const target = mainNavRoutes[itemId as BottomNavId]
  if (target) {
    router.push(target)
  }
}

type AccountHistoryEntry = {
  id: string
  name: string
  amount: string
  amountClass: string
  bgClass: string
  iconColor: string
  labelKey: string
  dateKey: string
}

const accountCards = [
  {
    id: 'try',
    flag: '🇹🇷',
    nameKey: 'dashboard.accountCardNames.try',
    balance: '₺0.00',
    iban: 'TR05 •••• •••• ••••',
  },
  {
    id: 'usd',
    flag: '🇺🇸',
    nameKey: 'dashboard.accountCardNames.usd',
    balance: '$0.00',
    iban: 'US98 •••• •••• ••••',
  },
  {
    id: 'usd-personal',
    flag: '🇺🇸',
    nameKey: 'dashboard.accountCardNames.usdPersonal',
    balance: '$0.00',
    iban: 'US98 •••• •••• ••••',
  },
]

const firstCardId = accountCards[0]?.id ?? ''
const activeCardId = ref(firstCardId)
const cardsContainer = ref<HTMLElement | null>(null)

const accountHistory: AccountHistoryEntry[] = [
  {
    id: 'outgoing',
    name: 'Hidayet Salt',
    amount: '₺20,000.00',
    amountClass: 'text-red-500',
    bgClass: 'bg-blue-500/10',
    iconColor: 'text-blue-200',
    labelKey: 'dashboard.history.entries.outgoingLabel',
    dateKey: 'dashboard.history.entries.outgoingDate',
  },
  {
    id: 'incoming',
    name: 'Garanti BBVA',
    amount: '₺20,000.00',
    amountClass: 'text-green-500',
    bgClass: 'bg-green-500/10',
    iconColor: 'text-green-200',
    labelKey: 'dashboard.history.entries.incomingLabel',
    dateKey: 'dashboard.history.entries.incomingDate',
  },
]

const cashbackPromos = [
  {
    id: 'autumn',
    monthKey: 'dashboard.cashback.months.october',
    year: '2025',
    amount: '₺960',
    subtitleKey: 'dashboard.cashback.subtitles.autumn',
    merchants: ['OpenAI', 'Temu', 'Uber'],
    image: '/images/cashback-autumn.png',
  },
  {
    id: 'winter',
    monthKey: 'dashboard.cashback.months.november',
    year: '2025',
    amount: '₺720',
    subtitleKey: 'dashboard.cashback.subtitles.winter',
    merchants: ['Hepsiburada', 'Trendyol', 'Yemeksepeti'],
    image: '',
  },
]

const handleScroll = () => {
  const container = cardsContainer.value
  if (!container) return

  const cards = Array.from(container.querySelectorAll<HTMLElement>('[data-card-id]'))
  if (!cards.length) return

  const containerRect = container.getBoundingClientRect()
  const containerCenter = containerRect.left + containerRect.width / 2

  let nearestId = activeCardId.value
  let minDistance = Number.POSITIVE_INFINITY

  cards.forEach((card) => {
    const rect = card.getBoundingClientRect()
    const cardCenter = rect.left + rect.width / 2
    const distance = Math.abs(cardCenter - containerCenter)

    if (distance < minDistance) {
      minDistance = distance
      nearestId = card.dataset.cardId ?? nearestId
    }
  })

  activeCardId.value = nearestId
}

onMounted(() => {
  nextTick(() => {
    handleScroll()
  })
})

const navigateToCardHub = () => {
  router.push('/card')
}
</script>

<template>
  <MainLayout
    @open-transfer="openTransferSheet"
    @open-qr="openQrSheet"
    @open-menu="openMenuSheet"
    @open-profile="openProfileSheet"
    @navigate-card="navigateToCardHub"
    @navigate="handleMainNavigate"
  >
    <template #hero>
      <div
        ref="cardsContainer"
        class="-mx-4 scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4"
        @scroll.passive="handleScroll"
      >
        <AccountCard
          v-for="card in accountCards"
          :key="card.id"
          :data-card-id="card.id"
          class="min-w-[calc(100%-32px)] snap-center rounded-[28px] border border-white/10 bg-[#171717] px-6 py-5 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
          :id="card.id"
          :flag="card.flag"
          :name="t(card.nameKey)"
          :balance="card.balance"
          :iban="card.iban"
        />
      </div>
      <div class="flex items-center justify-center gap-2">
        <span
          v-for="card in accountCards"
          :key="`dot-${card.id}`"
          class="h-1.5 w-1.5 rounded-full transition-colors"
          :class="card.id === activeCardId ? 'bg-white' : 'bg-white/30'"
        />
      </div>
    </template>

    <section class="space-y-2 rounded-3xl bg-[#0f0f0f] p-4 border border-white/5">
      <div class="flex items-center gap-2">
        <div class="rounded-lg bg-orange-500/90 p-2">
          <CalendarDays class="h-5 w-5 text-white" />
        </div>
        <div class="flex-1">
          <p class="text-xs text-white/40">{{ t('dashboard.notification.time') }}</p>
        </div>
      </div>
      <p class="text-sm font-medium leading-relaxed text-white">
        {{ t('dashboard.notification.title') }}
      </p>
      <p class="text-xs leading-relaxed text-white/50">
        {{ t('dashboard.notification.description') }}
      </p>
    </section>

    <section class="space-y-3">
      <div class="flex items-center justify-between">
        <p class="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
          {{ t('dashboard.experience.label') }}
        </p>
        <div class="text-[11px] font-semibold text-orange-300">
          {{ t('dashboard.experience.progress') }}
        </div>
      </div>
      <div class="scrollbar-hide flex gap-3 overflow-x-auto pb-2">
        <button
          class="flex min-w-[190px] flex-shrink-0 items-center gap-3 rounded-3xl border border-white/10 bg-[#111115] px-4 py-3 text-left"
        >
          <span
            class="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff6d9] text-sm text-black"
          >
            <ArrowUpDown class="h-4 w-4" />
          </span>
          <div>
            <p class="text-sm font-semibold leading-tight text-white">
              {{ t('dashboard.experience.shortcuts.deposit.title') }}
            </p>
            <p class="text-sm font-semibold leading-tight text-white">
              {{ t('dashboard.experience.shortcuts.deposit.subtitle') }}
            </p>
          </div>
        </button>
        <button
          class="flex min-w-[190px] flex-shrink-0 items-center gap-3 rounded-3xl border border-white/10 bg-[#111115] px-4 py-3 text-left"
        >
          <span
            class="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff6d9] text-sm text-black"
          >
            <CreditCard class="h-4 w-4" />
          </span>
          <div>
            <p class="text-sm font-semibold leading-tight text-white">
              {{ t('dashboard.experience.shortcuts.card.title') }}
            </p>
            <p class="text-sm font-semibold leading-tight text-white">
              {{ t('dashboard.experience.shortcuts.card.subtitle') }}
            </p>
          </div>
        </button>
        <button
          class="flex min-w-[190px] flex-shrink-0 items-center gap-3 rounded-3xl border border-white/10 bg-[#111115] px-4 py-3 text-left"
        >
          <span
            class="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff6d9] text-sm text-black"
          >
            <UserRound class="h-4 w-4" />
          </span>
          <div>
            <p class="text-sm font-semibold leading-tight text-white">
              {{ t('dashboard.experience.shortcuts.profile.title') }}
            </p>
            <p class="text-sm font-semibold leading-tight text-white">
              {{ t('dashboard.experience.shortcuts.profile.subtitle') }}
            </p>
          </div>
        </button>
      </div>
    </section>

    <section>
      <div class="mb-3 flex items-center justify-between">
        <h2 class="text-xs font-semibold uppercase tracking-wide text-white/50">
          {{ t('dashboard.history.title') }}
        </h2>
        <button class="text-xs text-white/50">{{ t('dashboard.history.viewAll') }}</button>
      </div>
      <div class="space-y-2">
        <article
          v-for="entry in accountHistory"
          :key="entry.id"
          class="flex items-center justify-between rounded-2xl bg-[#0f0f0f] p-4 border border-white/5"
        >
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-full"
              :class="entry.bgClass"
            >
              <Building2 class="h-4 w-4" :class="entry.iconColor" />
            </div>
            <div>
              <p class="text-sm font-semibold text-white">{{ entry.name }}</p>
              <p class="text-xs text-white/40">{{ t(entry.labelKey) }}</p>
              <p class="text-xs text-white/30">{{ t(entry.dateKey) }}</p>
            </div>
          </div>
          <p class="text-sm font-bold" :class="entry.amountClass">{{ entry.amount }}</p>
        </article>
      </div>
    </section>

    <section class="space-y-3">
      <div class="flex items-center justify-between">
        <p class="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
          {{ t('dashboard.cashback.label') }}
        </p>
        <p class="text-xs text-white/50">{{ t('dashboard.cashback.hint') }}</p>
      </div>
      <div class="scrollbar-hide flex gap-4 overflow-x-auto pb-2">
        <article
          v-for="promo in cashbackPromos"
          :key="promo.id"
          class="flex min-w-[310px] flex-shrink-0 items-center rounded-[28px] border border-white/10 bg-[#111015] px-5 py-4"
        >
          <div class="flex flex-1 flex-col gap-3">
            <div class="flex items-center gap-2">
              <span
                class="flex h-10 w-10 items-center justify-center rounded-full bg-[#fff4b3] text-black"
              >
                <Award class="h-4 w-4" />
              </span>
              <div class="leading-tight">
                <p class="text-xs font-semibold text-white/80">{{ t(promo.monthKey) }}</p>
                <p class="text-xs text-white/50">{{ promo.year }}</p>
              </div>
            </div>
            <div>
              <p
                class="inline-flex rounded-lg bg-[#fff4b3] px-3 py-1 text-[24px] font-bold text-black"
              >
                {{ promo.amount }}
              </p>
              <p class="mt-2 text-sm text-white/85">{{ t(promo.subtitleKey) }}</p>
            </div>
            <div class="flex items-center gap-2">
              <span
                v-for="merchant in promo.merchants"
                :key="merchant"
                class="rounded-full border border-white/10 px-3 py-1 text-[11px] text-white/70"
              >
                {{ merchant }}
              </span>
            </div>
          </div>
          <div class="relative ml-4 flex w-32 justify-center">
            <div
              class="relative h-32 w-full overflow-hidden rounded-3xl bg-gradient-to-br from-[#fbe18b] via-[#ffb5c5] to-[#9c7bff]"
            >
              <Lock class="absolute right-2 top-2 h-4 w-4 text-white/70" />
              <p
                class="absolute left-3 top-3 text-xs font-black uppercase tracking-wide text-[#ff6fb3]"
              >
                Cash Back
              </p>
              <img
                v-if="promo.image"
                :src="promo.image"
                alt="Cashback hero"
                class="absolute bottom-0 left-1/2 h-32 w-28 -translate-x-1/2 object-cover"
              />
              <div
                v-else
                class="absolute inset-0 flex flex-col items-center justify-center gap-2 text-black/70"
              >
                <span class="text-sm font-semibold">Visual</span>
                <UserRound class="h-10 w-10" />
              </div>
              <div class="absolute -left-3 bottom-3 h-10 w-10 rounded-full bg-white/40 blur-2xl" />
              <div class="absolute right-0 top-6">
                <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
                  <path
                    d="M40 5L45 25H65L49 37L55 57L40 45L25 57L31 37L15 25H35L40 5Z"
                    fill="#FFE797"
                    opacity="0.8"
                  />
                </svg>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
    <TransferOptionsSheet
      :open="transferSheetOpen"
      @close="transferSheetOpen = false"
      @select="handleTransferSelect"
    />
    <QrActionSheet :open="qrSheetOpen" @close="qrSheetOpen = false" @select="handleQrSelect" />
    <MenuActionSheet
      :open="menuSheetOpen"
      @close="menuSheetOpen = false"
      @select="handleMenuSelect"
    />
    <ProfileActionSheet
      :open="profileSheetOpen"
      progress-label="2 / 5"
      @close="profileSheetOpen = false"
      @select="handleProfileSelect"
    />
  </MainLayout>
</template>
