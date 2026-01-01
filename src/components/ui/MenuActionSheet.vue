<script setup lang="ts">
import type { Component } from 'vue'
import {
  Bell,
  MapPin,
  CreditCard,
  Users,
  GraduationCap,
  Gift,
  CalendarDays,
  Receipt,
  Briefcase,
  HelpCircle,
  Headphones,
} from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

defineProps<{ open: boolean }>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'select', key: string): void
}>()

const { t } = useI18n()

type MenuItem = {
  id: keyof typeof menuOptionKeys
  icon: Component
  badge?: string
}

const menuOptionKeys = {
  notifications: true,
  findAtm: true,
  withdrawDeposit: true,
  splitExpense: true,
  edu: true,
  cashback: true,
  monthlySummary: true,
  fees: true,
  business: true,
  faq: true,
  support: true,
} as const

const items: MenuItem[] = [
  { id: 'notifications', icon: Bell, badge: '7' },
  { id: 'findAtm', icon: MapPin },
  { id: 'withdrawDeposit', icon: CreditCard },
  { id: 'splitExpense', icon: Users },
  { id: 'edu', icon: GraduationCap },
  { id: 'cashback', icon: Gift },
  { id: 'monthlySummary', icon: CalendarDays },
  { id: 'fees', icon: Receipt },
  { id: 'business', icon: Briefcase },
  { id: 'faq', icon: HelpCircle },
  { id: 'support', icon: Headphones },
] as const

const handleSelect = (id: (typeof items)[number]['id']) => {
  emit('select', id)
}
</script>

<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="open" class="fixed inset-0 z-50">
        <div class="absolute inset-0 bg-black/70" @click="emit('close')" />
        <transition name="slide-up">
          <section
            class="absolute inset-x-4 bottom-20 flex max-h-[75vh] flex-col overflow-hidden rounded-[10px] border border-white/10 bg-[#1a1a1c] text-white shadow-2xl"
          >
            <div class="flex-1 overflow-y-auto">
              <div class="divide-y divide-white/10">
                <button
                  v-for="item in items"
                  :key="item.id"
                  class="flex w-full items-center gap-5 px-6 py-5 text-left transition-colors hover:bg-white/5"
                  @click="handleSelect(item.id)"
                >
                  <span class="flex h-6 w-6 items-center justify-center">
                    <component :is="item.icon" class="h-6 w-6 text-white/85" />
                  </span>
                  <p class="flex-1 text-base font-semibold text-white">
                    {{ t(`menu.options.${item.id}`) }}
                  </p>
                  <span
                    v-if="item.badge"
                    class="flex h-6 min-w-[24px] items-center justify-center rounded-full bg-[#ff4757] px-2 text-xs font-bold text-white"
                  >
                    {{ item.badge }}
                  </span>
                </button>
              </div>
            </div>
          </section>
        </transition>
        <transition name="slide-up">
          <button
            class="absolute bottom-4 left-4 right-4 rounded-[10px] bg-white py-3 text-sm font-semibold text-black shadow-lg transition-opacity hover:opacity-90"
            @click="emit('close')"
          >
            {{ t('menu.cancel') }}
          </button>
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
