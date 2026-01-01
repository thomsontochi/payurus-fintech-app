<script setup lang="ts">
import type { Component } from 'vue'
import {
  Shield,
  UserCog,
  CreditCard,
  ShieldCheck,
  MessageSquare,
  AlertTriangle,
  MonitorSmartphone,
  Fingerprint,
  Mail,
  Palette,
  EyeOff,
  Languages,
  Power,
  Bell,
} from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import TransferScreenShell from '@/components/layout/TransferScreenShell.vue'
import PushNotificationPrompt from '@/components/system/PushNotificationPrompt.vue'

type SettingItem = {
  id: keyof typeof settingKeyMap
  icon: Component
  badge?: 'new' | 'beta'
}

const settingKeyMap = {
  changePassword: true,
  personalInfo: true,
  cardSettings: true,
  privacy: true,
  chat: true,
  lowBalance: true,
  activeDevices: true,
  loginOptions: true,
  communication: true,
  notifications: true,
  appearance: true,
  stealth: true,
  language: true,
  closeAccount: true,
} as const

const accountItems: SettingItem[] = [
  { id: 'changePassword', icon: Shield },
  { id: 'personalInfo', icon: UserCog, badge: 'new' },
  { id: 'cardSettings', icon: CreditCard },
  { id: 'privacy', icon: ShieldCheck },
  { id: 'chat', icon: MessageSquare },
  { id: 'lowBalance', icon: AlertTriangle },
  { id: 'activeDevices', icon: MonitorSmartphone },
  { id: 'loginOptions', icon: Fingerprint },
  { id: 'communication', icon: Mail },
  { id: 'notifications', icon: Bell },
]

const appItems: SettingItem[] = [
  { id: 'appearance', icon: Palette },
  { id: 'stealth', icon: EyeOff },
  { id: 'language', icon: Languages },
  { id: 'closeAccount', icon: Power },
]

const { t } = useI18n()

const badgeCopy = {
  new: t('settings.badges.new'),
  beta: t('settings.badges.beta'),
}

const handleSelect = (item: SettingItem) => {
  console.info('Settings option selected:', item.id)
}
</script>

<template>
  <TransferScreenShell :title="t('settings.title')">
    <section class="space-y-4">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">
          {{ t('settings.sections.account') }}
        </p>
      </div>
      <div class="rounded-3xl border border-white/10 bg-[#0f0f0f]">
        <div
          v-for="item in accountItems"
          :key="item.id"
          class="border-b border-white/5 last:border-b-0"
        >
          <button
            class="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-white/5"
            @click="handleSelect(item)"
          >
            <span
              class="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white"
            >
              <component :is="item.icon" class="h-5 w-5" />
            </span>
            <div class="flex flex-1 flex-col">
              <div class="flex items-center gap-2">
                <p class="text-sm font-semibold text-white">
                  {{ t(`settings.items.${item.id}.title`) }}
                </p>
                <span
                  v-if="item.badge"
                  class="rounded-full bg-red-500/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white"
                >
                  {{ badgeCopy[item.badge] }}
                </span>
              </div>
              <p class="text-xs text-white/50">
                {{ t(`settings.items.${item.id}.subtitle`) }}
              </p>
            </div>
            <svg width="20" height="20" viewBox="0 0 20 20" class="text-white/40">
              <path
                d="M7.5 5L12.5 10L7.5 15"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>

    <PushNotificationPrompt />

    <section class="space-y-4">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">
          {{ t('settings.sections.app') }}
        </p>
      </div>
      <div class="rounded-3xl border border-white/10 bg-[#0f0f0f]">
        <div
          v-for="item in appItems"
          :key="item.id"
          class="border-b border-white/5 last:border-b-0"
        >
          <button
            class="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-white/5"
            @click="handleSelect(item)"
          >
            <span
              class="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white"
            >
              <component :is="item.icon" class="h-5 w-5" />
            </span>
            <div class="flex flex-1 flex-col">
              <p class="text-sm font-semibold text-white">
                {{ t(`settings.items.${item.id}.title`) }}
              </p>
              <p class="text-xs text-white/50">
                {{ t(`settings.items.${item.id}.subtitle`) }}
              </p>
            </div>
            <svg width="20" height="20" viewBox="0 0 20 20" class="text-white/40">
              <path
                d="M7.5 5L12.5 10L7.5 15"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  </TransferScreenShell>
</template>
