<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { ArrowLeft, Download, Plus, Minus, CreditCard, Gift, Wallet } from 'lucide-vue-next'

type SummaryTab = 'overview' | 'card' | 'cashback' | 'transfers'

type TimelineStep = {
  id: string
  title: string
  description: string
  amount?: string
  tone: 'positive' | 'neutral' | 'negative'
  icon: keyof typeof timelineIcons
}

const timelineIcons = {
  plus: Plus,
  minus: Minus,
  card: CreditCard,
  gift: Gift,
  wallet: Wallet,
} as const

const { t } = useI18n()
const router = useRouter()

const months = ['July 2025', 'August 2025', 'September 2025', 'October 2025']
const activeMonthIndex = ref(months.length - 2) // default to September 2025
const tabs: SummaryTab[] = ['overview', 'card', 'cashback', 'transfers']
const activeTab = ref<SummaryTab>('overview')

const incomingSteps = computed<TimelineStep[]>(() => [
  {
    id: 'incoming-total',
    title: t('monthlySummary.incomingTitle'),
    description: t('monthlySummary.timeline.incoming.totalDescription'),
    amount: '₺20,000.00',
    tone: 'positive',
    icon: 'plus',
  },
  {
    id: 'self-deposit',
    title: t('monthlySummary.timeline.incoming.selfDepositTitle'),
    description: t('monthlySummary.timeline.incoming.selfDepositDescription'),
    amount: '₺20,000.00',
    tone: 'neutral',
    icon: 'plus',
  },
  {
    id: 'request',
    title: t('monthlySummary.timeline.incoming.requestTitle'),
    description: t('monthlySummary.timeline.incoming.requestDescription'),
    tone: 'neutral',
    icon: 'plus',
  },
  {
    id: 'card-cashback',
    title: t('monthlySummary.timeline.incoming.cardCashbackTitle'),
    description: t('monthlySummary.timeline.incoming.cardCashbackDescription'),
    tone: 'neutral',
    icon: 'gift',
  },
  {
    id: 'payments',
    title: t('monthlySummary.timeline.incoming.noPaymentsTitle'),
    description: t('monthlySummary.timeline.incoming.noPaymentsDescription'),
    tone: 'neutral',
    icon: 'card',
  },
])

const outgoingSteps = computed<TimelineStep[]>(() => [
  {
    id: 'outgoing-total',
    title: t('monthlySummary.outgoingTitle'),
    description: t('monthlySummary.timeline.outgoing.totalDescription'),
    amount: '₺20,000.00',
    tone: 'negative',
    icon: 'minus',
  },
  {
    id: 'bills',
    title: t('monthlySummary.timeline.outgoing.billsTitle'),
    description: t('monthlySummary.timeline.outgoing.billsDescription'),
    tone: 'neutral',
    icon: 'wallet',
  },
  {
    id: 'transfers-out',
    title: t('monthlySummary.timeline.outgoing.transfersTitle'),
    description: t('monthlySummary.timeline.outgoing.transfersDescription'),
    tone: 'neutral',
    icon: 'minus',
  },
])

const handleBack = () => router.back()

const changeMonth = (direction: 'prev' | 'next') => {
  if (direction === 'prev' && activeMonthIndex.value > 0) {
    activeMonthIndex.value -= 1
  }
  if (direction === 'next' && activeMonthIndex.value < months.length - 1) {
    activeMonthIndex.value += 1
  }
}

const timelineClass = (tone: TimelineStep['tone']) => {
  if (tone === 'positive') return 'text-green-400'
  if (tone === 'negative') return 'text-red-400'
  return 'text-white'
}
</script>

