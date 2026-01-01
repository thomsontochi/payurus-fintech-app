<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Link2, Copy, QrCode } from 'lucide-vue-next'
import TransferScreenShell from '@/components/layout/TransferScreenShell.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const { t } = useI18n()
</script>

<template>
  <TransferScreenShell
    :title="t('transfers.request.title')"
    :subtitle="t('transfers.request.subtitle')"
  >
    <section class="space-y-3 rounded-3xl border border-white/10 bg-[#101010] p-5 text-white">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-semibold">{{ t('transfers.request.shareLink') }}</p>
          <p class="text-xs text-white/60">payurus.app/m/29d73</p>
        </div>
        <button class="rounded-full border border-white/15 p-3 text-white/70">
          <Link2 class="h-4 w-4" />
        </button>
      </div>
      <BaseButton variant="secondary" class="w-full py-3 text-sm">
        {{ t('transfers.request.copyLink') }}
      </BaseButton>
    </section>

    <section class="space-y-3 rounded-3xl border border-white/10 bg-[#101010] p-5 text-white">
      <div class="flex items-center gap-3">
        <div class="rounded-2xl bg-white/10 p-3">
          <QrCode class="h-6 w-6" />
        </div>
        <div>
          <p class="text-sm font-semibold">QR Request</p>
          <p class="text-xs text-white/60">Show this QR to receive instantly.</p>
        </div>
      </div>
      <div class="rounded-2xl border border-dashed border-white/20 p-6 text-center text-white/50">
        <QrCode class="mx-auto h-12 w-12" />
        <p class="mt-2 text-xs">QR preview</p>
      </div>
    </section>
  </TransferScreenShell>
</template>
