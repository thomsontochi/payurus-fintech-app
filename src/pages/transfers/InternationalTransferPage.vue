<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Globe2, DollarSign } from 'lucide-vue-next'
import TransferScreenShell from '@/components/layout/TransferScreenShell.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const { t } = useI18n()
</script>

<template>
  <TransferScreenShell
    :title="t('transfers.international.title')"
    :subtitle="t('transfers.international.subtitle')"
  >
    <section class="space-y-4 rounded-3xl border border-white/10 bg-[#101010] p-5 text-white">
      <div class="flex items-center gap-3">
        <div class="rounded-2xl bg-white/10 p-3">
          <Globe2 class="h-5 w-5" />
        </div>
        <div>
          <p class="text-sm font-semibold">Destination country</p>
          <p class="text-xs text-white/60">Select where you want to send</p>
        </div>
      </div>
      <div class="rounded-2xl border border-white/15 bg-white/5 px-4 py-3">
        <p class="text-xs text-white/40">Country</p>
        <p class="text-sm font-semibold">United Kingdom (GBP)</p>
      </div>
      <div class="rounded-2xl border border-white/15 bg-white/5 px-4 py-3">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs text-white/40">You send</p>
            <p class="text-xl font-semibold text-white">₺5,000</p>
          </div>
          <DollarSign class="h-5 w-5 text-white/60" />
        </div>
      </div>
      <div class="rounded-2xl border border-white/15 bg-white/5 px-4 py-3">
        <p class="text-xs text-white/40">Recipient gets (est.)</p>
        <p class="text-xl font-semibold text-white">£142.60</p>
        <p class="text-xs text-white/50">Rate locked for 30 minutes.</p>
      </div>
      <BaseButton class="w-full py-3 text-base">
        {{ t('transfers.international.action') }}
      </BaseButton>
    </section>
  </TransferScreenShell>
</template>
