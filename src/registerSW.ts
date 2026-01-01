import { registerSW } from 'virtual:pwa-register'

export const PAYURUS_SW_EVENTS = {
  UPDATE_READY: 'payurus-sw-update-ready',
  OFFLINE_READY: 'payurus-sw-offline-ready',
} as const

type UpdateHandler = (reloadPage?: boolean) => Promise<void>

let updateSWInstance: UpdateHandler | null = null

export const registerPayurusSW = () => {
  updateSWInstance = registerSW({
    immediate: true,
    onRegistered(swRegistration) {
      if (swRegistration) {
        console.info('Payurus service worker registered.', swRegistration)
      }
    },
    onRegisterError(error) {
      console.error('Payurus service worker registration failed:', error)
    },
    onNeedRefresh() {
      window.dispatchEvent(new CustomEvent(PAYURUS_SW_EVENTS.UPDATE_READY))
    },
    onOfflineReady() {
      window.dispatchEvent(new CustomEvent(PAYURUS_SW_EVENTS.OFFLINE_READY))
    },
  })

  return updateSWInstance
}

export const updatePayurusSW = async (reloadPage = false) => {
  try {
    if (updateSWInstance) {
      await updateSWInstance(true)
    }
  } catch (error) {
    console.error('Failed to update Payurus service worker', error)
  } finally {
    if (reloadPage) {
      window.location.reload()
    }
  }
}
