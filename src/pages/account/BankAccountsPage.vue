<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ArrowLeft, Plus, ChevronRight } from 'lucide-vue-next'

type BankAccount = {
  id: string
  name: string
  iban: string
  accent: string
  icon: string
}

const router = useRouter()
const { t } = useI18n()

const accounts: BankAccount[] = [
  {
    id: 'garanti',
    name: 'Garanti BBVA',
    iban: 'TR18 •••• •••• 1234',
    accent: 'from-[#53c86a] to-[#2c9344]',
    icon: '🌱',
  },
  {
    id: 'enpara',
    name: 'Enpara',
    iban: 'TR35 •••• •••• 9876',
    accent: 'from-[#7b5cff] to-[#4c2fb0]',
    icon: '🇬🇧',
  },
  {
    id: 'teb',
    name: 'TEB',
    iban: 'TR50 •••• •••• 4321',
    accent: 'from-[#13d3a0] to-[#0a8c68]',
    icon: '⭐️',
  },
]

const handleBack = () => {
  router.back()
}

const handleAddAccount = () => {
  console.info('Add bank account')
}
</script>

<template>
  <div class="min-h-screen bg-[#050505] text-white">
    <div class="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pb-6 pt-10">
      <button
        type="button"
        class="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5"
        @click="handleBack"
      >
        <ArrowLeft class="h-5 w-5" />
        <span class="sr-only">Back</span>
      </button>

      <div class="mt-6 space-y-2 text-center">
        <h1 class="text-xl font-semibold">{{ t('bankAccounts.title') }}</h1>
        <p class="text-sm text-white/60">
          {{ t('bankAccounts.subtitle') }}
        </p>
      </div>

      <section class="mt-8 flex-1 space-y-3">
        <article
          v-for="account in accounts"
          :key="account.id"
          class="flex items-center justify-between rounded-3xl border border-white/10 bg-[#0b0b0d] px-4 py-4"
        >
          <div class="flex items-center gap-3">
            <div
              class="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br text-base"
              :class="account.accent"
            >
              {{ account.icon }}
            </div>
            <div>
              <p class="text-sm font-semibold">{{ account.name }}</p>
              <p class="text-xs text-white/50">
                {{ t('bankAccounts.labels.iban') }} {{ account.iban }}
              </p>
            </div>
          </div>
          <ChevronRight class="h-5 w-5 text-white/30" />
        </article>
      </section>

      <div class="mt-auto pt-6">
        <button
          type="button"
          class="flex w-full items-center justify-center gap-2 rounded-[18px] border border-white/30 px-5 py-4 text-sm font-semibold"
          @click="handleAddAccount"
        >
          {{ t('bankAccounts.cta') }}
          <Plus class="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
</template>
