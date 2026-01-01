<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ShieldCheck, PackageCheck } from 'lucide-vue-next'
import TransferScreenShell from '@/components/layout/TransferScreenShell.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const { t } = useI18n()
</script>

<template>
  <TransferScreenShell
    :title="t('transfers.secure.title')"
    :subtitle="t('transfers.secure.subtitle')"
  >
    <section class="space-y-4 rounded-3xl border border-white/10 bg-[#101010] p-5 text-white">
      <div class="flex items-center gap-3">
        <div class="rounded-2xl bg-white/10 p-3">
          <ShieldCheck class="h-5 w-5" />
        </div>
        <div>
          <p class="text-sm font-semibold">Protected escrow</p>
          <p class="text-xs text-white/60">Funds are held until both parties confirm.</p>
        </div>
      </div>
      <div class="rounded-2xl border border-white/15 bg-white/5 px-4 py-3">
        <p class="text-xs text-white/40">Order reference</p>
        <p class="text-base font-semibold">#PAY-483920</p>
      </div>
      <div class="rounded-2xl border border-white/15 bg-white/5 px-4 py-3">
        <div class="flex items-center gap-3">
          <PackageCheck class="h-5 w-5 text-white/60" />
          <div>
            <p class="text-xs text-white/40">Marketplace</p>
            <p class="text-base font-semibold">Payurus Bazaar</p>
          </div>
        </div>
      </div>
      <BaseButton class="w-full py-3 text-base">
        {{ t('transfers.secure.action') }}
      </BaseButton>
    </section>
  </TransferScreenShell>
</template>
