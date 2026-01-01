<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  CreditCard,
  Edit2,
  GaugeCircle,
  Repeat2,
  ShieldCheck,
} from 'lucide-vue-next'
import TransferScreenShell from '@/components/layout/TransferScreenShell.vue'

type ActionId = 'limits' | 'subscriptions' | 'masterpass' | 'rename' | 'cancel'

const { t } = useI18n()
const usageEnabled = ref(true)

const limitSummary = computed(() =>
  t('virtualCard.limitSummary', { limit: '₺300,00', remaining: '₺300,00' }),
)

const actionItems: {
  id: ActionId
  icon: any
  isDestructive?: boolean
  subtitleKey?: string
}[] = [
  { id: 'limits', icon: GaugeCircle },
  { id: 'subscriptions', icon: Repeat2 },
  { id: 'masterpass', icon: ShieldCheck },
  { id: 'rename', icon: Edit2 },
  { id: 'cancel', icon: AlertTriangle, isDestructive: true },
]

const getActionTitle = (id: ActionId) => t(`virtualCard.actions.${id}.title`)
const getActionSubtitle = (id: ActionId) =>
  t(`virtualCard.actions.${id}.subtitle`, { name: 'Cenk' })

const handleAction = (id: ActionId) => {
  console.info('Virtual card action selected:', id)
}
</script>

<template>
  <TransferScreenShell :title="t('virtualCard.title')" :subtitle="t('virtualCard.subtitle')">
    <section class="space-y-4 rounded-[30px] border border-white/10 bg-[#0c0c0e] p-5">
      <header class="flex items-center justify-between text-sm text-white/60">
        <p>{{ t('virtualCard.title') }}</p>
        <button type="button" class="rounded-full border border-white/15 p-2 text-white/70">
          <BadgeCheck class="h-4 w-4" />
          <span class="sr-only">Card verified</span>
        </button>
      </header>
      <div
        class="flex items-center justify-between rounded-[28px] border border-white/10 bg-gradient-to-br from-[#1b1b1f] to-[#060609] px-5 py-4"
      >
        <div>
          <p class="text-sm font-semibold text-white">Payurus Virtual</p>
          <p class="text-xs text-white/60">**** 8234 • 01/30</p>
        </div>
        <CreditCard class="h-6 w-6 text-white/60" />
      </div>
      <p class="text-center text-xs text-white/50">{{ t('virtualCard.info') }}</p>
    </section>

    <section class="rounded-[26px] border border-white/10 bg-[#0d0d0f] px-5 py-4">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-semibold text-white">{{ t('virtualCard.toggleLabel') }}</p>
          <p class="text-xs text-white/50">
            {{
              usageEnabled ? t('virtualCard.toggleStates.on') : t('virtualCard.toggleStates.off')
            }}
          </p>
        </div>
        <button
          role="switch"
          :aria-checked="usageEnabled"
          class="relative h-7 w-12 rounded-full transition"
          :class="usageEnabled ? 'bg-white' : 'bg-white/20'"
          @click="usageEnabled = !usageEnabled"
        >
          <span
            class="absolute top-1 left-1 h-5 w-5 rounded-full bg-black transition"
            :class="usageEnabled ? 'translate-x-5' : ''"
          />
        </button>
      </div>
    </section>

    <section class="rounded-[26px] border border-white/10 bg-[#0d0d0f]">
      <button
        type="button"
        class="flex w-full items-center justify-between border-b border-white/10 px-5 py-4 text-left last:border-b-0"
        @click="handleAction('limits')"
      >
        <div class="flex items-center gap-3">
          <span class="rounded-2xl border border-white/10 p-3 text-white/80">
            <GaugeCircle class="h-4 w-4" />
          </span>
          <div>
            <p class="text-sm font-semibold text-white">
              {{ getActionTitle('limits') }}
            </p>
            <p class="text-xs text-white/50">
              {{ limitSummary }}
            </p>
          </div>
        </div>
        <ArrowRight class="h-4 w-4 text-white/40" />
      </button>

      <button
        v-for="row in actionItems.filter((item) => item.id !== 'limits')"
        :key="row.id"
        type="button"
        class="flex w-full items-center justify-between border-b border-white/10 px-5 py-4 text-left last:border-b-0"
        :class="row.isDestructive ? 'text-red-400' : ''"
        @click="handleAction(row.id)"
      >
        <div class="flex items-center gap-3">
          <span
            class="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15"
            :class="row.isDestructive ? 'border-red-500/40 text-red-400' : 'text-white/80'"
          >
            <component :is="row.icon" class="h-5 w-5" />
          </span>
          <div>
            <p
              class="text-sm font-semibold"
              :class="row.isDestructive ? 'text-red-400' : 'text-white'"
            >
              {{ getActionTitle(row.id) }}
            </p>
            <p class="text-xs" :class="row.isDestructive ? 'text-red-300/80' : 'text-white/50'">
              {{ getActionSubtitle(row.id) }}
            </p>
          </div>
        </div>
        <ArrowRight
          class="h-4 w-4"
          :class="row.isDestructive ? 'text-red-300/80' : 'text-white/40'"
        />
      </button>
    </section>
  </TransferScreenShell>
</template>
