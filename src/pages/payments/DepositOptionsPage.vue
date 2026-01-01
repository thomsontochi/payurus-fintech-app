<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ArrowLeft, X, ChevronRight } from 'lucide-vue-next'

type DepositOption = 'bankTransfer' | 'depositNow' | 'createInstruction' | 'myInstructions'

const router = useRouter()
const { t } = useI18n()

const options: { id: DepositOption; labelKey: string }[] = [
  { id: 'bankTransfer', labelKey: 'depositOptions.options.bankTransfer' },
  {
    id: 'depositNow',
    labelKey: 'depositOptions.options.depositNow',
  },
  {
    id: 'createInstruction',
    labelKey: 'depositOptions.options.createInstruction',
  },
  {
    id: 'myInstructions',
    labelKey: 'depositOptions.options.myInstructions',
  },
]

const handleBack = () => {
  router.back()
}

const handleClose = () => {
  router.push('/')
}

const handleSelect = (option: DepositOption) => {
  if (option === 'bankTransfer') {
    router.push('/payments/bank-transfer')
    return
  }
  console.info('Deposit option selected:', option)
}
</script>

<template>
  <div class="min-h-screen bg-[#050505] text-white">
    <div class="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pb-10 pt-10">
      <div class="flex items-center justify-between">
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
      </div>

      <div class="mt-8 space-y-3 text-center">
        <h1 class="text-xl font-semibold">
          {{ t('depositOptions.title') }}
        </h1>
        <p class="text-sm text-white/60">
          {{ t('depositOptions.description') }}
        </p>
      </div>

      <section class="mt-8 flex-1 space-y-3">
        <article
          v-for="option in options"
          :key="option.id"
          class="flex items-center justify-between rounded-3xl border border-white/10 bg-[#0a0a0c] px-5 py-4"
        >
          <button
            type="button"
            class="flex w-full items-center justify-between text-left text-base font-semibold"
            @click="handleSelect(option.id)"
          >
            <span>{{ t(option.labelKey) }}</span>
            <ChevronRight class="h-5 w-5 text-white/50" />
          </button>
        </article>
      </section>
    </div>
  </div>
</template>
