<script setup lang="ts">
import type { Component } from 'vue'
import {
  Sparkles,
  Image as ImageIcon,
  FileText,
  Activity,
  Building,
  CreditCard,
  MapPin,
  Settings,
  LogOut,
} from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

defineProps<{ open: boolean; progressLabel?: string }>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'select', key: string): void
}>()

const { t } = useI18n()

type ProfileItem = {
  id: keyof typeof profileOptionKeys
  icon: Component
  badge?: string
}

const profileOptionKeys = {
  progress: true,
  avatar: true,
  details: true,
  activity: true,
  bankAccounts: true,
  cards: true,
  easyAddress: true,
  settings: true,
  logout: true,
} as const

const items: ProfileItem[] = [
  { id: 'progress', icon: Sparkles },
  { id: 'avatar', icon: ImageIcon },
  { id: 'details', icon: FileText },
  { id: 'activity', icon: Activity },
  { id: 'bankAccounts', icon: Building },
  { id: 'cards', icon: CreditCard },
  { id: 'easyAddress', icon: MapPin },
  { id: 'settings', icon: Settings },
  { id: 'logout', icon: LogOut },
]

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
                  <div class="flex flex-1 items-center justify-between">
                    <p class="text-base font-semibold text-white">
                      {{ t(`profileSheet.options.${item.id}`) }}
                    </p>
                    <span
                      v-if="item.id === 'progress'"
                      class="rounded-full border border-amber-300/60 px-3 py-1 text-xs font-semibold text-amber-200"
                    >
                      {{ progressLabel ?? '2 / 5' }}
                    </span>
                  </div>
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
            {{ t('profileSheet.cancel') }}
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
