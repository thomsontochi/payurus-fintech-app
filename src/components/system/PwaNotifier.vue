<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseButton from '@/components/ui/BaseButton.vue'
import { PAYURUS_SW_EVENTS, updatePayurusSW } from '@/registerSW'
import { REMOTE_CONFIG_ERROR_EVENT, REMOTE_CONFIG_RECOVERED_EVENT } from '@/constants/remoteConfig'

const isBrowser = typeof window !== 'undefined' && typeof navigator !== 'undefined'
const updateToastVisible = ref(false)
const offlineReadyVisible = ref(false)
const remoteConfigToastVisible = ref(false)
const offlineBannerVisible = ref(isBrowser ? !navigator.onLine : false)
const { t } = useI18n()

const dispatchers = {
  showUpdateToast: () => {
    updateToastVisible.value = true
  },
  showOfflineReadyToast: () => {
    offlineReadyVisible.value = true
  },
  setOfflineState: (isOffline: boolean) => {
    offlineBannerVisible.value = isOffline
  },
  showRemoteConfigFallback: () => {
    remoteConfigToastVisible.value = true
  },
  hideRemoteConfigFallback: () => {
    remoteConfigToastVisible.value = false
  },
}

const handleUpdateEvent = () => dispatchers.showUpdateToast()
const handleOfflineReadyEvent = () => dispatchers.showOfflineReadyToast()
const handleOffline = () => dispatchers.setOfflineState(true)
const handleOnline = () => dispatchers.setOfflineState(false)
const handleRemoteConfigError = () => dispatchers.showRemoteConfigFallback()
const handleRemoteConfigRecovered = () => dispatchers.hideRemoteConfigFallback()

const refreshApp = () => {
  updateToastVisible.value = false
  if (typeof updatePayurusSW === 'function') {
    updatePayurusSW(true)
  } else {
    window.location.reload()
  }
}

const dismissUpdate = () => {
  updateToastVisible.value = false
}

const dismissOfflineReady = () => {
  offlineReadyVisible.value = false
}

const dismissRemoteConfigToast = () => {
  remoteConfigToastVisible.value = false
}

onMounted(() => {
  window.addEventListener(PAYURUS_SW_EVENTS.UPDATE_READY, handleUpdateEvent)
  window.addEventListener(PAYURUS_SW_EVENTS.OFFLINE_READY, handleOfflineReadyEvent)
  window.addEventListener('offline', handleOffline)
  window.addEventListener('online', handleOnline)
  window.addEventListener(REMOTE_CONFIG_ERROR_EVENT, handleRemoteConfigError)
  window.addEventListener(REMOTE_CONFIG_RECOVERED_EVENT, handleRemoteConfigRecovered)
})

onBeforeUnmount(() => {
  window.removeEventListener(PAYURUS_SW_EVENTS.UPDATE_READY, handleUpdateEvent)
  window.removeEventListener(PAYURUS_SW_EVENTS.OFFLINE_READY, handleOfflineReadyEvent)
  window.removeEventListener('offline', handleOffline)
  window.removeEventListener('online', handleOnline)
  window.removeEventListener(REMOTE_CONFIG_ERROR_EVENT, handleRemoteConfigError)
  window.removeEventListener(REMOTE_CONFIG_RECOVERED_EVENT, handleRemoteConfigRecovered)
})
</script>

<template>
  <div>
    <transition name="fade-up">
      <div
        v-if="remoteConfigToastVisible"
        class="pointer-events-auto fixed inset-x-4 bottom-40 z-[52] rounded-xl border border-amber-500/30 bg-[#1b1405] px-4 py-3 text-sm text-amber-100 shadow-[0_10px_30px_rgba(0,0,0,0.4)] backdrop-blur"
      >
        <div class="flex items-start gap-3">
          <div class="flex-1">
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
              {{ t('pwa.remoteConfig.title') }}
            </p>
            <p class="mt-1 text-xs text-amber-100/80">
              {{ t('pwa.remoteConfig.body') }}
            </p>
          </div>
          <button
            class="text-xs font-semibold uppercase tracking-wide text-amber-200"
            @click="dismissRemoteConfigToast"
          >
            {{ t('pwa.remoteConfig.dismiss') }}
          </button>
        </div>
      </div>
    </transition>

    <transition name="fade-up">
      <div
        v-if="updateToastVisible"
        class="pointer-events-auto fixed inset-x-4 bottom-8 z-[60] rounded-2xl border border-white/10 bg-neutral-900/95 p-4 shadow-[0_15px_40px_rgba(0,0,0,0.45)] backdrop-blur"
      >
        <div class="flex flex-col gap-3">
          <div>
            <p class="text-sm font-semibold text-white">{{ t('pwa.update.title') }}</p>
            <p class="text-xs text-white/70">
              {{ t('pwa.update.body') }}
            </p>
          </div>
          <div class="flex items-center gap-2">
            <BaseButton class="flex-1" @click="refreshApp">
              {{ t('pwa.update.refresh') }}
            </BaseButton>
            <BaseButton variant="secondary" class="px-4 py-2 text-xs" @click="dismissUpdate">
              {{ t('pwa.update.later') }}
            </BaseButton>
          </div>
        </div>
      </div>
    </transition>

    <transition name="fade-up">
      <div
        v-if="offlineReadyVisible"
        class="pointer-events-auto fixed inset-x-4 bottom-28 z-[55] rounded-xl border border-white/10 bg-neutral-900/90 px-4 py-3 text-sm text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur"
      >
        <div class="flex items-start gap-3">
          <div class="flex-1">
            <p class="font-semibold">{{ t('pwa.offlineReady.title') }}</p>
            <p class="text-xs text-white/70">
              {{ t('pwa.offlineReady.body') }}
            </p>
          </div>
          <button
            class="text-xs font-semibold uppercase tracking-wide text-white/70"
            @click="dismissOfflineReady"
          >
            {{ t('pwa.offlineReady.dismiss') }}
          </button>
        </div>
      </div>
    </transition>

    <transition name="slide-down">
      <div
        v-if="offlineBannerVisible"
        class="fixed inset-x-0 top-0 z-[70] bg-amber-500/90 px-4 py-2 text-center text-xs font-semibold uppercase tracking-wide text-neutral-950"
      >
        {{ t('pwa.offlineBanner') }}
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-up-enter-active,
.fade-up-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
.slide-down-enter-active,
.slide-down-leave-active {
  transition:
    transform 0.25s ease,
    opacity 0.25s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
