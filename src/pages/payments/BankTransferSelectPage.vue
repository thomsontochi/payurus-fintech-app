<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ArrowLeft, MapPin, ChevronRight } from 'lucide-vue-next'

type BankOption = {
  id: string
  nameKey: string
  icon: string
  accent: string
}

const router = useRouter()
const { t } = useI18n()

const banks: BankOption[] = [
  { id: 'garanti', nameKey: 'bankTransfer.banks.garanti', icon: '🌿', accent: 'bg-[#1b3323]' },
  { id: 'qnb', nameKey: 'bankTransfer.banks.qnb', icon: '🇬🇧', accent: 'bg-[#1a1c35]' },
  { id: 'yapiKredi', nameKey: 'bankTransfer.banks.yapiKredi', icon: '🌀', accent: 'bg-[#102048]' },
  { id: 'isbank', nameKey: 'bankTransfer.banks.isbank', icon: '🏛️', accent: 'bg-[#0b1c3e]' },
  { id: 'vakif', nameKey: 'bankTransfer.banks.vakif', icon: '🟡', accent: 'bg-[#2c200e]' },
  { id: 'ziraat', nameKey: 'bankTransfer.banks.ziraat', icon: '🌾', accent: 'bg-[#301616]' },
  { id: 'ptt', nameKey: 'bankTransfer.banks.ptt', icon: '📮', accent: 'bg-[#14263a]' },
  {
    id: 'turkiyeFinans',
    nameKey: 'bankTransfer.banks.turkiyeFinans',
    icon: '✨',
    accent: 'bg-[#0d2524]',
  },
  { id: 'albaraka', nameKey: 'bankTransfer.banks.albaraka', icon: '🟠', accent: 'bg-[#2c1a14]' },
  { id: 'odeabank', nameKey: 'bankTransfer.banks.odeabank', icon: '💠', accent: 'bg-[#141a26]' },
]

const handleBack = () => {
  router.back()
}

const handleNearestAtm = () => {
  console.info('Navigate to nearest ATM finder')
}

const handleSelect = (bankId: string) => {
  console.info('Selected bank for bank transfer:', bankId)
  // TODO: push to bank-specific instruction page
}
</script>

<template>
  <div class="min-h-screen bg-[#050505] text-white">
    <div class="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pb-12 pt-10">
      <header class="flex items-center justify-between">
        <button
          type="button"
          class="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5"
          @click="handleBack"
        >
          <ArrowLeft class="h-5 w-5" />
          <span class="sr-only">Back</span>
        </button>
        <button
          type="button"
          class="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white/80"
          @click="handleNearestAtm"
        >
          <MapPin class="h-4 w-4" />
          {{ t('bankTransfer.nearestAtm') }}
        </button>
      </header>

      <div class="mt-6 text-center">
        <h1 class="text-xl font-semibold">{{ t('bankTransfer.title') }}</h1>
        <p class="mt-2 text-sm text-white/60">
          {{ t('bankTransfer.subtitle') }}
        </p>
      </div>

      <section class="mt-6 space-y-3">
        <article class="rounded-3xl border border-amber-300/20 bg-[#0b0b0d] p-4 text-left">
          <div class="flex items-center justify-between gap-4">
            <div>
              <p class="text-xs uppercase tracking-wide text-amber-200/70">
                {{ t('bankTransfer.badgeInstant') }}
              </p>
              <p class="mt-1 text-sm text-white/70">
                {{ t('bankTransfer.ibanLabel') }}
              </p>
              <p class="font-mono text-lg font-semibold text-white">
                TR00 0000 0000 0000 0000 0000 00
              </p>
            </div>
            <span
              class="rounded-full border border-amber-200/40 px-3 py-1 text-xs font-semibold text-amber-100"
            >
              IBAN
            </span>
          </div>
        </article>

        <ul class="divide-y divide-white/5 rounded-3xl border border-white/10 bg-[#08080a]">
          <li
            v-for="bank in banks"
            :key="bank.id"
            class="flex items-center justify-between px-4 py-4"
          >
            <button
              type="button"
              class="flex w-full items-center justify-between text-left"
              @click="handleSelect(bank.id)"
            >
              <div class="flex items-center gap-3">
                <span
                  class="flex h-12 w-12 items-center justify-center rounded-full text-xl"
                  :class="bank.accent"
                >
                  {{ bank.icon }}
                </span>
                <span class="text-sm font-semibold">{{ t(bank.nameKey) }}</span>
              </div>
              <ChevronRight class="h-5 w-5 text-white/40" />
            </button>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
