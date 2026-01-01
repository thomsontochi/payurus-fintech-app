<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseButton from '@/components/ui/BaseButton.vue'
import type { PushPermissionStatus } from '@/services/pushNotifications'
import { requestPushPermission } from '@/services/pushNotifications'

const status = ref<PushPermissionStatus | 'default' | 'loading' | 'success'>('default')
const { t } = useI18n()

const isSupported = () =>
  typeof window !== 'undefined' &&
  'Notification' in window &&
  'serviceWorker' in navigator &&
  'PushManager' in window

const deriveInitialStatus = () => {
  if (!isSupported()) {
    status.value = 'unsupported'
    return
  }
  const permission = Notification.permission
  if (permission === 'granted') {
    status.value = 'granted'
  } else if (permission === 'denied') {
    status.value = 'denied'
  } else {
    status.value = 'default'
  }
}

const handleEnable = async () => {
  if (status.value === 'loading') return
  status.value = 'loading'
  const result = await requestPushPermission()
  if (result === 'granted') {
    status.value = 'success'
    setTimeout(() => {
      status.value = 'granted'
    }, 3500)
  } else {
    status.value = result
  }
}

const promptVisible = computed(
  () => status.value === 'default' || status.value === 'denied' || status.value === 'unsupported',
)

const successVisible = computed(() => status.value === 'success')

const statusHint = computed(() => {
  if (status.value === 'denied') {
    return t('notifications.prompt.deniedBody')
  }
  if (status.value === 'unsupported') {
    return 'Notifications are not supported in this browser.'
  }
  return t('notifications.prompt.body')
})

onMounted(() => {
  deriveInitialStatus()
})
</script>

<template>
  <div class="space-y-3">
    <transition name="fade">
      <section
        v-if="promptVisible"
        class="rounded-3xl border border-white/10 bg-gradient-to-br from-[#18181c] via-[#121215] to-[#070707] p-5 text-white shadow-[0_10px_40px_rgba(0,0,0,0.45)]"
      >
        <div class="flex flex-col gap-4">
          <div class="space-y-1.5">
            <p class="text-sm font-semibold uppercase tracking-[0.25em] text-white/60">Push</p>
            <h3 class="text-xl font-semibold leading-tight">
              {{ t('notifications.prompt.title') }}
            </h3>
            <p class="text-sm text-white/70">
              {{ statusHint }}
            </p>
          </div>
          <BaseButton
            :disabled="status === 'loading' || status === 'unsupported'"
            class="w-full justify-center"
            @click="handleEnable"
          >
            <span v-if="status === 'loading'" class="flex items-center gap-2">
              <span class="h-2 w-2 animate-ping rounded-full bg-neutral-950"></span>
              Loading...
            </span>
            <span v-else>
              {{ t('notifications.prompt.enable') }}
            </span>
          </BaseButton>
          <button
            class="text-xs font-semibold uppercase tracking-wide text-white/50"
            @click="status = 'granted'"
          >
            {{ t('notifications.prompt.dismiss') }}
          </button>
        </div>
      </section>
    </transition>

    <transition name="fade">
      <section
        v-if="successVisible"
        class="rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm text-emerald-100"
      >
        <p class="font-semibold">{{ t('notifications.prompt.successTitle') }}</p>
        <p class="text-emerald-200">{{ t('notifications.prompt.successBody') }}</p>
      </section>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>
