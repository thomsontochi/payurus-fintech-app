<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ArrowLeft, X, ChevronRight } from 'lucide-vue-next'

type HubTab = 'withdraw' | 'deposit'

type HubAction = {
  id: string
  titleKey: string
  descriptionKey: string
  badgeKey?: string
  route?: string
}

const router = useRouter()
const { t } = useI18n()

const activeTab = ref<HubTab>('deposit')

const depositActions: HubAction[] = [
  {
    id: 'ownIban',
    titleKey: 'withdrawDepositHub.actions.ownIban.title',
    descriptionKey: 'withdrawDepositHub.actions.ownIban.description',
    route: '/payments/own-iban',
  },
  {
    id: 'atmQr',
    titleKey: 'withdrawDepositHub.actions.atmQr.title',
    descriptionKey: 'withdrawDepositHub.actions.atmQr.description',
    badgeKey: 'withdrawDepositHub.actions.atmQr.badge',
  },
  {
    id: 'bankCard',
    titleKey: 'withdrawDepositHub.actions.bankCard.title',
    descriptionKey: 'withdrawDepositHub.actions.bankCard.description',
    route: '/payments/deposit/options',
  },
  {
    id: 'eft',
    titleKey: 'withdrawDepositHub.actions.eft.title',
    descriptionKey: 'withdrawDepositHub.actions.eft.description',
    route: '/payments/bank-transfer',
  },
  {
    id: 'cardless',
    titleKey: 'withdrawDepositHub.actions.cardless.title',
    descriptionKey: 'withdrawDepositHub.actions.cardless.description',
  },
  {
    id: 'paparaCard',
    titleKey: 'withdrawDepositHub.actions.paparaCard.title',
    descriptionKey: 'withdrawDepositHub.actions.paparaCard.description',
  },
]

const withdrawActions: HubAction[] = [
  {
    id: 'withdrawAtm',
    titleKey: 'withdrawDepositHub.actions.cardless.title',
    descriptionKey: 'withdrawDepositHub.actions.cardless.description',
  },
]

const handleBack = () => {
  router.back()
}

const handleClose = () => {
  router.push('/')
}

const handleActionSelect = (action: HubAction) => {
  if (action.route) {
    router.push(action.route)
    return
  }
  console.info('Selected hub action:', action.id)
}

const visibleActions = () => {
  return activeTab.value === 'deposit' ? depositActions : withdrawActions
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
        <h1 class="text-lg font-semibold">{{ t('withdrawDepositHub.title') }}</h1>
        <button
          type="button"
          class="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5"
          @click="handleClose"
        >
          <X class="h-5 w-5" />
          <span class="sr-only">Close</span>
        </button>
      </header>

      <div class="mt-6 flex rounded-full bg-white/10 p-1 text-sm font-semibold text-white/70">
        <button
          v-for="tab in ['withdraw', 'deposit'] as HubTab[]"
          :key="tab"
          type="button"
          class="flex-1 rounded-full px-4 py-2 transition"
          :class="activeTab === tab ? 'bg-white text-black shadow-lg' : 'bg-transparent'"
          @click="activeTab = tab"
        >
          {{ t(`withdrawDepositHub.tabs.${tab}`) }}
        </button>
      </div>

      <section class="mt-6 space-y-3">
        <article
          v-for="action in visibleActions()"
          :key="action.id"
          class="rounded-3xl border border-white/10 bg-[#0a0a0c] px-5 py-4"
        >
          <button
            type="button"
            class="flex w-full items-center justify-between text-left"
            @click="handleActionSelect(action)"
          >
            <div>
              <div class="flex items-center gap-2">
                <p class="text-base font-semibold">{{ t(action.titleKey) }}</p>
                <span
                  v-if="action.badgeKey"
                  class="rounded-full bg-[#ff4b5c] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white"
                >
                  {{ t(action.badgeKey) }}
                </span>
              </div>
              <p class="mt-1 text-sm text-white/60">
                {{ t(action.descriptionKey) }}
              </p>
            </div>
            <ChevronRight class="h-5 w-5 text-white/40" />
          </button>
        </article>
      </section>
    </div>
  </div>
</template>
