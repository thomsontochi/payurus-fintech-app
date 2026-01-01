<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ArrowLeft } from 'lucide-vue-next'

type TabId = 'fees' | 'limits'

type LimitRow = {
  id: keyof typeof limitLabels
  value: string
  meta?: string
}

type FeeRow = {
  title: string
  description: string
  amount: string
}

const { t, tm } = useI18n()
const router = useRouter()
const activeTab = ref<TabId>('fees')

const limitLabels = tm('feesLimits.sections') as Record<string, string>

const limitRows: LimitRow[] = [
  {
    id: 'balance',
    value: t('feesLimits.valueLabels.unlimited'),
  },
  {
    id: 'incomingTotal',
    value: '₺250,000',
    meta: t('feesLimits.valueLabels.perMonth'),
  },
  {
    id: 'cashDeposit',
    value: '₺250,000',
    meta: t('feesLimits.valueLabels.perMonth'),
  },
  {
    id: 'atmWithdraw',
    value: '₺25,000',
    meta: `${t('feesLimits.valueLabels.perDay')} / ₺100,000 ${t('feesLimits.valueLabels.perMonth')}`,
  },
  {
    id: 'purchaseCount',
    value: '30',
    meta: t('feesLimits.valueLabels.perDay'),
  },
  {
    id: 'purchaseAmount',
    value: '₺50,000',
    meta: t('feesLimits.valueLabels.perMonth'),
  },
  {
    id: 'ibanSendCount',
    value: '30',
    meta: t('feesLimits.valueLabels.perMonth'),
  },
  {
    id: 'ibanSendAmount',
    value: '₺250,000',
    meta: t('feesLimits.valueLabels.perMonth'),
  },
  {
    id: 'intlSendAmount',
    value: '€15,000',
    meta: t('feesLimits.valueLabels.perMonth'),
  },
  {
    id: 'requestCount',
    value: '10',
    meta: t('feesLimits.valueLabels.perDay'),
  },
  {
    id: 'cardPayCount',
    value: '1,000',
    meta: t('feesLimits.valueLabels.perMonth'),
  },
  {
    id: 'cardPayAmount',
    value: '₺2,750',
    meta: t('feesLimits.valueLabels.perMonth'),
  },
  {
    id: 'merchantPayCount',
    value: '50',
    meta: t('feesLimits.valueLabels.perMonth'),
  },
  {
    id: 'merchantPayAmount',
    value: '₺10,000',
    meta: t('feesLimits.valueLabels.perMonth'),
  },
  {
    id: 'allowanceSend',
    value: '₺10,000',
    meta: t('feesLimits.valueLabels.perMonth'),
  },
] as const

const feeRows: FeeRow[] = [
  {
    title: 'Account opening & usage',
    description: 'Create a Payurus account and keep it active with no annual fee.',
    amount: 'Free',
  },
  {
    title: 'Transfer to Payurus accounts',
    description: 'Send money to other Payurus users instantly.',
    amount: 'Free',
  },
  {
    title: 'Transfer to IBAN',
    description: 'Wire money to any Turkish bank account.',
    amount: 'Free',
  },
  {
    title: 'Bills & other payments',
    description: 'Pay utilities, subscriptions, and marketplace sellers.',
    amount: 'Free',
  },
  {
    title: 'Payurus Card membership',
    description: 'Virtual and physical card issuance & monthly fee.',
    amount: 'Free',
  },
  {
    title: 'Payurus Card ATM cash-out (Akbank)',
    description: 'Withdraw via Akbank ATMs without service charges.',
    amount: 'Free',
  },
  {
    title: 'Payurus Card ATM cash-out (other banks)',
    description: 'Withdraw via other ATMs after the free tier.',
    amount: '₺9.99',
  },
  {
    title: 'Deposit via bank transfer',
    description: 'Add money from your own bank account to Payurus.',
    amount: 'Free',
  },
  {
    title: 'Withdraw via bank transfer',
    description: 'Move Payurus balance back to your bank.',
    amount: 'Free',
  },
  {
    title: 'Cardless ATM deposit',
    description: 'Deposit TRY via compatible ATMs without a card.',
    amount: 'Free',
  },
  {
    title: 'Deposit via bank / credit card',
    description: 'Funding Payurus using a bank or credit card.',
    amount: '4.1%',
  },
  {
    title: 'Excessive usage fee',
    description: 'Applies after daily outgoing total exceeds ₺25,000 or monthly ₺750,000.',
    amount: '1.99%',
  },
] as const

const tabs: { id: TabId; labelKey: string }[] = [
  { id: 'fees', labelKey: 'feesLimits.tabs.fees' },
  { id: 'limits', labelKey: 'feesLimits.tabs.limits' },
]

const handleBack = () => {
  router.back()
}
</script>

<template>
  <div class="min-h-screen bg-[#050505] text-white">
    <div class="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pb-8 pt-10">
      <button
        type="button"
        class="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5"
        @click="handleBack"
      >
        <ArrowLeft class="h-5 w-5" />
        <span class="sr-only">Back</span>
      </button>

      <div class="mt-6 text-center">
        <h1 class="text-xl font-semibold">{{ t('feesLimits.title') }}</h1>
        <p class="mt-2 text-sm text-white/65">
          {{ t('feesLimits.subtitle') }}
        </p>
      </div>

      <div
        class="mt-6 grid grid-cols-2 rounded-full border border-white/10 bg-white/5 p-1 text-sm font-medium text-white/60"
      >
        <button
          v-for="tab in tabs"
          :key="tab.id"
          type="button"
          class="rounded-full py-2 transition"
          :class="tab.id === activeTab ? 'bg-white text-black shadow-sm' : ''"
          @click="activeTab = tab.id"
        >
          {{ t(tab.labelKey) }}
        </button>
      </div>

      <section v-if="activeTab === 'limits'" class="mt-6 flex-1 space-y-3 pb-4">
        <article
          v-for="row in limitRows"
          :key="row.id"
          class="rounded-3xl border border-white/10 bg-[#0b0b0d] px-5 py-4"
        >
          <div class="flex items-center justify-between gap-4">
            <div>
              <p class="text-sm font-semibold">
                {{ limitLabels[row.id] ?? row.id }}
              </p>
              <p v-if="row.meta" class="text-xs text-white/50">
                {{ row.meta }}
              </p>
            </div>
            <p class="text-base font-bold text-white">{{ row.value }}</p>
          </div>
        </article>
      </section>

      <section v-else class="mt-6 flex-1 space-y-3 pb-4">
        <article
          v-for="fee in feeRows"
          :key="fee.title"
          class="space-y-2 rounded-3xl border border-white/10 bg-[#0b0b0d] px-5 py-4"
        >
          <div class="flex items-center justify-between">
            <p class="text-sm font-semibold">{{ fee.title }}</p>
            <p class="text-base font-bold text-white">{{ fee.amount }}</p>
          </div>
          <p class="text-xs text-white/55">
            {{ fee.description }}
          </p>
        </article>
      </section>
    </div>
  </div>
</template>
