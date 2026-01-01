<script setup lang="ts">
import TransferScreenShell from '@/components/layout/TransferScreenShell.vue'
import { useI18n } from 'vue-i18n'

import { Camera, UserRound } from 'lucide-vue-next'

const { t } = useI18n()

const limits = [
  { key: 'incomingLimit', amount: '₺5,000,000.00', descriptionKey: 'incomingLimit' },
  {
    key: 'remainingIncomingLimit',
    amount: '₺5,000,000.00',
    descriptionKey: 'remainingIncomingLimit',
  },
  { key: 'cashDepositLimit', amount: '₺250,000.00', descriptionKey: 'cashDepositLimit' },
  {
    key: 'remainingCashDepositLimit',
    amount: '₺250,000.00',
    descriptionKey: 'remainingCashDepositLimit',
  },
  { key: 'cashWithdrawLimit', amount: '₺100,000.00', descriptionKey: 'cashWithdrawLimit' },
  { key: 'differentSenderTransfer', amount: '0', descriptionKey: 'differentSenderTransfer' },
  { key: 'incomingTransferCount', amount: '0', descriptionKey: 'incomingTransferCount' },
  { key: 'incomingTransferAmount', amount: '₺0.00', descriptionKey: 'incomingTransferAmount' },
  { key: 'internationalLimit', amount: '₺15,000.00', descriptionKey: 'internationalLimit' },
  {
    key: 'remainingInternationalLimit',
    amount: '₺15,000.00',
    descriptionKey: 'remainingInternationalLimit',
  },
]
</script>

<template>
  <TransferScreenShell :title="t('accountDetails.title')">
    <section class="rounded-3xl border border-white/10 bg-[#0f0f0f] p-5">
      <div class="flex items-center gap-4">
        <div
          class="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
        >
          <UserRound class="h-7 w-7 text-white/80" />
          <button
            class="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border border-black bg-white text-black shadow-lg"
            type="button"
          >
            <Camera class="h-4 w-4" />
            <span class="sr-only">{{ t('accountDetails.updatePhoto') }}</span>
          </button>
        </div>
        <div class="flex-1">
          <p class="text-sm font-semibold text-white">Payurus User</p>
          <p class="text-xs text-white/40">user@mail.com</p>
        </div>
        <button class="text-xs font-semibold uppercase tracking-wide text-white/60">
          {{ t('accountDetails.updatePhoto') }}
        </button>
      </div>

      <div class="mt-6 space-y-4 text-sm text-white">
        <div class="flex items-center justify-between">
          <p class="text-white/60">{{ t('accountDetails.accountType') }}</p>
          <p class="font-semibold">{{ t('accountDetails.verified') }}</p>
        </div>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-white/60">{{ t('accountDetails.payurusNumber') }}</p>
            <p class="text-xs text-white/40">
              {{ t('accountDetails.description.payurusNumber') }}
            </p>
          </div>
          <p class="font-semibold">14•••</p>
        </div>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-white/60">{{ t('accountDetails.iban') }}</p>
            <p class="text-xs text-white/40">{{ t('accountDetails.description.iban') }}</p>
          </div>
          <p class="font-semibold">TR05 •••• ••••</p>
        </div>
      </div>
    </section>

    <section class="space-y-3 rounded-3xl border border-white/10 bg-[#0f0f0f] p-5">
      <div class="flex items-center justify-between text-sm text-white">
        <div>
          <p class="text-white/60">{{ t('accountDetails.totalBalance') }}</p>
          <p class="text-xs text-white/40">
            {{ t('accountDetails.description.totalBalance') }}
          </p>
        </div>
        <p class="text-base font-semibold">₺0.00</p>
      </div>
      <div class="flex items-center justify-between text-sm text-white">
        <div>
          <p class="text-white/60">{{ t('accountDetails.availableBalance') }}</p>
          <p class="text-xs text-white/40">
            {{ t('accountDetails.description.availableBalance') }}
          </p>
        </div>
        <p class="text-base font-semibold">₺0.00</p>
      </div>
      <div class="flex items-center justify-between text-sm text-white">
        <div>
          <p class="text-white/60">{{ t('accountDetails.cashBalance') }}</p>
          <p class="text-xs text-white/40">
            {{ t('accountDetails.description.cashBalance') }}
          </p>
        </div>
        <p class="text-base font-semibold">₺0.00</p>
      </div>
    </section>

    <section class="rounded-3xl border border-white/10 bg-[#0f0f0f]">
      <div
        v-for="limit in limits"
        :key="limit.key"
        class="border-b border-white/5 px-5 py-4 text-sm text-white last:border-b-0"
      >
        <div class="flex items-center justify-between gap-4">
          <div class="flex-1">
            <p class="font-medium text-white">{{ t(`accountDetails.${limit.key}`) }}</p>
            <p v-if="limit.descriptionKey" class="text-xs text-white/45">
              {{ t(`accountDetails.description.${limit.descriptionKey}`) }}
            </p>
          </div>
          <p class="text-base font-semibold text-white">{{ limit.amount }}</p>
        </div>
      </div>
    </section>

    <section class="flex flex-col items-center gap-2 text-sm font-semibold text-white/60">
      <button class="hover:text-white">{{ t('accountDetails.legal.userAgreement') }}</button>
      <button class="hover:text-white">{{ t('accountDetails.legal.privacy') }}</button>
    </section>
  </TransferScreenShell>
</template>