<template>
  <div class="min-h-screen bg-[#050505] text-white">
    <div class="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pb-10 pt-8">
      <header class="flex flex-col gap-6">
        <div class="flex items-center justify-between">
          <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-full border border-white/10"
            @click="handleBack"
          >
            <ArrowLeft class="h-5 w-5" />
            <span class="sr-only">Back</span>
          </button>
          <button
            type="button"
            class="flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs font-semibold text-white/80"
          >
            <Download class="h-4 w-4" />
            {{ t('monthlySummary.download') }}
          </button>
        </div>
        <div class="text-center">
          <p class="text-xs uppercase tracking-[0.4em] text-white/35">
            {{ t('monthlySummary.title') }}
          </p>
          <h1 class="text-xl font-semibold">{{ months[activeMonthIndex] }}</h1>
        </div>
      </header>

      <div class="mt-5 flex items-center justify-center gap-8 text-white/50">
        <button type="button" @click="changeMonth('prev')" :disabled="activeMonthIndex === 0">
          ‹
        </button>
        <div class="text-center">
          <p class="text-[11px] uppercase tracking-[0.3em] text-white/30">
            {{ t('monthlySummary.monthLabel') }}
          </p>
          <p class="text-sm font-semibold text-white">{{ months[activeMonthIndex] }}</p>
        </div>
        <button
          type="button"
          @click="changeMonth('next')"
          :disabled="activeMonthIndex === months.length - 1"
        >
          ›
        </button>
      </div>

      <nav class="mt-6 flex border-b border-white/10 text-sm font-semibold">
        <button
          v-for="tab in tabs"
          :key="tab"
          class="flex-1 pb-3 text-center text-white/40 transition"
          :class="activeTab === tab ? 'text-white' : ''"
          @click="activeTab = tab"
        >
          <span>{{ t(`monthlySummary.tabs.${tab}`) }}</span>
          <span
            class="mt-2 block h-0.5"
            :class="activeTab === tab ? 'bg-white' : 'bg-transparent'"
          />
        </button>
      </nav>

      <section v-if="activeTab === 'overview'" class="mt-8 space-y-10">
        <article>
          <h2 class="text-center text-base font-semibold text-white">
            {{ t('monthlySummary.incomingTitle') }}
          </h2>
          <div class="relative mt-6 pl-10">
            <div class="absolute left-4 top-0 bottom-0 w-px bg-white/10" />
            <div v-for="(step, index) in incomingSteps" :key="step.id" class="relative pb-8">
              <div class="flex items-start gap-4">
                <div class="relative">
                  <component
                    :is="timelineIcons[step.icon]"
                    class="h-9 w-9 rounded-full border border-white/15 p-2 text-white/80"
                  />
                  <div
                    v-if="index !== incomingSteps.length - 1"
                    class="absolute left-4 top-9 bottom-0 w-px bg-white/10"
                  />
                </div>
                <div class="flex-1">
                  <p class="text-sm font-semibold text-white">{{ step.title }}</p>
                  <p class="mt-1 text-xs text-white/55">{{ step.description }}</p>
                </div>
                <p
                  v-if="step.amount"
                  class="text-sm font-semibold"
                  :class="
                    step.tone === 'positive'
                      ? 'text-green-400'
                      : step.tone === 'negative'
                        ? 'text-red-400'
                        : 'text-white/70'
                  "
                >
                  {{ step.amount }}
                </p>
              </div>
            </div>
          </div>
        </article>

        <article>
          <h2 class="text-center text-base font-semibold text-white">
            {{ t('monthlySummary.outgoingTitle') }}
          </h2>
          <div class="relative mt-6 pl-10">
            <div class="absolute left-4 top-0 bottom-0 w-px bg-white/10" />
            <div v-for="(step, index) in outgoingSteps" :key="step.id" class="relative pb-8">
              <div class="flex items-start gap-4">
                <div class="relative">
                  <component
                    :is="timelineIcons[step.icon]"
                    class="h-9 w-9 rounded-full border border-white/15 p-2 text-white/80"
                  />
                  <div
                    v-if="index !== outgoingSteps.length - 1"
                    class="absolute left-4 top-9 bottom-0 w-px bg-white/10"
                  />
                </div>
                <div class="flex-1">
                  <p class="text-sm font-semibold text-white">{{ step.title }}</p>
                  <p class="mt-1 text-xs text-white/55">{{ step.description }}</p>
                </div>
                <p
                  v-if="step.amount"
                  class="text-sm font-semibold"
                  :class="step.tone === 'negative' ? 'text-red-400' : 'text-white/70'"
                >
                  {{ step.amount }}
                </p>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section
        v-else
        class="mt-16 flex flex-1 flex-col items-center justify-center text-center text-white/50"
      >
        <p class="text-sm">{{ t('monthlySummary.emptyMessage') }}</p>
      </section>
    </div>
  </div>
</template>
