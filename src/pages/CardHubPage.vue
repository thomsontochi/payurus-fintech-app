<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import {
  BadgeCheck,
  ChevronRight,
  CreditCard,
  Leaf,
  MoreHorizontal,
  PieChart,
  Plus,
  Users,
} from 'lucide-vue-next'
import MainLayout from '@/components/layout/MainLayout.vue'
import TransferOptionsSheet from '@/components/ui/TransferOptionsSheet.vue'
import { useTransferSheet } from '@/composables/useTransferSheet'

type CardHubSection = 'virtualCard' | 'digitalSlip' | 'spendSummary' | 'subscriptions' | 'roundUp'

const { t } = useI18n()
const router = useRouter()

type BottomNavId = 'home' | 'qr' | 'transfer' | 'payments' | 'card'

type FeatureRow = {
  id: Exclude<CardHubSection, 'virtualCard'>
  icon: any
  iconWrapperClass: string
  iconAccent?: string
}

const featureRows: FeatureRow[] = [
  {
    id: 'digitalSlip',
    icon: Leaf,
    iconWrapperClass:
      'bg-white/10 border border-white/15 text-white backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.08)]',
  },
  {
    id: 'spendSummary',
    icon: PieChart,
    iconWrapperClass:
      'bg-gradient-to-br from-[#5cf4ff]/30 via-[#ff7de9]/30 to-[#ffd18c]/30 border border-white/20 text-white',
  },
  {
    id: 'subscriptions',
    icon: BadgeCheck,
    iconWrapperClass:
      'bg-white/10 border border-white/15 text-white shadow-[0_10px_20px_rgba(0,0,0,0.35)]',
  },
  {
    id: 'roundUp',
    icon: Users,
    iconWrapperClass:
      'bg-gradient-to-br from-[#5ba8ff]/30 to-[#ff85a2]/30 border border-white/10 text-white',
  },
]

const virtualCardNumber = computed(() => t('cardHub.sections.virtualCard.number'))

const { transferSheetOpen, openTransferSheet, closeTransferSheet, handleTransferSelect } =
  useTransferSheet()

const handleVirtualCardClick = () => {
  router.push('/card/virtual')
}

const handleFeatureClick = (section: FeatureRow['id']) => {
  console.info('Card hub section selected:', section)
}

const handleNewCard = () => {
  router.push('/card/apply')
}

const navRoutes: Partial<Record<BottomNavId, string>> = {
  home: '/',
  card: '/card',
  qr: '/transfer/secure',
  payments: '/payments',
}

const handleNavNavigate = (itemId: string) => {
  if (itemId === 'transfer') return
  const target = navRoutes[itemId as BottomNavId]
  if (target) {
    router.push(target)
  }
}
</script>

<template>
  <MainLayout
    active-nav="card"
    :show-header="false"
    :show-shortcuts="false"
    :show-hero-section="false"
    content-class="flex flex-1 flex-col px-0 pt-0"
    @navigate="handleNavNavigate"
    @open-transfer="openTransferSheet"
  >
    <div class="flex flex-1 flex-col bg-[#080808] text-white">
      <header class="relative flex items-center justify-center px-6 pt-9 pb-5">
        <h1 class="text-lg font-semibold tracking-tight">{{ t('cardHub.title') }}</h1>
        <button
          type="button"
          class="absolute right-6 rounded-full border border-white/15 px-3 py-1 text-white/70"
          aria-label="More options"
        >
          <MoreHorizontal class="h-5 w-5" />
        </button>
      </header>
      <div class="border-b border-white/10 opacity-60" />

      <div class="flex flex-1 flex-col">
        <section class="flex-1 space-y-5 overflow-y-auto px-5 pb-6 pt-6">
          <article
            class="rounded-[26px] border border-white/10 bg-[#0d0d0e] px-5 py-4"
            @click="handleVirtualCardClick"
          >
            <header class="flex items-center justify-between text-sm text-white/60">
              <p>{{ t('cardHub.sections.virtualCard.title') }}</p>
              <ChevronRight class="h-4 w-4 text-white/40" />
            </header>
            <div class="mt-4 flex items-center justify-between">
              <div class="flex items-center gap-4">
                <div
                  class="relative h-14 w-24 rounded-2xl border border-white/10 bg-gradient-to-br from-[#1a1a1f] to-[#09090c] p-3"
                >
                  <span
                    class="absolute left-5 top-1/2 -translate-y-1/2 rounded-full bg-[#fe5f55] px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-black"
                  >
                    mc
                  </span>
                  <span
                    class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.4em] text-white/40"
                  >
                    pay
                  </span>
                </div>
                <div>
                  <p class="text-sm font-semibold text-white">{{ t('cardHub.subtitle') }}</p>
                  <p class="text-xs text-white/50">{{ virtualCardNumber }}</p>
                </div>
              </div>
              <CreditCard class="h-6 w-6 text-white/60" />
            </div>
          </article>

          <div class="rounded-[32px] border border-white/10 bg-[#0d0d0e]">
            <button
              v-for="row in featureRows"
              :key="row.id"
              type="button"
              class="flex w-full items-center gap-4 px-5 py-4 text-left"
              :class="row.id !== 'roundUp' ? 'border-b border-white/10' : ''"
              @click="handleFeatureClick(row.id)"
            >
              <span
                class="flex h-12 w-12 items-center justify-center rounded-2xl"
                :class="row.iconWrapperClass"
              >
                <component :is="row.icon" class="h-5 w-5" />
              </span>
              <div class="flex flex-1 flex-col">
                <p class="text-sm font-semibold text-white">
                  {{ t(`cardHub.sections.${row.id}.title`) }}
                </p>
                <p class="text-xs text-white/50">
                  {{ t(`cardHub.sections.${row.id}.subtitle`) }}
                </p>
              </div>
              <ChevronRight class="h-4 w-4 text-white/40" />
            </button>
          </div>
        </section>

        <div class="px-5 pb-8">
          <button
            type="button"
            class="flex w-full items-center justify-between rounded-[28px] border border-white/40 bg-transparent px-5 py-4 text-sm font-semibold text-white transition hover:bg-white/5"
            @click="handleNewCard"
          >
            <span>{{ t('cardHub.cta.newCard') }}</span>
            <span
              class="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 text-white"
            >
              <Plus class="h-4 w-4" />
            </span>
          </button>
        </div>
      </div>
    </div>
  </MainLayout>
  <TransferOptionsSheet
    :open="transferSheetOpen"
    @close="closeTransferSheet()"
    @select="handleTransferSelect"
  />
</template>
