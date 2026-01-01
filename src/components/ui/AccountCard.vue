<script setup lang="ts">
import { Info, SendHorizontal, ArrowUpDown } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

defineProps<{
  id: string
  flag: string
  name: string
  balance: string
  iban: string
  primaryActionLabel?: string
  secondaryActionLabel?: string
}>()

const { t } = useI18n()
</script>

<template>
  <article
    class="account-card min-w-[calc(100%-32px)] snap-center rounded-[28px] border border-white/10 bg-[#171717] px-6 py-5 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
  >
    <div class="flex items-center justify-between text-xs text-white/60">
      <div class="flex items-center gap-2">
        <span class="text-base">{{ flag }}</span>
        <p class="text-sm font-medium text-white">{{ name }}</p>
      </div>
      <button
        class="rounded-full border border-white/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white/50"
      >
        {{ t('dashboard.accountCard.ibanButton') }}
      </button>
    </div>

    <div class="mt-4 flex items-end gap-2">
      <span class="text-[34px] font-bold leading-none text-white">{{ balance }}</span>
      <Info class="h-4 w-4 text-white/40" />
    </div>
    <p class="mt-1 text-[11px] text-white/45">
      {{ t('dashboard.accountCard.ibanLabel') }}
      <span class="font-medium text-white/70">{{ iban }}</span>
    </p>

    <div class="mt-5 grid grid-cols-[1.1fr_0.9fr] gap-3">
      <button
        class="flex items-center justify-center gap-2 rounded-[18px] bg-[#222225] py-3 text-[13px] font-semibold text-white"
      >
        <span class="flex h-6 w-6 items-center justify-center rounded-lg bg-white/10 text-sm">
          <ArrowUpDown class="h-3.5 w-3.5" />
        </span>
        {{ primaryActionLabel ?? t('dashboard.accountCard.primaryAction') }}
      </button>
      <button
        class="flex items-center justify-center gap-2 rounded-[18px] bg-white py-3 text-[13px] font-semibold text-black"
      >
        <SendHorizontal class="h-4 w-4" />
        {{ secondaryActionLabel ?? t('dashboard.accountCard.secondaryAction') }}
      </button>
    </div>
  </article>
</template>
