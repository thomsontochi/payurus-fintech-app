<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ArrowLeft, X, Copy, HelpCircle } from 'lucide-vue-next'

const router = useRouter()
const { t } = useI18n()

const accountInfo = {
  holder: 'Melik Eslem',
  iban: 'TR05 0000 1111 2222 3333 4444 55',
  remainingLimit: '₺5.000.000,00',
  easyAddress: 'melik@example.com',
}

const handleBack = () => {
  router.back()
}

const handleClose = () => {
  router.push('/')
}

const copyValue = async (value: string) => {
  try {
    await navigator.clipboard.writeText(value)
  } catch (error) {
    console.warn('Copy failed', error)
  }
}

const handleHowItWorks = () => {
  console.info('Open How do I deposit modal')
}
</script>

<template>
  <div class="min-h-screen bg-[#050505] text-white">
    <div class="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pb-10 pt-8">
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
          class="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5"
          @click="handleClose"
        >
          <X class="h-5 w-5" />
          <span class="sr-only">Close</span>
        </button>
      </header>

      <section class="mt-6 space-y-3 text-center">
        <h1 class="text-xl font-semibold">
          {{ t('ownIbanDeposit.title') }}
        </h1>
        <p class="text-sm text-white/65">
          {{ t('ownIbanDeposit.description') }}
        </p>
      </section>

      <section class="mt-8 space-y-4">
        <article
          v-for="item in [
            {
              id: 'holder',
              label: t('ownIbanDeposit.infoTitles.accountHolder'),
              value: accountInfo.holder,
            },
            { id: 'iban', label: t('ownIbanDeposit.infoTitles.iban'), value: accountInfo.iban },
            {
              id: 'limit',
              label: t('ownIbanDeposit.infoTitles.remainingLimit'),
              value: accountInfo.remainingLimit,
            },
            {
              id: 'easy',
              label: t('ownIbanDeposit.infoTitles.easyAddress'),
              value: accountInfo.easyAddress,
            },
          ]"
          :key="item.id"
          class="rounded-3xl border border-white/10 bg-[#0a0a0c] px-5 py-4"
        >
          <p class="text-xs uppercase tracking-wide text-white/40">{{ item.label }}</p>
          <div class="mt-2 flex items-center justify-between gap-3">
            <p class="text-base font-semibold text-white">{{ item.value }}</p>
            <button
              v-if="item.id !== 'limit'"
              type="button"
              class="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/70"
              @click="copyValue(item.value)"
            >
              <Copy class="h-4 w-4" />
              <span class="sr-only">Copy</span>
            </button>
            <button
              v-else
              type="button"
              class="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/70"
            >
              <HelpCircle class="h-4 w-4" />
            </button>
          </div>
        </article>
      </section>

      <p class="mt-6 text-xs text-white/50">
        {{ t('ownIbanDeposit.limitNote') }}
      </p>

      <button
        type="button"
        class="mt-6 w-full rounded-full border border-white/15 bg-white/10 py-4 text-sm font-semibold text-white transition hover:bg-white/15"
        @click="handleHowItWorks"
      >
        {{ t('ownIbanDeposit.howItWorksCta') }}
      </button>
    </div>
  </div>
</template>
