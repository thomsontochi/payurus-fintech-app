<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Calendar, Repeat2 } from 'lucide-vue-next'
import TransferScreenShell from '@/components/layout/TransferScreenShell.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const { t } = useI18n()
</script>

<template>
  <TransferScreenShell
    :title="t('transfers.scheduled.title')"
    :subtitle="t('transfers.scheduled.subtitle')"
  >
    <section class="space-y-4 rounded-3xl border border-white/10 bg-[#101010] p-5 text-white">
      <div class="flex items-center gap-3">
        <div class="rounded-2xl bg-white/10 p-3">
          <Calendar class="h-5 w-5" />
        </div>
        <div>
          <p class="text-sm font-semibold">Next transfer date</p>
          <p class="text-xs text-white/60">18 December 2025</p>
        </div>
      </div>
      <div class="rounded-2xl border border-white/15 bg-white/5 px-4 py-3">
        <p class="text-xs text-white/40">Frequency</p>
        <p class="text-base font-semibold">Monthly</p>
      </div>
      <div class="rounded-2xl border border-white/15 bg-white/5 px-4 py-3">
        <div class="flex items-center gap-3">
          <Repeat2 class="h-5 w-5 text-white/60" />
          <div>
            <p class="text-xs text-white/40">Reminder</p>
            <p class="text-base font-semibold">Notify me 1 day before</p>
          </div>
        </div>
      </div>
      <BaseButton class="w-full py-3 text-base">
        {{ t('transfers.scheduled.action') }}
      </BaseButton>
    </section>
  </TransferScreenShell>
</template>
