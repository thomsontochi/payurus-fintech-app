<template>
  <div class="min-h-screen bg-black text-white">
    <div class="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pb-10 pt-8">
      <header class="relative flex items-center justify-between">
        <button
          type="button"
          class="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5"
          @click="handleBack"
        >
          <span class="sr-only">Back</span>
          ←
        </button>
        <div class="flex-1" />
        <div class="h-11 w-11" />
      </header>

      <main class="mt-2 flex flex-1 flex-col">
        <section class="space-y-4 text-center">
          <div class="space-y-2 px-4 pt-2">
            <h1 class="text-lg font-semibold leading-tight text-white">
              {{ t('cardPromo.title') }}
            </h1>
            <p class="text-sm text-white/70">
              {{ t('cardPromo.body') }}
            </p>
          </div>
          <div class="flex items-end justify-center gap-4">
            <div
              class="h-60 w-36 rounded-[36px] border border-white/10 bg-gradient-to-b from-[#f4f4f5] to-[#c2c2c7] p-5 text-black shadow-[0_24px_40px_rgba(0,0,0,0.4)]"
            >
              <p class="text-sm font-semibold tracking-wide text-black/60">Papurus</p>
              <p class="mt-auto text-xs font-semibold uppercase tracking-[0.3em] text-black/50">
                {{ t('cardPromo.cards.gray') }}
              </p>
            </div>
            <div
              class="h-72 w-40 rounded-[40px] border border-white/10 bg-gradient-to-b from-[#1a1a1d] to-[#000000] p-6 text-white shadow-[0_36px_60px_rgba(0,0,0,0.65)]"
            >
              <p class="text-sm font-semibold tracking-wide text-white/70">Papurus</p>
              <p class="mt-auto text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                {{ t('cardPromo.cards.black') }}
              </p>
            </div>
            <div
              class="h-60 w-36 rounded-[36px] border border-white/10 bg-gradient-to-b from-[#80c5ff] to-[#2476ff] p-5 text-white shadow-[0_24px_40px_rgba(0,0,0,0.4)]"
            >
              <p class="text-sm font-semibold tracking-wide text-white/90">Papurus</p>
              <p class="mt-auto text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                {{ t('cardPromo.cards.edu') }}
              </p>
            </div>
          </div>
        </section>

        <div class="flex-1" />

        <section class="space-y-3 pb-6">
          <button
            type="button"
            class="w-full rounded-[18px] border border-white/40 bg-transparent px-5 py-4 text-sm font-semibold text-white transition hover:bg-white/5"
            @click="handleFindAtm"
          >
            {{ t('cardPromo.ctas.findAtm') }}
          </button>
          <button
            type="button"
            class="w-full rounded-[18px] bg-white px-5 py-4 text-sm font-semibold text-black transition hover:bg-white/90"
            @click="handleApply"
          >
            {{ t('cardPromo.ctas.apply') }}
          </button>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()

const handleFindAtm = () => {
  console.info('Find ATM CTA clicked')
}

const handleApply = () => {
  console.info('Apply for Papurus Card CTA clicked')
}

const handleBack = () => {
  router.back()
}
</script>
