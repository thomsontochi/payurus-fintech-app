<script setup lang="ts">
import { ArrowRight, SendHorizontal, Undo2, Globe2, ShieldCheck, Clock3 } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'select', type: 'send' | 'request' | 'international' | 'secure' | 'scheduled'): void
}>()

const { t } = useI18n()

const options = [
  { id: 'send', icon: SendHorizontal },
  { id: 'request', icon: Undo2 },
  { id: 'international', icon: Globe2 },
  { id: 'secure', icon: ShieldCheck },
  { id: 'scheduled', icon: Clock3 },
] as const

const handleSelect = (id: (typeof options)[number]['id']) => {
  emit('select', id)
}
</script>

<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="open" class="fixed inset-0 z-40">
        <div class="absolute inset-0 bg-black/70" @click="emit('close')" />
        <transition name="slide-up">
          <section
            class="absolute inset-x-0 bottom-0 rounded-t-[32px] border border-white/10 bg-[#0e0e0f] p-6"
          >
            <div class="mb-4 flex items-center justify-between">
              <p class="text-sm font-medium text-white/80">
                {{ t('dashboard.transferModal.title') }}
              </p>
              <button
                class="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70"
                @click="emit('close')"
              >
                Close
              </button>
            </div>

            <div class="space-y-2">
              <button
                v-for="option in options"
                :key="option.id"
                class="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-[#161618] px-4 py-3 text-left transition hover:bg-white/5"
                @click="handleSelect(option.id)"
              >
                <span
                  class="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-lg font-semibold"
                >
                  <component :is="option.icon" class="h-5 w-5 text-white" />
                </span>
                <div class="flex-1">
                  <p class="text-sm font-semibold text-white">
                    {{ t(`dashboard.transferModal.options.${option.id}.title`) }}
                  </p>
                  <p class="text-xs text-white/50">
                    {{ t(`dashboard.transferModal.options.${option.id}.description`) }}
                  </p>
                </div>
                <ArrowRight class="h-4 w-4 text-white/30" />
              </button>
            </div>
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
.slide-up-enter-active,
.slide-up-leave-active {
  transition:
    transform 0.25s ease,
    opacity 0.25s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(40px);
  opacity: 0;
}
</style>
