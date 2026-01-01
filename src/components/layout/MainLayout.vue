<script setup lang="ts">
import type { Component } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  ArrowUpRight,
  CreditCard,
  Gift,
  House,
  Menu,
  MessageCircleMore,
  PiggyBank,
  QrCode,
  SendHorizontal,
  Shield,
  UserRound,
} from 'lucide-vue-next'

type ShortcutChip = {
  id: string
  label: string
  icon: Component
}

type BottomNavItem = {
  id: string
  labelKey: string
  icon: Component
  active?: boolean
}

type BottomNavId = BottomNavItem['id']

const emit = defineEmits<{
  (e: 'open-transfer'): void
  (e: 'open-qr'): void
  (e: 'open-menu'): void
  (e: 'open-profile'): void
  (e: 'navigate-card'): void
  (e: 'navigate', id: BottomNavId): void
}>()

const { t } = useI18n()

const props = withDefaults(
  defineProps<{
    activeNav?: BottomNavId
    showHeader?: boolean
    showShortcuts?: boolean
    showHeroSection?: boolean
    contentClass?: string
  }>(),
  {
    activeNav: 'home',
    showHeader: true,
    showShortcuts: true,
    showHeroSection: true,
    contentClass: 'mt-4 flex-1 space-y-4 px-4',
  },
)

const handleNavClick = (itemId: BottomNavId) => {
  if (itemId === 'transfer') {
    emit('open-transfer')
    emit('navigate', itemId)
    return
  }
  if (itemId === 'qr') {
    emit('open-qr')
    emit('navigate', itemId)
    return
  }
  if (itemId === 'card') {
    emit('navigate-card')
  }
  emit('navigate', itemId)
}

const shortcutDefaults: ShortcutChip[] = [
  { id: 'sticker', label: 'Payurus Sticker Card', icon: Gift },
  { id: 'superman', label: 'Payurus Guardian Card', icon: Shield },
  { id: 'lottery', label: 'Chance promo', icon: PiggyBank },
  { id: 'invest', label: 'Investment account', icon: ArrowUpRight },
  { id: 'gold', label: 'Gold gift', icon: CreditCard },
]

const bottomNav: BottomNavItem[] = [
  { id: 'home', labelKey: 'mainLayout.bottomNav.home', icon: House, active: true },
  { id: 'qr', labelKey: 'mainLayout.bottomNav.qr', icon: QrCode },
  { id: 'transfer', labelKey: 'mainLayout.bottomNav.transfer', icon: SendHorizontal },
  { id: 'payments', labelKey: 'mainLayout.bottomNav.payments', icon: ArrowUpRight },
  { id: 'card', labelKey: 'mainLayout.bottomNav.card', icon: CreditCard },
]
</script>

<template>
  <div class="min-h-screen bg-black text-white">
    <div class="mx-auto flex min-h-screen w-full max-w-md flex-col pb-24">
      <!-- Header -->
      <header
        v-if="props.showHeader"
        class="relative flex items-center justify-between px-4 pt-5 pb-2"
      >
        <slot name="header">
          <div class="flex items-center gap-3">
            <button
              class="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#1a1a1a]"
              @click="emit('open-menu')"
            >
              <span class="sr-only">{{ t('common.menu') }}</span>
              <Menu class="h-5 w-5" />
              <span class="absolute right-1 top-1 h-3 w-3 rounded-full bg-[#ff4b5c]" />
            </button>
            <button
              class="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#1a1a1a]"
            >
              <span class="sr-only">{{ t('common.messages') }}</span>
              <MessageCircleMore class="h-5 w-5" />
            </button>
          </div>

          <div class="absolute left-1/2 top-5 -translate-x-1/2 text-center">
            <p class="text-[11px] font-medium text-white/45">
              {{ t('mainLayout.header.payurusNo', { last4: '2370' }) }}
            </p>
          </div>

          <button
            class="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#1a1a1a]"
            @click="emit('open-profile')"
          >
            <span class="sr-only">{{ t('common.profile') }}</span>
            <UserRound class="h-5 w-5" />
          </button>
        </slot>
      </header>

      <!-- Shortcuts -->
      <section v-if="props.showShortcuts" class="mt-5 px-2 pb-3 pt-2">
        <slot name="shortcuts">
          <div class="scrollbar-hide flex gap-3 overflow-x-auto px-2 py-2">
            <button
              v-for="chip in shortcutDefaults"
              :key="chip.id"
              class="flex min-w-[78px] flex-shrink-0 flex-col items-center gap-1.5 text-center"
            >
              <div class="relative">
                <div
                  class="flex h-[70px] w-[70px] items-center justify-center rounded-full border border-white/30 bg-gradient-to-b from-[#2c2c2c] to-[#131313]"
                >
                  <component :is="chip.icon" class="h-6 w-6 text-white" />
                </div>
                <span
                  class="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border border-black/30 bg-white text-[11px] font-semibold text-black"
                >
                  +
                </span>
              </div>
              <span class="text-[11px] font-medium leading-tight text-white">{{ chip.label }}</span>
            </button>
          </div>
        </slot>
      </section>

      <!-- Hero Card -->
      <section v-if="props.showHeroSection" class="mt-3 px-4">
        <slot name="hero" />
      </section>

      <!-- Main Content -->
      <main :class="props.contentClass">
        <slot />
      </main>
    </div>

    <!-- Bottom Navigation -->
    <footer class="fixed bottom-0 left-0 right-0 bg-black px-4 pb-5 pt-2">
      <slot name="bottom-nav">
        <nav
          class="mx-auto flex max-w-md items-center justify-around rounded-3xl bg-[#1c1c1c] px-1 py-3"
        >
          <button
            v-for="item in bottomNav"
            :key="item.id"
            class="flex flex-col items-center gap-1 px-3 transition-colors"
            :class="item.id === props.activeNav ? 'text-white' : 'text-white/40'"
            @click="handleNavClick(item.id)"
          >
            <component :is="item.icon" class="h-5 w-5" />
            <span class="text-[10px] font-medium leading-none">{{ t(item.labelKey) }}</span>
          </button>
        </nav>
      </slot>
    </footer>
  </div>
</template>
