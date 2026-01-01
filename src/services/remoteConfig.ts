import {
  DEFAULT_REMOTE_CONFIG,
  REMOTE_CONFIG_CACHE_KEY,
  REMOTE_CONFIG_CACHE_NAME,
  REMOTE_CONFIG_ERROR_EVENT,
  REMOTE_CONFIG_MESSAGE,
  REMOTE_CONFIG_RECOVERED_EVENT,
  REMOTE_CONFIG_STORAGE_KEY,
} from '@/constants/remoteConfig'
import type { PayurusRemoteConfig } from '@/constants/remoteConfig'

const REFRESH_INTERVAL_MS = 60 * 60 * 1000 // 1 hour
const isBrowser = typeof window !== 'undefined'
const REMOTE_CONFIG_URL = import.meta.env.VITE_REMOTE_CONFIG_URL

let currentConfig: PayurusRemoteConfig = DEFAULT_REMOTE_CONFIG
let initialized = false
let refreshTimer: number | null = null
let lastErrorActive = false

const readStoredConfig = (): PayurusRemoteConfig => {
  if (!isBrowser) return DEFAULT_REMOTE_CONFIG
  try {
    const raw = localStorage.getItem(REMOTE_CONFIG_STORAGE_KEY)
    if (!raw) return DEFAULT_REMOTE_CONFIG

    const parsed = JSON.parse(raw) as PayurusRemoteConfig
    if (parsed && typeof parsed.activeBaseUrl === 'string') {
      return { ...DEFAULT_REMOTE_CONFIG, ...parsed }
    }
  } catch (error) {
    console.warn('[Payurus RemoteConfig] Failed to read cache', error)
  }
  return DEFAULT_REMOTE_CONFIG
}

const persistConfig = (config: PayurusRemoteConfig) => {
  if (!isBrowser) return
  try {
    localStorage.setItem(REMOTE_CONFIG_STORAGE_KEY, JSON.stringify(config))
  } catch (error) {
    console.warn('[Payurus RemoteConfig] Failed to persist cache', error)
  }
}

let controllerChangeSubscribed = false

const writeConfigCache = async (config: PayurusRemoteConfig) => {
  if (!isBrowser || typeof caches === 'undefined') return
  try {
    const cache = await caches.open(REMOTE_CONFIG_CACHE_NAME)
    await cache.put(
      REMOTE_CONFIG_CACHE_KEY,
      new Response(JSON.stringify(config), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        },
      }),
    )
  } catch (error) {
    console.warn('[Payurus RemoteConfig] Failed to write cache storage', error)
  }
}

const sendConfigToServiceWorker = (config: PayurusRemoteConfig) => {
  if (!isBrowser || !('serviceWorker' in navigator)) return
  const message = { type: REMOTE_CONFIG_MESSAGE, payload: config }

  const sendTo = (controller: ServiceWorker | null) => {
    if (controller) {
      controller.postMessage(message)
    }
  }

  const postToController = () => {
    sendTo(navigator.serviceWorker.controller)
  }

  navigator.serviceWorker.ready
    .then(() => {
      postToController()
    })
    .catch((error) => {
      console.warn('[Payurus RemoteConfig] Unable to send config to SW', error)
    })

  if (!controllerChangeSubscribed) {
    controllerChangeSubscribed = true
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      sendTo(navigator.serviceWorker.controller)
    })
  }
}

const emitError = (detail?: unknown) => {
  if (!isBrowser) return
  lastErrorActive = true
  window.dispatchEvent(new CustomEvent(REMOTE_CONFIG_ERROR_EVENT, { detail }))
}

const emitRecovered = () => {
  if (!isBrowser || !lastErrorActive) return
  lastErrorActive = false
  window.dispatchEvent(new CustomEvent(REMOTE_CONFIG_RECOVERED_EVENT))
}

const getCurrentOrigin = () => {
  if (!isBrowser || !window.location) return ''
  return window.location.origin
}

const isAlternateOrigin = () => {
  if (!isBrowser || !currentConfig?.activeBaseUrl) return false
  try {
    const targetOrigin = new URL(currentConfig.activeBaseUrl).origin
    return targetOrigin !== getCurrentOrigin()
  } catch {
    return false
  }
}

const syncFallbackIndicator = () => {
  if (isAlternateOrigin()) {
    emitError({ reason: 'alternate-origin', target: currentConfig.activeBaseUrl })
  } else {
    emitRecovered()
  }
}

const applyConfig = (config: PayurusRemoteConfig) => {
  currentConfig = { ...DEFAULT_REMOTE_CONFIG, ...config }
  persistConfig(currentConfig)
  void writeConfigCache(currentConfig)
  sendConfigToServiceWorker(currentConfig)
  syncFallbackIndicator()
}

const validateConfig = (config: PayurusRemoteConfig) => {
  return Boolean(config?.activeBaseUrl)
}

const fetchRemoteConfig = async (): Promise<PayurusRemoteConfig | null> => {
  if (!REMOTE_CONFIG_URL) return null
  const response = await fetch(`${REMOTE_CONFIG_URL}?ts=${Date.now()}`, {
    cache: 'no-store',
  })
  if (!response.ok) {
    throw new Error(`Remote config request failed: ${response.status}`)
  }
  const payload = (await response.json()) as PayurusRemoteConfig
  if (!validateConfig(payload)) {
    throw new Error('Remote config missing required fields')
  }
  return payload
}

const configsDiffer = (nextConfig: PayurusRemoteConfig) => {
  return (
    currentConfig.version !== nextConfig.version ||
    currentConfig.activeBaseUrl !== nextConfig.activeBaseUrl
  )
}

export const refreshRemoteConfig = async () => {
  if (!REMOTE_CONFIG_URL || !isBrowser) return currentConfig

  try {
    const remoteConfig = await fetchRemoteConfig()
    if (remoteConfig && configsDiffer(remoteConfig)) {
      applyConfig(remoteConfig)
    } else {
      syncFallbackIndicator()
    }
  } catch (error) {
    console.error('[Payurus RemoteConfig] Refresh failed', error)
    emitError(error)
  }

  return currentConfig
}

const scheduleRefresh = () => {
  if (!isBrowser || refreshTimer || !REMOTE_CONFIG_URL) return
  refreshTimer = window.setInterval(() => {
    void refreshRemoteConfig()
  }, REFRESH_INTERVAL_MS)
  window.addEventListener('online', () => {
    void refreshRemoteConfig()
  })
}

export const initRemoteConfig = () => {
  if (initialized) return currentConfig
  initialized = true
  currentConfig = readStoredConfig()
  applyConfig(currentConfig)

  if (REMOTE_CONFIG_URL && isBrowser) {
    void refreshRemoteConfig()
    scheduleRefresh()
  }

  return currentConfig
}

export const getRemoteConfig = () => currentConfig

export const getActiveBaseUrl = () => currentConfig.activeBaseUrl
