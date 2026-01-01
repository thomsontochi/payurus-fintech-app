<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

export type PaymentsSummaryCategory = {
  id: string
  labelKey: string
  value: number
  color: string
}

export type PaymentsSummaryData = {
  titleKey: string
  descriptionKey: string
  totalLabelKey: string
  totalValue: string
  categories: PaymentsSummaryCategory[]
}

const props = defineProps<{
  open: boolean
  summary: PaymentsSummaryData
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { t } = useI18n()

const totalAmount = computed(() =>
  props.summary.categories.reduce((sum, category) => sum + category.value, 0),
)

const chartStops = computed(() => {
  const total = totalAmount.value
  if (!total) return []

  let currentPercent = 0
  return props.summary.categories.map((category) => {
    const portion = (category.value / total) * 100
    const start = currentPercent
    const end = currentPercent + portion
    currentPercent = end
    return `${category.color} ${start}% ${end}%`
  })
})

const donutStyle = computed(() => {
  if (!chartStops.value.length) {
    return {
      backgroundColor: '#1f1f23',
    }
  }
  return {
    backgroundImage: `conic-gradient(${chartStops.value.join(', ')})`,
  }
})
</script>

<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center px-6">
        <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" @click="emit('close')" />
        <transition name="fade">
          <section
            class="relative z-10 w-full max-w-[360px] overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-b from-[#09090d] via-[#0b0b10] to-[#050507] p-6 text-white shadow-[0_25px_60px_rgba(0,0,0,0.65)]"
          >
            <header class="mb-6 text-center">
              <h2 class="text-xl font-semibold">{{ t(summary.titleKey) }}</h2>
              <p class="mt-2 text-sm text-white/70">
                {{ t(summary.descriptionKey) }}
              </p>
            </header>

            <div class="flex flex-col items-center gap-4">
              <div class="relative flex h-44 w-44 items-center justify-center">
                <div class="h-full w-full rounded-full" :style="donutStyle" />
                <div
                  class="absolute flex h-24 w-24 flex-col items-center justify-center rounded-full bg-[#050506]"
                >
                  <span class="text-xs text-white/50">
                    {{ t(summary.totalLabelKey) }}
                  </span>
                  <strong class="text-lg font-semibold text-white">
                    {{ summary.totalValue }}
                  </strong>
                </div>
              </div>

              <div class="w-full space-y-3">
                <div
                  v-for="category in summary.categories"
                  :key="category.id"
                  class="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-4 py-2.5 text-sm"
                >
                  <div class="flex items-center gap-3">
                    <span
                      class="h-3 w-3 rounded-full"
                      :style="{ backgroundColor: category.color }"
                    />
                    <span class="font-medium text-white">
                      {{ t(category.labelKey) }}
                    </span>
                  </div>
                  <span class="text-white/60">
                    {{ totalAmount ? ((category.value / totalAmount) * 100).toFixed(0) : 0 }}%
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              class="mt-6 w-full rounded-full border border-white/20 bg-white/10 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              @click="emit('close')"
            >
              {{ t('paymentsHub.summaryModal.cta') }}
            </button>
          </section>
        </transition>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
