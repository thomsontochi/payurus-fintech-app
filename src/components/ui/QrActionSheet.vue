<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { QrCode, ArrowDownToLine, ArrowUpToLine } from 'lucide-vue-next'

defineProps<{ open: boolean }>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'select', action: 'pay' | 'receive' | 'withdraw' | 'deposit'): void
}>()

const { t } = useI18n()

const actions = [
  { id: 'pay', icon: QrCode },
  { id: 'receive', icon: QrCode },
  { id: 'withdraw', icon: ArrowDownToLine },
  { id: 'deposit', icon: ArrowUpToLine },
] as const

const handleSelect = (action: (typeof actions)[number]['id']) => {
  emit('select', action)
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
            <h2 class="text-sm font-medium text-white/80">{{ t('dashboard.qrModal.title') }}</h2>
            <div class="mt-4 space-y-2">
              <button
                v-for="action in actions"
                :key="action.id"
                class="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-[#161618] px-4 py-3 text-left hover:bg-white/5"
                @click="handleSelect(action.id)"
              >
                <span class="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                  <component :is="action.icon" class="h-5 w-5" />
                </span>
                <p class="text-sm font-semibold text-white">
                  {{ t(`dashboard.qrModal.actions.${action.id}`) }}
                </p>
              </button>
            </div>
            <button
              class="mt-3 w-full rounded-2xl border border-white/10 py-3 text-sm font-medium text-white/70"
              @click="emit('close')"
            >
              {{ t('dashboard.qrModal.cancel') }}
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
